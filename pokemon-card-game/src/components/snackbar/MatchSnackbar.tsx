import { useEffect, useState } from "react"
import type { CardType } from '@/types'
import { getImgUrl } from "@/utils/img"
import './MatchSnackbar.css'

interface props {
  card: CardType
  onDone: () => void
}

const MatchSnackbar = ({ card, onDone }: props) => {
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

  const visible = phase === 'show'
  const cardImgUrl = getImgUrl(card.pokemonId, card.isShiny)

  return (
    <div className={`snackbar-root${visible ? ' snackbar-root--visible' : ''}`}>
      <div className="snackbar-card">
        <div className="snackbar-avatar">
          <img src={cardImgUrl} alt="" />
        </div>
        <div className="snackbar-text">
          <div className="snackbar-label">MATCH!</div>
          <div className="snackbar-name">{card.name}</div>
        </div>
        {
          card.isShiny ? 
          <div className="snackbar-sparkle">✨</div>
          : null
        }
      </div>
    </div>
  )
}

export default MatchSnackbar
