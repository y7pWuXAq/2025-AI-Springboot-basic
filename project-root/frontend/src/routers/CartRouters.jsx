// 리엑트 라이브러리
import React from 'react';

// 라우팅을 위한 컴포넌트 불러들이기
import { Routes, Route } from 'react-router-dom';

// 주문내역 목록 페이지 정보 불러드리기
import CartList from '../pages/cart/CartList';

// 주문내역 목록 페이지(Paging 처리) 정보 불러드리기
import CartListPaging from '../pages/cart/CartListPaging';

// 주문내역 목록 페이지(Paging Reload 처리) 정보 불러드리기
import CartListPagingReload from '../pages/cart/CartListPagingReload';

// 주문 상세 내역 페이지 정보 불러들이기
import CartView from '../pages/cart/CartView';

// 주문 상세 내역 페이지 리로딩 정보 불러들이기
import CartViewPagingReload from '../pages/cart/CartViewPagingReload';

// 주문내역 신규 추가 페이지 정보 불러들이기
import CartInsert from '../pages/cart/CartInsert';

// 라우팅 인스턴스 정의하기
const CartRouters = () => {
    return (
        <Routes>
            {/* 주문내역 전체 목록 */}
            <Route path='/cart/list' element={<CartList />} />

            {/* 주문내역 전체 목록 (Paging 처리) */}
            <Route path='/cart/list_paging' element={<CartListPaging />} />

            {/* 주문내역 전체 목록 (Paging 처리) */}
            <Route path='/cart/list_paging_reload' element={<CartListPagingReload />} />

            {/* 주문 상세 내역 페이지 */}
            {/* : cart_no은 cart_no = "넘어온 값" 형태로 관리 */}
            <Route path='/cart/view/:cart_no/:cart_prod' element={<CartView />} />

            {/* : cart_no은 cart_no = "넘어온 값" 형태로 관리 */}
            <Route path='/cart/view_paging_reload/:cart_no/:cart_prod/:page' element={<CartViewPagingReload />} />

            {/* 주문내역 신규 추가 페이지 */}
            <Route path='/cart/insert' element={<CartInsert />} />
        </Routes>
    );
};

export default CartRouters;