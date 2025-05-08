/* React 라이브러리 Import */
import React from "react";

/* 인스턴스 생성(몸체) */
const HomePage = () => {
    // 인스턴스의 처리 내용은 리턴을 함
    return(
        // 화면 구성을 위한 HTML 태그
        // - 무조건 하나의 태그 내에 모든 처리 태그가 포함되어 있어야 함
        // - 하나의 전체 묶음 태그는 보통 div 태그 사용
        <div>
            <h2>Welcom! React HomePage!</h2>
            <hr/>
            
            {/* TestSpringBoot 링크 추가 : React 내에서 페이지 처리 */}
            <p><a href="/test/spring_test">[TestSpringBoot 바로가기]</a></p>

            {/* CartList 링크 추가 */}
            <p><a href="/cart/list">주문내역 목록</a></p>            
        </div>
    );
};

/* 외부에서 사용할 수 있도록 export 정의 */
// pages 또는 App.js 등등 외부에서 HomePage 인스턴스를 불러들일 수 있도록 처리
// 외부에서 사용하는 이름 : HomePage
export default HomePage;