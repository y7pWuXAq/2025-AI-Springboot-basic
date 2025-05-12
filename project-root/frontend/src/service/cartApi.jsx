// config/axiosInstance.jsx 불러들이기
import {springApi} from "../config/axiosInstance";

/**
 * 주문내역 전체조회, 상세조회, 입력, 수정, 삭제 관련 전송 URL 정의
 *  - 전송시 파라메터는 ${}를 사용
 *  - ${}를 사용하는 경로는 작은 따옴표('')를 사용할 수 없음
 *    -> 백틱(``)을 사용해야 함(그래야 파라메터 변수가 적용됨)
 *  - ${}를 사용하지 않는 URL 경로에는 그냥 작은 따옴표('') 사용 가능
 */

// 전체조회 인스턴스 변수 생성하기
export const getCarts = () => 
    // get()방식으로 전송
    // - http://localhost:3000/spring/cart/list 로 만드는 작업 수행
    //   -> setupProxy.js에서 http://localhost:8080/cart/list 변경해서 백엔드 서버로 전송
    springApi.get('/cart/list')

/*        Paging 처리           */
// 전체조회 인스턴스 변수 생성하기
export const getCartsPaging = (page, size) => 
    // get()방식으로 전송
    //  - 백엔드의 Page 라이브러리가 관리하는 데이터는 리스트로 관리됨
    //    -> 따라서 page 번호는 0부터 행이 시작된다고 생각하시면 됨
    //    -> Controller에서도 page 파라메터의 defaultValue의 값을 0으로 해놓아도 됩니다.
    springApi.get(`/cart/list_paging?page=${page-1}&size=${size}`)


// 상세조회 인스턴스 변수 생성하기
// - 상세조회는 PK인 cart_no와 cart_prod 값을 매개변수로 받아와야함
// - 매개변수를 SpringBoot에서 정의한 URL패턴에 맞게 정의해야함
export const getCart = (cart_no, cart_prod) =>
    springApi.get(`/cart/view/${cart_no}/${cart_prod}`)

// 입력 인스턴스 변수 생성하기
export const insertCart = (cartDTO) =>
    springApi.post('/cart/insert', cartDTO)

// 수정 인스턴스 변수 생성하기
export const updateCart = (cart_no, cart_prod, cart_qty) =>
    springApi.put(`/cart/update/${cart_no}/${cart_prod}?cart_qty=${cart_qty}`)

// 삭제 인스턴스 변수 생성하기
export const deleteCart = (cart_no, cart_prod) =>
    springApi.delete(`/cart/delete/${cart_no}/${cart_prod}`)