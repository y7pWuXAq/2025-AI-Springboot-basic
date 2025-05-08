package com.pknu.project.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.pknu.project.dto.Day0402_CartMemberDTO;
import com.pknu.project.dto.Day0403_CartProdDTO;
import com.pknu.project.dto.Day0501_CartDTO;
import com.pknu.project.service.Day0302_CartService;

import lombok.RequiredArgsConstructor;

/*********************** [RESTful API 방식 사용] *********************
 * <RESTful API>
 *  - 클라이언트와 서버 간에 HTTP 통신을 사용하여 자원(Resource)에 접근하고 조작하기 위한
 *    -> 명령 규칙을 정의한 웹 아키텍처 스타일을 통칭한 API 임
 *  - RESTful API => REpresentational State Transfer Application Programming Interface의 줄임
 *    -> REST(REpresentational State Transfer) : 자원 상태 전달 아키텍처라는 의미
 *    -> ful : 형용사적 의미(~의 원칙을 따른다는 의미적 단어로만 사용됨)
 *    -> RESTful : REST의 원칙을 잘 따르는 or REST 스러운 과 같은 의미적 해석을 가진 용어 임
 *  - 주로 클라이언트와 서버간의 자원(데이터) 전달 방식에 대한 원칙(규칙)을 정의하고 있음
 *    -> JSon, XML 등의 형태로 데이터를 주고(Response 응답) 받음(Request 요청)
 *  - 클라이언트 : React, Fast API 등이 있음
 *  - 서버 : JAVA 기반의 Springboot, Python 기반의 Django, Flask 등이 있음
 *  - RESTful API 방식의 데이터 전달방식의 구조는 Front-End(클라이언트)와 Back-End(서버) 서버가 구분된 경우 사용됨
 *  - 데이터 전송(요청, request) 방식 : GET, POST, PUT, DELETE 등을 표준으로 사용함(의미적 규칙을 의미함)
 *    -> Controller.java 클래스에서 Mapping 방식으로 사용됨 (GetMapping, PostMapping, PutMapping, DeleteMapping)
 *  - 데이터 공유(공공데이터 등) 시에 Open-API 방식이 RESTful API 방식을 사용하고 있음
 *    -> 데이터 수집 시 Open-API를 통해서 데이터를 수집했었음
 * 
 * <REST API 방식 vs RESTful API 방식>
 *  - REST API 방식 : REST의 전송규칙을 대충(어느정도) 따르기만 해도 REST API라고 할 수 있음
 *  - RESTful API 방식 : REST 원칙을 최대한 엄격히 지키면서 구현한 경우를 의미함
 *  - 현장에서는 최대한 따르려고 노력은 하지만, 어느정도 따르는 경우가 더 많다고 볼 수도 있음(회사마다 다름)
 *  - 일반적으로 RESTful API라는 의미로 사용됩니다.
 * 
 * <전송방식에 따른 처리 기능>
 *  - GET : 목록 조회시 사용됨 (예시 URL 패턴 : /cart/list 사용)
 *   -> Controller.java 클래스에서는 @GetMapping 사용
 *  - GET : 상세 조회시 사용됨 (예시 URL 패턴 : /cart/view/2025050100001/P10100001 사용)
 *   -> Controller.java 클래스에서는 @GetMapping 및 @PathVariable 사용
 *  - POST : 입력(저장)시 사용됨 (예시 URL 패턴 : /cart/insert 사용)
 *   -> Controller.java 클래스에서는 @PostMapping 및 @RequestBody 사용
 *  - PUT : 수정시 사용됨 (예시 URL 패턴 : /cart/update/2025050100001/P10100001?cart_qty=500 사용)
 *   -> Controller.java 클래스에서는 @PutMapping 및 @PathVariable 및 @RequestParam 사용
 *  - DELETE : 삭제시 사용됨 (예시 URL 패턴 : /cart/delete/2025050100001/P10100001 사용)
 *   -> Controller.java 클래스에서는 @DeleteMapping 및 @PathVariable 사용
 * 
 * <Controller.java 클래스에서 응답(Response) 방식>
 *  - ResponseEntity.ok(응답할 데이터) 함수를 이용하여 반환(return)함
*/

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
    public ResponseEntity<List<Day0501_CartDTO>> getCartList() {        
        // Service객체를 통해서 주문내역전체조회 메소드 호출하기
        return ResponseEntity.ok(this.day0302_CartService.getCartList());
    }


    // 주문 상세조회 /view -> getCartView()
    // get 방식으로 파라미터 전송 : http://localhost:8080/cart/view?cart_no=2005040100001&cart_prod=P101000001
    // - GET : 상세 조회시 사용됨 (예시 URL 패턴 : /cart/view/2025050100001/P10100001 사용)
    //   -> Controller.java 클래스에서는 @GetMapping 및 @PathVariable 사용
    // - get방식으로 파라메터 전송 : http://localhost:8080/cart/view?cart_no                                                                              cart.getCart_sale()=a001
    @GetMapping(path="/view/{cart_no}/{cart_prod}")
    public ResponseEntity<Day0501_CartDTO> getCartView(@PathVariable("cart_no") String cart_no, 
                                                       @PathVariable("cart_prod") String cart_prod) {

        // 서비스 클래스에게 상세조회 메소드 호출하여 처리시키기..     
        return ResponseEntity.ok(this.day0302_CartService.getCartView(cart_no, cart_prod));
    }


    // 상품 정보 입력 : /insert -> setCartInsert()
    // 주문내역정보입력 : /insert  -> getCartInset()
    //  - PostMapping : 사용자로부터 전송받는 데이터가 많은 경우에 사용
    //  - RequestBody : post 전송방식으로 사용자 데이터를 받고자 할 때 사용
    //                : 사용자의 입력 form 태그 내의 모든 key:value를 가지고 있습니다.
    //                : RequestBody의 모든 데이터는 Model 클래스와 자동 바인딩 됩니다.
    //                  (@RequestBody Cart cart)
    //                   --> 사용자의 입력 form태그 내에 key 이름은 Model 클래스의 멤버 변수명과 동일해야 합니다.
    @PostMapping(path="/insert")
    /***
     * 
     * @param cartDTO
     * @return ResponseEntity<Day0501_CartDTO>
     */
    public ResponseEntity<Day0501_CartDTO> setCartInsert(@RequestBody Day0501_CartDTO cartDTO) {
        return ResponseEntity.ok(this.day0302_CartService.setCartInsert(cartDTO));        
    }


    // 주문내역정보수정 : /update  -> getCartUpdate()
    // - PUT : 수정시 사용됨 (예시 URL 패턴 : /cart/update/2025050100001/P10100001?cart_qty=500 사용)
    //  -> Controller.java 클래스에서는 @PutMapping 및 @PathVariable 및 @RequestParam 사용
    @PutMapping(path="/update/{cart_no}/{cart_prod}")
    public ResponseEntity<Day0501_CartDTO> setCartUpdate(@PathVariable("cart_no") String cart_no, 
                                                         @PathVariable("cart_prod") String cart_prod,
                                                         @RequestParam int cart_qty) {

        // 서비스 return 결과 msg 변수가 받아서 처리
        return ResponseEntity.ok(this.day0302_CartService.setCartUpdate(cart_no, cart_prod, cart_qty));
    }


    // 요청 URL 예시 : http://localhost:8080/cart/delete?cart_no=x001
    // 주문내역정보삭제 : /delete  -> getCartDetele()
    //  - DELETE : 삭제시 사용됨 (예시 URL 패턴 : /cart/delete/2025050100001/P10100001 사용)
    //   -> Controller.java 클래스에서는 @DeleteMapping 및 @PathVariable 사용
    @DeleteMapping(path="/delete/{cart_no}/{cart_prod}")
    public ResponseEntity<Void> setCartDetele(@PathVariable("cart_no") String cart_no, 
                                              @PathVariable("cart_prod") String cart_prod) {
       // 삭제는 반환결과 없이 사용
       this.day0302_CartService.setCartDelete(cart_no, cart_prod);

       // 응답할 내용이 없다는 의미로 noContent()를 정의함
       return ResponseEntity.noContent().build();
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
    public ResponseEntity<List<Day0403_CartProdDTO>> getCartProd() {
        List<Day0403_CartProdDTO> data = this.day0302_CartService.getCartProdData();

        return ResponseEntity.ok(data);
    }

    // 접속 링크 : http://localhost:8080/cart/cart_prodid_list
    @GetMapping(path="/cart_prodid_list")
    public ResponseEntity<List<Day0403_CartProdDTO>> getByProdId(@RequestParam String prodId) {
        List<Day0403_CartProdDTO> data = this.day0302_CartService.getByProdId(prodId);
        return ResponseEntity.ok(data);
    }
    

    // Cart, Member, Prod의 Inner Join 결과를 조회하는 메소드 정의
    @GetMapping(path="/cart_mem_prod_list")
    public ResponseEntity<List<Day0403_CartProdDTO>> getAllCarMemberProdJoin(){
        List<Day0403_CartProdDTO> data = this.day0302_CartService.getAllCarMemberProdJoin();
        return ResponseEntity.ok(data);
    }
}
