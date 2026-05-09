import { useState } from 'react'
import type { StepConfig, GameState } from '@/types'
import './GameInfo.css'

interface Props {
  stage: StepConfig
  state: GameState
  flipsLeft: number
  timer: number
  totalScore: number
  hintsLeft: number
  hintActive: boolean
  isLastStage: boolean
  onHome: () => void
  onHint: () => void
  onSkipStage: () => void
}

const GameInfo = ({ stage, state, flipsLeft, timer, totalScore, onHome, hintsLeft, onHint, hintActive, onSkipStage, isLastStage }: Props) => {
  const formatTime = (s: number) => {
    const m = Math.floor(s / 60)
    const sec = s % 60
    return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`
  }

  const [shaking, setShaking] = useState(false)

  const onClickHint = () => {
    if (state.flippedCards.length > 0) {
      setShaking(true)
      setTimeout(() => setShaking(false), 400)
    } else {
      onHint()
    }
  }

  const hintBtnClass = [
    'gi-hint-btn',
    hintActive ? 'gi-hint-btn--active' : '',
    hintsLeft <= 0 ? 'gi-hint-btn--empty' : '',
    shaking ? 'gi-hint-btn--shaking' : '',
  ].filter(Boolean).join(' ')

  return (
    <div className="gi-bar">
      {/* Home button */}
      <button className="gi-home-btn" onClick={onHome} title="홈으로">
        <span className="gi-home-btn-icon">⌂</span>
      </button>

      {/* Stage info */}
      <div className="gi-stage-block">
        <div className="gi-stage-name" style={{ color: stage.ballColor }}>
          {stage.label}
        </div>
        <div className="gi-stage-ball">
          {stage.ballName}
        </div>
      </div>

      {/* Center: flips + timer */}
      <div className="gi-center-block">
        <div className="gi-stat-item">
          <span className="gi-stat-label">남은 횟수</span>
          <span className={`gi-stat-value${flipsLeft <= 3 ? ' gi-stat-value--danger' : ''}`}>
            {flipsLeft}
          </span>
        </div>
        <div className="gi-divider" />
        <div className="gi-stat-item">
          <span className="gi-stat-label">시간</span>
          <span className="gi-stat-value">{formatTime(timer)}</span>
        </div>
        <div className="gi-divider" />
        <div className="gi-stat-item">
          <span className="gi-stat-label">점수</span>
          <span className="gi-stat-value gi-stat-value--score">{totalScore}</span>
        </div>
      </div>

      {/* Hint button */}
      <button
        className={hintBtnClass}
        onClick={onClickHint}
        disabled={hintsLeft <= 0}
        title={`힌트 (남은 횟수: ${hintsLeft})`}
      >
        <span className="gi-hint-icon">💡</span>
        <span className="gi-hint-count">{hintsLeft}</span>
      </button>

      {import.meta.env.DEV && (
        <button
          className="gi-skip-btn"
          onClick={onSkipStage}
          title={isLastStage ? '결과 보기' : '다음 스테이지'}
        >
          <span className="gi-skip-icon">{isLastStage ? '🏁' : '⏭'}</span>
          <span className="gi-skip-label">{isLastStage ? '완료' : 'SKIP'}</span>
        </button>
      )}
    </div>
  )
}

export default GameInfo
