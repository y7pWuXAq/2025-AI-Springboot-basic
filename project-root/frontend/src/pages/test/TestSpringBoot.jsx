/* React 라이브러리, 상태관리 훅 설정 */
import React, {useEffect, useState} from "react";

/* 페이지 이동이 있는 경우 사용할 페이지 정보를 담고 있는 라이브러리 */
import {useNavigate} from "react-router-dom";

/* SpringBoot 링크 처리를 위한 testApi 불러들이기 */
import {getTest} from "../../service/testApi";

/* 출력화면을 담당하는 컴포넌트 불러들이기 */
import TestSpringBootForm from "../../components/test/TestSpringBootForm";

/* 인스턴스 생성 */
const TestSpringBoot = () => {
    
    // SpringBoot 응답 결과값을 담을 데이터 상태 정의
    // - 사용할 인스턴스 변수명 : testResultMessage (문자열 타입)
    // - 초기값 문자열로 설정 : useState("")
    // - 상태값 변경시 setTestResultData() 사용
    const [testResultMessage, setTestResultData] = useState("SpringBoot에서 응답 받기 전입니다.");

    // 페이지 정보를 가지고 있는 네비게이트 인스턴스 정의
    const navigate = useNavigate();

    // 페이지 실행 시점에 SpringBoot 서버에 요청 후 응답 받아오기 처리
    useEffect(() => {
        // src/service/testApi.jsx의 getTest() 함수 호출
        // - SpringBoot 서버 URL Proxy 경로 설정
        getTest()
            // then() : SpringBoot 서버에 요청 처리(비동기 방식으로 처리 -> 페이지 이동 없이 통신으로만 주고 받음)
            .then((res) => {
                // 응답 받은 데이터를 testResultMessage 상태변수에 저장
                setTestResultData(res.data);
            })

            // 예외 처리
            .catch((err) => {
                // 콘솔에 출력
                console.error(" >>>>> SpringBoot 연결 실패 : ", err);
            });
    }, []);

    // 링크 처리를 위한 테스트
    return (
        <div>
            <h2>SpringBoot 연결 테스트 결과</h2>
            <hr/>
            {/* Home 바로가기 버튼 생성 */}
            <div>
                {/* navigate("/") : 클릭을 하면 root(/) 경로로 페이지 변경 처리 */}
                <button onClick={() => navigate("/")}>Home</button>
            </div>

            <hr/>
            {/* TestSpringBootForm 컴포넌트 렌더링(포함)하기 */}
            {/* 매개변수 이름 : testResultMessage에 상태값 testResultMessage 넘겨주기 */}
            <TestSpringBootForm testResultMessage={testResultMessage} />
        </div>
    );
}

// 외부에서 사용할 수 있도록 export 하기
export default TestSpringBoot;