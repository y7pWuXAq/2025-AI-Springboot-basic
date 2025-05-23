// import React from 'react';                          
// React 라이브러리를 불러옵니다.
import React from 'react';
import { BrowserRouter } from 'react-router-dom';    // 브라우저 기반 라우팅 설정

import HomeRoutes from './routes/HomeRoutes';        // HomePage 관련 라우팅 모듈 불러오기
import CartRoutes from './routes/CartRoutes';        // Cart 관련 라우팅 모듈 불러오기
import BoardRouters from './routes/BoardRouters';    // Board 관련 라우팅 모듈 불러오기
import MLRouters from './routes/MLRouters'; // Flask 머신러닝 예측 관련 라우팅


// 최상위 App 컴포넌트 정의
const App = () => {
  
  return (
    // 전체 애플리케이션을 라우터로 감싸기
    <BrowserRouter>
      
      {/* 최초 Index Page 관련 라우트 모듈 삽입(라우트 별도 관리 파일) */}
      <HomeRoutes />

      {/* Cart 관련 라우트 모듈 삽입(라우트 별도 관리 파일) */}
      <CartRoutes />

      {/* Board 관련 라우트 모듈 삽입(라우트 별도 관리 파일) */}
      <BoardRouters />

      {/* 머신러닝(ML) 관련 */}
      <MLRouters />
      
    </BrowserRouter>
  );
};

export default App;