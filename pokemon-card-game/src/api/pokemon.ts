import type { PokemonData, PokemonName } from '@/types/index'

const BASE_URL = 'https://pokeapi.co/api/v2'
const POKEMON_MAX_ID = 1025 // 모든 포켓몬
const IMG_URL = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/'

function getRandomUniqueIds(count: number, max: number): number[] {
  const ids = new Set<number>()
  while (ids.size < count) {
    ids.add(Math.floor(Math.random() * max) + 1)
  }
  return Array.from(ids)
}

async function fetchPokemon(id: number): Promise<PokemonData> {
  const res = await fetch(`${BASE_URL}/pokemon-species/${id}`)
  if (!res.ok) throw new Error(`포켓몬 ${id}번 fetch 실패`)
  const data = await res.json()

  return {
    id: data.id,
    name: data.names.find((el: PokemonName) => el.language.name === 'ko').name,
    imageUrl: `${IMG_URL}${id}.png`
  }
}

export async function fetchRandomPokemons(count: number): Promise<PokemonData[]> {
  const ids = getRandomUniqueIds(count, POKEMON_MAX_ID)
  return Promise.all(ids.map(fetchPokemon))
}
