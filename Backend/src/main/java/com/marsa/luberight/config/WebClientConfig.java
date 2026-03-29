package com.marsa.luberight.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.client.reactive.ReactorClientHttpConnector;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.netty.http.client.HttpClient;

@Configuration
public class WebClientConfig {

  @Value("${remote.api.base-url}")
  private String remoteApiBaseUrl;

  @Bean
  public WebClient remoteApiWebClient() {
    HttpClient httpClient = HttpClient.create().compress(true);
    return WebClient.builder()
        .baseUrl(remoteApiBaseUrl)
        .clientConnector(new ReactorClientHttpConnector(httpClient))
        .build();
  }
}
