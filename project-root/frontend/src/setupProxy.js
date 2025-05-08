/**
 * 파일명은 React에서 정해진 이름으로 수정하면 안됨
 *  - React 실행 시 자동으로 해당 파일을 찾아서 로딩하게 됨
 *  - 파일의 위치에는 src 폴더 하위에 위치
*/

/* React Proxy 라이브러리 인스턴스화 정의 */
const {createProxyMiddleware} = require("http-proxy-middleware");

/* React 서버 실행시 모듈로 사용할 수 있도록 내보내기 */
// - app : 요청하는 시점을 의미함(요청자)
module.exports = function(app) {
    /**
     * Java 기반의 SpringBoot 서버에 대한 프록시 설정
    */
    app.use(
        // 대표 url 패턴 정의
        // - http://localhost:3000/spring/test/spring_test 으로 요청이 실행되는 경우 처리
        "/spring",

        // 서버 주소 및 포트 설정 변경 처리
        createProxyMiddleware({
            // 요청을 보낼 실제 서버의 IP와 Port 설정
            target : "http://localhost:8080",

            // CORS 오류 방지 처리
            // - 서버에 요청을 보낼 때 헤더 정보를 URL에 맞게 변경하여 CORS 오류를 방지
            // - CORS는 Cross-Origin Resource Sharing의 약자
            // - 한 웹페이지에서 다른 서버의 주소 자원에 접근할 수 있도록 허용하는 브라우저 보안정책 중 하나
            //   (이 부분에서 연동이 잘 안될 수 있음)
            changeOrigin : true,

            // https 요청 시 인증서 검증처리
            // - 운영 시 https 프로토콜을 사용하는 경우 true
            // - 개발 시 false
            "secure" : false,

            // url 에서 대표 url /spring 제거하고 바로 서버로 보내기
            // - http://localhost:3000/spring/test/spring_test 해당 url을
            //    -> http://localhost:8080/test/spring_test 으로 변경
            pathRewrite : {
                "^/spring" : ""
            }
        })
    );

    /**
     * Python 기반의 Flask 서버에 대한 프록시 설정
    */
    app.use(
        // 대표 url 패턴 정의
        // - http://localhost:3000/flask/test/spring_test 으로 요청이 실행되는 경우 처리
        "/flask",

        // 서버 주소 및 포트 설정 변경 처리
        createProxyMiddleware({
            // 요청을 보낼 실제 서버의 IP와 Port 설정
            target : "http://localhost:8080",

            // CORS 오류 방지 처리
            // - 서버에 요청을 보낼 때 헤더 정보를 URL에 맞게 변경하여 CORS 오류를 방지
            // - CORS는 Cross-Origin Resource Sharing의 약자
            // - 한 웹페이지에서 다른 서버의 주소 자원에 접근할 수 있도록 허용하는 브라우저 보안정책 중 하나
            //   (이 부분에서 연동이 잘 안될 수 있음)
            changeOrigin : true,

            // https 요청 시 인증서 검증처리
            // - 운영 시 https 프로토콜을 사용하는 경우 true
            // - 개발 시 false
            "secure" : false,

            // url 에서 대표 url /spring 제거하고 바로 서버로 보내기
            // - http://localhost:3000/flask/test/spring_test 해당 url을
            //    -> http://localhost:8080/test/spring_test 으로 변경
            pathRewrite : {
                "^/flask" : ""
            }
        })
    );
};