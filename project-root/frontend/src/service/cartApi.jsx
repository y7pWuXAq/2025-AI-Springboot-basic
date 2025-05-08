/* config/axiosInstance.jsx 불러들이기 */
import {springApi} from "../config/axiosInstance";


/** 주문내역 전체조회, 상세조회, 입력, 수정, 삭제 관련 전송 url 정의 
*   - 전송 시 파라미터는 ${}를 사용
*   - ${}를 사용하는 경로는 작은 따옴표('')를 사용할 수 없음
*      -> 백틱(``)을 사용해야 파라미터 변수가 적용됨
*   - ${}를 사용하지 않는 url 경로에는 작은 따옴표 사용 가능
*/

// 전체조회 인스턴스 변수 생성
export const getCarts = () =>
    // get() 방식으로 전송
    springApi.get('/cart/list')

// 상세조회 인스턴스 변수 생성
// - 상세조회는 PK인 cart_no와 cart_prod 값을 매개변수로 받아와야 함
// - 매개변수를 SpringBoot에서 정의한 url 패턴에 맞게 정의햐아 함
export const getCart = (cart_no, cart_prod) =>
    springApi.get(`/cart/view/${cart_no}/${cart_prod}`)

// 입력 인스턴스 변수 생성
export const insertCart = (cartDTO) =>
    springApi.post('/cart/insert', cartDTO)

// 수정 인스턴스 변수 생성
export const updateCart = (cart_no, cart_prod, cart_qty) =>
    springApi.put(`/cart/update/${cart_no}/${cart_prod}?cart_qty=${cart_qty}`)

// 삭제 인스턴스 변수 생성
export const deleteCart = (cart_no, cart_prod) =>
    springApi.delete(`/cart/delete/${cart_no}/${cart_prod}`)