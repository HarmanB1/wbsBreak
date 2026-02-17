package com.wbsbreak.controller;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

  @GetMapping("/login")
  public class user(){
    reutnr response.ok();
  }
}
