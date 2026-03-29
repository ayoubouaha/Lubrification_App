package com.marsa.luberight;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class LubeRightBackendApplication {
  public static void main(String[] args) {
    SpringApplication.run(LubeRightBackendApplication.class, args);
  }
}
