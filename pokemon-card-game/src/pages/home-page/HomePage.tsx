import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { STEP_CONFIG } from '@constants/gameConfig'
import PokeballBack from '@/components/pokeball/PokeballBack'
import { getBestScore } from '@/utils/storage'

function HomePage() {
  const navigate = useNavigate()
  const [hovered, setHovered] = useState<number | null>(null)
  const bestScore = getBestScore()

  return (
      <div style={homeStyles.container}>
      {/* Background sparkles */}
      <div style={homeStyles.bgPattern} aria-hidden="true">
        {[...Array(20)].map((_, i) => (
          <div key={i} style={{
            ...homeStyles.sparkle,
            left: `${(i * 17 + 5) % 95}%`,
            top: `${(i * 23 + 8) % 90}%`,
            animationDelay: `${(i * 0.3) % 3}s`,
            width: i % 3 === 0 ? 8 : 5,
            height: i % 3 === 0 ? 8 : 5,
            opacity: 0.15 + (i % 4) * 0.05,
          }} />
        ))}
      </div>

      {/* Logo area */}
      <div style={homeStyles.logoArea}>
        <div style={homeStyles.logoSubtitle}>POKÉMON</div>
        <div style={homeStyles.logoTitle}>카드 뒤집기</div>
        <div style={homeStyles.logoEnglish}>MEMORY GAME</div>
      </div>

      {/* Pokeballs showcase */}
      <div style={homeStyles.ballRow}>
        {STEP_CONFIG.map((stage, i) => (
          <div key={stage.id} style={{
            ...homeStyles.ballItem,
            transform: hovered === i ? 'scale(1.15) translateY(-6px)' : 'scale(1) translateY(0)',
            transition: 'transform 0.2s ease',
          }}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
          >
            <PokeballBack 
              type={stage.ballType} 
              size={56} 
            />
            <div 
              style={{ ...homeStyles.ballLabel, color: stage.ballColor }}
            >
              {stage.ballName}
            </div>
          </div>
        ))}
      </div>

      {/* Stage info */}
      <div style={homeStyles.stageInfo}>
        {STEP_CONFIG.map(stage => (
          <div key={stage.id} style={homeStyles.stageInfoItem}>
            <span style={{ color: stage.ballColor, fontWeight: 700 }}>{stage.label}</span>
            <span style={homeStyles.stageInfoGrid}>{stage.rows}×{stage.cols}</span>
            <span style={{ ...homeStyles.stageDiff, background: stage.ballColor }}>{stage.difficulty}</span>
          </div>
        ))}
      </div>

      {/* Best score */}
      {bestScore > 0 && (
        <div style={homeStyles.bestScore}>
          <span style={homeStyles.bestScoreIcon}>🏆</span>
          <span style={homeStyles.bestScoreLabel}>최고 점수</span>
          <span style={homeStyles.bestScoreValue}>{bestScore}</span>
        </div>
      )}

      {/* Start button */}
      <button style={homeStyles.startBtn} onClick={() => navigate('/game')}
        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
        onMouseDown={e => e.currentTarget.style.transform = 'scale(0.97)'}
        onMouseUp={e => e.currentTarget.style.transform = 'scale(1.05)'}
      >
        <span style={homeStyles.startBtnText}>게임 시작</span>
        <span style={homeStyles.startBtnSub}>PRESS START</span>
      </button>

      <div style={homeStyles.footer}>4 STAGES · MEMORY CHALLENGE</div>
    </div>
  )
}

const homeStyles: Record<string, React.CSSProperties> = {
  container: {
    minHeight: '100dvh',
    background: 'linear-gradient(160deg, #1a0000 0%, #2d0000 40%, #1a0808 100%)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px 16px',
    position: 'relative',
    overflow: 'hidden',
    fontFamily: "'Press Start 2P', monospace",
    gap: 0,
  },
  bgPattern: {
    position: 'absolute', inset: 0, pointerEvents: 'none',
  },
  sparkle: {
    position: 'absolute',
    borderRadius: '50%',
    background: '#FFD700',
    animation: 'sparkle 2s infinite ease-in-out',
  },
  logoArea: {
    textAlign: 'center',
    marginBottom: 24,
    animation: 'floatLogo 3s ease-in-out infinite',
  },
  logoSubtitle: {
    fontSize: 11,
    letterSpacing: 8,
    color: '#FFD700',
    marginBottom: 4,
    textShadow: '0 0 20px #FFD700',
  },
  logoTitle: {
    fontSize: 32,
    color: '#FFFFFF',
    textShadow: '3px 3px 0 #CC0000, 6px 6px 0 #880000, 0 0 30px rgba(255,215,0,0.5)',
    lineHeight: 1.2,
    marginBottom: 4,
  },
  logoEnglish: {
    fontSize: 9,
    letterSpacing: 4,
    color: 'rgba(255,215,0,0.6)',
    marginTop: 6,
  },
  ballRow: {
    display: 'flex',
    gap: 16,
    marginBottom: 20,
    alignItems: 'flex-end',
  },
  ballItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 4,
    cursor: 'default',
  },
  ballLabel: {
    fontSize: 7,
    letterSpacing: 1,
    marginTop: 2,
  },
  stageInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
    marginBottom: 20,
    width: '100%',
    maxWidth: 320,
  },
  stageInfoItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,215,0,0.15)',
    borderRadius: 6,
    padding: '6px 12px',
    fontSize: 9,
    color: '#ccc',
  },
  stageInfoGrid: {
    color: '#aaa',
    fontSize: 9,
  },
  stageDiff: {
    fontSize: 7,
    padding: '2px 6px',
    borderRadius: 3,
    color: '#fff',
    letterSpacing: 1,
  },
  bestScore: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    background: 'rgba(255,215,0,0.1)',
    border: '1px solid rgba(255,215,0,0.4)',
    borderRadius: 8,
    padding: '8px 20px',
    marginBottom: 20,
    color: '#FFD700',
  },
  bestScoreIcon: { fontSize: 16 },
  bestScoreLabel: { fontSize: 8, letterSpacing: 2 },
  bestScoreValue: { fontSize: 18, fontWeight: 700 },
  startBtn: {
    background: 'linear-gradient(180deg, #E53935 0%, #B71C1C 100%)',
    border: '3px solid #FFD700',
    borderRadius: 8,
    padding: '16px 48px',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 4,
    transition: 'transform 0.15s ease',
    boxShadow: '0 4px 20px rgba(229,57,53,0.5), 0 0 0 1px #880000',
    marginBottom: 16,
  },
  startBtnText: {
    fontSize: 16,
    color: '#FFD700',
    fontFamily: "'Press Start 2P', monospace",
    textShadow: '2px 2px 0 #880000',
  },
  startBtnSub: {
    fontSize: 7,
    color: 'rgba(255,215,0,0.7)',
    letterSpacing: 3,
    fontFamily: "'Press Start 2P', monospace",
  },
  footer: {
    fontSize: 7,
    color: 'rgba(255,255,255,0.25)',
    letterSpacing: 3,
    marginTop: 4,
  },
}


export default HomePage
