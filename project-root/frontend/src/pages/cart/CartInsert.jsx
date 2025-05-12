// 리엑트 라이브러리, 상태관리 훅 불러들이기
import React, {useEffect, useState} from 'react';

// 링크(라우팅 처리용, 입력 링크 처리) 및 페이지 정보 라이브러리 불러들이기
import {useNavigate} from 'react-router-dom';

// SpringBoot 서버로 요청 처리를 위한 cartApi 불러들이기
import {insertCart} from '../../service/cartApi';
import CartInsertUpdateForm from '../../components/cart/CartInsertUpdateForm';

/* 삭제 처리를 위한 인스턴스 생성 */
const CartInsert = () => {
    // 페이지 처리를 위한 네비게이트 인스턴스 생성
    const navigate = useNavigate();

    // SpringBoot로부터 응답 받은 주문상세 정보를 담을 상태 인스턴스 변수 정의
    const [cart, setCart] = useState({
        cart_no: '2025050900001',
        cart_member: 'a001',
        cart_prod: 'P301000004',
        cart_qty: 123
    });

    /* Form 페이지의 입력 필드 수정시 cart의 상태값 변경하는 함수 인스턴스 정의 */
    const handleChange = (e) => {
        // 현재 입력된 input의 name과 value의 값을 가져오기
        const {name, value} = e.target;

        // cart의 주문정보를 담고 있는 필드의 값 수정하기
        // - prevCart : cart 상태정보에 담겨 있는 정보를 기준으로 새로운 상태 객체를 생성
        //            : React의 setCart 함수 내부에서 자동으로 전달되고 사용되는 값
        setCart((prevCart) => ({
            // 이전 상태의 모든 속성을 복사(prevCart의 모든 키와 값을 새로운 객체로 생성)
            // - React의 setCart 함수 내부에서 자동으로 전달되고 사용됨
            // -  ...은 javascript의 전개연산자로
            //       -> prevCart 객체의 모든 key와 value를 펼쳐서 새로운 객체에 복사한다는
            //          의미적 기호
            // <새로운 객체를 만드는 이유>
            //  - React는 객체를 직접 수정하는 것을 감지하지 못함
            //  - 감지할 수 있도록 하기 위해서는 -> 새로운 객체를 만들어야 수정 사항을 감지함
            //    즉, 원본 객체의 내부 필드의 값이 바뀌어도, 참조주소가 바뀌지 않으면 인지못함
            ...prevCart,

            // cart 내에 name의 값을 value의 값으로 수정
            [name] : value
        }));
    };

    // Form 페이지에서 [취소] 버튼 클릭시 처리할 함수 인스턴스 정의
    const handleCancel = (e) => {
        // 목록 페이지로 이동 : 이전 페이지로 이동(-1)
        navigate(-1);
    };

    // Form 페이지에서 [저장] 버튼 클릭시 SpringBoot에 저장 처리를 요청하는 함수 정의
    const handleInsert = (e) => {
        // 전송 처리를 할 경우 항상 처음에는 기본폼 제출 동작을 막음
        e.preventDefault();

        // SpringBoot에 입력 처리 요청 및 응답 받기
        insertCart(cart)
            // 응답 받은 데이터를 처리하기
            .then(() => {
                alert('정상적으로 입력 되었습니다!!');

                // 입력 후 전체목록 페이지로 전환
                // navigate('/cart/list');
                navigate('/cart/list_paging');
            })
            .catch((err) => {
                console.error(">>>>>> 입력 실패 : ", err);
            });
    };

    // 입력 화면 처리
    return (
        <div>
            <h2>주문내역 신규 추가하기</h2>
            <hr/>

            {/* 입력 Form 페이지 불러들이기 */}
            <CartInsertUpdateForm                
                // SpringBoot로부터 응답받은 상세정보 데이터를 Form 페이지로 전달
                cart={cart}
                // Form 상태값 넘겨서 유지
                mode='add'
                // 입력 필드 수정시 처리할 함수 인스턴스 전달
                handleChange={handleChange}

                // [취소] 버튼 처리할 함수 인스턴스 전달
                handleCancel={handleCancel}
                
                // [저장] 버튼 클릭 시 form 전송을 위한 함수 인스턴스 전달
                handleSubmit={handleInsert}
            />
        </div>
    );
};

export default CartInsert;