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