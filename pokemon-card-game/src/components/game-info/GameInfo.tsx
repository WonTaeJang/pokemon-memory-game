import type { StepConfig } from '@/types'

interface Props {
  stage: StepConfig
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

// ===== TOP BAR =====
const GameInfo = ({ stage, flipsLeft, timer, totalScore, onHome, hintsLeft, onHint, hintActive, onSkipStage, isLastStage }: Props) => {
  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${String(m).padStart(2,'0')}:${String(sec).padStart(2,'0')}`;
  };

  return (
    <div style={barStyles.bar}>
      {/* Home button */}
      <button 
        style={barStyles.homeBtn} 
        onClick={onHome} 
        title="홈으로"
      >
        <span style={barStyles.homeBtnIcon}>⌂</span>
      </button>

      {/* Stage info */}
      <div style={barStyles.stageBlock}>
        <div 
          style={{ ...barStyles.stageName, color: stage.ballColor }}
        >
          {stage.label}
        </div>
        <div 
          style={barStyles.stageBall}
        >
          {stage.ballName}
        </div>
      </div>

      {/* Center: flips + timer */}
      <div style={barStyles.centerBlock}>
        <div style={barStyles.statItem}>
          <span style={barStyles.statLabel}>남은 횟수</span>
          <span style={{
            ...barStyles.statValue,
            color: flipsLeft <= 3 ? '#FF5252' : '#FFD700',
            animation: flipsLeft <= 3 ? 'pulse 0.8s infinite' : 'none',
          }}>{flipsLeft}</span>
        </div>
        <div style={barStyles.divider} />
        <div style={barStyles.statItem}>
          <span style={barStyles.statLabel}>시간</span>
          <span style={barStyles.statValue}>{formatTime(timer)}</span>
        </div>
        <div style={barStyles.divider} />
        <div style={barStyles.statItem}>
          <span style={barStyles.statLabel}>점수</span>
          <span style={{ ...barStyles.statValue, color: '#4CAF50' }}>{totalScore}</span>
        </div>
      </div>

      {/* Hint button */}
      <button
        style={{
          ...barStyles.hintBtn,
          opacity: hintsLeft <= 0 ? 0.35 : 1,
          background: hintActive ? 'rgba(255,215,0,0.25)' : 'rgba(255,255,255,0.08)',
          border: hintActive ? '1px solid #FFD700' : '1px solid rgba(255,255,255,0.2)',
        }}
        onClick={onHint}
        disabled={hintsLeft <= 0}
        title={`힌트 (남은 횟수: ${hintsLeft})`}
      >
        <span style={barStyles.hintIcon}>💡</span>
        <span style={barStyles.hintCount}>{hintsLeft}</span>
      </button>

      {/* Skip button (test only) */}
      <button
        style={barStyles.skipBtn}
        onClick={onSkipStage}
        title={isLastStage ? '결과 보기' : '다음 스테이지'}
      >
        <span style={barStyles.skipIcon}>{isLastStage ? '🏁' : '⏭'}</span>
        <span style={barStyles.skipLabel}>{isLastStage ? '완료' : 'SKIP'}</span>
      </button>
    </div>
  )
}

const barStyles: Record<string, React.CSSProperties> = {
  bar: {
    width: '100%',
    background: 'rgba(0,0,0,0.85)',
    backdropFilter: 'blur(10px)',
    borderBottom: '2px solid rgba(255,215,0,0.3)',
    display: 'flex',
    alignItems: 'center',
    padding: '8px 12px',
    gap: 8,
    position: 'sticky',
    top: 0,
    zIndex: 100,
    boxSizing: 'border-box',
  },
  homeBtn: {
    background: 'rgba(229,57,53,0.8)',
    border: '1px solid #CC0000',
    borderRadius: 6,
    color: '#FFD700',
    fontSize: 18,
    cursor: 'pointer',
    padding: '4px 8px',
    lineHeight: 1,
    flexShrink: 0,
    transition: 'transform 0.15s',
  },
  homeBtnIcon: { display: 'block' },
  stageBlock: {
    display: 'flex',
    flexDirection: 'column',
    gap: 1,
    minWidth: 56,
  },
  stageName: {
    fontFamily: "'Press Start 2P', monospace",
    fontSize: 8,
    fontWeight: 700,
  },
  stageBall: {
    fontFamily: "'Press Start 2P', monospace",
    fontSize: 6,
    color: 'rgba(255,255,255,0.5)',
  },
  centerBlock: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  statItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 1,
  },
  statLabel: {
    fontFamily: "'Press Start 2P', monospace",
    fontSize: 6,
    color: 'rgba(255,255,255,0.45)',
    letterSpacing: 0.5,
  },
  statValue: {
    fontFamily: "'Press Start 2P', monospace",
    fontSize: 13,
    color: '#FFD700',
    fontWeight: 700,
  },
  divider: {
    width: 1,
    height: 28,
    background: 'rgba(255,255,255,0.15)',
  },
  hintBtn: {
    borderRadius: 6,
    color: '#FFD700',
    cursor: 'pointer',
    padding: '4px 8px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 1,
    transition: 'all 0.2s',
    flexShrink: 0,
    minWidth: 40,
  },
  hintIcon: { fontSize: 16 },
  hintCount: {
    fontFamily: "'Press Start 2P', monospace",
    fontSize: 7,
    color: '#FFD700',
  },
  skipBtn: {
    background: 'rgba(76,175,80,0.2)',
    border: '1px solid rgba(76,175,80,0.6)',
    borderRadius: 6,
    color: '#4CAF50',
    cursor: 'pointer',
    padding: '4px 8px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 1,
    flexShrink: 0,
    minWidth: 40,
    transition: 'all 0.15s',
  },
  skipIcon: { fontSize: 14 },
  skipLabel: {
    fontFamily: "'Press Start 2P', monospace",
    fontSize: 6,
    color: '#4CAF50',
    letterSpacing: 0.5,
  },
}

export default GameInfo
