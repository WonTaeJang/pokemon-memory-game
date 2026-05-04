import type { CardType, StepConfig } from '@/types'
import { useState, useEffect } from 'react'
import PokeballBack from '../pokeball/PokeballBack'

interface Props {
  card: CardType,
  stage: StepConfig,
  onClick: (id: string) => void
  disabled: boolean
}

function Card({ card, stage, onClick, disabled }: Props) {
  const imgUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${card.pokemonId}.png`;
  const isVisible = card.isFlipped || card.isMatched
  const [popAnim, setPopAnim] = useState(false)

  // Trigger pop animation when card becomes matched
  useEffect(() => {
    if (card.isMatched) {
      setPopAnim(true)
      const t = setTimeout(() => setPopAnim(false), 400)
      return () => clearTimeout(t)
    }
  }, [card.isMatched])

  const isActive = !disabled && !card.isMatched && !card.isFlipped

  return (
    <div
      className={`card-scene${isActive ? ' active' : ''}`}
      onClick={() => isActive && onClick(card.id)}
      style={{ cursor: isActive ? 'pointer' : 'default' }}
    >
      <div className={[
        'card-inner',
        isVisible ? 'flipped' : '',
        popAnim ? 'matched-pop' : '',
      ].filter(Boolean).join(' ')}>

        {/* BACK FACE */}
        <div className="card-face card-back">
          <div style={{ width: '72%', height: '72%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <PokeballBack type={stage.ballType} size={999} />
          </div>
        </div>

        {/* FRONT FACE */}
        <div className={`card-face card-front${card.isMatched ? ' matched' : ''}`}>
          {card.isMatched && (
            <div style={{
              position: 'absolute', inset: 0,
              background: 'rgba(255,215,0,0.13)',
              borderRadius: 8,
              pointerEvents: 'none',
            }} />
          )}
          <img
            src={imgUrl}
            alt={`pokemon-${card.pokemonId}`}
            style={{
              width: '80%', height: '80%',
              objectFit: 'contain',
              imageRendering: 'pixelated',
              filter: 'drop-shadow(1px 2px 4px rgba(0,0,0,0.25))',
            }}
            draggable={false}
          />
          {card.isMatched && (
            <div style={{
              position: 'absolute', top: 4, right: 6,
              color: '#FFD700', fontSize: 12, fontWeight: 'bold',
              textShadow: '0 1px 3px rgba(0,0,0,0.5)',
            }}>✓</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Card
