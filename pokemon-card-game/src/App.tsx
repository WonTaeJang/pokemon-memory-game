import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import GamePage from '@pages/game-page/GamePage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/game" replace />} />
        <Route path="/game" element={<GamePage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
