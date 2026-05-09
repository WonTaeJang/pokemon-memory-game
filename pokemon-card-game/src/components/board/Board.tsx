import type { CardType, GameState, StepConfig } from '@/types'
import GameInfo from '../game-info/GameInfo'
import Card from '../card/Card'
import { useEffect, useState } from 'react'
import { STEP_CONFIG, HINT_COUNT } from '@/constants/gameConfig'
import './Board.css'


interface Props {
  cards: Array<CardType>,
  state: GameState,
  stage: StepConfig,
  onClickCard: (id: string) => void,
  onHome: () => void,
  handleSkipStage: () => void,
  handleActiveHint: (flag: boolean, hintIds: Array<string>) => void,
  time: number,
}

function Board({ cards, state, stage, onClickCard, onHome, handleSkipStage, handleActiveHint, time }: Props) {
  const [hintsLeft, setHintsLeft] = useState(HINT_COUNT)
  const [hintActive, setHintActive] = useState(false)
  const matchedCount = state.cards.filter(card => card.isMatched).length / 2

  const handleHint = () => {
    const unmatchedCards = cards.filter(c => !c.isMatched)
    const hintIds = unmatchedCards.map(c => c.id)
    setHintActive(true)
    handleActiveHint(true, hintIds)

    setTimeout(() => {
      handleActiveHint(false, hintIds)
      setHintActive(false)
    }, 2000)
  }

  const onClickHint = () => {
    if (hintsLeft <= 0 || hintActive) return
    setHintsLeft(h => h - 1)
    
    handleHint()
  }

  useEffect(() => {
    const initBoard = () => {
      handleHint()
    }

    initBoard()
  }, [])

  return (
    <div className="board-wrapper">
      <>
        {/* header */}
        <GameInfo
          stage={stage}
          state={state}
          flipsLeft={state.remainingFlips}
          timer={time}
          totalScore={state.totalScore}
          hintsLeft={hintsLeft}
          hintActive={hintActive}
          isLastStage={stage.id === STEP_CONFIG.length}
          onHint={onClickHint}
          onSkipStage={handleSkipStage}
          onHome={onHome}
        />

        {/* main */}
        <div className="board-area">
          <div
            className="board-grid"
            style={{
              gridTemplateColumns: `repeat(${stage.cols}, 1fr)`,
              gridTemplateRows: `repeat(${stage.rows}, 1fr)`,
            }}
          >
            {cards.map(card => (
              <Card
                key={card.id}
                card={card}
                stage={stage}
                onClick={onClickCard}
                disabled={false}
              />
            ))}
          </div>
        </div>

        {/* footer */}
        <div className="board-progress-wrap">
          <div className="board-progress-label">
            <span className="board-progress-label-text">진행도</span>
            <span className="board-progress-label-count">{matchedCount}/{stage.pokemonCount}</span>
          </div>
          <div className="board-progress-bar">
            <div
              className="board-progress-fill"
              style={{ width: `${(matchedCount / stage.pokemonCount) * 100}%` }}
            />
          </div>
        </div>
      </>
    </div>
  )
}

export default Board