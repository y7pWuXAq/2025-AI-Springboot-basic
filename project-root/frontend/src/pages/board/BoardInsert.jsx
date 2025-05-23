import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';           // 페이지 이동을 위한 훅

import { insertBoard } from '../../service/boardApi';            // 장바구니 항목 추가 API import


const WriteBoard = () => {

    // 입력 필드의 상태값 관리
    const [title, setTitle] = useState('');
    const [writer, setWriter] = useState('');
    const [content, setContent] = useState('');

    // 파일 여러개 선택 저장
    const [files, setFiles] = useState([]);

    const navigate = useNavigate();

    // 파일 선택시 처리
    const handleFileChange = (e) => {
        setFiles(e.target.files); // 다중 파일 선택
    };

    // 저장 처리하기
    const handleSubmit = async (e) => {
        // 기본 submit 이벤트 막기
        e.preventDefault();     
        
        // file과 함께 전송할 경우에는 FormData 객체에 담아서 Post 방식으로 전송
        const formData = new FormData();

        formData.append('title', title);
        formData.append('writer', writer);
        formData.append('content', content);

        for (let i = 0; i < files.length; i++) {
            formData.append('files', files[i]); // 여러 파일 추가
        }
         
        // SpringBoot 서버로 저장 요청 진행                 
        insertBoard(formData)     
            // 응답 처리
            .then(() => {
                alert('게시물 추가 완료');  // 성공 시 알림 표시
                navigate('/board/list');  // 목록 페이지로 이동
            })
            // 예외 처리
            .catch((error) => {
                console.error('게시물 추가 실패:', error);  // 실패 시 오류 출력
            });
      };


  return (
    <div>
      <h2>게시글 작성</h2>
      <hr/>
      <form onSubmit={handleSubmit}>
        <div>
          <label>제목 : </label>
          <input type="text" value={title} size={50}
                  onChange={(e) => setTitle(e.target.value)} 
                  placeholder="제목" required />
        </div>

        <div>
          <label>작성자 : </label>
          <input type="text" value={writer}  size={10}
                  onChange={(e) => setWriter(e.target.value)} 
                  placeholder="작성자" required />
        </div>

        <div>
          <label>내용 : </label>
          <br/>
          <textarea value={content} rows={10} cols={100}
                  onChange={(e) => setContent(e.target.value)} 
                  placeholder="내용" required />
        </div>

        <div>
          {/* 파일 여러개 선택 가능 : multiple */}
          <input type="file" onChange={handleFileChange} multiple />
        </div>

        <hr/>
        <button type="submit">저장</button>
      </form>
    </div>
  );
};

export default WriteBoard;