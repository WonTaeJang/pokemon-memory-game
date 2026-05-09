import type { PokemonData, PokemonName } from '@/types/index'

const BASE_URL = 'https://pokeapi.co/api/v2'
const POKEMON_MAX_ID = 1025 // 모든 포켓몬
const IMG_URL = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/'
const IMG_SHINY_URL = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/'
const CACHE_KEY = 'pokemon_cache'

type PokemonCache = Record<number, PokemonData>

function loadCache(): PokemonCache {
  try {
    return JSON.parse(localStorage.getItem(CACHE_KEY) || '{}')
  } catch {
    return {}
  }
}

function saveCache(cache: PokemonCache): void {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(cache))
  } catch { /* localStorage unavailable */ }
}

function getRandomUniqueIds(count: number, max: number): number[] {
  const ids = new Set<number>()
  while (ids.size < count) {
    ids.add(Math.floor(Math.random() * max) + 1)
  }
  return Array.from(ids)
}

async function fetchPokemon(id: number, cache: PokemonCache): Promise<PokemonData> {
  if (cache[id]) {
    return cache[id]
  }

  const res = await fetch(`${BASE_URL}/pokemon-species/${id}`)
  if (!res.ok) throw new Error(`포켓몬 ${id}번 fetch 실패`)
  const data = await res.json()

  const pokemon: PokemonData = {
    id: data.id,
    name: data.names.find((el: PokemonName) => el.language.name === 'ko').name,
  }

  cache[id] = pokemon
  saveCache(cache)

  return pokemon
}

export async function fetchRandomPokemons(count: number): Promise<PokemonData[]> {
  const ids = getRandomUniqueIds(count, POKEMON_MAX_ID)
  const cache = loadCache()
  return Promise.all(ids.map(id => fetchPokemon(id, cache)))
}
