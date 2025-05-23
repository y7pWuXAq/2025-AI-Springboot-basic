// axios 라이브러리를 가져옴 – React에서 HTTP 통신(요청/응답)을 위한 대표적인 라이브러리
import { springApi } from '../config/axiosInstance'; 


// 모든 게시물 목록을 가져오는 기능
export const getBoards = () =>     
    // GET 요청
    springApi.get('/board/list')    


// 게시물 신규 저장 처리 요청 기능
export const insertBoard = (formData) => 
    // - POST 요청
    // - file을 전송하는 경우에는 전송방식을 변경해야 함
    //   -> headers 전송 정보를 : multipart/form-data 형식으로 변경해야 함 
    springApi.post('/board/insert', formData,
                    {headers: { 'Content-Type': 'multipart/form-data' }});   
                    
// 게시물 상세 조회               
export const getBoard = (board_id) => 
    springApi.get(`/board/view/${board_id}`)     // GET 요청  


// 게시물 수정 처리
export const updateBoard = (board_id, formData) => 
    springApi.put(`/board/update/${board_id}`, formData,
                    {headers: { 'Content-Type': 'multipart/form-data' }});  // PUT 요청

// 삭제 처리
export const deleteBoard = (board_id) => 
    springApi.delete(`/board/delete/${board_id}`);     // DELETE 요청                     
