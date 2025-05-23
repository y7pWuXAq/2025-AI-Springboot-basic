import React, { useEffect, useState } from 'react';      // 상태관리 및 생명주기 관리 훅
import { Link, useNavigate } from 'react-router-dom';       // 페이지 이동을 위한 Link 및 페이지 정보

// 날짜 포맷 라이브러리 불러들이기
import dayjs from 'dayjs';

import { getBoards } from '../../service/boardApi';               // 장바구니 전체 조회 API 가지고 오기

const BoardList = () => {
    
    const navigate = useNavigate();    // 페이지 이동을 위한 navigate 함수(페이지 정보를 담고 있음)

    const [boards, setBoards] = useState([]);

    // 컴포넌트 마운트 시 게시글 목록을 가져옴
    useEffect(() => {
        getBoards()  // 마운트 시 API Service 호출
            .then((res) => { 
            setBoards(res.data);  // 성공 시 상태 저장소에 저장
            })
            .catch((err) => {
            console.error('>>>>>>>>>>>게시물 전체 조회 실패:', err);  // 실패 시 에러 출력
            });
    }, []);


    // 화면 정의하기
    return (
        // React에서 제공하는 스타일 적용해서 화면 디자인하기..
        <div>
            <h2>게시글 목록</h2>
            <hr/>
            <div style={{ marginBottom: '10px' }}>
                {/* Home으로 이동 버튼 */}       
                <button onClick={() => navigate('/')}>HOME 으로</button>
                
                &nbsp;
        
                {/* 게시물 등록하기 */}
                <Link to="/board/insert">
                    <button>게시물 신규 등록</button>
                </Link>
            </div>
            <hr/>
            <table border="1" style={{ width: '100%' }}>
                <thead>
                    <tr>
                    <th>번호</th>
                    <th>제목</th>
                    <th>작성자</th>
                    <th>작성일자</th>
                    <th>상세</th>
                    </tr>
                </thead>
                <tbody>
                    {/* cartListData 배열을 반복하며 행을 생성함 */}
                    {/* 배열 안에 있는 각각의 데이터를 item 변수로 받아서 처리 */}
                    {boards.map((board) => (
                    <tr>
                        <td>{board.board_id}</td>
                        <td>{board.title}</td>
                        <td>{board.writer}</td>
                        {/* React 날짜 라이브러리(dayjs)를 이용하여 원하는 포멧으로 출력 */}
                        <td>{dayjs(board.created_at).format('YYYY-MM-DD HH:mm:ss')}</td>
                        <td>
                        {/* 상세 보기 페이지로 이동하는 링크 */}
                        {/* Router를 통해서 페이지 이동을 하기 위해 Link 태그를 이용 */}
                        <Link to={`/board/view/${board.board_id}`}>[상세보기]</Link>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default BoardList;