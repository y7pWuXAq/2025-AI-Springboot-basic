/* 사용자 정의 입력 필드 생성 */
import React from "react";

/**
 * 입력 필드 1개를 정의
 *  - PredictForm.jsx에서 정의한 입력 필드를 이용해서 
 *    -> 사용자로부터 5개 입력 받기..
 */
// PredictForm.jsx로부터 호출됨
//  - 호출 시 : label, value, onChange 파라메터 전달 받음
const InputField = ({label, value, onChange}) => {
    return (
        <div>
            {/* 라벨(입력 필드 제목) 출력 */}
            <label>{label}</label>

            {/* 숫자 입력 폼 : onChange 이벤를 발생시켜서
               -> PredictForm.jsx의 상태변수에 저장 처리
               -> step : 소숫점 허용 */}
            <input type="number" step="0.1" value={value} onChange={onChange} required />
        </div>
    );
};

export default InputField;