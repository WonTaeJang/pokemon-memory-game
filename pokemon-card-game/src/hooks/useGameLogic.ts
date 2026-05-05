import { useReducer, useCallback, useRef, useEffect, useState } from 'react'
import type { CardType, GameState } from '@/types'
import { STEP_CONFIG, TOTAL_STEPS, FLIP_DELAY_MS } from '@/constants/gameConfig'

type Action =
  | { type: 'FLIP_CARD', cardId: string }
  | { type: 'MATCH_SUCCESS' }
  | { type: 'MATCH_FAIL' }
  | { type: 'SET_CHECKING', value: boolean }
  | { type: 'NEXT_STEP', cards: CardType[] }
  | { type: 'GAME_CLEAR' }
  | { type: 'GAME_OVER' }
  | { type: 'RESET', cards: CardType[] }
  | { type: 'GAME_START' }
  | { type: 'GAME_HINT', cards: CardType[] }

function getInitialState(): GameState {
  return {
    currentStep: 0,
    status: 'ready',
    remainingFlips: STEP_CONFIG[0].maxFlips,
    totalScore: 0,
    currentStageScore: 0,
    cards: [],
    flippedCards: [],
    stageScores: [],
    isChecking: false,
  }
}

function reducer(state: GameState, action: Action): GameState {
  switch (action.type) {
    case 'FLIP_CARD': {
      const card = state.cards.find(c => c.id === action.cardId)!
      return {
        ...state,
        cards: state.cards.map(c =>
          c.id === action.cardId ? { ...c, isFlipped: true } : c
        ),
        flippedCards: [...state.flippedCards, { ...card, isFlipped: true }],
      }
    }
    case 'MATCH_SUCCESS': {
      const [first, second] = state.flippedCards
      return {
        ...state,
        cards: state.cards.map(c =>
          c.id === first.id || c.id === second.id ? { ...c, isMatched: true } : c
        ),
        flippedCards: [],
        totalScore: state.totalScore + 1,
        currentStageScore: state.currentStageScore + 1,
      }
    }
    case 'MATCH_FAIL': {
      const [first, second] = state.flippedCards
      const newRemainingFlips = state.remainingFlips - 1
      return {
        ...state,
        cards: state.cards.map(c =>
          c.id === first.id || c.id === second.id ? { ...c, isFlipped: false } : c
        ),
        flippedCards: [],
        remainingFlips: newRemainingFlips,
        isChecking: false,
      }
    }
    // 카드 뒤집기 매칭 실패시 발생
    case 'SET_CHECKING': {
      return { ...state, isChecking: action.value }
    }
    // 스테이지 이동 
    case 'NEXT_STEP': {
      const nextStep = state.currentStep + 1
      return {
        ...state,
        currentStep: nextStep,
        status: 'playing',
        remainingFlips: STEP_CONFIG[nextStep].maxFlips,
        totalScore: state.totalScore + state.remainingFlips,
        currentStageScore: 0,
        stageScores: [...state.stageScores, state.currentStageScore + state.remainingFlips],
        cards: action.cards,
        flippedCards: [],
        isChecking: false,
      }
    }
    // 게임 클리어
    case 'GAME_CLEAR': {
      return {
        ...state,
        status: 'clear',
        totalScore: state.totalScore + state.remainingFlips,
        currentStageScore: 0,
        stageScores: [...state.stageScores, state.currentStageScore + state.remainingFlips],
        cards: [],
        flippedCards: [],
        isChecking: false,
      }
    }
    case 'GAME_OVER': {
      return {
        ...state,
        status: 'gameover',
        stageScores: [...state.stageScores, state.currentStageScore],
      }
    }
    case 'RESET': {
      return {
        ...getInitialState(),
        cards: action.cards,
      }
    }
    case 'GAME_START': {
      return {
        ...state,
        status: 'playing'
      }
    }
    // 게임 힌트
    case 'GAME_HINT': {
      return {
        ...state,
        cards: action.cards,
      }
    }

    default:
      return state
  }
}

export function useGameLogic(stepCards: CardType[][]) {
  const [state, dispatch] = useReducer(reducer, undefined, getInitialState)
  const [matchedCard, setMatchedCard] = useState<CardType | null>(null)
  const initialized = useRef(false)

  // stepCards가 로드되면 초기화
  useEffect(() => {
    if (!initialized.current && stepCards.length > 0) {
      initialized.current = true
      dispatch({ type: 'RESET', cards: stepCards[0] })
    }
  }, [stepCards])

  // state의 status 가 ready 이고 stepCards의 length 가 0보다 클때 playing 으로 변경
  useEffect(() => {
    if(state.status === 'ready' && stepCards.length > 0) {
      dispatch({ type: 'GAME_START'})
    }

  }, [state, stepCards])

  const handleCardClick = useCallback((cardId: string) => {
    if (state.isChecking || state.status !== 'playing') return
    
    const card = state.cards.find(c => c.id === cardId)

    if (!card || card.isFlipped || card.isMatched) return
    if (state.flippedCards.length >= 2) return

    dispatch({ type: 'FLIP_CARD', cardId })

    const newFlipped = [...state.flippedCards, card]

    if (newFlipped.length === 2) {
      const [first, second] = newFlipped

      if (first.pokemonId === second.pokemonId) {
        const willBeLastMatch =
          state.cards.filter(c => !c.isMatched && c.id !== first.id && c.id !== second.id).length === 0

        // snackbar
        setMatchedCard(first)

        if (willBeLastMatch) {
          if (state.currentStep >= TOTAL_STEPS - 1) {
            setTimeout(() => {
              dispatch({ type: 'GAME_CLEAR' })
            }, 1700)
          } else {
            dispatch({ type: 'MATCH_SUCCESS' })
            setTimeout(() => {
              dispatch({ type: 'NEXT_STEP', cards: stepCards[state.currentStep + 1] })
            }, 1700)
          }
        } else {
          dispatch({ type: 'MATCH_SUCCESS' })
        }
      } else {
        dispatch({ type: 'SET_CHECKING', value: true })

        setTimeout(() => {
          // gameover check 
          const newRemainingFlips = state.remainingFlips - 1
          
          if(newRemainingFlips === 0) {
            dispatch({ type: 'GAME_OVER' })
          } else {
            dispatch({ type: 'MATCH_FAIL' })
          }

        }, FLIP_DELAY_MS)
      }
    }
  }, [state, stepCards])

  // 건너뛰기 dev 용
  const handleSkipStage = useCallback(() => {
    if (state.currentStep >= TOTAL_STEPS - 1) {
      dispatch({ type: 'GAME_CLEAR' })
    } else {
      setTimeout(() => {
        dispatch({ type: 'NEXT_STEP', cards: stepCards[state.currentStep + 1] })
      }, 200)
    }
  }, [state, stepCards])

  // handleActiveHint
  const handleActiveHint = useCallback((flag: boolean, hintIds: Array<string>) => {
    let hintCards = state.cards

    if(flag) {
      hintCards = hintCards.map(card => {
        return {
          ...card,
          isFlipped: true
        }
      })
    } else {
      hintCards = hintCards.map(card => {
        return {
          ...card,
          isFlipped: hintIds.includes(card.id) && !card.isMatched ? false : card.isFlipped
        }
      })
    }

    dispatch({ type: 'GAME_HINT', cards: hintCards})

  }, [state])

  const handleReset = useCallback(() => {
    initialized.current = false
    dispatch({ type: 'RESET', cards: stepCards[0] })
    initialized.current = true
  }, [stepCards])

  return { 
    state, 
    handleCardClick, 
    handleReset, 
    handleSkipStage, 
    handleActiveHint,
    matchedCard,
    clearMatchedCard:() => setMatchedCard(null)
  }
}
