// url과 instance를 매핑하는 작업
/* React 라이브러리 불러들이기 */
import React from "react";

/* 라우팅을 위한 라이브러리(컴포넌트)들 불러들이기 */
import {Routes, Route} from 'react-router-dom';

/* 외부에 있는 HomePage.jsx 인스턴스 불러들이기 */
import HomePage from "../components/HomePage";

/* 외부에 있는 TestSpringBoot.jsx 인스턴스 불러들이기 */
import TestSpringBoot from "../pages/test/TestSpringBoot";

/* 인스턴스 생성 */
const HomeRouters = () => {
    return (
        // xml 태그로 라우터 컴포넌트 사용
        <Routes>
            {/* HomePage 매핑 */}
            {/* url 패턴 : / , 매핑 컴포넌트 HomePage.jsx */}
            <Route path='/' element={<HomePage />} />

            {/* url 패턴 정의 : test/spring_test */}
            <Route path="/test/spring_test" element={<TestSpringBoot />} />
        </Routes>
    );
};

/* App.js에서 사용할 수 있도록 HomeRouters 내보내기 */
export default HomeRouters;