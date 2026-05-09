# 포켓몬 카드 뒤집기 게임 
- 포켓몬 API 를 활용한 img set 
- claude design
- react + typescript + vite

## 폴더 구조

```
src/
├── api/
│   └── pokemon.ts          ← PokeAPI 호출 함수
│
├── components/
│   ├── card/
│   │   ├── Card.tsx
│   │   └── Card.css
│   ├── board/
│   │   ├── Board.tsx
│   │   └── Board.css
│   └── game-info/
│       └── GameInfo.tsx    ← 남은 횟수, 스텝 표시
│
├── pages/
│   └── game-page/
│       ├── GamePage.tsx
│       └── GamePage.css
│
├── hooks/
│   ├── useGameLogic.ts     ← 뒤집기, 매칭, 카운트 관리
│   └── usePokemon.ts       ← API 호출 + 카드 데이터 생성
│
├── types/
│   └── index.ts            ← CardType, GameState, StepConfig 등
│
├── utils/
│   └── shuffle.ts          ← 카드 섞기
│
├── constants/
│   └── gameConfig.ts       ← 스텝별 그리드/카운트 설정값
│
├── App.tsx
└── main.tsx
```

## game link
https://wontaejang.github.io/pokemon-memory-game

## todo
- css 파일로 분리하기 or tailwind 적용 
- 로딩창 띄우기
- progress bar 컴포넌트 분리하기
- 가로 세로 화면 비율에 따라서 row col 교차하기 
- 이로치 추가하기

## done
- 카드 뒤집은 갯수 만큼 점수 부여하기 
- 다시 시작시 time 리셋 안되는 문제 
- 카드 뒤집기 성공시 포켓몬 이름 노출
- 이미지 확대 하기
- 처음 뒤집고 두번쨰 뒤집기 전까지는 전구 비활성화 시키기 
- 힌트 시간 늘리기
- 다시시작시 이미지 교체 및 셔플 되는지 확인하기
- 마지막 클리어시 highlight 안되는 현상 
- 포켓몬 번호 불러와서 localstorage에 저장하기
- 시작시 hint 
- 카드 터치시 파란색 영역 (드래그) 안되게 수정하기
- 아이폰일때 animation이 정상동작하지 않는 이슈 