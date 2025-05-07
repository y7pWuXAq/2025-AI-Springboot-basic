package com.pknu.project.controller;

import java.util.List;

import org.apache.catalina.connector.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.pknu.project.dto.Day0402_CartMemberDTO;
import com.pknu.project.dto.Day0403_CartProdDTO;
import com.pknu.project.model.Day0302_Cart;
import com.pknu.project.service.Day0302_CartService;

import lombok.RequiredArgsConstructor;

/**
 * Controller 클래스임을 정의
 *  서버 실행 시 자동으로 Day0302_CartController 클래스 생성시킴 
*/
@RestController

// 카테고리 URL 분리
@RequestMapping("/cart")

// 서버 실행 시 미리 생성해야하는 생성자 호출하여 생성
@RequiredArgsConstructor
public class Day0302_CartController {
    
    // 서비스 클래스 멤버 객체 선언
    private final Day0302_CartService day0302_CartService;

    // 생성자 정의
    @Autowired
    public Day0302_CartController(Day0302_CartService day0302_CartService) {
        this.day0302_CartService = day0302_CartService;
    }

    // 주문 전체 조회
    // get 방식으로 파라미터 전송 : http://localhost:8080/cart/list
    @GetMapping(path="/list") 
    public String getCartList() {
        // Service 객체를 통해서 상품 전체 조회 메소드 호출
        List<Day0302_Cart> list = this.day0302_CartService.getCartList();

        // 받아온 객체가 없는 경우
        if (list == null) {
            return "조회 결과가 없습니다.";
        }

        // 받아온 객체가 있는 경우
        StringBuffer sb = new StringBuffer();
        sb.append("<h2>주문 전체 목록</h2>");
        sb.append("<hr/>");
        sb.append("<table border=1 width=500>");
        sb.append(" <tr><th>주문번호</th><th>주문자 아이디</th><th>상품번호</th><th>주문 갯수</th></tr>");
        for(Day0302_Cart cart : list) {
            sb.append("<tr><td>" + cart.getCart_no() + "</td><td>" + cart.getCart_member() + "</td><td>" + 
                               cart.getCart_prod() + "</td><td>" + cart.getCart_qty() + "</td></tr>");
        }
        sb.append("</table>");

        return sb.toString();
    }


    // 주문 상세조회 /view -> getCartView()
    // get 방식으로 파라미터 전송 : http://localhost:8080/cart/view?cart_no=2005040100001&cart_prod=P101000001
    @GetMapping(path="/view")
    public String getCartView(@RequestParam String cart_no, @RequestParam String cart_prod) {
        Day0302_Cart cart = this.day0302_CartService.getCartView(cart_no, cart_prod);

        // 조회 결과가 없을 때 응답할 내용 정의
        if(cart == null) {
            return "주문번호(%s)에 대한 조회 결과가 없습니다.".formatted(cart_no);
        }

        // 받아온 객체가 있는 경우
        StringBuffer sb = new StringBuffer();
        sb.append("<h2>주문 전체 목록</h2>");
        sb.append("<hr/>");
        sb.append("<table border=1 width=500>");
        sb.append(" <tr><th>주문번호</th><th>주문자 아이디</th><th>상품번호</th><th>주문 갯수</th></tr>");
        sb.append("<tr><td>" + cart.getCart_no() + "</td><td>" + cart.getCart_member() + "</td><td>" + 
                               cart.getCart_prod() + "</td><td>" + cart.getCart_qty() + "</td></tr>");
        sb.append("</table>");

        return sb.toString();
    }


    // 상품 정보 입력 : /insert -> setCartInsert()
    // post 방식 사용
    @PostMapping(path="/insert")
    public String setCartInsert(@RequestBody Day0302_Cart cart) {

        // 서비스 return 결과를 msg 변수가 받아서 처리
        String msg = this.day0302_CartService.setCartInsert(cart);
        return "Day0302_CartController : " + msg;
    }


    // 상품 정보 수정 /update -> setCartUpdate()
    // post 방식 사용
    @PostMapping(path="/update")
    public String setCartUpdate(@RequestBody Day0302_Cart cart) {

        // 서비스 return 결과를 msg가 받아서 처리
        String msg = this.day0302_CartService.setCartUpdate(cart);
        return "Day0302_CartController  : %s".formatted(msg);
    }


    // 상품 정보 삭제 : /delete -> setCartDelete()
    // 요청 URL 예시 : http://localhost:8080/cart/delete?cart_no=2025040100003&cart_prod=P202000007
    @GetMapping(path="/delete")
    public String setCartDelete(@RequestParam String cart_no, @RequestParam String cart_prod) {
        String msg = this.day0302_CartService.setCartDelete(cart_no, cart_prod);
        return "Day0302_CartController : " + msg;
    }



    /**************
     * Join 처리 *
    **************/
    // 접속 링크 : http://localhost:8080/cart/cart_mem_list
    @GetMapping(path="/cart_mem_list")
    public ResponseEntity<List<Day0402_CartMemberDTO>> getCartMemberData() {
        List<Day0402_CartMemberDTO> data = this.day0302_CartService.getCartMemberData();
        // Rest API 방식으로 리턴
        // - Rest API : 프론트앤드와 백앤드가 분리된 웹상에서 데이터 전송방식을 의미
        //            : Rest API 방식으로 전송되는 데이터들은 모두 Json 포멧을 따름
        //            : Front-End에게 데이터 전달(나중에 React가 받음)
        return ResponseEntity.ok(data);
    }

    // 접속 링크 : http://localhost:8080/cart/cart_prod_list
    @GetMapping(path="/cart_prod_list")
    public ResponseEntity<List<Day0403_CartProdDTO>> getCartProdData() {
        List<Day0403_CartProdDTO> data = this.day0302_CartService.getCartProdData();

        return ResponseEntity.ok(data);
    }

    // 접속 링크 : http://localhost:8080/cart/find_prodId
    @GetMapping("/find_prodId")
    public ResponseEntity<List<Day0403_CartProdDTO>> getProdId() {
        List<Day0403_CartProdDTO> data = this.day0302_CartService.getProdIdData();
        return ResponseEntity.ok(data);
    }
}
