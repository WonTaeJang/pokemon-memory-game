// 게임 핵심 로직을 담당하는 커스텀 훅
//
// 개발 항목:
// - 상태: cards, flippedCards (현재 뒤집힌 2장), remainingFlips, currentStep, totalScore
// - handleCardClick: 카드 클릭 시 최대 2장까지 뒤집기
// - 매칭 성공: isMatched = true, flippedCards 초기화 (카운트 소모 없음)
// - 매칭 실패: 1초 후 카드 원복, remainingFlips -1
// - remainingFlips === 0: 게임 오버
// - 모든 카드 matched: 스텝 클리어, totalScore += remainingFlips
// - resetGame: 전체 게임 초기화
