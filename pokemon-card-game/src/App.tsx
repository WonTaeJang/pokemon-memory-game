import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from '@pages/home-page/HomePage'
import GamePage from '@pages/game-page/GamePage'

function App() {
  return (
    <BrowserRouter basename="/pokemon-memory-game">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/game" element={<GamePage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
