// 리엑트 라이브러리 불러들이기
import React from 'react';

// 페이지 전환을 위한 링크 라이브러리 불러들이기
//  - 상세보기 링크 처리시 사용
//  - Router를 거치는 링크들은 보통 Link로 정의하는 경우가 많음
import { Link } from 'react-router-dom';

const CartListFormPaging = ({cartListData, currentPage, totalPages, handlePageChange}) => {   
    
    /*      Paging 처리      */
    // 보여줄 페이지 번호 갯수 정의
    const pageSize = 10;

    // 최초 또는 <다음>버튼 클릭시 페이지 번호 시작 값 정의하기
    //  - 계산에 의해서 값을 정의
    //  (계산공식) 시작페이지 번호 = ((현재페이지번호 - 1)/보여줄페이지갯수) * 보여줄페이지갯수 + 1
    // - Math.floor : 소숫점 이하는 버림하고 정수값만 반환하는 자바스크립트 함수
    const startPage = Math.floor((currentPage-1)/pageSize) * pageSize + 1;

    // 끝페이지 번호 값 정의하기
    // - 계산에 의해서 값을 정의
    // (계산 공식) 끝페이지 번호 = 시작페이지번호 + 보여줄페이지갯수 - 1
    //             단, 끝페이지 번호가 전체 페이지 보다 크다면 전체페이지로 사용
    // Math.min : startPage + pageSize - 1의 계산값과, totalPages의 값 중에 작은 값 반환
    const endPage = Math.min(startPage + pageSize - 1, totalPages);
    
    // 화면 그리기
    return (
        <div>
            {/* 전체 목록 화면 */}
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
                                {/* 사용자가 선택한 페이지 번호 유지를 위해 상세보기 페이지로 함께 전송 */}
                                <Link to={`/cart/view_paging_reload/${cartDTO.cart_no}/${cartDTO.cart_prod}/${currentPage}`}>[상세보기]</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/*      Paging 처리 시작      */}
            {/*  [이전] 버튼 처리 */}
            <div style={{ marginTop : '20px', textAlign: 'center' }}>
                {/* 현재 페이지가 1보다 크면 보이도록 처리 */}
                {startPage > 1 && (
                    <button onClick={() => handlePageChange(startPage-1)}>
                        이전
                    </button>
                )}
            

                {/*  페이지 번호 출력 처리 */}
                {
                    // 배열 생성하기
                    // - endPage - startPage + 1 : startPage부터 endPage까지의 페이지 번호 계산
                    //   (예 : startPage가 11, endPage가 20이라고 한다면, length=10이됨)
                    // - (_, idx) : map()함수의 반복 기능을 의미함(파이썬에서 range)
                    //   -> _는 무시
                    //   -> idx는 인젝스 번호(0부터 시작) : 0부터 length보다 1작을 때 까지의 배열 생성(반복한다는 의미)
                    Array.from({length: endPage - startPage + 1}, (_, idx) => {
                        // 출력할 페이지 번호 변수 정의
                        //  - 시작페이지번호 부터 idx의 값, 즉 1씩 증가 시킴
                        const page = startPage + idx

                        return (
                            // 배열을 이용해서 태그를 출력할 경우에는 태그 내에 key 속성을 작성해야함
                            <button key={page} onClick={() => handlePageChange(page)}
                                // 현재 선택된 번호는 굵게 표시
                                style={{fontWeight:currentPage === page ? 'bold' : 'normal',
                                        margin: '5px'}}>
                                {page}
                            </button>
                        );
                    })
                }
            
                {/*  [다음] 버튼 처리 */}
                {/* 마지막 페이지번호가 전체페이지 보다 작다면 보이도록 처리 */}
                {endPage < totalPages && (
                    <button onClick={() => handlePageChange(endPage+1)}>
                        다음
                    </button>
                )}
            </div>
        </div>
    );
};

export default CartListFormPaging;