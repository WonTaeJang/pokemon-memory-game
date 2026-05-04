type PokeballType = 'pokeball' | 'superball' | 'hyperball' | 'masterball'

interface PokeballBackProps {
  type: PokeballType | string
  size?: number
}

function PokeballBack({ type, size = 120 }: PokeballBackProps) {
  if (type === 'pokeball') {
    return (
      <svg viewBox="0 0 120 120" width={size} height={size}>
        <circle cx="60" cy="60" r="58" fill="#CC0000" stroke="#111" strokeWidth="3"/>
        <rect x="2" y="55" width="116" height="10" fill="#111"/>
        <circle cx="60" cy="60" r="58" fill="none" stroke="#111" strokeWidth="3"/>
        <path d="M2 60 Q2 2 60 2 Q118 2 118 60Z" fill="#CC0000"/>
        <path d="M2 60 Q2 118 60 118 Q118 118 118 60Z" fill="#F5F5F5"/>
        <circle cx="60" cy="60" r="16" fill="#F5F5F5" stroke="#111" strokeWidth="3"/>
        <circle cx="60" cy="60" r="9" fill="#F5F5F5" stroke="#333" strokeWidth="2"/>
        <ellipse cx="42" cy="32" rx="8" ry="5" fill="rgba(255,255,255,0.35)" transform="rotate(-30,42,32)"/>
      </svg>
    )
  }
  if (type === 'superball') {
    return (
      <svg viewBox="0 0 120 120" width={size} height={size}>
        <circle cx="60" cy="60" r="58" fill="#1565C0" stroke="#111" strokeWidth="3"/>
        <rect x="2" y="55" width="116" height="10" fill="#111"/>
        <circle cx="60" cy="60" r="58" fill="none" stroke="#111" strokeWidth="3"/>
        <path d="M2 60 Q2 2 60 2 Q118 2 118 60Z" fill="#1565C0"/>
        <path d="M2 60 Q2 118 60 118 Q118 118 118 60Z" fill="#1E88E5"/>
        <circle cx="35" cy="38" r="5" fill="rgba(255,255,255,0.25)"/>
        <circle cx="55" cy="28" r="4" fill="rgba(255,255,255,0.2)"/>
        <circle cx="75" cy="38" r="5" fill="rgba(255,255,255,0.25)"/>
        <circle cx="85" cy="50" r="4" fill="rgba(255,255,255,0.2)"/>
        <circle cx="60" cy="60" r="16" fill="#F5F5F5" stroke="#111" strokeWidth="3"/>
        <circle cx="60" cy="60" r="9" fill="#E0E0E0" stroke="#333" strokeWidth="2"/>
        <ellipse cx="42" cy="32" rx="8" ry="5" fill="rgba(255,255,255,0.35)" transform="rotate(-30,42,32)"/>
      </svg>
    )
  }
  if (type === 'hyperball') {
    return (
      <svg viewBox="0 0 120 120" width={size} height={size}>
        <circle cx="60" cy="60" r="58" fill="#F57F17" stroke="#111" strokeWidth="3"/>
        <rect x="2" y="55" width="116" height="10" fill="#111"/>
        <path d="M2 60 Q2 2 60 2 Q118 2 118 60Z" fill="#F57F17"/>
        <path d="M2 60 Q2 118 60 118 Q118 118 118 60Z" fill="#212121"/>
        <path d="M20 25 Q60 5 100 25 L95 35 Q60 15 25 35Z" fill="#FFCA28" opacity="0.6"/>
        <path d="M15 40 Q60 18 105 40 L100 48 Q60 26 20 48Z" fill="#FFCA28" opacity="0.4"/>
        <circle cx="60" cy="60" r="16" fill="#F5F5F5" stroke="#111" strokeWidth="3"/>
        <circle cx="60" cy="60" r="9" fill="#FFCA28" stroke="#333" strokeWidth="2"/>
        <ellipse cx="42" cy="32" rx="8" ry="5" fill="rgba(255,255,255,0.35)" transform="rotate(-30,42,32)"/>
      </svg>
    )
  }
  if (type === 'masterball') {
    return (
      <svg viewBox="0 0 120 120" width={size} height={size}>
        <circle cx="60" cy="60" r="58" fill="#6A1B9A" stroke="#111" strokeWidth="3"/>
        <rect x="2" y="55" width="116" height="10" fill="#111"/>
        <path d="M2 60 Q2 2 60 2 Q118 2 118 60Z" fill="#6A1B9A"/>
        <path d="M2 60 Q2 118 60 118 Q118 118 118 60Z" fill="#4A148C"/>
        <text x="60" y="48" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="22" fontWeight="bold" fontFamily="serif">M</text>
        <circle cx="25" cy="25" r="3" fill="#CE93D8"/>
        <circle cx="95" cy="25" r="3" fill="#CE93D8"/>
        <circle cx="18" cy="50" r="2" fill="#CE93D8"/>
        <circle cx="102" cy="50" r="2" fill="#CE93D8"/>
        <path d="M25 25 L22 20 M25 25 L28 20 M25 25 L20 27 M25 25 L30 27" stroke="#CE93D8" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M95 25 L92 20 M95 25 L98 20 M95 25 L90 27 M95 25 L100 27" stroke="#CE93D8" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="60" cy="60" r="16" fill="#F5F5F5" stroke="#111" strokeWidth="3"/>
        <circle cx="60" cy="60" r="9" fill="#CE93D8" stroke="#6A1B9A" strokeWidth="2"/>
        <ellipse cx="42" cy="32" rx="8" ry="5" fill="rgba(255,255,255,0.35)" transform="rotate(-30,42,32)"/>
      </svg>
    )
  }
  return null
}

export default PokeballBack
