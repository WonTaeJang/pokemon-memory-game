// 게임의 유일한 페이지 컴포넌트
//
// 개발 항목:
// - useGameLogic, usePokemon 훅을 연결하는 최상위 컴포넌트
// - 게임 진행 중: GameInfo + Board 렌더링
// - 스텝 클리어 시: 다음 스텝으로 전환
// - 게임 클리어 / 게임 오버 시: 결과 화면 렌더링
//   - 결과 화면: 최종 점수, 스텝별 남은 횟수, 재시작 버튼

import { useEffect } from "react"
import { fetchRandomPokemons } from '@api/pokemon'

function GamePage() {
  useEffect(() => {
    fetchRandomPokemons(1).then((result) => {
      console.log(result)
    })
  }, [])

  return (
    <>
      <h1>hello world</h1>
    </>
  )
}

export default GamePage
