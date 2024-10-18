## 코드잇 풀스택 2기 파트2 5팀 초급 프로젝트
>**2-view-my-startup-5-FE**

**개발기간:** 24.09.25 ~ 24.10.16

[팀 협업 문서](https://rune-echinodon-d07.notion.site/2942192ef9ea4e77a2133d0be26ed56d?v=fff0f3d28b85813ba6c2000c6457ff84)
<br><br>

## Team Members
>**본 프로젝트는 다음 팀원들에 의해 개발되었습니다:**
- [양가현](https://github.com/gahyeon-yang)
- [이동훈](https://github.com/ciin1411)
- [현준배](https://github.com/junbaehyun)
- [박효빈](https://github.com/hyobiin9)
<br>

## Deployed URL
**프론트엔드 서버:** [https://d39pkzrrotjvwy.cloudfront.net](https://d284jixdxcxc4f.cloudfront.net)
<br><br>

## Getting Started Guide
>**설치 및 실행 방법**
<pre>
<code>
git clone https://github.com/team5-ViewMyStartup/2-view-my-startup-5-FE.git  // 레포지토리를 클론합니다.
cd 2-view-my-startup-5-FE  // 프로젝트 디렉토리로 이동합니다.
npm install // 의존성을 설치합니다.
npm start // 프로젝트를 개발 모드로 실행합니다.
</code>
</pre>
개발 서버가 실행되며, http://localhost:3000에서 확인할 수 있습니다.

<br>
<pre>
<code>
npm run build // 프로덕션 빌드를 생성합니다.
npm test // 테스트를 실행합니다.
</code>
</pre>


## Dependencies

- [React](https://reactjs.org/) - ^[18.3.1](https://www.npmjs.com/package/react/v/18.3.1)
- [React DOM](https://reactjs.org/docs/react-dom.html) - ^[18.3.1](https://www.npmjs.com/package/react-dom/v/18.3.1)
- [React Router DOM](https://reactrouter.com/) - ^[6.26.2](https://www.npmjs.com/package/react-router-dom/v/6.26.2)
- [Classnames](https://www.npmjs.com/package/classnames) - ^[2.5.1](https://www.npmjs.com/package/classnames/v/2.5.1)
- [JWT Decode](https://www.npmjs.com/package/jwt-decode) - ^[4.0.0](https://www.npmjs.com/package/jwt-decode/v/4.0.0)
- [UUID](https://www.npmjs.com/package/uuid) - ^[10.0.0](https://www.npmjs.com/package/uuid/v/10.0.0)
- [Web Vitals](https://web.dev/vitals/) - ^[2.1.4](https://www.npmjs.com/package/web-vitals/v/2.1.4)
<br>
<div align=left><h1>📚 STACKS</h1></div>

### Environment

![VS Code](https://img.shields.io/badge/VS_Code-007ACC?logo=visual-studio-code&logoColor=white&style=for-the-badge)
![Git](https://img.shields.io/badge/Git-F05032?logo=git&logoColor=white&style=for-the-badge)
![GitHub](https://img.shields.io/badge/GitHub-181717?logo=github&logoColor=white&style=for-the-badge)

### Frontend Libraries

![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=white&style=for-the-badge)
![React Router](https://img.shields.io/badge/React_Router_DOM-CA4245?logo=react-router&logoColor=white&style=for-the-badge)
![Classnames](https://img.shields.io/badge/Classnames-0082C9?logo=javascript&logoColor=white&style=for-the-badge)
![JWT Decode](https://img.shields.io/badge/JWT_Decode-000000?logo=json-web-tokens&logoColor=white&style=for-the-badge)
![UUID](https://img.shields.io/badge/UUID-007ACC?logo=uuid&logoColor=white&style=for-the-badge)
![Web Vitals](https://img.shields.io/badge/Web_Vitals-4285F4?logo=google&logoColor=white&style=for-the-badge)

### Testing Libraries

![React Testing Library](https://img.shields.io/badge/React_Testing_Library-E33332?logo=testing-library&logoColor=white&style=for-the-badge)
![Jest DOM](https://img.shields.io/badge/Jest_DOM-C21325?logo=jest&logoColor=white&style=for-the-badge)
![User Event](https://img.shields.io/badge/User_Event-15AABF?logo=javascript&logoColor=white&style=for-the-badge)

### Deployment

[![AWS S3](https://img.shields.io/badge/AWS%20S3-569A31?style=for-the-badge&logo=amazonaws&logoColor=white)](https://aws.amazon.com/s3/)

### Communication & Documentation
<div align=left>
  <img src="https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=notion&logoColor=white">
  <img src="https://img.shields.io/badge/Slack-4A154B?style=for-the-badge&logo=slack&logoColor=white">
  <br><br>
</div>

## Implemented Features
사용자가 처음 웹사이트에 접속하면 랜딩 페이지로 안내됩니다. 여기서 세 가지 주요 선택지를 볼 수 있습니다.

![ERD-Image](https://github.com/team5-ViewMyStartup/2-view-my-startup-5-FE/blob/dev/image%20(1).png?raw=true)
<br>
### 랜딩 페이지

- **로그인**: 기존 계정이 있는 사용자는 로그인 버튼을 클릭해 인증 후 추가 기능에 접근할 수 있습니다.
  - 로그인 페이지에서 회원가입으로 넘어갈 수 있으며, 회원가입할 수 있는 페이지로 이동합니다.
- **스타트업 둘러보기**: 회원가입 없이도 ‘둘러보기’ 버튼을 통해 스타트업 목록을 확인할 수 있습니다.

### 로그인 과정

- **로그인 페이지**: 사용자 이메일과 비밀번호를 입력합니다. (동적 유효성 검사 적용)
- **성공적인 로그인**: 인증에 성공하면 스타트업 목록 페이지로 이동합니다.
- **로그인 실패**: 인증이 실패하면 (예: 비밀번호 오류), 오류 메시지가 표시됩니다.
- **자동 로그인**: 로컬 저장소에 유효한 JWT 토큰이 저장되어 있다면 자동으로 로그인되고, 적절한 페이지로 리다이렉트됩니다.

### 회원가입 과정

- **회원가입 페이지**: 신규 사용자는 이메일, 닉네임, 비밀번호 등의 정보를 입력해 계정을 생성합니다.
- **동적 유효성 검사**: 잘못된 이메일 형식, 비밀번호 불일치 등 오류가 있으면 경고 메시지가 뜹니다.
- **가입 성공**: 모든 정보를 올바르게 입력하면, 로그인 페이지로 이동해 새로 만든 계정으로 로그인할 수 있습니다.

### 로그인 후 이동

- **스타트업 목록**: 로그인한 사용자는 스타트업 리스트를 볼 수 있으며, 각 스타트업을 더 자세히 탐색할 수 있습니다.
- **회사 정보**: 사용자는 스타트업을 클릭해 자세한 정보를 볼 수 있으며, 이는 로그인된 사용자만 가능합니다.
- **비교 페이지**: 사용자는 여러 스타트업을 선택해 성과나 성장 등의 지표를 비교할 수 있습니다.

![ERD-Image](https://github.com/team5-ViewMyStartup/2-view-my-startup-5-FE/blob/dev/image%20(2).png?raw=true)
<br>

### 비교 기능

- **비교 페이지**: 사용자는 여러 스타트업을 선택해 나란히 비교할 수 있습니다. 선택이 완료되면 비교 결과 페이지로 이동합니다.
- **비교 결과**: 선택한 스타트업의 세부 정보를 보여주어, 서로 분석할 수 있습니다.

![ERD-Image](https://github.com/team5-ViewMyStartup/2-view-my-startup-5-FE/blob/dev/image%20(3).png?raw=true)
<br>

### 투자 현황 & 비교 현황

- **투자 현황**: 사용자는 다양한 스타트업의 투자 상태를 확인할 수 있습니다.
- **비교 현황**: 사용자가 이전에 비교했던 회사를 추적하고, 이를 수정하거나 새로 비교할 수 있는 페이지입니다.

### 오류 처리

- **페이지 찾을 수 없음**: 사용자가 존재하지 않는 페이지에 접근하면 “페이지를 찾을 수 없음” 메시지가 뜨는 맞춤형 오류 페이지로 안내됩니다.

![ERD-Image](https://github.com/team5-ViewMyStartup/2-view-my-startup-5-FE/blob/dev/image%20(4).png?raw=true)
<br>

### JWT 토큰 관리

- **세션 관리**: 사용자의 세션은 JWT 토큰을 통해 관리됩니다. 토큰이 만료되거나 유효하지 않은 경우, 다시 로그인이 필요하다는 메시지가 나타나며 보안을 유지합니다.
- **토큰 만료**: 30분 동안 활동이 없으면 토큰이 자동으로 만료되고, 사용자는 로그아웃 상태가 되어 다시 로그인하라는 안내를 받게 됩니다.
<br>

## Architecture
![Archi](https://github.com/team5-ViewMyStartup/2-view-my-startup-5-FE/blob/dev/image.png?raw=true)
<br><br>

## Directory Structure
<pre>
<code>
src/
├── api/               
├── assets/            
├── components/        
│   ├── Dropdown/      
│   ├── List/          
│   ├── Modal/         
│   ├── Pagination/    
│   ├── Style/         
├── App.jsx            
├── App.module.css     
├── Container.jsx      
├── Container.module.css 
├── Loading.jsx        
├── Loading.module.css 
├── Nav.jsx            
├── Nav.module.css     
├── NotFoundPage.jsx   
├── NotFoundPage.module.css 
├── images/            
├── imagesjun/         
├── pages/             
│   ├── ComparePage/   
│   ├── CompareResult/ 
│   ├── CompareStatus/ 
│   ├── Details/       
│   ├── InvestmentStatus/ 
│   ├── Landing/       
│   ├── Login/         
│   ├── Signup/        
│   ├── StartupList/   
│       ├── StartupList.jsx   
│       ├── StartupList.module.css 
├── utils/             
│   ├── index.js       
│   ├── Main.js       
├── .env               
├── .gitignore         
├── .prettierrc        
├── package-lock.json  
├── package.json       
├── README.md      
## Directory Structure
<pre>
<code>

