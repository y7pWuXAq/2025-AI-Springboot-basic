/**
 * - SpringBoot 서버로 전체리스트 요청 및 응답 받는 기능 처리
 * - 응답 받은 데이터를 components의 화면에 출력할 수 있도록 데이터 전달
*/

/* 리엑트 라이브러리, 상태관리 훅 불러들이기 */
import React, {useEffect, useState} from "react";

/* 링크(라우팅 처리용, 입력 링크 처리) 및 페이지 정보 라이브러리 불러들이기 */
import {Link, useNavigate} from 'react-router-dom';

/* SpringBoot 서버로 요청 처리를 위한 cartApi 불러들이기 */
import {getCarts} from '../../service/cartApi'

// SpringBoot로부터 응답 받은 데이터를 출력할 컴포넌트 불러들이기
// - 향후 정의

// 주문내역 전체 조회 인스턴스 생성
const CartList = () => {

    // 페이지 처리를 위한 네비게이트 인스턴스 생성
    const navigate = useNavigate();

    return (
        <div>
            <h2>주문내역 목록</h2>
            <hr/>

            {/* HOME 바로가기 버튼 */}
            <button onClick={() => navigate("/")}>Home</button>

            {/* 주문내역 추가 버튼 생성 */}

            {/* SpringBoot의 응답 결과를 출력화 컴포넌트 불러들이기 */}
        </div>
    );
};

export default CartList;