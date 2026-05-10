import { useNavigate } from 'react-router-dom'
import { STEP_CONFIG } from '@constants/gameConfig'
import PokeballBack from '@/components/pokeball/PokeballBack'
import { getBestScore } from '@/utils/storage'
import './HomePage.css'

function HomePage() {
  const navigate = useNavigate()
  const bestScore = getBestScore()

  return (
    <div className="home-container">
      {/* Background sparkles */}
      <div className="home-bg-pattern" aria-hidden="true">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="home-sparkle" style={{
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
      <div className="home-logo-area">
        <div className="home-logo-subtitle">POKÉMON</div>
        <div className="home-logo-title">카드 뒤집기</div>
        <div className="home-logo-english">MEMORY GAME</div>
      </div>

      {/* Pokeballs showcase */}
      <div className="home-ball-row">
        {STEP_CONFIG.map((stage) => (
          <div key={stage.id} className="home-ball-item">
            <PokeballBack type={stage.ballType} size={56} />
            <div className="home-ball-label" style={{ color: stage.ballColor }}>
              {stage.ballName}
            </div>
          </div>
        ))}
      </div>

      {/* Stage info */}
      <div className="home-stage-info">
        {STEP_CONFIG.map(stage => (
          <div key={stage.id} className="home-stage-info-item">
            <span style={{ color: stage.ballColor, fontWeight: 700 }}>{stage.label}</span>
            <span className="home-stage-info-grid">{stage.rows}×{stage.cols}</span>
            <span className="home-stage-diff" style={{ background: stage.ballColor }}>{stage.difficulty}</span>
          </div>
        ))}
      </div>

      {/* Best score */}
      {bestScore > 0 && (
        <div className="home-best-score">
          <span className="home-best-score-icon">🏆</span>
          <span className="home-best-score-label">최고 점수</span>
          <span className="home-best-score-value">{bestScore}</span>
        </div>
      )}

      {/* Start button */}
      <button className="home-start-btn" onClick={() => navigate('/game')}>
        <span className="home-start-btn-text">게임 시작</span>
        <span className="home-start-btn-sub">PRESS START</span>
      </button>

      <div className="home-footer">4 STAGES · MEMORY CHALLENGE</div>

      <div className="home-version">v{__APP_VERSION__}</div>
    </div>
  )
}

export default HomePage
