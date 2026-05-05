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

## todo
- css 파일로 분리하기 or tailwind 적용 
- 로딩창 띄우기
- 카드 뒤집기 성공시 포켓몬 이름 노출
- 포켓몬 번호 불러와서 localstorage에 저장하기

## done
- 카드 뒤집은 갯수 만큼 점수 부여하기 
- 다시 시작시 time 리셋 안되는 문제 