import './GamePage.css'
import Board from "@components/board/Board"
import FinalResultOverlay from "@components/overlay/FinalResultOverlay"
import MatchSnackbar from "@components/snackbar/MatchSnackbar"
import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'
import { usePokemon } from "@/hooks/usePokemon"
import { useGameLogic } from "@/hooks/useGameLogic"
import { STEP_CONFIG } from '@constants/gameConfig'
import { getBestScore, setBestScore } from '@/utils/storage'

function GamePage() {
  const { 
    stepCards, 
    handleResetCards,
    isLoading 
  } = usePokemon()
  const { 
    state, 
    handleCardClick, 
    handleReset, 
    handleSkipStage, 
    handleActiveHint,
    matchedCard, 
    clearMatchedCard,
  } = useGameLogic(stepCards)
  const navigate = useNavigate()
  const currentStage = STEP_CONFIG[state.currentStep]

  useEffect(() => {
    if (state.status === 'clear' || state.status === 'gameover') {
      if (state.totalScore > getBestScore()) {
        setBestScore(state.totalScore)
      }
    }
  }, [state.status, state.totalScore])

  // timer
  const [time, setTimer] = useState(0)

  useEffect(() => {
    if(!isLoading) {
      console.log('state: ', state)
    }
    
  }, [isLoading, state])

  // timer tick
  useEffect(() => {
    if (state.status !== 'playing') return
    const id = setInterval(() => setTimer(t => t + 1), 1000)
    return () => clearInterval(id)
  }, [state.status])

  const onClickRetry = async () => {
    await handleResetCards()
    handleReset()
    setTimer(0)
  }

  if (state.status === 'clear' || state.status === 'gameover') {
    const storedBest = getBestScore()
    const bestScore = Math.max(storedBest, state.totalScore)
    return (
      <div className="result-screen">
        <FinalResultOverlay
          totalScore={state.totalScore}
          bestScore={bestScore}
          status={state.status}
          stageScores={state.stageScores}
          onHome={() => navigate('/')}
          onRetry={onClickRetry}
        />
      </div>
    )
  }

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
          time={time}
        /> : null
      }

      {/* Match snackbar */}
      {matchedCard && (
        <MatchSnackbar
          card={matchedCard}
          onDone={clearMatchedCard}
        />
      )}
    </>
  )
}

export default GamePage
