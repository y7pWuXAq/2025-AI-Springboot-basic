package com.pknu.project.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;


@Entity // 데이터 베이스의 member 테이블과 매핑될 엔티티(모델) 클래스 정의
@Table(name="cart") // 어떤 테이블과 매핑될 것인지 정의(실제 테이블명 정의)

/* 복합키 클래스 어노테이션 정의 */
@IdClass(Day0401_CartPk.class)

@NoArgsConstructor // Day0301_Prod 클래스의 디폴트 생성자로 생성시키기(Lombok 디펜던시 사용)
@AllArgsConstructor // 모든 멤버변수(필드라고 칭함)를 매개변수로 받는 전체 생성자 생성
@Getter // getter, setter 자동 생성(Lombok 디펜던시 사용)
@Setter
@ToString // 모든 getter의 출력 결과는 문자열로 하고자 할 때
public class Day0302_Cart {
    @Id
    @Column(name="cart_no")
    private String cart_no;
    
    @Id
    private String cart_prod;
    
    private String cart_member;
    private int cart_qty;

    /**
     * Member 클래스와 관계 연결(pk = fk)
     * 
     * @ManyToOne: N대 1의 관계를 의미(자식Cart : 부모Member)
     * - fetch=FetchType.LAZY : 연관된 모델(엔티티)를 즉시 로딩(실행)하지 않고
     *                        : 실제로 조인을 사용하는 시점에 로딩(실행)할 수 있도록  설정
     * - fetch=FetchType.EAGER : 연관된 모델(엔티티)를 서버 실행 시점에 즉시 로딩(실행) 한다는 의미
     *                         : 미리 연관된 모델(엔티티)들을 실행해 놓은 것을 의미
    */ 
    @ManyToOne(fetch=FetchType.LAZY)
    // name : 현재 모델(엔티티)의, 즉 자식 테이블의 FK 컬럼명
    // referencedColumnName : 부모 테이블의 PK 컬럼명 정의
    // insertable : JPA가 Insert시에 해당 컬럼을 포함(true)할지/제외(false)할지 설정(조회 전용)
    // updatable : JPA가 Update시에 해당 컬럼을 포함(true)할지/제외(false)할지 설정(조회 전용)
    @JoinColumn(name="cart_member", referencedColumnName="mem_id",
                insertable=false, updatable=false)
    private Day0201_Member member;

    /* 상품 테이블과 관계 연결 */
    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="cart_prod", referencedColumnName="prod_id",
                insertable=false, updatable=false)
    private Day0301_Prod prod;
}
