package com.pknu.project.model;

import java.io.Serializable;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


/**
 * <Serializable>
 * - Java 프로그램에서 객체를 직렬화하기 위해 사용하는 인터페이스 클래스
 * - 직렬화 : 객체를 바이트(byte) 형태로 변환하여 파일, 네트워크, DB 등에 저장하거나 전송할 수 있게 만드는 과정
 * 
 * - 사용 목적
 *   - JPA에서 복합키(PK)가 될 클래스는 반드시 Serializable를 구현해야 함(규칙)
 *   - JPA 내부에서 키 객체를 식별자로 저장/전달/비교 할 때 직렬화된 형태(바이트(byte))로 처리하기 때문
*/

@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Day0401_CartPk implements Serializable {
    /* Cart 테이블에서 사용할 복합키 정의 */
    private String cart_no;
    private String cart_prod;
}
