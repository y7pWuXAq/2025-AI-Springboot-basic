package com.pknu.project.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pknu.project.model.Day0201_Member;
import com.pknu.project.repository.Day0201_MemberRepository;

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
public class Day0201_MemberService {
    // Repository 클래스 선언만 해놓기, final로 선언
    private final Day0201_MemberRepository day0201_MemberRepository;
    
    // 생성자 정의
    // 생성할 때 사용할 클래스를 생성하여 사용할 수 있도록 함(DI, 의존성 주입이 되어 있음)
    @Autowired
    public Day0201_MemberService(Day0201_MemberRepository day0201_MemberRepository) {
        this.day0201_MemberRepository = day0201_MemberRepository;
    }

    /**
     * 회원 전체 정보 조회하기 비즈니스 로직
     * @return List<Day0201_Member>
     */
    public List<Day0201_Member> getMemberList() {
        return this.day0201_MemberRepository.findAll();
    }

    /**
     * 회원 상세조회
     * -- ** -- ** -- ** --
     * @param mem_id
     * @return Day0201_Member
    */
    public Day0201_Member getMemberView(String mem_id){
        // Optional : 객체를 감싸서 null 체크를 편리하게 하는 클래스
        Optional<Day0201_Member> member = this.day0201_MemberRepository.findById(mem_id);

        // 조회 결과가 있을 때
        // isPresent() : Optional에 담겨있는 객체에 데이터가 있는 경우
        if (member.isPresent()) {
            // 터미널에 log 메세지 남기기
            log.info("회원 아이디[{}]의 정보를 조회하였습니다.", mem_id);

            // get() : Optional 객체에 담겨있는 Day0201_Member 객체를 추출
            return member.get();
        } else {
            // 조회 결과가 없을 때
            return null;
        }
    }
}
