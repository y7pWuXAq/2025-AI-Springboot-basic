package com.pknu.project.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.pknu.project.model.Day0301_Prod;


@Repository
public interface Day0301_ProdRepository extends JpaRepository<Day0301_Prod, String>{
    /**
     * <기본적인 CRUD 메소드>
     * - 전체조회 : findAll()
     * - 상세조회 : findById(pk값), pk를 이용한 조회
     * - 입력 및 수정 : save(값들) ...
     * - 삭제 : deleteById(삭제할 값의 pk)
    */
}
