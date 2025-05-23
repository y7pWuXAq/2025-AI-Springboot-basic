import React from 'react';                            // React 불러오기
import { Routes, Route } from 'react-router-dom';     // 라우팅을 위한 컴포넌트들 불러오기

import BoardList from '../pages/board/BoardList';   // 게시물 목록 페이지
import BoardInsert from '../pages/board/BoardInsert';   // 게시물 입력 페이지
import BoardView from '../pages/board/BoardView';   // 게시물 상세 페이지
import BoardUpdate from '../pages/board/BoardUpdate';   // 게시물 상세 페이지

// Cart 관련 라우트를 묶어서 내보내는 컴포넌트
const BoardRouters = () => {
  return (
    <Routes>

      {/* 게시물 목록 페이지 라우트  */}
      <Route path="/board/list" element={<BoardList />} />

      {/* 게시물 입력 페이지 라우트  */}
      <Route path="/board/insert" element={<BoardInsert />} />

      {/* 게시물 상세 페이지 라우트  */}
      <Route path="/board/view/:board_id" element={<BoardView />} />

      {/* 게시물 수정 페이지 라우트  */}
      <Route path="/board/update/:board_id" element={<BoardUpdate />} />

    </Routes>
  );
};

// 외부(App.jsx)에서 사용할 수 있도록 내보냄
export default BoardRouters;