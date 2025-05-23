// React import
import React from 'react';      

// 상세 이동을 위한 링크 컴포넌트                              
import { Link } from 'react-router-dom';                         

/**
 * CartListForm 컴포넌트 
 *  - /src/page/CartList.jsx에서 사용됨
 * @param {Array} cartListData - 장바구니 항목 배열
 */

//cartList를 파라메터로 받아오기
/*****************[Paging 추가 사항]****************/
const CartListForm = ({ cartListData, currentPage, totalPages, handlePageChange }) => {

  // 페이지 번호는 10개만 보이도록 표시
  const pageSize = 10;

  // 현재 페이지의 시작 페이지 번호 (예: 1, 11, 21 ...)
  // - floor() : 소숫점 이하는 버림하는 함수
  const startPage = Math.floor((currentPage - 1) / pageSize) * pageSize + 1;

  // 현재 페이지의 끝 페이지 번호
  //  - 전체 페이지 수를 초과하지 않도록 처리
  const endPage = Math.min(startPage + pageSize - 1, totalPages);

  return (
    <div>
      <table border="1" style={{ width: '100%' }}>
        <thead>
          <tr>
            <th>번호</th>
            <th>상품 코드</th>
            <th>회원 ID</th>
            <th>수량</th>
            <th>상세</th>
          </tr>
        </thead>
        <tbody>
          {/* cartListData 배열을 반복하며 행을 생성함 */}
          {/* 배열 안에 있는 각각의 데이터를 item 변수로 받아서 처리 */}
          {cartListData.map((item) => (
            <tr>
              <td>{item.cart_no}</td>
              <td>{item.cart_prod}</td>
              <td>{item.cart_member}</td>
              <td>{item.cart_qty}</td>
              <td>
                {/* 상세 보기 페이지로 이동하는 링크 */}
                {/* Router를 통해서 페이지 이동을 하기 위해 Link 태그를 이용 */}
                <Link to={`/cart/view_paing_reload/${item.cart_no}/${item.cart_prod}/${currentPage}`}>[상세보기]</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>   

      {/* *****************[Paging 추가 사항]**************** */}
      {/* 페이징 버튼 */}
      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        {/* ◀ 이전 버튼: 현재 페이지가 1보다 크면 보이도록 */}
        {startPage  > 1 && (
          <button onClick={() => handlePageChange(startPage  - 1)}>
            {/* ◀ 이 기호는 : 메모장에서 "ㅁ" 입력 -> [한자] 키보드 선택 -> 아래 화살표로 기호 선택 -> 복사해서 사용 */}
            ◀ 이전
          </button>
        )}

        {/* 페이지 번호 버튼 */}
        {/* Array.from()을 사용하여 endPage - startPage + 1 길이의 배열을 생성
            - 그 배열을 map()처럼 반복하면서, 각 페이지 번호 버튼을 생성 */}

        {/* Array.from() -> 배열을 새로 생성 */}
        {/* length: endPage - startPage + 1 -> startPage부터 endPage까지의 페이지 번호 개수를 계산
             (예: startPage = 11, endPage = 20이면 length = 10) */}
        {/* (_, idx) : map 함수와 유사하게 반복 수행함
             -> _는 무시되는 값 (배열 요소(내용은 비어 있음)를 무시) 
             -> idx는 인덱스 번호 (0부터 시작) : 0부터 length보다 1작을 때까지 반복한다는 의미 */}
        {Array.from({ length: endPage - startPage + 1 }, (_, idx) => {
          // page는 실제 페이지 번호를 의미
          //  - 예: startPage = 1이면, idx 1부터 → 10까지 표시됨
          const page = startPage + idx;
          return (
              <button key={page} onClick={() => handlePageChange(page)}
                      // 현재 선택된 번호는 굵게 표시..
                      style={{
                        margin: '5px',
                        fontWeight: currentPage === page ? 'bold' : 'normal'
                      }}>
                {/* 실제 페이지 번호 표시 */}
                {page}
              </button>
            );
          })}

        {/* ▶ 다음 버튼: 현재 페이지가 마지막 페이지보다 작으면 보이도록 */}
        {endPage  < totalPages && (
          <button onClick={() => handlePageChange(endPage  + 1)}>
            {/* ◀ 이 기호는 : 메모장에서 "ㅁ" 입력 -> [한자] 키보드 선택 -> 아래 화살표로 기호 선택 -> 복사해서 사용 */}
            다음 ▶
          </button>
        )}
      </div>

    </div>
  );
};

export default CartListForm;