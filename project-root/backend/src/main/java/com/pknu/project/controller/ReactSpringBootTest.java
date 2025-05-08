package com.pknu.project.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/test")
public class ReactSpringBootTest {

    // React에서 /test/spring_test url로 요청이 들어오면 처리
    @GetMapping("/spring_test")
    public ResponseEntity<String> getReactSpringConnect() {
        return ResponseEntity.ok("SpringBoot에 정상적으로 연결되었습니다.");
    }
}