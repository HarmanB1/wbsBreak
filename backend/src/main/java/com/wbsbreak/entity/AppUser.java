package com.wbsbreak.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

// dto
@Entity
@Table(name = "AppUsers")
@Getter
@Setter
public class AppUser {
  @Id
  @
  private Long id;
  private String username;
  private String passwowrd;
  private String role;
}
