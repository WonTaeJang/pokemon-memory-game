const BEST_SCORE_KEY = 'pokemon_best_score'

export function getBestScore(): number {
  try {
    return parseInt(localStorage.getItem(BEST_SCORE_KEY) || '0', 10)
  } catch {
    return 0
  }
}

export function setBestScore(score: number): void {
  try {
    localStorage.setItem(BEST_SCORE_KEY, String(score))
  } catch { /* localStorage unavailable */ }
}
