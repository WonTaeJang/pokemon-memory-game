// PokeAPI에서 포켓몬 데이터를 가져와 카드 배열을 생성하는 커스텀 훅
//
// 개발 항목:
// - 게임 시작 시 36마리 랜덤 포켓몬을 한 번에 fetch
// - 스텝별 포켓몬 분배: step1(2), step2(6), step3(10), step4(18)
// - 각 포켓몬을 2장씩 복제해 카드 쌍 생성
// - shuffle 유틸로 카드 순서 섞기
// - 상태: pokemonCards (스텝별 카드 배열), isLoading, error
