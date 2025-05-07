package com.pknu.project.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.pknu.project.model.Day0201_Member;
import com.pknu.project.service.Day0201_MemberService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;


/**
 * Controller 클래스임을 정의
 *  서버 실행 시 자동으로 Day0201_MemberController 클래스 생성시킴 
*/
@RestController

/* 회원관리 카테고리 URL 패턴을 분리하여 관리
 * - /member 로 요청이 들어오면 Day0201_MemberController 클래스 호출하도록 정의 */
@RequestMapping("/member")

// 서버 실행 시 미리 생성해야하는 생성자 호출하여 생성
@RequiredArgsConstructor
public class Day0201_MemberController {

    // 서비스 클래스 멤버 객체 선언만 하기
    private final Day0201_MemberService day0201_MemberService;

    // 생성자 정의
    @Autowired
    public Day0201_MemberController(Day0201_MemberService day0201_MemberService) {
        this.day0201_MemberService = day0201_MemberService;
    }

    // 회원 전체조회 /list -> getMemberList()
    // get 방식으로 파라미터 전송 : http://localhost:8080/member/list
    @GetMapping(path="/list")
    public String getMemberList() {
        // Service 객체를 통해서 회원 전체조회 메소드 호출
        List<Day0201_Member> list = this.day0201_MemberService.getMemberList();

        // 받아온 값(객체)가 없는 경우
        if(list == null) {
            return "조회 결과가 없습니다.";
        }

        // 받아온 값(객체)가 있는 경우
        StringBuffer sb = new StringBuffer();
        sb.append("<h2>회원 전체 목록</h2>");
        sb.append("<hr/>");
        sb.append("<table border=1 width=500>");
        sb.append(" <tr><th>아이디</th><th>패스워드</th><th>이름</th></tr>");
        for(Day0201_Member member : list) {
            sb.append("<tr><td>" + member.getMem_id() + "</td><td>" + member.getMem_pass() + "</td><td>" + member.getMem_name() + "</td></tr>");
        }
        sb.append("</table>");

        // return "Day0201_MemberController : 회원 전체조회 창 입니다.";
        return sb.toString();
    }

    // 회원 상세조회 /view -> getMemberView()
    // get 방식으로 파라미터 전송 : http://localhost:8080/member/view?mem_id=a001
    @GetMapping(path="/view")
    public String getMemberView(@RequestParam String mem_id) {
        // @RequestParam : get 방식으로 전송 요청된 모든 파라미터 변수들을 가지고 있음
        //               : 전송 시 사용하는 파라미터(key) 이름과 매개변수 이름이 같아야 함

        // 서비스 클래스에게 상세조회 메소드 호출하여 처리
        Day0201_Member mem = this.day0201_MemberService.getMemberView(mem_id);

        // 조회 결과가 없을 때 응답할 내용 정의
        if(mem == null) {
            return "회원 아이디(%s)에 대한 조회 결과가 없습니다.".formatted(mem_id);
        }

        // 조회 결과가 있을 때 응답할 내용 정의
        // 받아온 값(객체)가 있는 경우
        StringBuffer sb = new StringBuffer();
        sb.append("<h2>회원 상세 조회</h2>");
        sb.append("<hr/>");
        sb.append("<table border=1 width=500>");
        sb.append(" <tr><th>아이디</th><th>패스워드</th><th>이름</th></tr>");
        
        //조회결과 추출하여 응답 결과 생성
        sb.append("<tr><td>" + mem.getMem_id() + "</td><td>" + mem.getMem_pass() + "</td><td>" + mem.getMem_name() + "</td></tr>");
        sb.append("</table>");

        return sb.toString();
        // return "Day0201_MemberController : 회원 상세조회 성공!";
    }

    // 회원정보입력 : /insert -> setMemberInsert()
    //  - postMapping : 사용자로부터 전송받는 데이터가 많은 경우에 사용
    //  - RequestBody : post 전송방식으로 사용자 데이터를 받고자 할 때 사용
    //                : 사용자의 입력 form 태그 내의 모든 key:value를 가지고 있음
    //                : RequestBody의 모든 데이터는 Model 클래스와 자동 바인딩 됨
    //                  (@RequestBody Day0201_Member member)
    //                  --> 사용자의 입력 form태그 내에 key 이름은 Model 클래스의 멤버 변수명과 동일해야 함
    @PostMapping(path="/insert")
    public String setMemberInsert(@RequestBody Day0201_Member member){
        
        // 서비스 return 결과를 msg 변수가 받아서 처리
        String msg = this.day0201_MemberService.setMemberInsert(member);
        return "Day0201_MemberController : " + msg;

        // return "Day0201_MemberController : 회원 정보 입력 성공!";
    }

    // 회원 정보수정 /update -> setMemberUpdate()
    // - get방식 요청 URL : http://localhost:8080/member/update?mem_id=a001&mem_name=홍길동
    // - post 방식으로 수정
    @PostMapping(path="/update")
    public String setMemberUpdate(@RequestBody Day0201_Member member) {

        // 서비스 return 결과를 msg 변수가 받아서 처리 
        String msg =  this.day0201_MemberService.setMemberUpdate(member.getMem_id(), member.getMem_name());
        return "Day0201_MemberController  : %s".formatted(msg);

        // return "Day0201_MemberController : 회원 정보 수정 성공!";
    }

    // 회원 정보삭제 : /delete -> getMemberDetele()
    // 요청 URL 예시 : http://localhost:8080/member/delete?mem_id=a002
    @GetMapping(path="/delete")
    public String setMemberDetele(@RequestParam String mem_id) {
        String msg = this.day0201_MemberService.setMemberDelete(mem_id);
        return "Day0201_MemberController : " + msg;
    }
}
