// React 라이브러리 불러들이기
import React from "react";

// Router-Dom 라이브러리(컴포넌트) 불러들이기
import {BrowserRouter} from "react-router-dom";

// HomeRouters.jsx 인스턴스 불러들이기
import HomeRouters from "./routers/HomeRouters";

// Cart관련 라우트 인스턴스 불러들이기
import CartRouters from "./routers/CartRouters";

function App() {
  return (
    // xml 태그로 처리
    <BrowserRouter>

      {/* 최초 root URL 패스 경로를  처리할 Router 포함 */}
      <HomeRouters />

      {/* Cart 관련 라우트 인스턴스 포함시키기 */}
      <CartRouters />

    </BrowserRouter>
  );
}

export default App;