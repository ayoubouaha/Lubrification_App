package com.marsa.luberight.proxy;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class RemoteApiApplication {
  public static void main(String[] args) {
    SpringApplication.run(RemoteApiApplication.class, args);
  }
}
