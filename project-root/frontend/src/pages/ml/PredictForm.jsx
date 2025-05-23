import React, {useState} from "react";
import {useNavigate} from "react-router-dom";

import InputField from "../../components/ml/InputField";
import {getPredict} from "../../service/mlApi";

const PredictForm = () => {

    // 5개 입력값에 대한 상태관리 변수 정의
    const [features, setFeatures] = useState([1550,60,64,9.6,6.144]);

    // 페이지 이동을 위한 훅 변수 정의
    const navigate = useNavigate();

    // 입력값이 변경될 때마다 호출되는 이벤트 핸들러 함수 정의
    const handleChange = (index, value) => {
        // 신규 배열 생성 : 기존 배열 복제
        const updated = [...features];

        // 입력값을 실수 타입으로 변환하여 저장
        updated[index] = parseFloat(value);

        // 상태 업데이트
        setFeatures(updated);
    };

    // "예측하기" 버튼 클릭시 입력 폼의 데이터 전송시키기...
    // - 전송은 Flask로 전송하여 예측 결과 받아오는 함수 정의
    const handelSubmit = async (e) => {
      e.preventDefault();
      
      // Flask 서버로 features 데이터 전송하여 예측 요청 및 응답 받기
      getPredict(features)
        .then((res) => {
            // 응답 받은 데이터 처리하기
            alert("예측 성공 : " + res.data.prediction);

            // 응답 받은 예측 결과를 출력 페이지로 전달(PredictResult.jsx)
            //  - 전달할 데이터 형식을 json 형식으로 전달
            //  - json 파라메터 값들은 => useLocation 훅에 저장되어 전달됨
            //               => 다른 페이지에서는 useLocation을 이용해서 값을 추출가능
            navigate("/ml/predResult", {state : { result : res.data.prediction }});
        })
        .catch((error) => {
            // 실패 시 오류 출력
            console.error("예측 중 오류 발생 : ", error);
        });
    };

    return (
        <div>
            <h3>생선 종류 예측하기</h3>
            <hr/>

            {/* 입력 폼 정의 */}
            <form onSubmit={handelSubmit}>
                {/* 무게(weight) 입력 필드 정의 */}
                <InputField label="무게(weight)" value={features[0]} 
                            onChange={(e) => handleChange(0, e.target.value)} />

                {/* 길이(Length) 입력 필드 정의 */}
                <InputField label="길이(Length)" value={features[1]} 
                            onChange={(e) => handleChange(1, e.target.value)} />

                {/* 두께(Diagonal) 입력 필드 정의 */}
                <InputField label="두께(Diagonal)" value={features[2]} 
                            onChange={(e) => handleChange(2, e.target.value)} />

                {/* 높이(height) 입력 필드 정의 */}
                <InputField label="높이(height)" value={features[3]} 
                            onChange={(e) => handleChange(3, e.target.value)} />

                {/* 너비(width) 입력 필드 정의 */}
                <InputField label="너비(width)" value={features[4]} 
                            onChange={(e) => handleChange(4, e.target.value)} />
                
                <hr/>
                {/* 버튼 생성하기 */}
                <button type="submit">예측하기</button>
                {/* PredictForm 페이로 진입은 -> Homepage에서 링크 클릭으로 시작 */}
                <button onClick={() => navigate(-1)}>Homepage로</button>
            </form>
        </div>
    );

};

export default PredictForm;