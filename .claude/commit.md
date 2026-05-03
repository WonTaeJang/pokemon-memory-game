# Commit Prompt

지금까지 작업한 내용을 git commit 해줘.

## 규칙
- 변경된 파일 확인 후 관련 파일만 스테이징
- 민감한 파일(.env 등)은 제외
- 커밋 메시지에 Co-Authored-By 등 AI 관련 문구 포함 금지

## 커밋 메시지 형식
<type>(<scope>): <제목>

<본문 - 변경 이유나 주요 내용, 선택사항>

## 컨벤션
- 제목은 50자 이내
- 제목 끝에 마침표 금지
- 본문이 필요한 경우 제목과 빈 줄로 구분
- 본문 각 줄은 72자 이내
- 본문은 변경한 내용보다 **이유**를 중심으로 작성
- 하나의 커밋엔 하나의 논리적 변경만 포함 (Atomic commit)

## type 기준
- feat: 새 기능
- fix: 버그 수정
- chore: 설정, 패키지
- docs: 문서
- style: CSS/스타일
- refactor: 코드 구조 변경

## 예시
feat(card): 카드 뒤집기 애니메이션 추가
chore: vite + react-ts 프로젝트 초기 설정
docs: 게임 규칙 문서 추가
