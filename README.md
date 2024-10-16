## 코드잇 풀스택 2기 파트2 5팀 초급 프로젝트
>**2-view-my-startup-5-FE**

**개발기간:** 24.09.25 ~ 24.10.16

[팀 협업 문서](https://rune-echinodon-d07.notion.site/2942192ef9ea4e77a2133d0be26ed56d?v=fff0f3d28b85813ba6c2000c6457ff84)

<br>

## 팀원
>**본 프로젝트는 다음 팀원들에 의해 개발되었습니다:**
- [양가현](https://github.com/gahyeon-yang)
- [이동훈](https://github.com/ciin1411)
- [현준배](https://github.com/junbaehyun)
- [박효빈](https://github.com/hyobiin9)

<br>

## View My Startup
>**프로젝트 개요**

**View My Startup**는 개인 투자자들이 스타트업 정보를 검토하고 비교할 수 있도록 설계된 스타트업 기업 정보 및 모의 투자 서비스입니다.

이 프로젝트는 개인 투자자들이 보다 쉽게 스타트업을 평가하고 투자 결정을 내릴 수 있도록 돕기 위해 설계되었습니다.
<br><br>

## 배포 주소
**프론트엔드 서버:** https://two-view-my-startup-5-be.onrender.com](https://d284jixdxcxc4f.cloudfront.net
<br><br>
기술 스택
Frontend: JavaScript, React.js, scss
Backend: Express.js, PrismaORM
Database: MongoDB
공통 Tool: Git & Github, Discord
팀원별 구현 기능 상세
웨인
(자신이 개발한 기능에 대한 사진이나 gif 파일 첨부)

소셜 로그인 기능
구글 소셜 로그인 API 사용으로 소셜 로그인 기능 구현
사이트 이용을 위한 추가 정보 입력 기능 구현
소셜 로그인 후 회원 추가 정보 입력 기능
user 타입(관리자, 학생)에 대한 조건부 추가 입력 모달창 기능 및 페이지 이동 기능 구현
제이든
(자신이 개발한 기능에 대한 사진이나 gif 파일 첨부)

Nav
회원별 버튼 조건부 렌더링(학생: 커리어, 스킬, 수강후기, 커뮤니티, 관리자: 회원 관리 관리자 페이지)
반응형 레이아웃 구현
메인페이지
fetch(POST, GET)을 사용하여 무료 수강 종료 시간 기능 구현
공용 Modal 컴포넌트
공용으로 사용할 Modal 컴포넌트 구현
마크
(자신이 개발한 기능에 대한 사진이나 gif 파일 첨부)

마이 페이지
fetch(GET)를 사용하여 수강생 개인별 시간 정보 표시
반응형 레이아웃 구현
공용 Button 컴포넌트
공용으로 사용할 Button 컴포넌트 구현
데이지
(자신이 개발한 기능에 대한 사진이나 gif 파일 첨부)

관리자 페이지
path parameter를 사용하여 학생 페이지와 동적 라우팅 기능 구현
학생별 정보 목록 carousel 슬라이더 구현
fetch(PATCH, DELETE)를 사용하여 개인정보 수정 및 탈퇴 기능 구현
fetch(POST, PATCH, DELETE)를 사용하여 학생 정보 CRUD 기능 구현
공용 Button 컴포넌트
공용으로 사용할 Button 컴포넌트 구현
제이
(자신이 개발한 기능에 대한 사진이나 gif 파일 첨부)

관리자 페이지
fetch(GET)를 사용하여 학생별 시간 정보 표시 및 수강생 접속 현황 정보 표시
반응형 레이아웃 구현
마이 페이지
fetch(PATCH, DELETE)를 사용하여 수강생의 개인정보 수정 및 탈퇴 기능 구현
공용 Modal 컴포넌트
공용으로 사용할 Modal 컴포넌트 구현
파일 구조
src
 ┣ client
 ┃ ┣ __mocks__
 ┃ ┃ ┣ courses.json
 ┃ ┃ ┗ index.ts
 ┃ ┣ features
 ┃ ┃ ┣ Layout
 ┃ ┃ ┃ ┣ images
 ┃ ┃ ┃ ┃ ┗ codeit-logo-purple.svg
 ┃ ┃ ┃ ┣ Layout.module.scss
 ┃ ┃ ┃ ┣ Layout.stories.tsx
 ┃ ┃ ┃ ┣ Layout.tsx
 ┃ ┃ ┃ ┗ index.ts
 ┃ ┃ ┗ LessonSearch
 ┃ ┃ ┃ ┣ components
 ┃ ┃ ┃ ┃ ┣ CourseResult
 ┃ ┃ ┃ ┃ ┃ ┣ CourseResult.module.scss
 ┃ ┃ ┃ ┃ ┃ ┗ CourseResult.tsx
 ┃ ┃ ┃ ┗ EmptyResult
 ┃ ┃ ┃ ┃ ┣ EmptyResult.module.scss
 ┃ ┃ ┃ ┃ ┣ EmptyResult.tsx
 ┃ ┃ ┃ ┃ ┗ index.ts
 ┃ ┃ ┣ LessonSearch.module.scss
 ┃ ┃ ┣ LessonSearch.stories.tsx
 ┃ ┃ ┣ LessonSearch.tsx
 ┃ ┃ ┗ index.ts
 ┃ ┣ models
 ┃ ┃ ┣ course.d.ts
 ┃ ┃ ┗ react.d.ts
 ┃ ┣ shared
 ┃ ┃ ┣ api
 ┃ ┃ ┃ ┣ base.ts
 ┃ ┃ ┃ ┗ course.ts
 ┃ ┃ ┣ components
 ┃ ┃ ┃ ┣ Button
 ┃ ┃ ┃ ┃ ┣ Button.module.scss
 ┃ ┃ ┃ ┃ ┣ Button.tsx
 ┃ ┃ ┃ ┃ ┗ index.ts
 ┃ ┃ ┃ ┣ CourseInfo
 ┃ ┃ ┃ ┃ ┣ CourseInfo.module.scss
 ┃ ┃ ┃ ┃ ┣ CourseInfo.stories.tsx
 ┃ ┃ ┃ ┃ ┗ CourseInfo.tsx
 ┃ ┃ ┃ ┣ Input
 ┃ ┃ ┃ ┃ ┣ Input.module.scss
 ┃ ┃ ┃ ┃ ┣ Input.stories.tsx
 ┃ ┃ ┃ ┃ ┣ Input.tsx
 ┃ ┃ ┃ ┃ ┗ index.ts
 ┃ ┃ ┃ ┗ Select
 ┃ ┃ ┃ ┃ ┣ images
 ┃ ┃ ┃ ┃ ┃ ┗ triangle-dark.svg
 ┃ ┃ ┃ ┃ ┣ Select.module.scss
 ┃ ┃ ┃ ┃ ┣ Select.stories.tsx
 ┃ ┃ ┃ ┃ ┣ Select.tsx
 ┃ ┃ ┃ ┃ ┗ index.ts
 ┃ ┃ ┗ helpers
 ┃ ┃ ┃ ┣ api
 ┃ ┃ ┃ ┃ ┣ __tests__
 ┃ ┃ ┃ ┃ ┃ ┣ base.test.ts
 ┃ ┃ ┃ ┃ ┃ ┣ helpers.test.ts
 ┃ ┃ ┃ ┃ ┃ ┗ wrapper.test.ts
 ┃ ┃ ┃ ┃ ┣ wrapper
 ┃ ┃ ┃ ┃ ┃ ┣ fetch.ts
 ┃ ┃ ┃ ┃ ┃ ┗ index.ts
 ┃ ┃ ┃ ┣ base.ts
 ┃ ┃ ┃ ┣ error.ts
 ┃ ┃ ┃ ┣ helpers.ts
 ┃ ┃ ┃ ┣ index.ts
 ┃ ┃ ┃ ┗ type.ts
 ┃ ┃ ┗ react-query.ts
 ┣ server
 ┃ ┣ controllers
 ┃ ┃ ┣ authController.ts
 ┃ ┃ ┗ userController.ts
 ┃ ┣ models
 ┃ ┃ ┣ userModel.ts
 ┃ ┃ ┗ courseModel.ts
 ┃ ┣ routes
 ┃ ┃ ┣ authRoutes.ts
 ┃ ┃ ┗ userRoutes.ts
 ┃ ┣ middleware
 ┃ ┃ ┣ authMiddleware.ts
 ┃ ┃ ┗ errorHandler.ts
 ┃ ┣ app.ts
 ┃ ┗ server.ts
 ┣ App.tsx
 ┣ _mixin.scss
 ┣ common.scss
 ┣ index.tsx
 ┣ react-app-env.d.ts
 ┣ reportWebVitals.js
 ┗ setupTests.js

구현 홈페이지
(개발한 홈페이지에 대한 링크 게시)

https://www.codeit.kr/

프로젝트 회고록
(제작한 발표자료 링크 혹은 첨부파일 첨부)
