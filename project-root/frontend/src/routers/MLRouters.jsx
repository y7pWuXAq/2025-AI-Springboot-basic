import React from "react";

import {Routes, Route} from "react-router-dom";

// 예측을 위해 사용자로부터 독립변수 입력을 받은 페이지
import PredictForm from "../pages/ml/PredictForm";

// 예측한 결과를 출력하는 페이지
import PredictResult from "../pages/ml/PredictResult";

const MLRouters = () => {
    return (
        <Routes>
            {/* 예측을 위한 입력 받기 폼 페이지 */}
            <Route path="/ml/predForm" element={<PredictForm />} />

            {/* 예측 결과 페이지 */}
            <Route path="/ml/predResult" element={<PredictResult />} />
        </Routes>
    );
};

export default MLRouters;