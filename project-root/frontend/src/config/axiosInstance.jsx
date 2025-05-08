/**
 * CORS 오류 방지 처리
 *   - 서버에 요청을 보낼 때 헤더 정보를 URL에 맞게 변경하여 CORS 오류를 방지
 *   - CORS는 Cross-Origin Resource Sharing의 약자
 *   - 한 웹페이지에서 다른 서버의 주소 자원에 접근할 수 있도록 허용하는 브라우저 보안정책 중 하나
 *     (이 부분에서 연동이 잘 안될 수 있음)
*/

/* axios 라이브러리 불러들이기 */
import axios from "axios";

/* ---- 이하 인스턴스는 /src/service/ 내에 파일들이 불러들여서 사용 ---- */

/* Java 기반의 SpringBoot용 axios 인스턴스 생성 */
export const springApi = axios.create({
    // 프록시에서 사용할 대표 url 정의
    baseURL : "/spring",

    // http 통신을 위한 헤더 전송정보 정의
    headers : {
        // json 형태의 데이터로 전송하겠다는 규칙 정의
        // - Backend 서버에서도 json으로 응답을 해야함
        "Content-Type" : "application/json"
    }
});

/* Python 기반의 Flask용 axios 인스턴스 생성 */
export const flaskApi = axios.create({
    // 프록시에서 사용할 대표 url 정의
    baseURL : "/flask",

    // http 통신을 위한 헤더 전송정보 정의
    headers : {
        // json 형태의 데이터로 전송하겠다는 규칙 정의
        // - Backend 서버에서도 json으로 응답을 해야함
        "Content-Type" : "application/json"
    }
});