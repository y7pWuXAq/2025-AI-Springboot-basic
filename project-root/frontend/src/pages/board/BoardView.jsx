import React, { useEffect, useState } from 'react';
// import axiosInstance from '../config/axiosInstance';
import { useParams, useNavigate } from 'react-router-dom';
import { getBoard, deleteBoard } from '../../service/boardApi';

const BoardView = () => {
  const navigate = useNavigate();

  const { board_id } = useParams(); // URL 파라미터에서 게시글 ID 가져옴
  const [board, setBoard] = useState(null);

  // 게시물 상세정보 조회
  useEffect(() => {

    // 상세 페이지 정보 가지고 오기
    const viewBoard = () => {
        getBoard(board_id)   // 서버 API 호출
            .then((res) => {
                setBoard(res.data);   // 응답 데이터로 cart 상태 설정
            })
            .catch((error) => {
                console.error('viewBoard 상세 조회 실패 :', error); // 에러 발생 시 로그 출력
            });
    };
    
    // 상세 페이지 정보 가지고 오기 호출
    viewBoard(); 

     // board_id 값이 바뀔 때 마다 useEffect 로딩됨
  }, [board_id]);


  // 파일 한건(개별) 다운로드
  const handleDownload = (file_id) => {
    window.location.href = `http://localhost:8080/board/download/${file_id}`;
  };


  // 파일 전체 zip으로 다운로드
  const handleDownloadAll = () => {
    window.location.href = `http://localhost:8080/board/download-all/${board_id}`;
  };


  // 게시물 삭제하기
  const handleDelete = async () => {

    if (!window.confirm('정말 삭제하시겠습니까?')) return;  // 사용자 확인 후 진행    
        deleteBoard(board_id)       // 삭제 API 호출
            .then(() => {
                alert('삭제 완료');              // 성공 시 알림
                navigate('/board/list');          // 목록 페이지로 이동
            })
            .catch((error) => {
                console.error('삭제 실패:', error);  // 실패 시 오류 출력
            });
  };

  if (!board) return <div>Loading...</div>;

  return (
    <div>
      <h2>게시글 상세</h2>
      <hr/>
      <div>
        <h3>제목 : {board.title}</h3>
        <p>작성자 : {board.writer}</p>
        <p>내용 : {board.content}</p>
        <p>작성일 : {new Date(board.created_at).toLocaleString()}</p>
      </div>

      <hr/>
      
      <h4>첨부파일</h4>
      <ul>
        {board.files.map(file => (
          <li key={file.file_id}>
            {file.original_filename}{" "}
            <button
              onClick={() => handleDownload(file.file_id)}>
              다운로드
            </button>
          </li>
        ))}
        {board.files.length === 0 && (
          <h5>없음</h5>
        )}
      </ul>

      {board.files.length > 0 && (
        <button onClick={() => handleDownloadAll()}>
          전체 다운로드 (ZIP)
        </button>
      )}

      <hr/>
      <button onClick={() => navigate(`/board/update/${board_id}`)}>수정</button>
      <button onClick={() => handleDelete()}>삭제</button>
      <button onClick={() => navigate('/board/list')}>목록</button>
    </div>      
  );
};

export default BoardView;