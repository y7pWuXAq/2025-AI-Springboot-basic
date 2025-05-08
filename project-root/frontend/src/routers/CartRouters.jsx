/* React 라이브러리 */
import React from "react";

/* 라우팅을 위한 컴포넌트 불러들이기 */
import { Routes, Route } from "react-router-dom";

/* 주문내역 목록 페이지 정보 불러들이기 */
import CartList from "../pages/cart/CartList";

/* 라우팅 인스턴스 정의 */
const CartRoutes = () => {
    return (
        <Routes>
            {/* 주문내역 전체 목록 */}
            <Route path="/cart/list" element={<CartList />} />
        </Routes>
    );
};

export default CartRoutes;