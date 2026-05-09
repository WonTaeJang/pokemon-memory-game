const IMG_URL = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/'
const IMG_SHINY_URL = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/'

export function getImgUrl (id: number, shiny: boolean) {
  if(id) {
    return `${shiny ? IMG_SHINY_URL : IMG_URL}${id}.png`
  }

  return undefined
} 