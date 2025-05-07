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

    
    /**
     * 상품 정보 수정
     * @param prod_id (PK)
     * @param prod_name (수정 할 데이터)
     * @return String msg
    */
    public String setProdUpdate(String prod_id, String prod_name) {
        Optional<Day0301_Prod> optionalProd = this.day0301_ProdRepository.findById(prod_id);
        if (optionalProd.isPresent()) {
            Day0301_Prod prod = optionalProd.get();

            // 해당 상품의 정보에서 이름만 수정
            prod.setProd_name(prod_name);

            // ProdRepository에 저장
            this.day0301_ProdRepository.save(prod);

            // 터미널에 로그 남기기
            log.info("상품 아이디[{}]의 이름[{}]이 정상적으로 수정 되었습니다.", prod_id, prod_name);

            return "상품(%s)의 이름(%s)이 정상적으로 수정 되었습니다.".formatted(prod_id, prod_name);
        } else {
            return "조회한 상품 아이디(%s)는 없는 아이디입니다.".formatted(prod_id);
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
}
