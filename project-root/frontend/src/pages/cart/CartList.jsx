/**
 * - SpringBoot 서버로 전체리스트 요청 및 응답 받는 기능 처리
 * - 응답 받은 데이터를 components의 화면에 출력할 수 있도록 데이터 전달
 */

// 리엑트 라이브러리, 상태관리 훅 불러들이기
import React, {useEffect, useState} from 'react';

// 링크(라우팅 처리용, 입력 링크 처리) 및 페이지 정보 라이브러리 불러들이기
import {Link, useNavigate} from 'react-router-dom';

// SpringBoot 서버로 요청 처리를 위한 cartApi 불러들이기
import {getCarts} from '../../service/cartApi';

// SpringBoot로부터 응답 받은 데이터를 출력할 컴포넌트 불러들이기
import CartListForm from '../../components/cart/CartListForm';

// 주문내역 전체 조회 인스턴스 생성하기
const CartList = () => {
    
    // 페이지 처리를 위한 네비게이트 인스턴스 생성
    const navigate = useNavigate();

    // SpringBoot에서 응답받은 데이터를 저장할 상태변수 정의
    //  - cartListData : 상태변수명(인스턴스)
    //  - setCartListData() : 상태변수의 값을 저장하는 함수(setter)
    //  - useState([]) : 상태변수의 타입 정의(리스트 타입)
    const [cartListData, setCartListData] = useState([]);

    // 페이지 로딩(실행)시에 처리를 위해 useEffect() 사용
    //  - 로딩시 무조건 최초 실행
    useEffect(() => {
        // 최초 페이지 로딩시 처리할 내용 프로그램 시작

        /* SpringBoot에 주문전체 정보를 요청하여 응답 받아오기 */
        getCarts()
            // 받아온 응답값 처리하기(응답데이터는 res에 있음)
            .then((res) => {
                // 상태변수에 응답데이터 저장시키기
                setCartListData(res.data);
            })
            // 예외 처리
            .catch((err) => {
                console.error(">>>>>>>>>>> 주문내역 전체조회 실패 : ", err);
            });

    }, []);

    return (
        <div>
            <h2>주문내역 목록</h2>
            <hr/>

            <div>
                {/* HOME 바로가기 버튼 생성 */}
                <button onClick={() => navigate('/')}>HOME 바로가기</button>

                {/* 주문내역 추가 버튼 생성 */}
                <Link to="/cart/insert">
                    <button>주문내역 신규추가</button>
                </Link>

                {/* SpringBoot의 응답 결과를 출력화 컴포넌트 불러들이기 */}
                <CartListForm cartListData={cartListData} />
            </div>
        </div>
    );
};

export default CartList;