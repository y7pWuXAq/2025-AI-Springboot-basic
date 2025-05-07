package com.pknu.project.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pknu.project.dto.Day0402_CartMemberDTO;
import com.pknu.project.dto.Day0403_CartProdDTO;
import com.pknu.project.model.Day0302_Cart;
import com.pknu.project.model.Day0401_CartPk;
import com.pknu.project.repository.Day0302_CartRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * Repository 클래스에게 세부 지시를 내리는 클래스
 * - CRUD(입력/수정/삭제/조회) 메소드를 호출
*/

// 서비스 클래스 정의
@Service

// 터미널 창에 진행중인 SQL 문장 로그로 남기기
@Slf4j

// 요청 시 미리 생성해야하는 생성자 호출하여 생성
@RequiredArgsConstructor
public class Day0302_CartService {
    // Repository 클래스 final로 선언
    private final Day0302_CartRepository day0302_CartRepository;

    // 생성자 정의
    // 생성 할 때 클래스를 생성하여 사용할 수 있도록 의존성 주입
    @Autowired
    public Day0302_CartService(Day0302_CartRepository day0302_CartRepository) {
        this.day0302_CartRepository = day0302_CartRepository;
    }

    /**
     * 전체 주문 정보 조회하기
     * @return List<Day0302_Cart>
    */
    public List<Day0302_Cart> getCartList() {
        return this.day0302_CartRepository.findAll();
    }


    /**
     * 주문 상세 조회
     * @param cart_no
     * @param cart_prod
     * @return Day0302_Cart
    */
    public Day0302_Cart getCartView(String cart_no, String cart_prod) {
        Optional<Day0302_Cart> cart = this.day0302_CartRepository.findById(new Day0401_CartPk(cart_no, cart_prod));

        // 조회 결과가 있을 때
        if (cart.isPresent()) {
            // 터미널에 로그 남기기
            log.info("주문번호 [{}]의 정보를 조회하였습니다.", cart_no);

            return cart.get();
        } else {
            // 조회 결과가 없을 때
            return null;
        }
    }


    /**
     * 주문 정보 입력
     * @param cart
     * @return
    */
    public String setCartInsert(Day0302_Cart cart) {
        /* 복합키 클래스 정의 */
        Day0401_CartPk id = new Day0401_CartPk(cart.getCart_no(), cart.getCart_prod());

        // 주문 번호 중복 확인
        if (this.day0302_CartRepository.existsById(id)){
            return "주문번호(%s)는 이미 존재하는 주문번호 입니다.".formatted(cart.getCart_no());
        }

        // 주문 정보 입력 처리
        this.day0302_CartRepository.save(cart);

        return "주문번호()가 정상적으로 입력 되었습니다.".formatted(cart.getCart_no());
    }

    
    /**
     * 주문 정보 수정
     * @param cart_no (PK)
     * @param cart_prod 
     * @param cart_qty (수정 할 데이터)
     * @return String msg
    */
    public String setCartUpdate(Day0302_Cart p_cart) {
        Optional<Day0302_Cart> optionalCart = this.day0302_CartRepository.findById(new Day0401_CartPk(p_cart.getCart_no(),
                                                                                                      p_cart.getCart_member()));
        if (optionalCart.isPresent()) {
            Day0302_Cart cart = optionalCart.get();

            // 주문 정보에서 회원 아이디만 수정
            cart.setCart_qty(p_cart.getCart_qty());

            // ProdRepository에 저장
            this.day0302_CartRepository.save(cart);

            // 터미널에 로그 남기기
            log.info("주문번호[{}]의 주문 수량[{}]이 정상적으로 수정 되었습니다.", p_cart.getCart_no(), p_cart.getCart_qty());

            return "주문번호(%s)의 주문 수량(%s)이 정상적으로 수정 되었습니다.".formatted(p_cart.getCart_no(), p_cart.getCart_qty());
        } else {
            return "조회한 주문번호(%s)는 없는 주문번호입니다.".formatted(p_cart.getCart_no());
        }
    }


    /**
     * 주문 정보 삭제하기
     * @param cart_no (PK)
     * @param cart_prod (PK)
     * @return String msg
    */
    public String setCartDelete(String cart_no, String cart_prod) {
        /* 복합키 클래스 정의 */
        Day0401_CartPk id = new Day0401_CartPk(cart_no, cart_prod);
        
        if (this.day0302_CartRepository.existsById(id)) {
            // 삭제처리
            this.day0302_CartRepository.deleteById(id);

            // 터미널에 로그 남기기
            log.info("주문번호[{}]의 정보가 정상적으로 삭제 되었습니다.", cart_no);

            return "주문번호(%s)의 정보가 정상적으로 삭제 되었습니다.".formatted(cart_no);
        } else {
            return "조회한 주문번호(%s)는 없는 주문번호입니다.".formatted(cart_no);
        }
    }



    /**************
     * Join 처리 *
    **************/

    // Cart와 Member의 Inner Join 결과를 조회하는 메소드 정의
    public List<Day0402_CartMemberDTO> getCartMemberData() {
        return this.day0302_CartRepository.findDay0402_CartMemberData();
    }

    public List<Day0403_CartProdDTO> getCartProdData() {
        return this.day0302_CartRepository.findAllWithProduct();
    }

    public List<Day0403_CartProdDTO> getProdIdData() {
        return this.day0302_CartRepository.findByProdId("P101000003");
    }
}
