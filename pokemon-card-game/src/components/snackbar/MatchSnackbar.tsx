import { useEffect, useState } from "react"
import type { CardType } from '@/types'

interface props {
  card: CardType
  onDone: () => void
}

const MatchSnackbar = ({card, onDone}: props) => {
  const [phase, setPhase] = useState('enter') // enter | show | exit

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('show'), 30)
    const t2 = setTimeout(() => setPhase('exit'), 1400)
    const t3 = setTimeout(() => onDone(), 1700)

    return () => { 
      clearTimeout(t1) 
      clearTimeout(t2) 
      clearTimeout(t3) 
    }
  }, [])

  const imgUrl = card.imageUrl

  const visible = phase === 'show'

  return (
     <div 
      style={{
        position: 'fixed',
        left: '50%',
        bottom: 64,  // above progress bar (~32px) with margin
        transform: visible
          ? 'translate(-50%, 0) scale(1)'
          : 'translate(-50%, 16px) scale(0.92)',
        opacity: visible ? 1 : 0,
        transition: 'transform 0.32s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.25s ease',
        zIndex: 500,
        pointerEvents: 'none',
      }}
    >
      <div 
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          background: 'linear-gradient(135deg, rgba(26,0,0,0.96) 0%, rgba(45,0,0,0.96) 100%)',
          border: '2px solid #FFD700',
          borderRadius: 30,
          padding: '8px 18px 8px 8px',
          boxShadow: '0 6px 24px rgba(255,215,0,0.3), 0 0 0 1px rgba(255,215,0,0.15)',
          backdropFilter: 'blur(8px)',
        }}
      >
        <div 
          style={{
            width: 40, height: 40,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #fff8f0, #fff3e0)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            border: '2px solid #FFD700',
            overflow: 'hidden',
          }}
        >
          <img
            src={imgUrl}
            alt=""
            style={{
              width: '90%', height: '90%',
              objectFit: 'contain',
              imageRendering: 'pixelated',
            }}
          />
        </div>
        <div 
          style={{ 
            display: 'flex', 
            flexDirection: 
            'column', 
            gap: 2 
          }}>
          <div style={{
            fontFamily: "'Press Start 2P', monospace",
            fontSize: 7,
            color: '#FFD700',
            letterSpacing: 2,
          }}>MATCH!</div>
          <div style={{
            fontFamily: "'Press Start 2P', monospace",
            fontSize: 11,
            color: '#fff',
            textShadow: '1px 1px 0 #CC0000',
          }}>{card.name}</div>
        </div>
        <div style={{
          fontSize: 16,
          marginLeft: 4,
          animation: 'sparkle 0.8s ease-in-out infinite',
        }}>✨</div>
      </div>
    </div>
  )
}

export default MatchSnackbar