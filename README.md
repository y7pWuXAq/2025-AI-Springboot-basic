## 2025-AI-Springboot-basic
2025년 빅데이터 기반 AI 개발 전문가 과정 Springboot 기본 학습 리포지토리
<br><br>

### SpringBoot Framework
- Java 기반의 웹어플리케이션 프로그램을 할 수 있도록 지원하는 Web Framework임 
<br>

-  Framework
    - 이미 구조화되어 제공되는 라이브러리로 제공되는 구조에 맞게 파일을 생성 및 코드를 작성
    - 코드 작성도 Framework의 메뉴얼에 따라 작성해야함
    - 즉, 클래스 구조(상속, 인터페이스, 추상 등이 포함됨)에 대한 약속된 규약에 따라 처리됨
<br>

- 개발 환경
    * VS-Code : 확장팩 설치
    * SpringBoot 3.x이상 버전(4.4버전 사용 예정)
    * JDK버전 : SpringBoot 3.x이상 버전을 사용하기 위해서는 JDK 17이상 버전을 사용해야함
<br>

##### VS-Code 확장팩
- Java Extension Pack
- Spring Boot Extension Pack
- Spring Initializer
- Debugger for Java
- React Developer Tools
- Live Reload
<br>

##### 스프링부트 프레임워크 다운로드
- 스프링부트 프레임워크 다운로드 방법 2가지(2가지 중 한가지 방법 사용)
    - 스프링부트 사이트에서 다운
    - 접속 URL : https://start.spring.io <br>

    - VS-Code에서 다운 받기
    - VS-Code에서 [Ctrl + Shift + P]
        * Spring Initializr : Create Maven Project 선택
<br>

##### 스프링부트 프레임워크 시작(진입점) 클래스
- 시작 클래스(main 클래스) 위치
    - main 메소드가 위치한 클래스 : src/ProjectApplication.java

- 터미널에서 서버 시작하기
    - project-root 폴더 위치에서 아래 명령 실행 : mvnw spring-boot:run

- 백엔드 테스트를 위한 프론트 tool 설치
    - Postman tool 사용
    - 사용자의 요청 데이터 처리를 대행하는 테스트 tool
    - VS-Code 확장팩 설치 필요
        - Postman 및 Postman Runner 확장팩 설치
        - 설치 후 VS-Code 재실행
    - post 및 get 전송 방식 모두 전송 가능

<br><br><br>


### DAY 01
* 스프링부터 프로젝트 신규 생성
    - 스프링버전 3.4
    - Maven 프로젝트 선택
    - 도메인명 : com.pknu
    - 작업 디렉토리, 프로젝트 명 : example
    - controller에 java 파일 생성
        - 임의 경로(패스) 설정하여 프로젝트 잘 구동 되는지 확인 
<br><br><br>


### DAY 02
- Day0201_***.java 클래스 생성
    - DB 데이터를 추출하여 페이지에 표시
<br><br><br>


### DAY 03
- Day0301_Prod.java, Day0302_Prod.java 클래스 생성
    - 각 클래스의 Repository, Controller 생성
<br><br><br>

### DAY 04
- Day0401_**.java 파일 작업
<br><br><br>



### DAY 05
- Day0501_**.java 파일 작업
<br><br><br>



### DAY 06
- React 프로젝트 생성하기
- 현재 SpringBoot 내에 frontend 폴더는 삭제하기
    - React 프로젝트 생성명령을 통해서 frontend 프로젝트 생성

1. React 프로젝트 생성하기
    - 생성 위치 : SpringBoot project-root 폴더 내에 생성
    - 프로젝트 폴더 이름 : frontend
      > npx create-react-app frontend

2. 생성된 프로젝트 폴더로 이동
      > cd frontend

3. React 개발 서버 구동 테스트
    > npm start

4. React Router 기능을 통해 페이지 이동(Router) 처리를 위한
  Router-dom 설치하기
   - 설치 위치는 항상 : frontend 내에서
   > npm install react-router-dom


5. React에서 Backend API 호출 처리를 위하여 axios 라이브러리 설치
- 설치 위치는 항상 : frontend 내에서
   > npm install axios


- React 폴더 구성하기
<폴더 구조>
/src/config : axios 설정 관리(Backend 연결을 위한)
/src/components : HTML 페이지 화면 구성 폴더(pages에서 화면 구성 사용)
/src/pages : CRUD 기능 처리 폴더(Backend에 요청 및 응답 받는 역할)
/src/routers : 메뉴(카테고리)별 URL과 page 매핑(URL 매핑 처리)
/src/service : axios를 통해 Backend로 링크 처리
/src/setupProxy.jsx : Backend(SpringBoot 또는 Flask) 서버 연결 설정
                            (무조건 src 밑에 위치해야 하며, 이름 수정 불가)


- React Test
1. components
	- HomePage.jsx 파일 생성

2. routers/
	- HomeRouter.jsx 파일 생성

3. App.js
	- HomeRouters.jsx 연결

4. 서버 테스트

 
- Backend연결을 위한 Proxy 설정

<Proxy 설정>
- 서로 다른 서버(이기종) 간에 통신을 위해 IP 및 Port를 정의하는 것을 의미함
- 일반적으로 하나의 서버에서 사용하는 IP와 Port는 동일함
  -> 즉, 요청과 응답에 사용되는 IP와 Port는 동일함
- 하나의 서버에서 다른 서버로 요청을 보내기 위해서는
  내보내는 서버(다른 서버)의 IP와 Port로 변경해서 보내야 합니다.
- 요청 시 중간에 자기 자신의 IP와 Port를 가로채서 외부 IP와 Port로 변경하는 작업을
  Proxy 또는 Proxy Server 처리라고 칭합니다.


<Proxy 처리를 위한 파일 - React 영역>
 - src / setupProxy.jsx : 파일명 수정 불가 , 최초 생성 1회
 - src / config / axiosInstance.jsx : 최초 생성 1회
 - src / service / testApi.jsx : 메뉴(카테고리) 별로 파일을 생성하여 사용
                                     : 향후 pages 폴더 내에 파일들은 service 내에 파일을 이용하여
                                      Backend 요청 처리함



- React 내에서 Test를 위한 페이지 구성
1. 폴더 및 파일 구성
 - src/components/test/TestSpringBootForm.jsx 
	: SpringBoot의 응답 결과 출력 화면 정의
 - src/pages/test/TestSpringBoot.jsx
	: SpringBoot에 요청 및 응답 받아오는 처리 정의
	: 응답 받은 data를 TestSpringBootForm.jsx에 전달
 - src/components/HomePage.jsx : Test 링크 추가
 - src/routers/HomeRourter.jsx : TestSpringBoot.jsx 라우팅 처리


- SpringBoot 내에서 Test를 위한 Class 생성
1. Controller 클래스 내에 응답을 처리할 java class 생성
    - controller/ReactSpringBootTest.java
        - 함수 이름 : getReactSpringConnect
        - 응답 내용 : "SpringBoot에 정상적으로 연결되었습니다."


- React 및 Spring 테스트
1. 서버 실행 순서
    - SpringBoot 서버 실행
    - React 서버 실행
2. React 브라우저 페이지에서 링크 클릭트로 테스트
3. SpringBoot에서도 자체 테스트 가능
    - http://localhost:8080/test/spring_test 링크로 테스트 가능


- Cart(주문내역 관리) CRUD 페이지 제작을 위한 폴더 구조
    - SpringBoot는 이미 완성되어 있음
    - React쪽은 아래와 같이 구성
    (화면구성)
    