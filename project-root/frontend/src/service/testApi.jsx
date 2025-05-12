// axiosInstance 불러들이기
//  - React에서 http 통신을 위한 기본 라이브러로 사용하게 됨
import { springApi } from "../config/axiosInstance";

// SpringBoot로 test 처리를 위한 링크 생성

// SpringBoot 서버에 요청할 URL 패턴
//  - get 방식으로 요청을 하겠다는 의미로 get() 함수 사용
//    -> axios에서 제공하고 있음
// React 내부에서 URL : http://localhost:3000/spring/test/spring_test 로 요청
//  -> 중간에 setupProxy가 가로채서
//  -> http://localhost:8080/test/spring_test 로 변경해서 SpringBoot로 요청 진행함
export const getTest = () => 
    springApi.get('/test/spring_test')