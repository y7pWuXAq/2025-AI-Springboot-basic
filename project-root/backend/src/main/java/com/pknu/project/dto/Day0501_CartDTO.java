package com.pknu.project.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor // 디폴트 생성자
@AllArgsConstructor // 모든 컬럼을 사용한 생성자

// Day030_CartService.java 내에서 DTO를 Entity로,  Entity를 DTO로 변환할 때 사용
@Builder
public class Day0501_CartDTO {
    // 주문번호 : PK(복합키1)
    private String cart_no;
    // 상품번호 : PK(복합키2)
    private String cart_prod;
    private String cart_member; // 회원 아이디
    private int cart_qty; // 주문수량
}
