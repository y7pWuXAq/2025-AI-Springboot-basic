package com.pknu.project.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.pknu.project.dto.Day0402_CartMemberDTO;
import com.pknu.project.dto.Day0403_CartProdDTO;
import com.pknu.project.model.Day0302_Cart;
import com.pknu.project.model.Day0401_CartPk;


@Repository
public interface Day0302_CartRepository extends JpaRepository<Day0302_Cart, Day0401_CartPk>{
    /**
     * <기본적인 CRUD 메소드>
     * - 전체조회 : findAll()
     * - 상세조회 : findById(pk값), pk를 이용한 조회
     * - 입력 및 수정 : save(값들) ...
     * - 삭제 : deleteById(삭제할 값의 pk), delete(모델)
    */

    /**
     * <JPQL>
     * 주문내역과 회원정보를 조회하기 위한 메소드 정의
     * - 조회 결과를 DTO에 담는 역할을 수행
    */
    @Query("SELECT NEW com.pknu.project.dto.Day0402_CartMemberDTO(c.cart_no, c.cart_prod, c.cart_qty, m.mem_id, m.mem_name)" +
             "FROM Day0302_Cart c INNER JOIN c.member m")
    List<Day0402_CartMemberDTO> findDay0402_CartMemberData();

    @Query("SELECT NEW com.pknu.project.dto.Day0403_CartProdDTO(c.cart_no, c.cart_prod, c.cart_qty, c.cart_member, p.prod_name, p.prod_price, p.prod_sale)" +
             "FROM Day0302_Cart c INNER JOIN c.prod p")
    List<Day0403_CartProdDTO> findAllWithProduct();

    @Query("SELECT NEW com.pknu.project.dto.Day0403_CartProdDTO(c.cart_no, c.cart_prod, c.cart_qty, c.cart_member, p.prod_name, p.prod_price, p.prod_sale)" +
             "FROM Day0302_Cart c INNER JOIN c.prod p WHERE c.id.cart_prod = : ProdId")
    List<Day0403_CartProdDTO> findByProdID(@Param("ProdId") String ProdId);
}
