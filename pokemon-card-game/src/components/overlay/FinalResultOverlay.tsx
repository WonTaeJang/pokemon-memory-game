import { useState, useEffect } from "react"
import PokeballBack from '@components/pokeball/PokeballBack'
import { STEP_CONFIG } from '@/constants/gameConfig'
import type { GameStatus } from '@/types/index'
import './FinalResultOverlay.css'

interface props {
  totalScore: number
  bestScore: number
  stageScores: Array<number>
  status: GameStatus
  onHome: () => void
  onRetry: () => void
}

const FinalResultOverlay = ({ totalScore, bestScore, status, stageScores, onHome, onRetry }: props) => {
  const [show, setShow] = useState(false)
  const isNewBest = totalScore > bestScore

  useEffect(() => {
    const t = setTimeout(() => setShow(true), 100)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className={`fro-backdrop${show ? ' fro-show' : ''}`}>
      <div className={`fro-panel${show ? ' fro-show' : ''}`}>
        {isNewBest && (
          <div className="fro-new-best-badge">🎉 NEW BEST!</div>
        )}
        <div className="fro-clear-badge">{status === 'clear' ? 'ALL CLEAR!' : 'GAME OVER'}</div>
        <div className="fro-final-score">{totalScore}</div>
        <div className="fro-final-score-label">TOTAL SCORE</div>

        <div className="fro-stage-breakdown">
          {stageScores.map((s, i) => (
            <div key={i} className="fro-breakdown-row">
              <div className="fro-breakdown-row-left">
                <PokeballBack type={STEP_CONFIG[i].ballType} size={22} />
                <span className="fro-stage-label" style={{ color: STEP_CONFIG[i].ballColor }}>
                  {STEP_CONFIG[i].label}
                </span>
              </div>
              <span className="fro-breakdown-score">+{s}</span>
            </div>
          ))}
        </div>

        <div className="fro-btn-row">
          <button className="fro-next-btn" onClick={onRetry}>
            <span className="fro-next-btn-text">다시 도전</span>
          </button>
          <button className="fro-home-btn" onClick={onHome}>홈</button>
        </div>
      </div>
    </div>
  )
}

export default FinalResultOverlay
