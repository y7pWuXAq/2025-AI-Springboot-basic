package com.pknu.project.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pknu.project.dto.Day0402_CartMemberDTO;
import com.pknu.project.dto.Day0403_CartProdDTO;
import com.pknu.project.dto.Day0501_CartDTO;
import com.pknu.project.exception.ResourceNotFoundException;
import com.pknu.project.model.Day0302_Cart;
import com.pknu.project.model.Day0401_CartPk;
import com.pknu.project.repository.Day0302_CartRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * <예외처리>
 *  - 예외처리가 필요한 기능 : 상세조회, 입력, 수정, 삭제
 *    -> RunTime(실행 시점) 시에 발생하는 오류 처리
 *  - 보통 Service 클래스에서 처리함
 *  
 * <처리 순서>
 *  - 1. 사용자 정의 예외 클래스를 생성 : 오류 확인 편리함
 *  - 2. 사용자 정의 예외 클래스를 -> Back-end 전역적으로 사용할 수 있도록 처리
*/

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
     * <DTO <-> Entity 서로 변환하는 메소드 정의>
     * - Controller에서 DTO를 전달받은 경우
     *   -> Entity로 변환하여 Repository에 전달
     * 
     * - Repository로부터 Entity로 전달받은 경우
     *   -> DTO로 변환하여 Controller에 전달
    */

    // Entity를 DTO로 변환
    private Day0501_CartDTO convertToDTO(Day0302_Cart cart){
        // .builder() : Day0501_CartDTO 클래스에서 정의한 Builder 클래스 자원 활용(생성자)
        return Day0501_CartDTO.builder()
                // Cart Entity 내에 cart_** 값을 추출하여 Day0501_CartDTO의 cart_** 에 넣기
                .cart_no(cart.getCart_no())
                .cart_member(cart.getCart_member())
                .cart_prod(cart.getCart_prod())
                .cart_qty(cart.getCart_qty())

                // 위에 설정한 필드(컬럼)들을 사용하여 Day0501_CartDTO 객체를 생성
                .build();
    }

    // Entity를 DTO로 변환
    private Day0302_Cart convertToEntity(Day0501_CartDTO dto){
        // .builder() : Day0501_CartDTO 클래스에서 정의한 Builder 클래스 자원 활용(생성자)
        return Day0302_Cart.builder()
                // Cart Entity 내에 cart_** 값을 추출하여 Day0501_CartDTO의 cart_** 에 넣기
                .cart_no(dto.getCart_no())
                .cart_member(dto.getCart_member())
                .cart_prod(dto.getCart_prod())
                .cart_qty(dto.getCart_qty())

                // 위에 설정한 필드(컬럼)들을 사용하여 Day0501_CartDTO 객체를 생성
                .build();
    }

    /**
     * 전체 주문 정보 조회하기
     * @return List<Day0302_Cart>
    */
    // public List<Day0302_Cart> getCartList() {
    //     return this.day0302_CartRepository.findAll();
    // }

    // Controller에 리턴할 때는 DTO로 변환해서 반환
    public List<Day0501_CartDTO> getCartList() {
        return this.day0302_CartRepository.findAll()
        // - stream() 메소드
        //   : 컬렉션(Collection) 또는 배열(Array) 들을 함수형 방식으로 처리할 수 있도록 해주는 자원
        //       -> 함수형 방식을 사용하겠다는 의미적 선언
        //   : 문자열 스트리밍(streaming)과는 무관
        .stream()

        // 함수형 방식 시작
        // - map()함수 내에 처리하고자 하는 메소드(기능) 정의
        // - 실무에서 가장 많이 사용하는 방식(DTO <-> Entity)
        // - this:: : 현재 클ㄹ스 내에 있는 멤버를 의미
        // - findAll()의 결과는 List<Day0302_Cart>로 리스트 내에 있는 모든 Cart들을 DTO로 변환하는 작업
        .map(this::convertToDTO)
        
        // 변환된 모든 DTO 들을 List로 다시 묶는 작업
        .collect(Collectors.toList());
    }


    /**
     * 주문 상세 조회
     * @param cart_no
     * @param cart_prod
     * @return Day0302_Cart
    */
    public Day0501_CartDTO getCartView(String cart_no, String cart_prod) {
        // Optional<Day0302_Cart> cart = this.day0302_CartRepository.findById(new Day0401_CartPk(cart_no, cart_prod));
        
        // // 조회 결과가 있을 때
        // if (cart.isPresent()) {
            //     // 터미널에 로그 남기기
            //     log.info("주문번호 [{}]의 정보를 조회하였습니다.", cart_no);
            
            //     // get() : Optional 객체에 담겨 있는 Cart 객체를 추출
            //     return convertToDTO(cart.get());
            // } else {
                //     // 조회 결과가 없을 때
                //     return null;
                // }

        /**
         * Optional : Entity를 감싸서 null 체크를 편하게 하는 클래스
         *          : Entity를 추출하기 위해서는 get() 메소드를 사용
         *          : findById()를 통해 직접 Entity로 받아서 사용할 수 있음
         *            -> 단, 예외처리(orElseThrow)를 해야함(현업에서 사용하는 방식)
         */
        
        Day0302_Cart cart = this.day0302_CartRepository.findById(new Day0401_CartPk(cart_no, cart_prod))
                        // 조회 결과가 있으면 Entity를 반환, 없으면 예외를 발생
                        .orElseThrow(() 
                        -> new ResourceNotFoundException("! 해당 정보가 존재하지 않습니다. : getCartView(%s, #s)".formatted(cart_no, cart_prod)));
        return convertToDTO(cart);
    }


    /***
     * 주문내역 입력
     * ----------------------------
     * @param cart
     * @return String
     */
    public Day0501_CartDTO setCartInsert(Day0501_CartDTO cartDTO){      
        // 주문내역 정보 입력 처리하기
        return convertToDTO(this.day0302_CartRepository.save(convertToEntity(cartDTO)));
    }

    
    /***
     * 주문내역정보 수정하기 (Post 전송방식)
     * -------------------------
     * @param cart_no (PK)
     * @param cart_qty (수정할 데이터)
     * @return String msg
     */
    public Day0501_CartDTO setCartUpdate(String cart_no, String cart_prod, int cart_qty){

        Day0302_Cart cart = this.day0302_CartRepository.findById(new Day0401_CartPk(cart_no, cart_prod))
                        .orElseThrow(() -> new ResourceNotFoundException
                                ("### [해당 정보가 존재하지 않습니다.] : getCartUpdate(%s, %s) ###".formatted(cart_no, 
                                                                                                              cart_prod)));
        
        // 조회한 Entity에 수정할 값에 대한 컬럼을 변경(setter 사용)
        cart.setCart_qty(cart_qty);

        // 수정 시키기
        return convertToDTO(this.day0302_CartRepository.save(cart));
    }


    /***
     * 주문내역 정보 삭제하기
     * --------------------------
     * @param cart_no (PK)
     * @return String msg
     */
    public void setCartDelete(String cart_no, String cart_prod){

        Day0302_Cart cart = this.day0302_CartRepository.findById(new Day0401_CartPk(cart_no, cart_prod))
                        .orElseThrow(() -> new ResourceNotFoundException
                                ("### [해당 정보가 존재하지 않습니다.] : getCartDelete(%s, %s) ###".formatted(cart_no, cart_prod)));
        
        // 삭제 처리하기
        this.day0302_CartRepository.delete(cart);
    }



    /**************
     * Join 처리 *
    **************/

    // Cart와 Member의 Inner Join 결과를 조회하는 메소드 정의
    public List<Day0402_CartMemberDTO> getCartMemberData() {
        return this.day0302_CartRepository.findDay0402_CartMemberData();
    }

    // Cart와 Prod의 Inner Join 결과를 조회하는 메소드 정의
    public List<Day0403_CartProdDTO> getCartProdData() {
        return this.day0302_CartRepository.findAllWithProduct();
    }

    // Cart와 Prod의 Inner Join 결과를 조회하는 메소드 정의
    //  -  단, 전달 받은 상품코드에 대해서만 조회
    public List<Day0403_CartProdDTO> getByProdId(String prodId){
        return this.day0302_CartRepository.findByProdId(prodId);
    }

    // Cart, Member, Prod의 Inner Join 결과를 조회하는 메소드 정의
    public List<Day0403_CartProdDTO> getAllCarMemberProdJoin(){
        return this.day0302_CartRepository.findCartMemberProdJoinAll();
    }
}
