import type { PokemonData, CardType } from '@/types'
import { useState, useEffect } from 'react'
import { fetchRandomPokemons } from '@api/pokemon'
import { shuffle } from '@utils/shuffle'
import { STEP_CONFIG } from '@/constants/gameConfig'

const toCards = (pokemon: PokemonData): CardType[] => [
  { id: `${pokemon.id}-a`, name: pokemon.name, pokemonId: pokemon.id, imageUrl: pokemon.imageUrl, isFlipped: false, isMatched: false },
  { id: `${pokemon.id}-b`, name: pokemon.name, pokemonId: pokemon.id, imageUrl: pokemon.imageUrl, isFlipped: false, isMatched: false },
]

export function usePokemon() {
  const [stepCards, setStepCards] = useState<CardType[][]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const initLoad = async () => {
    // const STEP_COUNTS = [2, 6, 10, 18]
    const STEP_COUNTS = STEP_CONFIG.map(el => el.pokemonCount)
    let cursor = 0

    try {
      setIsLoading(true)
      const data = await fetchRandomPokemons(33)

      const steps = STEP_COUNTS.map(count => {
        const slice = data.slice(cursor, cursor + count)
        cursor += count
        return slice
      })

      const cards = steps.map(stepPokemons => shuffle(stepPokemons.flatMap(toCards)))
      setStepCards(cards)
    } catch {
      setError(new Error('포켓몬 데이터를 불러오지 못했습니다.'))
    } finally {
      setIsLoading(false)
    }
  }
  
  useEffect(() => {
    initLoad()
  }, [])

  const handleResetCards = async () => {
    await initLoad()
  }

  return { 
    stepCards, 
    isLoading, 
    error, 
    handleResetCards 
  }
}
