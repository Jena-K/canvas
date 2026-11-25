# 포트폴리오 개편 계획

작성일: 2026-11-25 · 상태: ✅ active · 실행: 사용자 승인 후 시작

## 바뀌는 것

`canvas`는 지금 Astro 블로그 템플릿 그대로다. 예시 글 5개, 플레이스홀더 이미지 6장, Atkinson 폰트가 들어 있다.
이 계획을 마치면 `canvas`는 `sections/05_projects.md`의 대표 프로젝트 3개(Genvas, Tynt, AI Agent 개발 오케스트레이션)와 경력을 보여 주는 한국어 포트폴리오가 된다.
에너닷 VPP는 `sections/`에 프로젝트 항목이 없고 경력(`02_experience.md`)에만 있다. 상세 페이지로 만들려면 resume 저장소의 `sections/`에 먼저 프로젝트를 추가해야 한다.
디자인은 kovalseo.com의 패턴을 참고한다. 로고, 문구, 그림, 스크립트는 가져오지 않고, 레이아웃 문법만 가져온다.

## 레퍼런스에서 가져올 패턴

2026-11-25에 kovalseo.com을 1512×873 뷰포트로 캡처해 분석했다. 캡처는 `.scratch/ref-kovalseo/`에 있다.
Awwwards 기록은 Nominee(2026-11-19), 제작 Koval Web · Specia1ne, 기술 GSAP · TypeScript · Astro다.

| 패턴 | kovalseo에서 본 것 | canvas에 쓰는 곳 |
| --- | --- | --- |
| 색 | 흰 바탕, 먹색 `#111110`, 회색 `#656561`·`#3a3a38`, 옅은 점 격자 바탕 | 전역 토큰 |
| 글꼴 | 본문·제목 Instrument Sans, 라벨 IBM Plex Mono | 라틴 글꼴은 같은 계열, 한글 글꼴은 PR 0에서 정한다 |
| 내비게이션 | `/ how-it-works` 같은 슬래시 + 모노 글꼴 태그 버튼, 검은 칸 + 흰 칸 | 상단 고정 헤더 |
| 히어로 | 검은 칩 + 자간 넓은 모노 대문자 한 줄 + 아주 큰 굵은 제목, 오른쪽 열에 요약 3줄 | 홈 첫 화면 |
| 점 래스터 타이포 | 큰 문구를 점으로 그린 캔버스 효과(`Raster.astro`) | 홈 히어로 아래 한 줄 |
| 스크롤 레일 | 오른쪽 끝 세로 진행 표시 | 프로젝트 상세 |
| 목차 + 개수 | rulebook 페이지의 고정 카테고리 목록과 규칙 개수 | 프로젝트 목록, 프로젝트 상세의 과제 목차 |
| 점선 박스 다이어그램 | 점선 테두리, 검은 라벨 칸 | 과제 설명 안의 작은 도식 |
| 전환 | 고정 헤더 아래 페이지 전환. 스크롤에 따라 그림이 바뀌는 연출은 우리 그림이 정적 도식이라 넣지 않는다 | PR 6 |

## 결정이 필요한 것

계획은 아래 기본값으로 썼다. 다르게 정하면 해당 PR만 바뀐다.

| 항목 | 기본값 | 근거 |
| --- | --- | --- |
| 콘텐츠 원본 | `resume/resume_build/sections/*.md` | resume 저장소의 SSOT다. `writing_guide_sample/`은 근거 없는 예시 문장을 허용하는 교육용 샘플이라 공개 포트폴리오의 원본으로 쓰지 않는다. |
| 주소 | 지금 주소(`jena-k.github.io/canvas/`) 유지, 이전은 PR 8 | 저장소 이름 변경은 외부로 보이는 변경이라 따로 승인받는다. `src/utils/url.ts` 덕분에 이전 비용은 `astro.config.mjs`의 `base` 한 줄이다. |
| 블로그 | 삭제 | 지금 쓴 글이 없다. 글을 쓰기 시작할 때 컬렉션을 다시 추가한다. |
| 언어 | 한국어만 | 지원 대상이 국내 채용이다. |
| 다이어그램 | 결정됨(2026-11-25). 프로젝트 상세 페이지에 싣되 PNG는 쓰지 않고 사이트 디자인으로 다시 그린다 | 사용자 결정. 원본(`resume/resume_build/diagrams/`)은 내용 근거로만 쓴다. |

## PR 목록과 의존 관계

PR은 아래 순서로 머지한다. `main`에 머지하면 GitHub Actions가 바로 배포한다.

```text
PR 0  프로토타입 (머지 없음, 버리는 코드)
  └─ PR 1  템플릿 걷어내기 + 링크 검사 스크립트
       ├─ PR 2  디자인 토큰 + 기본 레이아웃
       │    ├─ PR 3  콘텐츠 모델 + 프로젝트 상세 1개
       │    │    ├─ PR 4  홈
       │    │    └─ PR 5  나머지 프로젝트 2개 + 다이어그램 다시 그리기
       │    └─ PR 6  모션 (PR 4 이후)
       │         └─ PR 7  모바일 · 접근성 · SEO · 성능 (PR 5 이후)
       └─ PR 8  루트 주소 이전 (선택, 아무 때나)
```

| PR | 기다리는 PR | 수정 범위 | 사용자 리뷰 후 머지 |
| --- | --- | --- | --- |
| 0 | 없음 | `.scratch/proto/`만 | 예, 방향 선택 |
| 1 | 0 | `src/content/blog/`, `src/pages/`, `src/layouts/`, `src/assets/`, `src/consts.ts`, `astro.config.mjs`, `scripts/check-links.mjs`, `package.json` | 아니오 |
| 2 | 1 | `src/styles/`, `src/components/`, `src/layouts/Base.astro`, `astro.config.mjs`의 `fonts`, `src/assets/fonts/` | 예 |
| 3 | 2 | `src/content.config.ts`, `src/content/projects/genvas.mdx`, `src/utils/project.ts`, `src/pages/projects/[slug].astro`, `src/components/TaskIndex.astro` | 아니오 |
| 4 | 3 | `src/pages/index.astro`, `src/components/Hero.astro`, `src/components/ProjectIndex.astro`, `src/data/profile.ts`, `src/styles/global.css` | 예 |
| 5 | 3 | `src/content/projects/*.mdx`, `src/components/diagram/`, `src/pages/projects/[slug].astro` | 예, 그림과 내용 |
| 6 | 4 | `src/scripts/`, `src/components/Raster.astro`, `TaskIndex.astro`, `src/layouts/Base.astro`, `src/pages/`, `global.css` (의존성 추가 없음) | 예 |
| 7 | 5, 6 | `src/components/BaseHead.astro`, `public/`, 각 컴포넌트의 반응형 스타일 | 아니오 |
| 8 | 1 | `astro.config.mjs`, GitHub 저장소 이름 | 예, 외부 변경 |

PR 4와 PR 5는 서로 다른 파일만 고치므로 동시에 진행할 수 있다.

## 검증 방식

모든 PR은 세 칸을 다 채워야 검증된 것으로 본다.

- 단위: `pnpm astro check`, `pnpm build`, `node scripts/check-links.mjs`가 모두 통과한다.
- 실물: ego-browser `AI` 프로필로 `pnpm preview` 화면을 연다. 1512×873과 390×844 두 크기에서 PR마다 적은 시나리오를 실행하고 캡처를 `.scratch/verify/pr-N/`에 남긴다.
- 성능: 홈의 JS 전송량과 Lighthouse 성능 점수를 잰다. 기준값은 PR 1에서 `main`을 먼저 잰다. 2026-11-25 현재 `dist/`의 JS는 0 KB다(측정).

---

## PR 0. 프로토타입으로 시각 방향 정하기

kovalseo의 글꼴은 한글이 없다. 한글 제목이 큰 글씨에서 어떻게 보이는지가 이 디자인의 성패를 가른다. 그래서 코드를 쓰기 전에 정한다.

- [x] 의존: 없음
- [x] 수정 파일: `.scratch/proto/index.html`, `.scratch/proto/compare.html`. 프로덕션 코드는 건드리지 않았다.
- [x] 만든 것: 히어로, 점 래스터 한 줄, 프로젝트 목록을 정적 HTML 한 장에 넣었다. 키 1~4로 변형을, 키 L로 Lenis 부드러운 스크롤을 켜고 끈다.
  - 변형 A: Pretendard + IBM Plex Mono
  - 변형 B: IBM Plex Sans KR + IBM Plex Mono
  - 변형 C: Wanted Sans(제목) + Pretendard(본문) + JetBrains Mono
  - 변형 D: Instrument Sans(라틴) + Pretendard(한글) + IBM Plex Mono. 계획에 없던 변형으로, 레퍼런스와 가장 가깝다.
- [x] 보이는 결과: `.scratch/proto/shots/`에 캡처 13장(1512 폭 히어로·목록 8장, 390 폭 히어로 4장, 비교표 `compare-hero.png` 1장)
- [x] 검증: 사용자가 2026-11-25에 변형 D를 골랐다.

프로토타입에서 확인한 것(2026-11-25, 측정):

- 점 래스터 한글은 1512 폭, 글자 높이 약 110px, 점 간격 4px에서 획이 뭉개지지 않는다. 네 변형 모두 같다.
- 390 폭에서 네 변형 모두 가로 넘침이 없다(`scrollWidth` 390 = `innerWidth` 390). 히어로 제목은 세 줄이 된다.
- 모노 글꼴 라벨 안의 한글은 단어 사이가 넓게 벌어진다. 모노 글꼴의 공백 폭이 한글 사이에 그대로 들어가기 때문이다. 자간을 넓힌 모노 대문자 줄에 한글을 넣으면 같은 문제가 더 커진다.
- 390 폭에서 헤더 태그 6개가 세 줄을 차지한다.

## PR 1. 템플릿 걷어내기

새 디자인을 얹기 전에 블로그 템플릿을 먼저 지운다. 남은 사이트는 이름과 "준비 중" 한 줄만 보여 준다.

- [x] 의존: PR 0
- [x] 수정 파일: 위 표의 PR 1 범위. `src/components/Header.astro`, `HeaderLink.astro`, `Footer.astro`, `src/content.config.ts`도 지웠다. 셋 다 Astro 공식 계정 링크가 든 템플릿이고 PR 2와 PR 3에서 새로 만든다.
- [ ] 바꾸는 것
  - 삭제: `src/content/blog/` 5개, `src/pages/blog/`, `src/pages/about.astro`, `src/pages/rss.xml.js`, `src/layouts/BlogPost.astro`, `src/components/FormattedDate.astro`, `src/assets/blog-placeholder-*.jpg` 6개, `src/assets/fonts/atkinson-*`, `@astrojs/rss` 의존성
  - `src/consts.ts`의 `SITE_TITLE`, `SITE_DESCRIPTION`을 실제 값으로 바꾼다.
  - `astro check`용으로 `@astrojs/check`와 `typescript@6`을 개발 의존성에 추가한다. `astro check`는 TypeScript 7을 지원하지 않는다(측정).
  - `scripts/check-links.mjs`를 추가한다. `dist/`의 모든 HTML에서 내부 링크와 이미지 경로를 모아, `base`를 붙인 경로에 파일이 있는지 확인한다. 없으면 0이 아닌 코드로 끝난다.
- [ ] 보이는 결과: `jena-k.github.io/canvas/`에 이름과 한 줄만 보인다. `/canvas/blog/`는 404다.
- [ ] 검증
  - [x] 단위: 세 명령이 통과한다. `dist/index.html`에 깨진 링크 3개와 정상 링크 2개를 넣으면 `check-links.mjs`가 3개를 보고하고 코드 1로 끝난다.
  - [x] 실물: 1512 폭과 390 폭에서 홈이 열리고 콘솔 오류가 0개, 가로 넘침이 없다. `/canvas/blog/`와 `/canvas/rss.xml`은 404다. 캡처는 `.scratch/verify/pr-1/`에 있다.
  - [x] 성능: Lighthouse 12 데스크톱 프리셋으로 홈을 쟀다.

    | 측정 | 성능 | 접근성 | JS | 글꼴 | 전체 |
    | --- | --- | --- | --- | --- | --- |
    | 기준(`main`, c3882c4) | 100 | 100 | 0 B | 47.2 KB | 53.4 KB |
    | PR 1 | 100 | 100 | 0 B | 0 B | 3.0 KB |

## PR 2. 디자인 토큰과 기본 레이아웃

움직임 없이 정적인 뼈대만 만든다. 이후 모든 페이지가 이 레이아웃을 쓴다.

- [x] 의존: PR 1
- [x] 수정 파일: `src/styles/global.css`, `src/components/Tag.astro`, `Header.astro`, `Footer.astro`, `src/layouts/Base.astro`, `src/pages/index.astro`, `package.json`
- [ ] 바꾸는 것
  - `src/styles/global.css`: 색(`--ink`, `--ink-2`, `--muted`, `--paper`), 점 격자 바탕, 글꼴 변수, 글자 크기 단계, 여백 단위. 파일을 따로 두지 않고 BaseHead가 이미 불러오는 `global.css`에 둔다. 12열 그리드는 쓰는 곳이 생기는 PR 4에서 정한다.
  - 글꼴: 변형 D. `font-family: "Instrument Sans Variable", "Pretendard Variable"` 순서로 두어 라틴은 Instrument Sans, 한글은 Pretendard가 그린다. 라벨은 IBM Plex Mono. 셋 다 OFL이다. Astro `fonts` 설정 대신 npm 패키지(`@fontsource-variable/instrument-sans`, `@fontsource/ibm-plex-mono`, `pretendard`)의 CSS를 import해 Vite가 직접 호스팅한다. Fontsource의 Pretendard는 라틴 서브셋만 있어서, 한글을 92개 조각으로 나눈 `pretendard` 패키지의 dynamic subset CSS를 쓴다.
  - `Header.astro`: 슬래시 태그 내비게이션(`/ projects`, `/ about`, `/ contact`, 오른쪽에 `/ github`). `/ resume.pdf`는 PDF 위치를 정하는 PR 7에서 넣는다. `/ projects` 등은 PR 4에서 생길 홈 구역 앵커라 그 전까지는 이동할 곳이 없다.
  - 390 폭에서는 헤더 태그를 `/ menu` 버튼 하나로 접는다. JS 번들 없이 `<details>`로 만들고, 링크를 누르면 닫는 인라인 스크립트 한 줄만 둔다. PR 0에서 태그 6개가 세 줄을 차지했다.
  - 모노 글꼴은 라틴 라벨에만 쓴다. 한글 라벨은 본문 글꼴로 쓰고 자간을 넓히지 않는다. PR 0에서 모노 글꼴 안의 한글 단어 사이가 벌어졌다.
  - `Footer.astro`, `Base.astro` 레이아웃, `Tag.astro`(검은 칸 + 흰 칸 태그 버튼). 푸터의 연락처는 이메일 공개 여부를 정하는 PR 4에서 넣고, 지금은 GitHub만 둔다.
- [ ] 보이는 결과: 홈에 헤더, 빈 본문, 푸터가 레퍼런스와 같은 비율로 보인다.
- [x] 검증
  - [x] 단위: 세 명령 통과(`astro check` 오류 0, 내부 링크 14개 정상)
  - [x] 실물: 1512 폭에서 첫 태그가 x=80, y=36, 높이 24로 kovalseo 캡처와 같고, 태그 간격은 15~17px로 레퍼런스의 16px과 1px 안에서 맞는다. 390 폭에서 헤더는 `/ menu`와 이름 한 줄(높이 76px)이다. 메뉴를 열면 링크 4개가 보이고, 링크를 누르면 메뉴가 닫히며 주소에 `#projects`가 붙는다. Tab 두 번이면 `/projects`에 실선 포커스 테두리가 보인다. 콘솔 오류 0개, 가로 넘침 없음. 캡처는 `.scratch/verify/pr-2/`에 있다.
  - [x] 성능: Lighthouse 12, 홈

    | 측정 | 성능 | 접근성 | JS | 글꼴 | 전체 | LCP |
    | --- | --- | --- | --- | --- | --- | --- |
    | PR 1 (데스크톱) | 100 | 100 | 0 B | 0 B | 3.0 KB | |
    | PR 2 (데스크톱) | 100 | 100 | 0 B | 156.3 KB, 6개 | 176.1 KB | 0.5 s |
    | PR 2 (모바일 기본 프리셋) | 100 | 100 | 0 B | 156.3 KB, 6개 | 176.1 KB | 1.3 s |

    글꼴 내역은 IBM Plex Mono 14.7 KB, Instrument Sans 29.7 KB, Pretendard 조각 4개 108.3 KB다. 한글 약 20자에 Pretendard 조각 4개를 받는다. 본문이 늘어나는 PR 4에서 다시 잰다.
- [ ] 사용자 리뷰 후 머지

## PR 3. 콘텐츠 모델과 프로젝트 상세 1개

데이터 모양을 먼저 정하고, Genvas 하나로 끝까지 통하는지 확인한다.

- [x] 의존: PR 2
- [x] 수정 파일: `src/content.config.ts`, `src/content/projects/genvas.mdx`, `src/utils/project.ts`, `src/pages/projects/[slug].astro`, `src/components/TaskIndex.astro`, `src/styles/global.css`
- [x] 바꾸는 것
  - `projects` 컬렉션 스키마. 필드는 `title`, `tagline`, `summary`, `company`, `role`, `period`(`YYYY-MM`), `stack`, `order`다.
  - 과제 구조는 원문을 따른다. 처음 계획한 문제·원인·해결·결과 네 칸은 버렸다. `sections/05_projects.md`의 과제마다 네 칸이 다 있지 않아서, 네 칸을 채우려면 원문에 없는 문장을 지어내야 하기 때문이다.
    - `##` 영역(원문의 `✅ 기여 — 영역`)
    - `###` 과제(원문의 번호 항목, 문장 그대로)
    - bullet은 원문 그대로 옮긴다. 굵은 글씨가 든 bullet은 결과로 보고 검은 네모 표시를 붙인다.
  - 목차는 frontmatter에 두지 않고 `render()`가 돌려주는 `headings`에서 `taskGroups()`로 뽑는다. 원본이 하나라서 목차와 본문이 어긋나지 않는다.
  - 원문의 `<!-- ev: -->` 근거는 MDX 주석 `{/* ev: ... */}`로 같은 자리에 옮겼다.
  - `src/pages/projects/[slug].astro`: 히어로(칩, 모노 한 줄, 큰 제목, 오른쪽 요약), 회사·역할·기간·스택 줄, 왼쪽 본문, 오른쪽 고정 과제 목차(rulebook의 카테고리 목록 패턴). 960px 이하에서는 목차가 본문 위로 올라간다.
  - `src/data/profile.ts`는 쓰는 곳이 생기는 PR 4로 옮겼다.
  - 가운뎃점 수정: Instrument Sans의 `·`는 17px에서 폭 1.75px이라 앞뒤 글자에 붙어 보였다(측정). `global.css`에 Instrument Sans의 `@font-face`를 직접 두고 unicode-range에서 U+00B7을 빼서 Pretendard(4.32px)가 그리게 했다. 수정 뒤 렌더링 폭은 3.56px이다.
- [x] 보이는 결과: `/canvas/projects/genvas/`가 열리고, 목차 항목을 누르면 해당 과제로 이동한다.
- [x] 검증
  - [x] 단위: 세 명령 통과(내부 링크 29개). `period.start`를 `2025.08`로 바꾸면 YAML이 숫자로 읽어 `InvalidContentEntryDataError`로 빌드가 실패한다.
  - [x] 실물: 영역 3개와 과제 6개가 `##` 3개, `###` 6개와 같다. 결과 bullet은 6개다. 목차의 04번을 누르면 주소에 과제 id가 붙고 제목이 헤더 바로 아래(y=100, 헤더 아래 끝 100)에 온다. 1512 폭과 390 폭 모두 콘솔 오류 0개, 가로 넘침 없음. 캡처는 `.scratch/verify/pr-3/`에 있다.
  - [x] 성능: Lighthouse 12, Genvas 상세

    | 프리셋 | 성능 | 접근성 | JS | 글꼴 | 전체 | LCP | CLS |
    | --- | --- | --- | --- | --- | --- | --- | --- |
    | 데스크톱 | 100 | 100 | 0 B | 455.5 KB, 18개 | 478.2 KB | 0.8 s | 0 |
    | 모바일 기본 | 100 | 100 | 0 B | 455.5 KB, 18개 | 478.2 KB | 1.4 s | 0.034 |

    글꼴의 대부분은 Pretendard 조각 16개다. 점수에는 영향이 없지만 PR 7에서 줄일 수 있는지 본다.
  - [x] 내용: Genvas MDX의 모든 문장이 `sections/05_projects.md`의 Genvas 항목과 같다. `writing_guide_sample/`에서 온 문장이 없다.

## PR 4. 홈

레퍼런스의 첫 화면 구성을 포트폴리오 내용으로 채운다.

- [x] 의존: PR 3
- [x] 수정 파일: `src/pages/index.astro`, `src/components/Hero.astro`, `src/components/ProjectIndex.astro`, `src/data/profile.ts`, `src/styles/global.css`(`.section-title`)
- [x] 바꾸는 것
  - `src/data/profile.ts`: 한 줄 소개, 자기소개 5문단, 경력 4곳, 기술 8줄, 이메일, GitHub. 원본은 `sections/00_profile.md`, `02_experience.md`, `03_technical_skills.md`이고 문장을 그대로 옮겼다. 자기소개의 굵은 글씨만 뺐다.
  - `Hero.astro`: 검은 칩(`PYTHON BACKEND`) + 한글 한 줄("제품·운영 요구를") + 두 줄 제목 + 오른쪽 요약 + `/projects` 줄과 버튼. 한글 줄은 PR 0의 규칙대로 모노 글꼴이 아니라 본문 글꼴이다.
  - `ProjectIndex.astro`: 프로젝트마다 이름, 과제 수, 기간, 한 줄 소개, 영역별 과제 수 상자를 보인다. 과제 수는 PR 3의 `taskGroups()`로 센다. 오른쪽에 프로젝트 목록과 과제 수를 고정한다.
  - `#about`: 자기소개, 경력, 기술. `#contact`: 큰 이메일 링크와 이메일·GitHub 태그. 이메일만 싣고 전화번호는 싣지 않는다(사용자 결정, 2026-11-25).
- [x] 보이는 결과: 홈 첫 화면에 히어로가 보이고, 스크롤하면 프로젝트, 소개, 연락 구역이 차례로 나온다.
- [x] 검증
  - [x] 단위: 세 명령 통과(내부 링크 37개)
  - [x] 실물: 계획의 "제목이 한 줄로 들어간다"는 PR 0에서 두 줄 구성으로 정해져서 "히어로 전체가 첫 화면에 들어간다"로 바꿨다. 1512 폭에서 제목 두 줄, `/projects` 줄 아래 끝 538px로 첫 화면(873px) 안에 들어간다. 390 폭에서 제목 세 줄, 아래 끝 569px(844px 안). 헤더의 `/ about`을 누르면 `#about`이 헤더 바로 아래(y=100)에 온다. 프로젝트 제목을 누르면 `/canvas/projects/genvas/`로 간다. 페이지에 `010-`이 없고 `mailto:` 링크가 있다. 두 폭 모두 콘솔 오류 0개, 가로 넘침 없음. 캡처는 `.scratch/verify/pr-4/`에 있다.
  - [x] 성능: Lighthouse 12, 홈. 데스크톱과 모바일 기본 프리셋 모두 성능 100, 접근성 100, JS 0 B, CLS 0. 글꼴 327.1 KB(13개), 전체 351.1 KB, LCP 0.7 s(데스크톱), 1.4 s(모바일). PR 1 기준(100)과 같다.
- [x] 사용자 리뷰 후 머지(2026-11-25). 리뷰 의견으로 배경 점 무늬를 레퍼런스 측정값(1px 점, 4px 간격, `#e7e7e7`)으로 바꿨다(PR 6).

## PR 5. 나머지 프로젝트 2개와 다이어그램 다시 그리기

PR 3에서 정한 모양에 내용을 채우고, 프로젝트 상세 페이지에 다이어그램을 넣는다.
다이어그램은 resume 저장소의 PNG를 그대로 쓰지 않고 사이트의 디자인 패턴으로 다시 그린다(사용자 결정, 2026-11-25).

- [x] 의존: PR 3
- [x] 수정 파일: `src/content/projects/tynt.mdx`, `ai-agent-workflow.mdx`, `genvas.mdx`(그림 삽입), `src/components/diagram/`, `src/pages/projects/[slug].astro`(본문 목록 스타일 범위)
- [x] 바꾸는 것
  - Tynt(과제 4개)와 AI Agent(과제 5개)를 PR 3과 같은 구조로 옮겼다. 두 프로젝트 모두 원문에 영역 구분이 없어 `##` 영역을 "기여" 하나로 둔다.
  - 다이어그램 부품 4개를 `src/components/diagram/`에 만들었다.
    - `Figure`: 점선 테두리, `FIG nn` 칩, 한글 제목
    - `Flow`: 검은 상자(주 흐름)나 점선 상자(기록·결과)를 화살표로 잇는다. `plain`이면 화살표 없이 나열한다. 흐름이 놓인 칸이 480px보다 좁으면 컨테이너 쿼리로 세로 흐름이 된다.
    - `Lanes`: 나란한 레인. 각 레인 안은 `Flow`다.
    - `Metrics`: 결과 수치 칸
  - 그림은 HTML과 CSS로만 그렸다. SVG와 JS는 쓰지 않았다. 원본의 강조색, 둥근 카드, 아이콘은 쓰지 않았다.
  - 그림은 MDX 안에서 부품을 조합해 근거 문장 바로 아래에 둔다. 그림 문구는 모두 `sections/05_projects.md`의 해당 과제 문장에서 가져왔다.
  - 계획 조정: 원본 `fig_02b`(생성 요청 데이터 흐름)에는 CQRS, 202 응답, 읽기 모델처럼 `sections/`에 없는 내용이 많다. 그래서 통째로 다시 그리지 않고, `sections/` 문장으로 그릴 수 있는 범위를 과제별 그림으로 나눴다.

    | 상세 페이지 | 그림 | 놓인 과제 |
    | --- | --- | --- |
    | Genvas | FIG 01 생성 단계 격리와 단계별 기록 | 다단계 생성 |
    | Genvas | FIG 02 외부 생성 모델 호출 추상화 | 테마별 설정과 공통 Celery 어댑터 |
    | Genvas | FIG 03 학습·생성 큐 분리 | 큐 라우팅 |
    | Genvas | FIG 04 과금 순서와 결제 기록 분리 | 결제 시도와 불변 완료 기록 |
    | AI Agent | FIG 01 오케스트레이터 루프와 시점별 hook 게이트 | 단일 오케스트레이터 |

  - Tynt는 근거가 되는 흐름도가 없어 그림이 없다. 에너닷 그림은 `sections/`에 에너닷 프로젝트 항목이 생긴 뒤에 다룬다.
  - 버그 수정: 상세 페이지의 본문 목록 스타일(`.prose li`)이 그림 안의 `<li>`에도 걸려 검은 상자 글자가 회색이 됐다. 본문 바로 아래 목록(`.prose > ul > li`)에만 걸리게 좁혔다.
- [x] 보이는 결과: 홈 목록의 세 행이 모두 상세로 이어진다. Genvas 상세에 그림 4장, AI Agent 상세에 그림 1장이 해당 과제 바로 아래에 보인다.
- [x] 검증
  - [x] 단위: 세 명령 통과(페이지 4개, 내부 링크 59개)
  - [x] 실물: 세 상세 페이지의 목차 과제 수가 `###` 수와 같다(6, 4, 5). 1512 폭과 390 폭에서 그림의 가로 넘침이 모두 0px이고, 390 폭에서는 흐름이 세로 화살표로 바뀐다. 검은 상자 글자색은 흰색(`rgb(255, 255, 255)`)이다. 콘솔 오류 0개. 캡처는 `.scratch/verify/pr-5/`에 있다.
  - [x] 성능: Lighthouse 12 모바일 기본 프리셋. Genvas 상세는 성능 100, 접근성 100, JS 0 B, 전체 479.5 KB(PR 3 때 478.2 KB). AI Agent 상세는 성능 100, 접근성 100, JS 0 B, 전체 352.4 KB.
  - [ ] 내용: 사용자가 세 프로젝트 문장과 그림 5장을 확인한다. 원본 README가 "본인 확정 후 공개"로 표시한 수치(생성 실패율 약 10%→1%대, AWS 비용 약 70% 절감)도 함께 확인한다.
- [x] 사용자 리뷰 후 머지(2026-11-25)

## PR 6. 모션

정적 페이지가 완성된 뒤에 움직임을 얹는다. 움직임이 없어도 모든 내용이 보여야 한다.

- [x] 의존: PR 4
- [x] 수정 파일: `src/scripts/reveal.ts`, `src/components/Raster.astro`, `src/components/TaskIndex.astro`, `src/layouts/Base.astro`, `src/pages/index.astro`, `src/pages/projects/[slug].astro`, `src/styles/global.css`
- [x] 바꾸는 것
  - 계획 조정: GSAP와 Lenis를 넣지 않았다. 네 효과 모두 브라우저 기본 기능으로 만들 수 있고, GSAP와 ScrollTrigger만으로 gzip 약 45 KB(추정)가 늘기 때문이다. Lenis는 스크롤을 가로채 키보드와 보조기기 사용을 해친다.
  - 스크롤 등장(`reveal.ts`): 구역 제목, 프로젝트 행, 경력, 기술, 그림, 본문 제목. 첫 화면 아래에 있는 요소만 숨겼다가 IntersectionObserver로 보인다. 히어로는 숨기지 않아 LCP를 늦추지 않는다. 스크립트가 없으면 아무것도 숨지 않는다.
  - 점 래스터(`Raster.astro`): 홈 히어로 아래에 `BACKEND`를 배경과 같은 격자(데스크톱 4px, 390 폭 3px)의 2px 검은 점으로 그린다. 처음 보일 때 점이 0.9초에 걸쳐 무작위 순서로 찍힌다. 장식이라 `aria-hidden`이고, 띠 높이를 CSS로 미리 잡아 레이아웃이 밀리지 않는다. 계획의 "한글 문구"는 새 문장을 만들어야 해서 라틴 단어 하나로 바꿨다.
  - 페이지 전환: `<ClientRouter />` 대신 CSS `@view-transition`(JS 0 B). 헤더는 `view-transition-name`으로 전환에서 빠져 제자리에 있고, 아래 본문만 0.25초 교차 페이드한다.
  - 진행 레일: 프로젝트 상세 오른쪽 1px 선이 스크롤 위치에 따라 채워진다. CSS 스크롤 연동 애니메이션만 쓴다. 961px 미만과 미지원 브라우저에서는 숨긴다.
  - 과제 목차 추적: 지금 읽는 과제의 번호가 검은 사각형(결과 글머리표와 같은 표시)으로 바뀌고 `aria-current="location"`이 붙는다. 페이지 끝에서는 헤더까지 올라오지 못하는 마지막 과제가 선택된다.
  - `prefers-reduced-motion: reduce`이면 등장, 전환, 레일, 점 찍기 애니메이션을 모두 끈다. 래스터는 움직임 없이 완성된 상태로 그린다(장식 그림이라 글자로 바꾸지 않았다).
  - 버그 수정: CSS 압축기가 `animation-timeline`을 `animation` 단축 속성 안으로 합쳤고, Chrome이 그 선언을 통째로 버려 레일이 채워지지 않았다. `animation-timeline`을 별도 규칙으로 분리했다.
- [x] 보이는 결과: 스크롤하면 요소가 차례로 나타나고, 페이지를 옮겨도 헤더가 깜빡이지 않는다.
- [x] 검증
  - [x] 단위: 세 명령 통과(내부 링크 78개)
  - [x] 실물: 1512 폭 홈에서 처음 숨는 요소 18개, 끝까지 스크롤한 뒤 0개. 래스터 캔버스에 칠해진 픽셀 31,520개(390 폭 16,656개, 글자 판독 가능). Genvas 상세에서 스크롤 0 · 1500 · 끝 위치의 레일 채움 0 · 0.39 · 1, 목차 표시는 없음 · 02번 · 06번. 상세에서 헤더 링크로 홈에 돌아와도 헤더 위치는 0px 그대로. CDP로 reduced motion을 켜면 `data-reveal` 요소 0개, 투명한 요소 0개, 래스터는 완성 상태. 두 폭 모두 가로 넘침 없음, 콘솔 오류 0개. 캡처는 `.scratch/verify/pr-6/`에 있다.
  - [x] 성능: 홈 JS 1.1 KB, 상세 JS 0.6 KB(gzip, 인라인 모듈). 상한 60 KB 안. Lighthouse 12 데스크톱은 홈 100, Genvas 99, 접근성 모두 100, CLS 0. 모바일 기본 프리셋은 같은 날 같은 기계에서 `main`(PR 5 머지본)과 이 브랜치를 번갈아 두 번씩 쟀고 둘 다 90~91, LCP 3.4~3.5 s로 같았다. 모션 때문에 떨어진 점수는 없다.
- [ ] 사용자 리뷰 후 머지

## PR 7. 모바일, 접근성, SEO, 성능 마무리

- [ ] 의존: PR 5, PR 6
- [ ] 수정 파일: 위 표의 PR 7 범위
- [ ] 바꾸는 것
  - 390 폭 레이아웃을 페이지마다 점검하고 고친다.
  - 키보드만으로 모든 링크에 도달하고 포커스가 보이게 한다.
  - 페이지마다 제목, 설명, OG 이미지를 둔다. 사이트맵은 기존 `@astrojs/sitemap`을 그대로 쓴다.
  - 이력서 PDF 링크를 `public/`에 둘지, 외부 링크로 둘지 정해 연결한다.
  - 모바일 LCP를 되돌린다. PR 4 기록은 홈 모바일 LCP 1.4 s, 성능 100이었는데 2026-11-25에 `main`을 다시 재니 LCP 3.4 s, 성능 90이었다. PR 6 측정 중에 발견했고 원인은 아직 모른다. 배경 점 무늬 교체와 측정 환경 차이를 먼저 의심한다(추정).
- [ ] 보이는 결과: 휴대폰에서 모든 페이지를 가로 스크롤 없이 읽는다. 링크 공유 미리보기에 제목과 이미지가 나온다.
- [ ] 검증
  - [ ] 단위: 세 명령 통과
  - [ ] 실물: 390 폭에서 모든 페이지의 `scrollWidth`가 `innerWidth`와 같다. Tab 키로 헤더에서 푸터까지 이동하며 포커스 표시를 캡처한다.
  - [ ] 성능: 모든 페이지의 Lighthouse 성능 90 이상, 접근성 95 이상

## PR 8. 루트 주소로 이전 (선택)

- [ ] 의존: PR 1. 언제 해도 된다.
- [ ] 바꾸는 것: GitHub 저장소 이름을 `Jena-K.github.io`로 바꾸고, `astro.config.mjs`에서 `base`를 지운다.
- [ ] 보이는 결과: `jena-k.github.io/`에서 사이트가 열린다.
- [ ] 검증
  - [ ] 단위: 세 명령 통과
  - [ ] 실물: 새 주소에서 모든 페이지와 이미지가 열린다. 옛 주소 `/canvas/`가 어디로 가는지 기록한다.
  - [ ] 성능: 변화 없음
- [ ] 사용자 승인 후 진행. 저장소 이름 변경은 외부에 보이는 변경이다.

## 아직 증명되지 않은 것

- 한글 제목이 kovalseo의 굵은 라틴 제목만큼 단단해 보일지는 PR 0 전까지 모른다.
