package com.pknu.project.model;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

/**
 * 테이블 정보를 담을 클래스
 * - getter 및 setter가 정의됨
 * - 멤버 변수들만 private로 정의
 *   - 멤버 변수의 이름은실제 사용할 테이블의 컬럼명과 동일하게 함
 *   - 타입은 문자열(String), 숫자(int), 날짜(LocalDate), Blob or Clob(Clob)
*/

// 데이터 베이스의 member 테이블과 매핑될 엔티티(모델) 클래스 정의
@Entity

// 어떤 테이블과 매핑될 것인지 정의(실제 테이블명 정의)
@Table(name="member")

// Day0201_Member 클래스의 디폴트 생성자로 생성시키기(Lombok 디펜던시 사용)
@NoArgsConstructor

// 모든 멤버변수(필드라고 칭함)를 매개변수로 받는 전체 생성자 생성
@AllArgsConstructor

// getter, setter 자동 생성(Lombok 디펜던시 사용)
@Getter
@Setter

// 모든 getter의 출력 결과는 문자열로 하고자 할 때
@ToString

public class Day0201_Member {
    // 실제 테이블에서 고유한 값을 가지는 PK 컬럼을 지정
    @Id
    @Column(name="mem_id") // 실제 테이블의 컬럼명과 변수명이 다를 때 사용, 같으면 생략 가능
    private String mem_id;
    
    @Column(nullable=false) // null값 허용 유무 지정
    private String mem_pass;

    private String mem_name;
    private String mem_regno1;
    private String mem_regno2;
    
    // 날짜 타입 클래스
    private LocalDate mem_bir;
    
    private String mem_zip;
    private String mem_add1;
    private String mem_add2;
    private String mem_hometel;
    private String mem_comtel;
    private String mem_hp;
    private String mem_mail;
    private String mem_job;
    private String mem_like;
    private String mem_memorial;
    private LocalDate mem_memorialday;
    private int mem_mileage;
    private String mem_delete;

    /* Cart(자식) 테이블과 연결(매핑) */
    @OneToMany(mappedBy="member")
    private List<Day0302_Cart> carts = new ArrayList<>();
}
