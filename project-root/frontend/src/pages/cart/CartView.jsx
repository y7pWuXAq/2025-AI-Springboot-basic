// 리엑트 및 상태(훅) 불러들이기
import React, {useEffect, useState} from 'react';

// 파라메터 관리 및 페이지 네비게이트 관리 불러들이기
import {useParams, useNavigate} from 'react-router-dom';

// SpringBoot 요청 및 응답 처리를 위한 cartApi 불러들이기
import {getCart, updateCart, deleteCart} from '../../service/cartApi';

// 상세 정보 출력을 위한 form 페이지 불러들이기
import CartInsertUpdateForm from '../../components/cart/CartInsertUpdateForm';

/**
 * 상세 페이지 처리 인스턴스 정의하기
*/
const CartView = () => {
    // 파라메터(Parameter)를 담을 상태변수 정의
    //  - useParams() : 외부로부터 전송받은 파라메터를 담고 있음
    const {cart_no, cart_prod} = useParams();

    // 페이지 이동을 위한 네비게이트 인스턴스 정의
    const navigate = useNavigate();

    // SpringBoot로부터 응답 받은 주문상세 정보를 담을 상태 인스턴스 변수 정의
    const [cart, setCart] = useState({});

    // Form 페이지의 상태(상세/수정/입력)를 관리하는 인스턴스 변수 정의
    // - 상세페이지 = view, 수정버튼 클릭시 = edit, 입력시 = add
    const [mode, setMode] = useState("view");

    // 최초 페이지 로딩(실행)시 실행 처리
    useEffect(() => {

        // SpringBoot에게 상세정보 요청 및 응답 받아오기 (함수로 정의)
        const viewCart = () => {
            // 요청 및 응답 처리
            getCart(cart_no, cart_prod)
                .then((res) => {
                    setCart(res.data);
                })
                .catch((err) => {
                    console.error(">>>>>>>>>> 상세조회 실패 : ", err);
                });
        };

        // 함수 호출 : 페이지 리로드시 항상 실행
        viewCart();        

    // 이전 페이지에서 받아온 파라메터를 아래 대괄호에 정의해서 넣으면 useEffect 내부에서 사용할 수 있음
    //  - 페이지 리로드시 항상 실행됨
    }, [cart_no, cart_prod]);

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
            //       -> prevCart 객체의 모든 key와 value를 펼쳐서 새로운 객체에 복사한다는 의미적 기호
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
        // mode를 view로 변경하여 전체 페이지를 상세보기로 변경
        setMode('view');
    };

    // Form 페이지에서 [저장] 버튼 클릭시 SpringBoot에 저장 처리를 요청하는 함수 정의
    const handleUpdate = (e) => {
        // 전송 처리를 할 경우 항상 처음에는 기본폼 제출 동작을 막습니다.
        e.preventDefault();

        // SpringBoot에 수정 처리 요청 및 응답 받기
        updateCart(cart_no, cart_prod, cart.cart_qty)
            // 응답 받은 데이터를 처리하기
            .then((res) => {
                alert('정상적으로 수정되었습니다!!');
                // 수정이 완료되면 -> 상세보기 페이지로 mode 전환
                setMode('view');
            })
            .catch((err) => {
                console.error(">>>>>> 수정 실패 : ", err);
            });
    };

    // [삭제] 버튼이 클릭되면 SpringBoot에게 삭제 요청 처리를 위한 함수 인스턴스 정의
    const handleDelete = () => {
        // 정말 삭제할 것인지 다시한번 물어보기
        if(!window.confirm("정말로 삭제하시겠어요?!!!!")) 
            return;

        // SpringBoot에 삭제 처리 요청하기
        deleteCart(cart_no, cart_prod)
            // 삭제시 SpringBoot에서 응답 결과 없음
            .then(() => {
                alert("정상적으로 삭제 되었습니다!!");
                // 상세페이지를 삭제했기 때문에 삭제후 -> 리스트페이지로 전환
                // navigate('/cart/list');
                navigate('/cart/list_paging');
            })
            .catch((err) => {
                console.error(">>>>>>>>>> 주문상세내역 삭제 실패 : ", err);
            });
    };

    return (
        <div>
            <h2>주문내역 상세정보</h2>
            <hr/>   
            {/* 상세정보 출력 페이지 영역 */}
            <CartInsertUpdateForm 
                // SpringBoot로부터 응답받은 상세정보 데이터를 Form 페이지로 전달
                cart={cart}
                // Form 상태값 넘겨서 유지
                mode={mode}

                // 입력 필드 수정시 처리할 함수 인스턴스 전달
                handleChange={handleChange} 

                // [취소] 버튼 처리할 함수 인스턴스 전달
                handleCancel={handleCancel}

                // [저장] 버튼 클릭 시 form 전송을 위한 함수 인스턴스 전달
                handleSubmit={handleUpdate}
            />

            {/* 수정/삭제/목록 버튼 영역 */}
            {/* 아래 버튼은 상세보기 mode인 경우에만 보여지게 처리 */}
            {/* mode === 'view' : mode의 값이 view 인 경우(&&)
                 --> && 뒤의 내용을 처리 */}
            {mode === 'view' && (
                <div>
                    <button onClick={() => setMode('edit')}>수정</button>
                    <button onClick={() => handleDelete()}>삭제</button>
                    {/* <button onClick={() => navigate('/cart/list')}>목록</button> */}
                    <button onClick={() => navigate('/cart/list_paging')}>목록</button>
                </div>
            )}
        </div>
    );
};

export default CartView;