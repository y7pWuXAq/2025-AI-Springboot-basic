package com.pknu.project.model;

import java.sql.Clob;
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


@Entity // 데이터 베이스의 member 테이블과 매핑될 엔티티(모델) 클래스 정의
@Table(name="prod") // 어떤 테이블과 매핑될 것인지 정의(실제 테이블명 정의)
@NoArgsConstructor // Day0301_Prod 클래스의 디폴트 생성자로 생성시키기(Lombok 디펜던시 사용)
@AllArgsConstructor // 모든 멤버변수(필드라고 칭함)를 매개변수로 받는 전체 생성자 생성
@Getter // getter, setter 자동 생성(Lombok 디펜던시 사용)
@Setter
@ToString // 모든 getter의 출력 결과는 문자열로 하고자 할 때
public class Day0301_Prod {
    @Id
    @Column(name="prod_id")
    private String prod_id;
    private String prod_name;
    private String prod_lug;
    private String prod_buyer;

    private int prod_cost;
    private int prod_price;
    private int prod_sale;

    private String prod_outline;
    private Clob prod_detail;
    private String prod_img;
    private int prod_totalstock;
    private LocalDate prod_insdate;
    private int prod_properstock;

    // private String prod_size;
    // private String prod_color;
    // private String prod_delivery;
    // private String prod_unit;
    // private int prod_qtyin;
    // private int prod_qtysale;
    // private int prod_mileage;
    // private String prod_lug;

    /* Prod(자식) 클래스와 연결(매핑) 하기 */
    @OneToMany(mappedBy="prod")
    private List<Day0302_Cart> carts = new ArrayList<>();
}
