import { useEffect, useState } from "react"
import { usePokemon } from "@/hooks/usePokemon"
import { useGameLogic } from "@/hooks/useGameLogic"
import Board from "@components/board/Board"
import { STEP_CONFIG } from '@constants/gameConfig'
import { useNavigate } from 'react-router-dom'

function GamePage() {
  const { stepCards, isLoading, error } = usePokemon()
  const { 
    state, 
    handleCardClick, 
    handleReset, 
    handleSkipStage, 
    handleActiveHint 
  } = useGameLogic(stepCards)
  const navigate = useNavigate()
  const currentStage = STEP_CONFIG[state.currentStep]

  useEffect(() => {
    if(!isLoading) {
      console.log('state: ', state)
    }
    
  }, [isLoading, state])

  return (
    <>
      {
        state.status === 'playing' ?
        <Board 
          cards={state.cards}
          state={state}
          stage={currentStage}
          onClickCard={handleCardClick}
          handleSkipStage={handleSkipStage}
          onHome={() => navigate('/')}
          handleActiveHint={handleActiveHint}
        /> : null
      }
    </>
  )
}

export default GamePage
