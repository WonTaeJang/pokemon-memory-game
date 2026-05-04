export interface PokemonData {
  id: number
  name: string
  imageUrl: string
}

export interface PokemonName {
  language: { name: string; url: string }
  name: string
}

export interface CardType {
  id: string
  name: string
  pokemonId: number
  imageUrl: string
  isFlipped: boolean
  isMatched: boolean
}

export interface StepConfig {
  step: number
  id: number
  rows: number
  cols: number
  pokemonCount: number
  maxFlips: number
  label: string
  ballType: string
  ballName: string
  ballColor: string
  difficulty: string
}

export type GameStatus = 'playing' | 'clear' | 'gameover' | 'ready'

export interface GameState {
  currentStep: number
  status: GameStatus
  remainingFlips: number
  totalScore: number
  cards: CardType[]
  flippedCards: CardType[]
  isChecking: boolean
}
