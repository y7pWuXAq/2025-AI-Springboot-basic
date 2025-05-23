import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getBoard, updateBoard } from '../../service/boardApi'; // API 함수 불러오기


const BoardUpdate = () => {
    const { board_id } = useParams();
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [files, setFiles] = useState([]);
    const [existingFiles, setExistingFiles] = useState([]);
    const [deleteFileIds, setDeleteFileIds] = useState([]);

    useEffect(() => {

        // 상세 페이지 정보 가지고 오기
        const viewBoard = () => {
            getBoard(board_id)   // 서버 API 호출
                .then((res) => {
                    const data = res.data;
                    setTitle(data.title);
                    setContent(data.content);
                    setExistingFiles(data.files);
                })
                .catch((error) => {
                    console.error('수정 실패 :', error); // 에러 발생 시 로그 출력
                });
        };
        
        // 상세 페이지 정보 가지고 오기 호출
        viewBoard(); 

        // 게시물 번호가 바뀌면 재로딩됨
    }, [board_id]);


    /**
     * 파일 수정
     * @param {} e 
     */
    const handleFileChange = (e) => {
        setFiles([...e.target.files]);
    };


    /**
     * 삭제(수정)할 파일 선택
     * @param {} fileId 
     */
    const handleDeleteToggle = (file_id) => {
        if (deleteFileIds.includes(file_id)) {
            setDeleteFileIds(deleteFileIds.filter(id => id !== file_id));

        } else {
            setDeleteFileIds([...deleteFileIds, file_id]);
        }
    };


    /**
     * SpringBoot Server에 수정 요청 및 응답 받기
     * @param {} e 
     */
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('board', new Blob([JSON.stringify({ title, content })], 
                        { type: 'application/json' }));

        files.forEach(file => {
            formData.append('files', file);
        });

        deleteFileIds.forEach(file_id => {
            formData.append('deleteFileIds', file_id);
        });

        // SpringBoot에 수정 요청하기
        updateBoard(board_id, formData)   // 수정 API 호출
            .then(() => {
                alert('수정 완료');       // 성공 시 알림 표시
                navigate(`/board/view/${board_id}`);
            })
            .catch((error) => {
                console.error('수정 실패:', error); // 실패 시 콘솔에 에러 출력
            });
    };

    return (
        <div>
            <h2>게시글 수정</h2>
            <hr/>

            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <label>제목 : </label>
                <input value={title} size={40}
                    onChange={e => setTitle(e.target.value)} placeholder="제목" />

                <br/>
                <label>내용</label>
                <br/>
                <textarea value={content} rows={10} cols={50}
                        onChange={e => setContent(e.target.value)} placeholder="내용" />
                
                <hr/>
                <h4>기존 첨부파일(선택 삭제)</h4>
                <ul>
                    {existingFiles.length === 0 && (
                        <h5>없음</h5>
                    )}
                    {existingFiles.map(file => (
                        <li key={file.file_id}>
                        <label>
                            {file.original_filename}{" "}
                            <input
                                type="checkbox"
                                checked={deleteFileIds.includes(file.file_id)}
                                onChange={() => handleDeleteToggle(file.file_id)}
                            />
                            <span>{file.originalFileName}</span>
                        </label>
                        </li>
                    ))}
                </ul>
                
                <hr/>
                <div>
                    <label className="block">새 파일 선택 (다중 업로드)</label>
                    <input type="file" multiple onChange={handleFileChange} />
                </div>
                
                <hr/>
                <button type="submit">수정 완료</button>

                {/* 취소 버튼(다시 상세 페이지로 이동) */}
                <button type="button" onClick={()=>{navigate(-1)}}>취소</button>
            </form>
        </div>
    );
};

export default BoardUpdate;