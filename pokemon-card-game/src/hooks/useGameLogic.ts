import { useReducer, useCallback, useRef, useEffect } from 'react'
import type { CardType, GameState } from '@/types'
import { STEP_CONFIG, TOTAL_STEPS, FLIP_DELAY_MS } from '@/constants/gameConfig'

type Action =
  | { type: 'FLIP_CARD', cardId: string }
  | { type: 'MATCH_SUCCESS' }
  | { type: 'MATCH_FAIL' }
  | { type: 'SET_CHECKING', value: boolean }
  | { type: 'NEXT_STEP', cards: CardType[] }
  | { type: 'GAME_CLEAR', scoreGain: number }
  | { type: 'RESET', cards: CardType[], maxFlips: number }
  | { type: 'GAME_START' }
  | { type: 'GAME_HINT', cards: CardType[] }

function getInitialState(): GameState {
  return {
    currentStep: 0,
    status: 'ready',
    remainingFlips: STEP_CONFIG[0].maxFlips,
    totalScore: 0,
    cards: [],
    flippedCards: [],
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
        status: newRemainingFlips === 0 ? 'gameover' : state.status,
        isChecking: false,
      }
    }
    case 'SET_CHECKING': {
      return { ...state, isChecking: action.value }
    }
    case 'NEXT_STEP': {
      const nextStep = state.currentStep + 1
      return {
        ...state,
        currentStep: nextStep,
        status: 'playing',
        remainingFlips: STEP_CONFIG[nextStep].maxFlips,
        totalScore: state.totalScore + state.remainingFlips,
        cards: action.cards,
        flippedCards: [],
        isChecking: false,
      }
    }
    case 'GAME_CLEAR': {
      return {
        ...state,
        status: 'clear',
        totalScore: state.totalScore + action.scoreGain,
        cards: [],
        flippedCards: [],
        isChecking: false,
      }
    }
    case 'RESET': {
      return {
        currentStep: 0,
        status: 'ready',
        remainingFlips: action.maxFlips,
        totalScore: 0,
        cards: action.cards,
        flippedCards: [],
        isChecking: false,
      }
    }
    case 'GAME_START': {
      return {
        ...state,
        status: 'playing'
      }
    }
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
  const initialized = useRef(false)

  // stepCards가 로드되면 초기화
  useEffect(() => {
    if (!initialized.current && stepCards.length > 0) {
      initialized.current = true
      dispatch({ type: 'RESET', cards: stepCards[0], maxFlips: STEP_CONFIG[0].maxFlips })
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

        if (willBeLastMatch) {
          if (state.currentStep >= TOTAL_STEPS - 1) {
            dispatch({ type: 'GAME_CLEAR', scoreGain: state.remainingFlips })
          } else {
            dispatch({ type: 'MATCH_SUCCESS' })
            setTimeout(() => {
              dispatch({ type: 'NEXT_STEP', cards: stepCards[state.currentStep + 1] })
            }, 600)
          }
        } else {
          dispatch({ type: 'MATCH_SUCCESS' })
        }
      } else {
        dispatch({ type: 'SET_CHECKING', value: true })
        setTimeout(() => {
          dispatch({ type: 'MATCH_FAIL' })
        }, FLIP_DELAY_MS)
      }
    }
  }, [state, stepCards])

  // 건너뛰기 dev 용
  const handleSkipStage = useCallback(() => {
    if (state.currentStep >= TOTAL_STEPS - 1) {
      dispatch({ type: 'GAME_CLEAR', scoreGain: state.remainingFlips })
    } else {
      setTimeout(() => {
        dispatch({ type: 'NEXT_STEP', cards: stepCards[state.currentStep + 1] })
      }, 600)
    }
  }, [state, stepCards])

  // handleActiveHint
  const handleActiveHint = useCallback((flag: boolean, hintIds: Array<string>) => {
    console.log(flag, hintIds)

    // console.log(state, stepCards)
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
    dispatch({ type: 'RESET', cards: stepCards[0], maxFlips: STEP_CONFIG[0].maxFlips })
    initialized.current = true
  }, [stepCards])

  return { state, handleCardClick, handleReset, handleSkipStage, handleActiveHint }
}
