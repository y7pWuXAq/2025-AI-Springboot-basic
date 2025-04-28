package com.pknu.project.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;



/**
 * controller 폴더에 Day0101_Index.java 파일 생성
 *  - /index 경로에 대해서 -> root() 메소드 호출
 *  - 응답은 "<h2>스프링부트 메인 페이지 입니다.</h2>"
 *  - Test.java 파일 내에 root() 메소드 부분은 주석처리 
*/

// Rest API 전용 라이브러리 사용
//  -> 사용자의 요청과 응답을 담당하는 라이브러리
// @RestController : 최초 진입점을 의미하는 Controller 클래스를 호출하겠다는 의미
//                 : Rest는 Rest API를 의미하며 프론트엔드가 별도로 분리되었다는 의미
@RestController
public class Day0101_IndexController {
    /**
     * 요청 URL 패턴 http://localhost:8080/index
     * @return
    */
    // @GetMapping(path="/index")
    // public String root(){
    //     return "<h2>스프링부트 index 페이지 입니다!! *^^*</h2>";
    // }

    /**
     * path의 root 경로
     *  - "/" : http://localhost:8080
     *  - 슬래시 유무 상관없이 모두 같은 URL을 의미
     *  - 따라서 메소드는 한개만 지정 가능, path 경로도 한가지만 사용 가능
     * @return
    */
    // @GetMapping(path="/")
    // public String root2(){
    //     return "<h2> 스프링부트 메인 페이지 입니다!! *^^*</h2>";
    // }

    /**
     * 해당 프로젝트의 root 경로가 됨
     *  - 사이트의 시작 페이지를 의미함
     * @return
    */
    @GetMapping(path={"/", "/index", "/index.html", "/index.jsp", "/index.php"})
    public String root3(){
        // return "<h2> 스프링부트 메인 페이지 입니다!! *^^* 야호 ! </h2>";

        // 버퍼 메모리에 문자열을 행단위로 작성하여 문자열 변수처럼 사용하는 객체
        StringBuffer sb = new StringBuffer();

        sb.append("<h3>스프링부트 메인 페이지 입니다.</h3>");
        sb.append("<hr/>");
        sb.append("<table border=1 width=500>");
        sb.append("<tr><th>페이지 정보</th><th>바로가기 링크</th><tr>");
        sb.append("<tr><td>숫자 파라미터</th><th><a href='/path_variable/3'>바로가기</a></td><tr>");
        sb.append("<tr><td>파라미터 1개</th><th><a href='/param?mem_id=a001'>바로가기</a></td><tr>");
        sb.append("<tr><td>회원 전체조회</th><th><a href='/member/list'>바로가기</a></td><tr>");
        sb.append("<tr><td>회원 상세조회</th><th><a href='/member/view'>바로가기</a></td><tr>");
        sb.append("<tr><td>회원 정보입력</th><th><a href='/member/insert'>바로가기</a></td><tr>");
        sb.append("<tr><td>회원 정보수정</th><th><a href='/member/update'>바로가기</a></td><tr>");
        sb.append("<tr><td>회원 정보삭제</th><th><a href='/member/delete'>바로가기</a></td><tr>");

        // 버퍼 메모리에 저장된 문자열 데이터를 문자열 타입(toString())으로 변환하여 전달
        return sb.toString();
    }
    
    /**
     * URL 패스 경로 뒤에 숫자를 넣어서 처리도 가능
     *  - http://localhost:8080/path_variable/숫자
     *  - @PathVariable : 경로 뒤의 숫자를 추출하는 어노테이션 (라이브러리)
     * @param id
     * @return
    */
    @GetMapping(path="/path_variable/{id}")
    public String pathVariable(@PathVariable int id) {
        return "숫자 파라미터를 받아서 처리 : " + id;
    }

    /**
     * - 사용자 폼 데이터를 get 방식으로 전송 받을 때 사용하는 방식
     * - http://localhost:8080/param?mem_id=a001
     * - @RequestParam : 사용자가 전달(요청)하기 위해 전달해준 정보를 의미
     *                 : Key = value의 형태로 서버에 전송됨
     *                 : 서버에서는 Key 이름을 매개변수로 받음
     *                    (Key는 매개변수명과 동일해야 함)
     * @return
    */
    @GetMapping(path="/param")
    public String paramVariable(@RequestParam String mem_id) {
        return "Key = value 형태의 파라미터를 받아서 처리 = " + mem_id;
    }

    /**
     * - 사용자 폼 데이터를 get 방식으로 전송 받을 때 사용하는 방식
     * - http://localhost:8080/param2?mem_id=a001&mem_name=해주
     * @param mem_id
     * @return
    */
    @GetMapping(path="/param2")
    public String paramVariable2(@RequestParam String mem_id,
                                 @RequestParam String mem_name) {
        return "아이디 : %s / 이름 : %s".formatted(mem_id, mem_name);
    }

    /**
     * 페이지 전환 처리
     * - http://localhost:8080/page_change
     * @return
    */
    @GetMapping(path="/page_change")
    public String pageChange() {
        return "<a href='/'>HOME 바로가기</a>";
    }

    /**
     * <회원관리 URL 패턴 만들기>
     *  - 회원관리 URL : /member
     *    - 회원 전체조회 : /list   -> getMemberList()
     *    - 회원 상세조회 : /view   -> getMemberView()
     *    - 회원 정보입력 : /insert -> getMemberInsert()
     *    - 회원 정보수정 : /update -> getMemberUpdate()
     *    - 회원 정보삭제 : /delete -> getMemberDelete()
     * 
     * - 모두 GetMapping() 어노테이션 사용
     * - 위의 처리 후 결과값(return)은 자유롭게 출력
    */

    // @GetMapping(path="/member/list")
    // public String getMemberList() {
    //     return "회원 전체조회 창 입니다.";
    // }

    // @GetMapping(path="/member/view")
    // public String getMemberView() {
    //     return "회원 상세조회 창 입니다.";
    // }

    // @GetMapping(path="/member/insert")
    // public String getMemberInsert() {
    //     return "회원 정보입력 창 입니다.";
    // }

    // @GetMapping(path="/member/update")
    // public String getMemberUpdate() {
    //     return "회원 정보수정 창 입니다.";
    // }

    // @GetMapping(path="/member/delete")
    // public String getMemberDelete() {
    //     return "회원 정보삭제 창 입니다.";
    // }
}
