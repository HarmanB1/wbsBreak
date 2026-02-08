package com.wbsbreak.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/projects")
public class ProjectController{
  private final ProjectService service;

  @Autowired
  public ProjectController(ProjectService service){
    this.service = service;
  }


  @GetMapping("/overview"){
    return service;
  }
}
