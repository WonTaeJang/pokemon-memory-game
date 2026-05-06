import type { StepConfig } from '@/types'

export const STEP_CONFIG: StepConfig[] = [
  { 
    step: 1, 
    rows: 2, 
    cols: 2, 
    pokemonCount: 2,  
    maxFlips: 4,
    id: 1,
    label: "STAGE 1",
    ballType: "pokeball",
    ballName: "몬스터볼",
    ballColor: "#E53935",
    difficulty: "EASY",
  },
  { 
    step: 2, 
    rows: 4, 
    cols: 3, 
    pokemonCount: 6,  
    maxFlips: 10,
    id: 2,
    label: "STAGE 2",
    ballType: "superball",
    ballName: "슈퍼볼",
    ballColor: "#1565C0",
    difficulty: "NORMAL",
  },
  { 
    step: 3, 
    rows: 5, 
    cols: 4, 
    pokemonCount: 10, 
    maxFlips: 20,
    id: 3,
    label: "STAGE 3",
    ballType: "hyperball",
    ballName: "하이퍼볼",
    ballColor: "#F9A825",
    difficulty: "HARD",
  },
  { 
    step: 4, 
    rows: 6, 
    cols: 5, 
    pokemonCount: 15, 
    maxFlips: 30,
    id: 4,
    label: "STAGE 4",
    ballType: "masterball",
    ballName: "마스터볼",
    ballColor: "#6A1B9A",
    difficulty: "MASTER",
  },
]

export const TOTAL_STEPS = 4
export const FLIP_DELAY_MS = 1000
export const HINT_COUNT = 3