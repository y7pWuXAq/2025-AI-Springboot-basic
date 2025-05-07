package com.pknu.project.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.pknu.project.model.Day0301_Prod;
import com.pknu.project.service.Day0301_ProdService;

import lombok.RequiredArgsConstructor;

/**
 * Controller 클래스임을 정의
 *  서버 실행 시 자동으로 Day0301_ProdController 클래스 생성시킴 
*/
@RestController

// 카테고리 URL 분리
@RequestMapping("/prod")

// 서버 실행 시 미리 생성해야하는 생성자 호출하여 생성
@RequiredArgsConstructor
public class Day0301_ProdController {
    
    // 서비스 클래스 멤버 객체 선언
    private final Day0301_ProdService day0301_ProdService;

    // 생성자 정의
    @Autowired
    public Day0301_ProdController(Day0301_ProdService day0301_ProdService) {
        this.day0301_ProdService = day0301_ProdService;
    }

    // 상품 전체 조회
    // get 방식으로 파라미터 전송 : http://localhost:8080/prod/list
    @GetMapping(path="/list") 
    public String getProdList() {
        // Service 객체를 통해서 상품 전체 조회 메소드 호출
        List<Day0301_Prod> list = this.day0301_ProdService.getProdList();

        // 받아온 객체가 없는 경우
        if (list == null) {
            return "조회 결과가 없습니다.";
        }

        // 받아온 객체가 있는 경우
        StringBuffer sb = new StringBuffer();
        sb.append("<h2>상품 전체 목록</h2>");
        sb.append("<hr/>");
        sb.append("<table border=1 width=500>");
        sb.append(" <tr><th>상품 아이디</th><th>상품명</th><th>상품 판매가</th></tr>");
        for(Day0301_Prod prod : list) {
            sb.append("<tr><td>" + prod.getProd_id() + "</td><td>" + prod.getProd_name() + "</td><td>" + prod.getProd_sale() + "</td></tr>");;
        }
        sb.append("</table>");

        return sb.toString();
    }


    // 상품 상세조회 /view -> getProdView()
    // get 방식으로 파라미터 전송 : http://localhost:8080/prod/view?prod_id=P101000001
    @GetMapping(path="/view")
    public String getProdView(@RequestParam String prod_id) {
        Day0301_Prod prod = this.day0301_ProdService.getProdView(prod_id);

        // 조회 결과가 없을 때 응답할 내용 정의
        if(prod == null) {
            return "상품 아이디(%s)에 대한 조회 결과가 없습니다.".formatted(prod_id);
        }

        // 받아온 객체가 있는 경우
        StringBuffer sb = new StringBuffer();
        sb.append("<h2>상품 전체 목록</h2>");
        sb.append("<hr/>");
        sb.append("<table border=1 width=500>");
        sb.append(" <tr><th>상품 아이디</th><th>상품명</th><th>상품 판매가</th></tr>");

        // 조회 결과 추출하여 응답 결과 생성
        sb.append("<tr><td>" + prod.getProd_id() + "</td><td>" + prod.getProd_name() + "</td><td>" + prod.getProd_sale() + "</td></tr>");
        sb.append("</table>");

        return sb.toString();
    }


    // 상품 정보 입력 : /insert -> setProdInsert()
    // post 방식 사용
    @PostMapping(path="/insert")
    public String setProdInsert(@RequestBody Day0301_Prod prod) {

        // 서비스 return 결과를 msg 변수가 받아서 처리
        String msg = this.day0301_ProdService.setProdInsert(prod);
        return "Day0301_ProdController : " + msg;
    }


    // 상품 정보 수정 /update -> setProdUpdate()
    // post 방식 사용
    @PostMapping(path="/update")
    public String setProdUpdate(@RequestBody Day0301_Prod prod) {

        // 서비스 return 결과를 msg가 받아서 처리
        String msg = this.day0301_ProdService.setProdUpdate(prod.getProd_id(), prod.getProd_name());
        return "Day0301_ProdController  : %s".formatted(msg);
    }


    // 상품 정보 삭제 : /delete -> setProdDetele()
    // 요청 URL 예시 : http://localhost:8080/prod/delete?prod_id=Z101000001
    @GetMapping(path="/delete")
    public String setProdDetele(@RequestParam String prod_id) {
        String msg = this.day0301_ProdService.setProdDelete(prod_id);
        return "Day0301_ProdController : " + msg;
    }
}
