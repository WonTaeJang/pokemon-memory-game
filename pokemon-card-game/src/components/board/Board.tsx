import type { CardType, GameState, StepConfig } from '@/types'
import GameInfo from '../game-info/GameInfo'
import Card from '../card/Card'
import { useState } from 'react'
import { STEP_CONFIG, HINT_COUNT } from '@/constants/gameConfig'


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
    if (hintsLeft <= 0 || hintActive) return
    setHintsLeft(h => h - 1);
    setHintActive(true)

    const unmatchedCards = cards.filter(c => !c.isMatched)
    const hintIds = unmatchedCards.map(c => c.id)
    handleActiveHint(true, hintIds)

    setTimeout(() => {
      setHintActive(false)
      handleActiveHint(false, hintIds)
    }, 2000)
  }

  return (
    <div style={boardStyles.wrapper}>
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
          onHint={handleHint}
          onSkipStage={handleSkipStage}
          onHome={onHome}
        />

        {/* main */}
        <div style={boardStyles.boardArea}>
          <div
            style={{
              ...boardStyles.grid,
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
        <div style={boardStyles.progressWrap}>
          <div style={boardStyles.progressLabel}>
            <span style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 7, color: 'rgba(255,255,255,0.4)' }}>
              진행도
            </span>
            <span style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 7, color: '#FFD700' }}>
              {matchedCount}/{stage.pokemonCount}
            </span>
          </div>
          <div style={boardStyles.progressBar}>
            <div style={{
              ...boardStyles.progressFill,
              width: `${(matchedCount / stage.pokemonCount) * 100}%`,
            }} />
          </div>
        </div>
      </>
    </div>
  )
}

const boardStyles: Record<string, React.CSSProperties> = {
  wrapper: {
    minHeight: '100dvh',
    display: 'flex',
    flexDirection: 'column',
    background: 'linear-gradient(160deg, #0d0d1a 0%, #1a0d00 100%)',
  },
  boardArea: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '12px',
    boxSizing: 'border-box',
  },
  grid: {
    display: 'grid',
    gap: 8,
    width: '100%',
    maxWidth: 480,
    maxHeight: 'calc(100dvh - 130px)',
    aspectRatio: 'auto',
  },
  progressWrap: {
    padding: '6px 16px 12px',
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
  },
  progressLabel: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  progressBar: {
    width: '100%',
    height: 6,
    background: 'rgba(255,255,255,0.1)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    background: 'linear-gradient(90deg, #E53935, #FFD700)',
    borderRadius: 3,
    transition: 'width 0.4s ease',
  },
}

export default Board