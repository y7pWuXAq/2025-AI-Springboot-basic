/**
 * - SpringBoot 서버로 전체리스트 요청 및 응답 받는 기능 처리
 * - 응답 받은 데이터를 components의 화면에 출력할 수 있도록 데이터 전달
*/

// 리엑트 라이브러리, 상태관리 훅 불러들이기
import React, {useEffect, useState} from 'react';

// 링크(라우팅 처리용, 입력 링크 처리) 및 페이지 정보 라이브러리 불러들이기
import {Link, useNavigate} from 'react-router-dom';

// SpringBoot 서버로 요청 처리를 위한 cartApi 불러들이기
import {getCartsPaging} from '../../service/cartApi';

// SpringBoot로부터 응답 받은 데이터를 출력할 컴포넌트 불러들이기
import CartListFormPaging from '../../components/cart/CartListFormPaging';


/*        Paging Reload 처리        */
// 사용자가 선택한 페이지 번호에서 새로고침 또는 상세페이지로 전환되었다가 
//  -> 다시 리스트 페이지로 왔을 때 초기화 되는 현상을 막기 위한 방법이 필요
//  -> 현재 페이지 번호를 페이지 전환시 또는 새로고침시에도 유지될 수 있도록 하면 해결됨

// - 선택된 페이지 번호를 파라메터로 관리해야함
// - 해당 페이지 번호를 다른 페이지로 전환시 전달해야함
//   단, 현재 CartRouters의 URL패턴은 그대로 유지하면서, 
//   --> 목록에서만 get방식 전송을 처리 (예시 : /cart/list_paging?page=2)

// - useSearchParams : 페이지 자체적으로 전송방식을 생성하는 라이브러리(훅)
import { useSearchParams } from 'react-router-dom';


// 주문내역 전체 조회 인스턴스 생성하기
const CartListPagingReload = () => {
    
    // 페이지 처리를 위한 네비게이트 인스턴스 생성
    const navigate = useNavigate();

    // SpringBoot에서 응답받은 데이터를 저장할 상태변수 정의
    //  - cartListData : 상태변수명(인스턴스)
    //  - setCartListData() : 상태변수의 값을 저장하는 함수(setter)
    //  - useState([]) : 상태변수의 타입 정의(리스트 타입)
    const [cartListData, setCartListData] = useState([]);

    /***** [ Paging 처리 ] *****/

    // get방식의 쿼리파라메터(url 뒤에 ?물음표 뒤에 있는 파라메터들)에서 page 파라메터 받아와서 관리하는 상태관리 변수
    // - get방식으로 전달받은 모든 파라메터 변수들은 이곳에 저장됨(key : value 형태로 저장됨)
    const [searchParams, setSearchParams] = useSearchParams();

    // searchParams에서 page 파라메터 변수값 추출하기
    // - page 파라메터는 사용자가 선택한 페이지 번호를 담아서 전송시 사용되는 파라메터 변수임
    // - searchParams.get() : 저장되어 있는 파라메터 중에 page key에 대한 값 추출
    //                      : 값이 없으면 -> default로 1을 사용하겠다는 의미 
    // - parseInt() : 문자열 숫자값을 정수값으로 타입 변환하는 함수
    const currentPageFromQuery = parseInt(searchParams.get('page') || '1'); 

    // 상태 관리 2개와 변수 1개 정의
    // - 현재 페이지 번호를 관리하는 상태변수 정의
    const [currentPage, setCurrentPage] = useState(currentPageFromQuery);

    // - 전체 페이지 수를 관리하는 상태변수 정의
    const [totalPages, setTotalPages] = useState(0);

    // - 한 페이지에 보여질 행의 갯수 변수로 정의 (변경 불가, 상수)
    const size = 10;
    

    // 페이지 로딩(실행)시에 처리를 위해 useEffect() 사용
    //  - 로딩시 무조건 최초 실행
    useEffect(() => {

        /* SpringBoot에 주문전체 정보를 요청하여 응답 받아오기 */
        const getPagingData = () => {

            getCartsPaging(currentPage, size)
                // 받아온 응답값 처리하기(응답데이터는 res에 있음)
                .then((res) => {
                    // 상태변수에 응답데이터 저장시키기
                // - res.data의 타입은 Page 타입으로 행데이터와 페이지데이터가 key:value로 구성되어 있음
                //   -> 행관련 List 데이터는 content : [{}, {}...] 이런 형태로 되어 있음
                    setCartListData(res.data.content);

                    // 현재 페이지 번호 상태 저장
                    // -> 백엔드에서 관리하는 page번호는 0부터 시작됨 : 따라서 1 더하기
                    // setCurrentPage(res.data.number + 1);

                    // 전체 페이지 수 저장
                    setTotalPages(res.data.totalPages);
                })
                // 예외 처리
                .catch((err) => {
                    console.error(">>>>>>>>>>> 주문내역 전체조회-Paging 실패 : ", err);
                });
        };
        
        // 최초 페이지 로딩시 처리할 내용 프로그램 시작
        getPagingData();
        
       // 대괄호 []안에 값이 없으면 : useEffect는 처음 한번만 호출됨
       // 대괄호 []안에 값이 있으면 : 대괄호[]안의 값이 변경될때마다 useEffect가 실행됨
    }, [currentPage]);


    /******* Paging 처리 *******/
    const handlePageChange = (page) => {
        // 스프링부트 요청 함수 호출
        // getPagingData(page);

        // 현재 페이지 번호 변경하기
        //  - currentPage 값을 변경
        //   : 변경하면 useEffect는 다시 로딩됨
        //     (자동으로 백엔드에 해당 페이지번호로 데이터 요청함)
        setCurrentPage(page);

        // url 쿼리 파라미터 변경
        //  - 자체적으로 get 전송방식으로 사용되는 page 전송 파라메터의 값을 셋팅하기
        //  - 사용자가 선택한 페이지 번호를 문자열로 변환(toString())하여 page 파라메터에 넣기 
        //   -> 자체적으로 사용되는 URL : http:localhost:3000/cart/paging_list?page=값
        setSearchParams({ page : page.toString() });
    };

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
                <CartListFormPaging 
                    // 주문내역 목록 10건 전달
                    cartListData={cartListData}

                    /*      Paging 처리      */
                    // 현재 페이지 번호 전달
                    currentPage = {currentPage}

                    // 전페 페이지 수 전달
                    totalPages = {totalPages}
                    
                    // 페이지 변경시 호출할 함수 전달(콜백 함수, 이벤트 발생시 호출되는 함수)
                    handlePageChange = {handlePageChange}
                />
            </div>
        </div>
    );
};

export default CartListPagingReload;