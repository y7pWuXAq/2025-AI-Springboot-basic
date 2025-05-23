import React from "react";

// useLocation : navigate로 전송되어지는 파라메터의 key:value를 담고 있는 상태훅
import { useLocation, useNavigate } from "react-router-dom";

const PredictResult = () => {

    // 이전 페이지에서 전달된 파라메터 추출하기
    //  - useLocatioin 상태 변수에 저장되어 있음
    const location = useLocation();

    // 페이지 이동 상태
    const navigate = useNavigate();

    // location 내에 데이터 추출하기
    //  - location.state 객체가 존재하면 안에 있는 key값을 이용해서 value값 추출
    //                          존재하지 않으면 "결과 없음"으로 변수에 넣기
    const result = location.state?.result || "결과 없음";

    return (
        <div>
            <h3>생선 예측 결과</h3>
            <hr/>

            {/* 예측 결과 출력 */}
            <p>
                예측된 생선 종류 : <strong>{result}</strong>
            </p>
            <hr/>

            {/* 버튼 생성하기 */}
            {/* 다시 예측 페이지로 이동 시키기 */}
            <button onClick={() => navigate("/ml/predForm")}>다시 예측하기</button>
            <button onClick={() => navigate("/")}>Homepage로</button>
        </div>
    );
};

export default PredictResult;

