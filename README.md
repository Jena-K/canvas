# canvas

김용훈 포트폴리오 사이트. Astro 정적 사이트이고, `main`에 머지하면 GitHub Pages(https://jena-k.github.io/canvas/)로 배포된다.

작업 계획과 기록은 `docs/portfolio-redesign-plan.md`에 있다.

## 명령

| 명령 | 하는 일 |
| --- | --- |
| `pnpm dev` | 개발 서버 (`localhost:4321/canvas/`) |
| `pnpm build` | `dist/`에 빌드 |
| `pnpm preview` | 빌드 결과 미리보기 |
| `pnpm check` | 타입 검사 |
| `pnpm check:links` | 빌드된 페이지의 내부 링크 검사 |
| `pnpm check:font` | 빌드된 페이지의 글자가 모두 Pretendard 부분 집합에 있는지 검사 |

## 문구를 고친 뒤

한국어 문구나 프로젝트 제목·소개를 바꾸면 아래 두 스크립트를 다시 돌리고 결과 파일을 함께 커밋한다.

| 바꾼 것 | 명령 | 만드는 파일 |
| --- | --- | --- |
| 한국어 문구 | `uv run --with fonttools --with brotli python scripts/subset-font.py` | `public/fonts/pretendard-subset.*` |
| 프로필 제목, 프로젝트 `title`·`tagline` | `uv run --with pillow python scripts/og-images.py` | `public/og/*.png` |

`pnpm check:font`가 실패하면 첫 번째 스크립트를 돌리면 된다.

## 내용 원본

프로젝트 문장은 resume 저장소의 `resume_build/sections/05_projects.md`에서 그대로 옮긴다. 이 저장소에서 문장을 새로 쓰지 않는다.
