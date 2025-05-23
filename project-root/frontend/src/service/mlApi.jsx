import {flaskApi} from "../config/axiosInstance"

// 모델 예측 처리 요청 기능
export const getPredict = (features) =>
    // POST 전송
    flaskApi.post("/predict", features)