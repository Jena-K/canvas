// Source: resume/resume_build/sections/00_profile.md, 02_experience.md, 03_technical_skills.md.
// Keep wording in sync with those files. The phone number stays off the public site.

export const profile = {
	name: '김용훈',
	role: 'Python Backend Developer',
	headline: { lead: '제품·운영 요구를', title: ['백엔드 시스템과', 'AI Agent 자동화로 연결합니다.'] },
	summary:
		'장애가 곧 비용이 되는 영역을 주로 맡아 왔습니다. 실패 지점을 추적할 수 있고 단계적으로 되돌릴 수 있는 구조를 먼저 설계합니다.',
	intro: [
		'Python·FastAPI/Django 기반 백엔드 개발자입니다. AI 미디어 생성 SaaS에서 생성 파이프라인·결제/크레딧·인증 도메인을, VPP 서비스에서 800+ 발전소 장비 통신 아키텍처를 설계·운영했습니다.',
		'장애가 곧 비용이 되는 영역을 주로 맡아 왔습니다. 실패 지점을 추적할 수 있고 단계적으로 되돌릴 수 있는 구조를 먼저 설계합니다(생성 파이프라인 단계별 상태 추적, 모놀리식 → FastAPI 무중단 점진 이전).',
		'Claude Code 기반 skills·hooks·멀티 에이전트 워크플로를 직접 설계해 팀 개발 워크플로로 도입했습니다(2인 · 누적 927세션).',
		'요구를 기능 단위가 아닌 제품·운영 관점으로 재해석합니다. 쿠폰 요청은 가입·첫 결제 자동 지급 정책으로, 포인트 요청은 리텐션용 출석 보상(일·주·월 마일스톤)으로 확장했고, 운영 병목은 직무별 RBAC 위임으로 개발팀 의존을 줄였습니다.',
		'모의해킹·보안 컨설팅 경험을 바탕으로 인증·인가와 입력 검증을 설계 단계에서 다룹니다.',
	],
	email: 'mirue104@gmail.com',
	github: 'https://github.com/Jena-K',
	experience: [
		{
			company: '라이언로켓',
			role: 'Backend Developer',
			period: '2025.08 ~ 2026.05',
			about: '웹툰 작가 협업 AI 서비스(Genvas)·AI 사진/프로필 생성 서비스(Tynt)를 운영하는 AI 미디어 생성 SaaS 기업',
			work: [
				'Python(FastAPI·Django)·Celery·PostgreSQL 환경에서의 AI 생성 파이프라인 및 결제/크레딧·인증 도메인 개발',
				'Genvas Django 모놀리식의 FastAPI 점진 이전, 분산 서버·DB·검색 인프라 무중단 통합',
				'Tynt 백엔드 기획·출시·운영 (React 웹·Flutter 앱 포함) 및 GA4·Clarity 기반 행동 데이터 분석',
				'운영 백오피스 권한(RBAC) 체계 설계 및 직무별 운영 위임',
				'Claude Code 기반 AI Agent 개발 워크플로 설계 및 팀 도입',
			],
		},
		{
			company: '에너닷',
			role: 'System / Backend Developer',
			period: '2024.05 ~ 2025.01',
			about: '발전소 장비 800+대를 연동하는 친환경 발전소 전력망 중계(VPP) 서비스',
			work: [
				'Python(FastAPI)·MQTT·Redis MQ 환경에서의 발전소 장비 통신 아키텍처 설계',
				'RSSH 직접 연결·메시지 큐 비동기 처리로 원격 제어 이원화 (원격 접속 라이선스 비용 약 80% 절감)',
				'벤더별 RTU 프로토콜의 공통 메시지 모델 추상화 및 비동기 자동 수집 전환',
				'장비 운영 통합 백오피스(Vue3) 구축 (운영 인력 약 1/3 감축)',
				'발전 설비·서버 간 통신 중계기 개발 및 IoT 보안인증 취득',
			],
		},
		{
			company: '솔로몬텍',
			role: 'Platform Backend Developer',
			period: '2022.03 ~ 2023.04',
			about: '임직원 550명(외주 300명 별도) 규모의 CRM 전략·구축 컨설팅 기업',
			work: [
				'현대자동차 북미 법인 CRM 구축 프로젝트 참여 — 고객 정보 통합 DB·연동 API 개발',
				'Salesforce(Apex·LWC)·PostgreSQL·Oracle 환경에서의 통합 DB(EAV 모델)·Stored Procedure 설계',
				'동적 쿼리 구조와 호출 정의서 배포로 스키마 변경 요청 주당 30→5건 감소',
				'SP 코드 리뷰 주도 및 주요 SP 평균 실행 시간 약 30초→2초 이내 단축',
				'매핑·API 정의서 버전 관리 도입',
			],
		},
		{
			company: '정보보안 컨설팅',
			role: '모의해킹 / 보안 컨설턴트',
			period: '2019.03 ~ 2022.01',
			about: '에스케이쉴더스 · 오렌지씨큐리티 · 이노시큐리티',
			work: [
				'웹·앱 모의해킹 및 인프라 취약점 진단 — SQL Injection·XSS·인증/인가 우회 등 재현, 개선 가이드 작성',
				'ISMS/ISO27001 인증 컨설팅 — 운영 정책·기술 통제 항목 검토',
			],
		},
	],
	skills: [
		{ area: 'Backend / API', items: 'Python, FastAPI, Django/DRF, SQLAlchemy, DDD/CQRS, OAuth/JWT/RBAC' },
		{
			area: 'Data / Async / Infra',
			items: 'PostgreSQL, Alembic, Redis, Celery, MQTT, Elasticsearch, AWS S3/RDS/EC2/CloudFront, Docker, Linux, Grafana',
		},
		{ area: 'AI / Generation', items: 'Grok, Nano Banana, Replicate, Fal' },
		{ area: 'AI / Workflow', items: 'Claude Code, Claude API, skills/rules/hooks, multi-agent orchestration' },
		{ area: 'Dev / Collaboration', items: 'pytest, Playwright, Swagger, Sentry, GitHub Actions(CI/CD)' },
		{ area: 'Analytics', items: 'GA4, GTM, Clarity' },
		{ area: 'Security', items: '웹·앱 모의해킹, OWASP Top 10, ISMS/ISO27001' },
		{ area: 'Frontend (협업 수준)', items: 'React, Vue 3, Flutter' },
	],
};
