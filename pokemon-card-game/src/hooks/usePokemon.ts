import type { PokemonData, CardType } from '@/types'
import { useState, useEffect } from 'react'
import { fetchRandomPokemons } from '@api/pokemon'
import { shuffle } from '@utils/shuffle'
import { STEP_CONFIG } from '@/constants/gameConfig'

const toCards = (pokemon: PokemonData): CardType[] => [
  { 
    id: `${pokemon.id}-a`, 
    name: pokemon.name, 
    pokemonId: pokemon.id, 
    isFlipped: false, 
    isMatched: false,
    isShiny: false,
  },
  { 
    id: `${pokemon.id}-b`, 
    name: pokemon.name, 
    pokemonId: pokemon.id, 
    isFlipped: false, 
    isMatched: false,
    isShiny: false,
  },
]

export function usePokemon() {
  const [stepCards, setStepCards] = useState<CardType[][]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const initLoad = async () => {
    // const STEP_COUNTS = [2, 6, 10, 18]
    const STEP_COUNTS = STEP_CONFIG.map(el => el.pokemonCount)
    const TOTAL_COUNTS = STEP_CONFIG.reduce((acc, cur) => acc + cur.pokemonCount, 0)
    let cursor = 0
    let pokemonList:Array<PokemonData> = []

    try {
      setIsLoading(true)
      const [ data ] = await Promise.all([
        fetchRandomPokemons(TOTAL_COUNTS),
        new Promise(resolve => setTimeout(resolve, 2000)),
      ])

      pokemonList = data
      
      const steps = STEP_COUNTS.map(count => {
        const slice = pokemonList.slice(cursor, cursor + count)
        cursor += count
        return slice
      })
      
      const shinyId = pokemonList[Math.floor(Math.random() * pokemonList.length)].id
      const cards = steps.map(stepPokemons =>
        shuffle(stepPokemons.flatMap(toCards)).map(card =>
          card.pokemonId === shinyId ? { ...card, isShiny: true } : card
        )
      )

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
