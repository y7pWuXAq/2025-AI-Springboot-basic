package com.pknu.example.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;


// Rest API 전용 라이브러리 사용\
//  -> 사용자의 요청과 응답을 담당하는 라이브러리
@RestController
public class ExampleTest {
    @GetMapping(path={"/", "/index", "/index.html", "/index.jsp", "/index.php"})
    public String root3(){
        // return "<h2> 스프링부트 메인 페이지 입니다!! *^^* 야호 ! </h2>";

        // 버퍼 메모리에 문자열을 행단위로 작성하여 문자열 변수처럼 사용하는 객체
        StringBuffer sb = new StringBuffer();

        sb.append("<h3>스프링부트 메인 페이지 입니다.</h3>");
        sb.append("<hr/>");
        sb.append("<p>아주 잘 되는군!</p>");

        // 버퍼 메모리에 저장된 문자열 데이터를 문자열 타입(toString())으로 변환하여 전달
        return sb.toString();
    }
}
