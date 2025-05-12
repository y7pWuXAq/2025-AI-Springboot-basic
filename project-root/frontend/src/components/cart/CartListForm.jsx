// 리엑트 라이브러리 불러들이기
import React from 'react';

// 페이지 전환을 위한 링크 라이브러리 불러들이기
//  - 상세보기 링크 처리시 사용
//  - Router를 거치는 링크들은 보통 Link로 정의하는 경우가 많음
import { Link } from 'react-router-dom';

const CartListForm = ({cartListData}) => {    
    // 화면 그리기
    return (
        <table border="1" style={{ width : '100%' }}>
            {/* 제목 넣는 영역 */}
            <thead>
                <tr>
                    <th>주문번호</th>
                    <th>회원아이디</th>
                    <th>상세보기</th>
                </tr>
            </thead>
            {/* 데이터 넣는 영역 */}
            <tbody>
                {/* 주문정보 전체 데이터 반복하면서 출력하기 */}
                {/*  - 데이터는 리스트로 되어있음 : map()함수로 반복처리
                     - map() : 반복문을 수행하는 함수임
                       -> 반환값은 list 안에 들어 있는 값을 리턴함 */}
                {cartListData.map((cartDTO) => (
                    <tr>
                        <td>{cartDTO.cart_no}</td>
                        <td>{cartDTO.cart_member}</td>
                        <td>
                            <Link to={`/cart/view/${cartDTO.cart_no}/${cartDTO.cart_prod}`}>[상세보기]</Link>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default CartListForm;