/**
 * 파일명은 React에서 정해진 이름으로 수정하면 안됨
 *  - React 실행 시 자동으로 해당 파일을 찾아서 로딩하게 됩니다.
 *  - 파일의 위치는 src 폴더 밑에 위채해야 합니다.
 */

// React Proxy 라이브러리를 인스턴스화하여 정의하기
const {createProxyMiddleware} = require('http-proxy-middleware');

// React 서버 실행시 모듈로 사용할 수 있도록 내보내기
// - app : 요청하는 시점을 의미함(요청자)
module.exports = function(app){
    /**
     * Java기반의 SpringBoot 서버에 대한 프록시 설정
     */
    // 현재 요청 시점의 정보를 처리
    app.use(
        // 대표 URL 패턴 정의
        //  - http://localhost:3000/spring/test/spring_test 로 요청이 실행되는 경우 처리
        '/spring',

        // 서버 주소 및 포트 설정 변경 처리
        createProxyMiddleware({
            // 요청을 보낼 실제 서버의 IP와 Port 설정
            target: 'http://localhost:8080',

            // CORS 오류 방지 처리
            //  - 서버에 요청을 보낼 때 헤더 정보를 URL에 맞게 변경하여 CORS 오류를 방지함
            //  - CORS는 Cross-Origin Resource Sharing의 약자
            //  - 한 웹 페이지에서 다른 서버의 주소의 자원에 접근할 수 있도록 허용하는 
            //    브라우저 보안 정책 중의 하나(이부분에서 연동이 잘 안될 수 있음)
            changeOrigin: true,

            // HTTPS 요청 시 인증서 검증 처리, 개발시 false, 
            //  - 운영시 https 프로토콜을 사용하는 경우 true
            'secure': true,

            // URL에서 대표 URL /spring 제거하고 서버로 보내기
            //  - http://localhost:3000/spring/test/spring_test 이 URL을
            //    -> http://localhost:8080/test/spring_test 이렇게 변경함
            pathRewrite: {
                '^/spring': '',
            },
        })
    );


    /**
     * Python기반의 Flask 서버에 대한 프록시 설정
     */
    app.use(
        // 대표 URL 패턴 정의
        //  - http://localhost:3000/flask/test/spring_test 로 요청이 실행되는 경우 처리
        '/flask',

        // 서버 주소 및 포트 설정 변경 처리
        createProxyMiddleware({
            // 요청을 보낼 실제 서버의 IP와 Port 설정
            target: 'http://localhost:5000',

            // CORS 오류 방지 처리
            //  - 서버에 요청을 보낼 때 헤더 정보를 URL에 맞게 변경하여 CORS 오류를 방지함
            //  - CORS는 Cross-Origin Resource Sharing의 약자
            //  - 한 웹 페이지에서 다른 서버의 주소의 자원에 접근할 수 있도록 허용하는 
            //    브라우저 보안 정책 중의 하나(이부분에서 연동이 잘 안될 수 있음)
            changeOrigin: true,

            // HTTPS 요청 시 인증서 검증 처리, 개발시 false, 
            //  - 운영시 https 프로토콜을 사용하는 경우 true
            'secure': true,

            // URL에서 대표 URL /spring 제거하고 서버로 보내기
            //  - http://localhost:3000/flask/test/spring_test 이 URL을
            //    -> http://localhost:5000/test/spring_test 이렇게 변경함
            pathRewrite : {
                '^/flask': '',
            },
        })
    );
};