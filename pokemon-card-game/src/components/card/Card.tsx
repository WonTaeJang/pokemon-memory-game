import type { CardType, StepConfig } from '@/types'
import { useState, useEffect } from 'react'
import PokeballBack from '../pokeball/PokeballBack'
import './Card.css'

interface Props {
  card: CardType,
  stage: StepConfig,
  onClick: (id: string) => void
  disabled: boolean
}

function Card({ card, stage, onClick, disabled }: Props) {
  const imgUrl = card.imageUrl
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

  const frontCardSize = 80 + (10 * (stage.step - 1))
  const isActive = !disabled && !card.isMatched && !card.isFlipped

  return (
    <div
      className={[
        'card-scene', 
        isActive ? 'active' : '', 
        popAnim ? 'matched-pop' : ''
      ].filter(Boolean).join(' ')}
      onClick={() => isActive && onClick(card.id)}
    >
      <div className={`card-inner${isVisible ? ' flipped' : ''}`}>

        {/* BACK FACE */}
        <div className="card-face card-back">
          <div className="card-back-content">
            <PokeballBack type={stage.ballType} size={999} />
          </div>
        </div>

        {/* FRONT FACE */}
        <div className={`card-face card-front${card.isMatched ? ' matched' : ''}`}>
          {card.isMatched && <div className="card-matched-overlay" />}
          <img
            src={imgUrl}
            alt={`pokemon-${card.pokemonId}`}
            className="card-pokemon-img"
            style={{ width: `${frontCardSize}%`, height: `${frontCardSize}%` }}
            draggable={false}
          />
          {card.isMatched && <div className="card-matched-badge">✓</div>}
        </div>
      </div>
    </div>
  )
}

export default Card
