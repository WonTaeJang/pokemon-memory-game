import { useState, useEffect } from "react"
import PokeballBack from '@components/pokeball/PokeballBack'
import { STEP_CONFIG } from '@/constants/gameConfig'
import type { GameStatus } from '@/types/index'

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
    <div style={{
      ...overlayStyles.backdrop,
      background: 'rgba(0,0,0,0.92)',
      opacity: show ? 1 : 0,
      transition: 'opacity 0.4s ease',
    }}>
      <div style={{
        ...overlayStyles.panel,
        maxWidth: 360,
        transform: show ? 'scale(1) translateY(0)' : 'scale(0.8) translateY(30px)',
        transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
      }}>
        {
          isNewBest && (
            <div style={overlayStyles.newBestBadge}>🎉 NEW BEST!</div>
          )
        }
        <div style={overlayStyles.clearBadge}>{status === 'clear' ? 'ALL CLEAR!' : 'GAME OVER'}</div>
        <div style={overlayStyles.finalScore}>{totalScore}</div>
        <div style={overlayStyles.finalScoreLabel}>TOTAL SCORE</div>

        <div style={overlayStyles.stageBreakdown}>
          {stageScores.map((s, i) => (
            <div key={i} style={overlayStyles.breakdownRow}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <PokeballBack type={STEP_CONFIG[i].ballType} size={22} />
                <span style={{ color: STEP_CONFIG[i].ballColor, fontSize: 8, fontFamily: "'Press Start 2P', monospace" }}>
                  {STEP_CONFIG[i].label}
                </span>
              </div>
              <span style={overlayStyles.breakdownScore}>+{s}</span>
            </div>
          ))}
        </div>

        <div style={overlayStyles.btnRow}>
          <button style={overlayStyles.nextBtn} onClick={onRetry}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
          >
            <span style={overlayStyles.nextBtnText}>다시 도전</span>
            {/* <span style={overlayStyles.nextBtnSub}>PLAY AGAIN ↺</span> */}
          </button>
          <button style={overlayStyles.homeBtn2} onClick={onHome}>홈</button>
        </div>
      </div>
    </div>
  )
}

const overlayStyles: Record<string, React.CSSProperties> = {
  backdrop: {
    position: 'fixed', inset: 0,
    background: 'rgba(0,0,0,0.82)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 999,
    padding: 16,
  },
  confettiWrap: {
    position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden',
  },
  confetti: {
    position: 'absolute',
    top: '-10px',
    animation: 'confettiFall linear forwards',
  },
  panel: {
    background: 'linear-gradient(160deg, #1a0000 0%, #2d0000 100%)',
    border: '2px solid rgba(255,215,0,0.5)',
    borderRadius: 16,
    padding: '28px 24px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 10,
    width: '100%',
    maxWidth: 320,
    boxShadow: '0 0 40px rgba(255,215,0,0.2)',
    position: 'relative',
    zIndex: 1,
  },
  clearBadge: {
    fontFamily: "'Press Start 2P', monospace",
    fontSize: 20,
    color: '#FFD700',
    textShadow: '2px 2px 0 #CC0000, 0 0 20px rgba(255,215,0,0.6)',
  },
  overBadge: {
    fontFamily: "'Press Start 2P', monospace",
    fontSize: 18,
    color: '#FF5252',
    textShadow: '2px 2px 0 #7f0000, 0 0 20px rgba(255,82,82,0.6)',
  },
  stageLabel: {
    fontFamily: "'Press Start 2P', monospace",
    fontSize: 9,
  },
  scoreRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    background: 'rgba(255,255,255,0.06)',
    borderRadius: 10,
    padding: '10px 16px',
    width: '100%',
    justifyContent: 'center',
  },
  scoreItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 3,
  },
  scoreLabel: {
    fontFamily: "'Press Start 2P', monospace",
    fontSize: 6,
    color: 'rgba(255,255,255,0.5)',
  },
  scoreNum: {
    fontFamily: "'Press Start 2P', monospace",
    fontSize: 22,
    color: '#FFD700',
    fontWeight: 700,
  },
  scorePlus: {
    fontFamily: "'Press Start 2P', monospace",
    fontSize: 16,
    color: 'rgba(255,255,255,0.4)',
  },
  btnRow: {
    display: 'flex',
    gap: 10,
    width: '100%',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  nextBtn: {
    background: 'linear-gradient(180deg, #E53935 0%, #B71C1C 100%)',
    border: '2px solid #FFD700',
    borderRadius: 8,
    padding: '10px 20px',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 3,
    transition: 'transform 0.15s',
    flex: 1,
  },
  retryBtn: {
    background: 'linear-gradient(180deg, #E53935 0%, #B71C1C 100%)',
    border: '2px solid #FF5252',
    borderRadius: 8,
    padding: '10px 20px',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 3,
    transition: 'transform 0.15s',
    flex: 1,
  },
  nextBtnText: {
    fontFamily: "'Press Start 2P', monospace",
    fontSize: 10,
    color: '#FFD700',
  },
  nextBtnSub: {
    fontFamily: "'Press Start 2P', monospace",
    fontSize: 6,
    color: 'rgba(255,215,0,0.65)',
    letterSpacing: 1,
  },
  homeBtn2: {
    background: 'rgba(255,255,255,0.08)',
    border: '1px solid rgba(255,255,255,0.25)',
    borderRadius: 8,
    padding: '10px 16px',
    cursor: 'pointer',
    color: '#ccc',
    fontFamily: "'Press Start 2P', monospace",
    fontSize: 9,
    transition: 'transform 0.15s',
  },
  overMsg: {
    fontFamily: "'Press Start 2P', monospace",
    fontSize: 8,
    color: 'rgba(255,255,255,0.6)',
    textAlign: 'center',
    lineHeight: 1.8,
  },
  newBestBadge: {
    background: 'linear-gradient(90deg, #FFD700, #FFA000)',
    color: '#1a0000',
    fontFamily: "'Press Start 2P', monospace",
    fontSize: 9,
    padding: '4px 12px',
    borderRadius: 20,
    fontWeight: 700,
  },
  finalScore: {
    fontFamily: "'Press Start 2P', monospace",
    fontSize: 40,
    color: '#FFD700',
    textShadow: '3px 3px 0 #CC0000, 0 0 30px rgba(255,215,0,0.5)',
  },
  finalScoreLabel: {
    fontFamily: "'Press Start 2P', monospace",
    fontSize: 7,
    color: 'rgba(255,255,255,0.4)',
    letterSpacing: 3,
  },
  stageBreakdown: {
    width: '100%',
    background: 'rgba(255,255,255,0.04)',
    borderRadius: 8,
    padding: '8px 12px',
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
  },
  breakdownRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  breakdownScore: {
    fontFamily: "'Press Start 2P', monospace",
    fontSize: 10,
    color: '#4CAF50',
  },
}

export default FinalResultOverlay