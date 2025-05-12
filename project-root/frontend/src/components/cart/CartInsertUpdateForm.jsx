// 리엑트 불러들이기
import React from 'react';

/**
 * 상세정보 출력 인스턴스 정의하기
 *  - 상세정보 + 입력 + 수정시에 공통으로 사용하기 위한 형태로 작성
 *  - 사용하는 데이터 : cart_no, cart_prod, cart_member, cart_qty
 *  - 상세정보 : 모두 읽기 전용
 *  - 입력 : 모두 쓰기 전용
 *  - 수정 : cart_qty만 쓰기, 나머지는 읽기 전용으로
*/
const CartInsertUpdateForm = ({cart, mode, handleChange, 
                                handleCancel, handleSubmit}) => {

    /* mode에 따라 input type의 readOnly 처리하기 */
    const isReadOnly = (field) => {
        // 상세보기 mode : 모두 읽기 전용으로 처리(쓰기 금지)
        //  - 읽기 전용은 true로
        if(mode === 'view') return true;
        
        // 수정 mode : 주문수량(cart_qty)는 쓰기, 나머지는 읽기 전용으로 처리
        //  - 읽기 전용은 true로
        if(mode === 'edit' && field !== 'cart_qty') return true;

        // mode가 view 및 edit가 아닌 모든 처리는 쓰기 전용으로(입력 mode시 사용됨)
        return false;
    };

    /* mode에 따라 input 박스의 배경색 정의하기 */
    const setBackGroundColor = (field) => {
        // 배경색 정의
        //  - 읽기 전용은 darkgrey 색으로
        //  - 쓰기 전용은 white 색으로

        // 상세보기 mode : 모두 읽기 전용으로 처리(쓰기 금지)
        //  - 읽기 전용은 true로
        if(mode === 'view') return "darkgrey";
        
        // 수정 mode : 주문수량(cart_qty)는 쓰기, 나머지는 읽기 전용으로 처리
        //  - 읽기 전용은 true로
        if(mode === 'edit' && field !== 'cart_qty') return "darkgrey";

        // mode가 view 및 edit가 아닌 모든 처리는 쓰기 전용으로(입력 mode시 사용됨)
        return "white";
    };

    return (
        <form onSubmit={handleSubmit}>
            {/* 주문번호 */}
            <div>
                <label>주문 번호 : </label>
                <input type='text' name='cart_no' value={cart.cart_no || ''} 
                        onChange={handleChange}
                        readOnly={isReadOnly('cart_no')}
                        style={{backgroundColor : setBackGroundColor('cart_no')}} />
            </div>

            {/* 회원아이디 */}
            <div>
                <label>회원 아이디 : </label>
                <input type='text' name='cart_member' value={cart.cart_member || ''}
                        onChange={handleChange}
                        readOnly={isReadOnly('cart_member')}
                        style={{backgroundColor : setBackGroundColor('cart_member')}} />
            </div>

            {/* 상품 코드 */}
            <div>
                <label>상품 코드 : </label>
                <input type='text' name='cart_prod' value={cart.cart_prod || ''}
                        onChange={handleChange}
                        readOnly={isReadOnly('cart_prod')}
                        style={{backgroundColor : setBackGroundColor('cart_prod')}} />
            </div>

            {/* 주문 수량 */}
            <div>
                <label>주문 수량 : </label>
                <input type='number' name='cart_qty' value={cart.cart_qty || ''}
                        onChange={handleChange}
                        readOnly={isReadOnly('cart_qty')}
                        style={{backgroundColor : setBackGroundColor('cart_qty')}} />
            </div>

            {/* mode가 view가 아닌 경우에만 버튼 보이게 처리 */}
            {mode !== 'view' && (
                <div>
                    {/* 수정 또는 입력인 경우에만 사용 */}
                    {/* type='submit' : <form></form> 태그 내에 모든 입력 정보를 전송 */}
                    <button type='submit'>저장</button>

                    {/* 취소 버튼 : 수정 또는 입력을 하지 않고자 할 때.. */}
                    {/*  - CartView에서 별도로 함수 정의하여 사용 */}
                    <button type='button'
                            onClick={(e) => handleCancel(e)}>취소</button>
                </div>
            )}
        </form>
    );
};

export default CartInsertUpdateForm;