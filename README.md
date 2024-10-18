# 배드민턴 칠까?🏸

## **🍎 프로젝트 소개**

### **🐸 누가 사용하면 좋을까요?**

✅ 배드민턴을 치고 싶은데 같이 칠 사람이 없어서 동호회에 가입하고 싶다 !

✅ 매 경기마다 제비뽑기로 대진표를 짜는 것이 불편하다 !

✅ 내가 원하는 시간대와 장소에서 열리는 경기에 참여하고 싶다 !

✅ 경기 승패를 쉽게 기록하고 싶다 !

✅ 내가 참여한 경기와 경기 결과를 보고 싶다 !

✅ 배드민턴 동호회 내에서 나의 위치를 확인하고 싶다 !

### **☘️ 저희 서비스는 이런 서비스입니다 !**

❇️ 마음에 드는 동호회를 지역별로 조회하고, 가입할 수 있습니다 !

❇️ 동호회장 및 운영 매니저는 새로운 경기 일정을 생성할 수 있습니다 !

❇️ 동호회 가입자는 본인이 가능한 시간대와 장소에서 주최되는 경기에 참여할 수 있습니다 !

❇️ 모집이 마감되면 자동으로 대진표가 만들어집니다 !

❇️ 경기 중에 점수를 기록할 수 있습니다 !

❇️ 경기 종료 시 경기 결과와 승패가 기록됩니다 !

❇️ 내가 참여한 경기와 경기 결과, 승패 여부 등을 마이페이지에서 확인할 수 있습니다 !

❇️ 경기 승률과 경기 참여 횟수에 따른 내 티어를 확인할 수 있습니다 !

## **👧 팀원 구성**

**[FE]**

| 윤예진 | 김동규 |
| --- | --- |

**[BE]**

| **박소은** | **이강민** | **이선우** |
| --- | --- | --- |

## **🍳 기술 스택**

1.  **Front-end**

```
- Next.js
- TypeScript
- Tailwind CSS
- Storybook
- shadcn/ui
- TanStack Query
```

1.  **Back-end**

```
- JAVA 17
- Spring Boot 3.3.2
- Spring Data JPA
```

**3. Database**

```
- MySQL 8
- Docker
```

## **🌊 브랜치 전략**

[FE]

- Git-flow 전략을 기반으로 main, develop 브랜치와 feature 보조 브랜치를 운용했습니다.
    - develop 브랜치는 개발 단계에서 git-flow의 master 역할을 하는 브랜치입니다.
    - feature 브랜치는 기능 단위로 독립적인 개발 환경을 위하여 사용하고 merge 후 각 브랜치를 삭제해주었습니다.
    - main 브랜치는 배포용 브랜치입니다.


## **📗 프로젝트 구조**

[FE]

```
└── 📁F2_PLAY_BADMINTON_FE
    └── 📁app
        └── 📁(header)
            └── 📁club
                └── 📁[clubId]
                    └── 📁manage
                    └── 📁member
                    └── 📁schedule
                        └── 📁[leagueId]
                            └── 📁match
                            └── 📁update
                        └── 📁create
                └── 📁create
            └── 📁my
        └── 📁api
            └── 📁auth
                └── 📁check-session
        └── 📁fonts
        └── 📁images
        └── 📁login
    └── 📁components
        └── 📁clubs
        └── 📁common
            └── 📁clubInfoInput
        └── 📁shcedule
        └── 📁ui
    └── 📁constants
    └── 📁lib
        └── 📁api
            └── 📁functions
            └── 📁hooks
    └── 📁public
        └── 📁images
    └── 📁schemas
    └── 📁types
    └── 📁utils
    └── .env
    └── middleware.ts
    └── package-lock.json
    └── package.json
    └── README.md
```



## **⏰ 개발 기간 및 작업 관리**

**개발 기간**

- 전체 개발 기간 : 2024-09-09 ~ 2024-10-17

**작업 관리**

- GitHub Projects와 Issues를 사용하여 진행 상황을 공유했습니다.
- Swagger로 개발한 API를 문서화해서 request, response에 대해 공유했습니다.
- 개발 중 팀원들과 논의할 사항들을 GitHub Discussions에 등록했습니다.
- Github Wiki를 사용하여 개발 중 공부한 내용을 문서로 작성했습니다.
- 10분에서 15분의 스크럼과 회고를 통해 개발 방향성에 대한 고민을 나누고 Notion에 회의 내용을 기록했습니다.

## **🧚 기능 구현**

### 동호회 가입 시 사용 가능한 기능

- 동호회 전체 조회
- 동호회 참여

### 동호회 가입 시 사용 가능한 기능

**[ 모든 사용자 ]**

- 경기 조회
- 경기 참여
- 경기 참여 취소
- 대진표 조회
- 경기 조회
- 경기 결과 확인

**[ 동호회장, 운영진 ]**

- 경기 생성, 수정, 삭제
- 동호회 관리

## 🔗 프로젝트 관련 링크

[BackEnd 깃 허브 주소](https://github.com/Kernel360/F2_PLAY_BADMINTON_BE)

[FrontEnd 깃 허브 주소](https://github.com/Kernel360/F2_PLAY_BADMINTON_BE)

[피그마](https://www.figma.com/design/mx70EdVAm7gOnxGUIwztdJ/PLAY_BADMINTON?node-id=0-1&node-type=canvas)

[Swagger](https://api.badminton.run/swagger-ui/index.html#/)

[ERD](https://www.erdcloud.com/d/Z5BhhKZEMNaZAGa8R)