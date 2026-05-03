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