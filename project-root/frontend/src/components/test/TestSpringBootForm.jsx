// 리엑트 라이브러리 불러들이기
import React from "react";

// 화면 출력을 위한 인스턴스 생성하기
//  - 출력할 데이터를 매개변수로 받아오기(testResultMessage)
const TestSpringBootForm = ({testResultMessage}) => {
    return (
        <p>
            SpringBoot 연결 테스트 결과 출력 하기 : {testResultMessage}
        </p>
    );
};

// 외부에서 사용할 수 있도록 export 하기
export default TestSpringBootForm;