import type { PokemonData, CardType } from '@/types'
import { useState, useEffect } from 'react'
import { fetchRandomPokemons } from '@api/pokemon'
import { shuffle } from '@utils/shuffle'

const toCards = (pokemon: PokemonData): CardType[] => [
  { id: `${pokemon.id}-a`, name: pokemon.name, pokemonId: pokemon.id, imageUrl: pokemon.imageUrl, isFlipped: false, isMatched: false },
  { id: `${pokemon.id}-b`, name: pokemon.name, pokemonId: pokemon.id, imageUrl: pokemon.imageUrl, isFlipped: false, isMatched: false },
]

export function usePokemon() {
  const [stepCards, setStepCards] = useState<CardType[][]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const STEP_COUNTS = [2, 6, 10, 18]
    let cursor = 0

    const initLoad = async () => {
      try {
        setIsLoading(true)
        const data = await fetchRandomPokemons(36)

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

    initLoad()
  }, [])

  return { stepCards, isLoading, error }
}
