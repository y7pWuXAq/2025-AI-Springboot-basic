package com.pknu.project.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pknu.project.model.Day0301_Prod;
import com.pknu.project.repository.Day0301_ProdRepository;

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
public class Day0301_ProdService {
    // Repository 클래스 final로 선언
    private final Day0301_ProdRepository day0301_ProdRepository;

    // 생성자 정의
    // 생성 할 때 클래스를 생성하여 사용할 수 있도록 의존성 주입
    @Autowired
    public Day0301_ProdService(Day0301_ProdRepository day0301_ProdRepository) {
        this.day0301_ProdRepository = day0301_ProdRepository;
    }

    /**
     * 상품 전체 정보 조회하기
     * @return List<Day0301_Prod>
    */
    public List<Day0301_Prod> getProdList() {
        return this.day0301_ProdRepository.findAll();
    }


    /**
     * 상품 상세 조회
     * @param prod_id
     * @return Day0301_Prod
    */
    public Day0301_Prod getProdView(String prod_id) {
        Optional<Day0301_Prod> prod = this.day0301_ProdRepository.findById(prod_id);

        // 조회 결과가 있을 때
        if (prod.isPresent()) {
            // 터미널에 로그 남기기
            log.info("상품 아이디[{}]의 정보를 조회하였습니다.", prod_id);

            return prod.get();
        } else {
            // 조회 결과가 없을 때
            return null;
        }
    }


    /**
     * 상품 정보 입력
     * @param prod
     * @return
    */
    public String setProdInsert(Day0301_Prod prod) {
        // 상품 아이디 중복 확인
        if (this.day0301_ProdRepository.existsById(prod.getProd_id())){
            return "상품 아이디(P101000001)는 이미 존재하는 아이디 입니다.";
        }

        // 상품 정보 입력 처리
        this.day0301_ProdRepository.save(prod);

        return "상품아이디()가 정상적으로 입력 되었습니다.";
    }

    
    /***
     * 상품정보 수정하기 (Get 전송방식)
     * -------------------------
     * @param prod_id (PK)
     * @param prod_name (수정할 데이터)
     * @return String msg
    */
    public String setProdUpdateGet(String prod_id, String prod_name){
        // 파라메터 prod_id에 대한 상세정보 조회하기(1건 조회)
        // - 변수명 : optionalProd
        Optional<Day0301_Prod> optionalProd = this.day0301_ProdRepository.findById(prod_id);

        // 조회결과가 있는지 없는지 확인
        if(optionalProd.isPresent()){
            // 조회결과가 있으면 수정 진행
            // - Optional 클래스에서 Prod 클래스 추출하기 (변수명 : prod)
            //   -- 수정할 prod_id에 대한 상품정보 1건이 담겨져 있습니다.
            Day0301_Prod prod = optionalProd.get();

            // 해당 상품의 정보에서 이름만 변경하기
            prod.setProd_name(prod_name);

            // DB에 수정 반영하기
            this.day0301_ProdRepository.save(prod);

            // 터미널에 출력
            log.info("상품[{}]에 대하여 이름[{}]으로 정상 수정 되었습니다!!!", prod_id, prod_name);

            return "상품[%s]에 대하여 정상적으로 수정 되었습니다!!!".formatted(prod_id);

        } else {
            return "해당 상품[%s]이 존재하지 않습니다!!".formatted(prod_id);
        }
    }

    /***
     * 상품정보 수정하기 (Post 전송방식)
     * -------------------------
     * @param prod_id (PK)
     * @param prod_name (수정할 데이터)
     * @return String msg
     */
    public String setProdUpdate(Day0301_Prod p_prod){
        // 파라메터 prod_id에 대한 상세정보 조회하기(1건 조회)
        // - 변수명 : optionalProd
        Optional<Day0301_Prod> optionalProd = this.day0301_ProdRepository.findById(p_prod.getProd_id());

        // 조회결과가 있는지 없는지 확인
        if(optionalProd.isPresent()){
            // 조회결과가 있으면 수정 진행
            // - Optional 클래스에서 Prod 클래스 추출하기 (변수명 : prod)
            //   -- 수정할 prod_id에 대한 상품정보 1건이 담겨져 있습니다.
            Day0301_Prod prod = optionalProd.get();

            // 해당 상품의 정보에서 이름만 변경하기
            prod.setProd_name(p_prod.getProd_name());

            // DB에 수정 반영하기
            this.day0301_ProdRepository.save(prod);

            // 터미널에 출력
            log.info("상품[{}]에 대하여 이름[{}]으로 정상 수정 되었습니다!!!", p_prod.getProd_id(), 
                                                                                      p_prod.getProd_name());

            return "상품[%s]에 대하여 정상적으로 수정 되었습니다!!!".formatted(p_prod.getProd_id());

        } else {
            return "해당 상품[%s]이 존재하지 않습니다!!".formatted(p_prod.getProd_id());
        }
    }


    /**
     * 상품 정보 삭제하기
     * @param prod_id (PK)
     * @return String msg
    */
    public String setProdDelete(String prod_id) {
        if (this.day0301_ProdRepository.existsById(prod_id)) {
            // 삭제처리
            this.day0301_ProdRepository.deleteById(prod_id);

            // 터미널에 로그 남기기
            log.info("상품 아이디[{}]의 정보가 정상적으로 삭제 되었습니다.", prod_id);

            return "상품 아이디(%s)의 정보가 정상적으로 삭제 되었습니다.".formatted(prod_id);
        } else {
            return "조회한 상품 아이디(%s)는 없는 아이디입니다.".formatted(prod_id);
        }
    }

    public String setProdInsert(Day0301_Prod prod) {
        // 상품아이디 중복체크 필요 (중복된 상품아이디가 있으면 저장 시키면 안됨)
        // - 상품 정보가 없으면 -> "상품아이디 [n001]이 정상적으로 입력 되었습니다." 리턴
        // - 상품 정보가 있으면 -> "상품아이디 [n001]은 이미 존재하는 아이디 입니다." 리턴
        // - Controller 클래스에서 서비스 호출하여 리턴값 받아서 출력하는 프로그램까지만 작성
        //   (파라메터 정의하지 말기, 서버 실행은 하지 말기...)

        // 상품아이디 존재여부 확인
        if(this.day0301_ProdRepository.existsById(prod.getProd_id())){
            return "상품아이디 [%s]은 이미 존재하는 아이디 입니다.".formatted(prod.getProd_id());
        }
        
        // 상품 정보 입력 처리하기
        this.day0301_ProdRepository.save(prod);

        return "상품아이디 [%s]이 정상적으로 입력 되었습니다.".formatted(prod.getProd_id());
    }
}
