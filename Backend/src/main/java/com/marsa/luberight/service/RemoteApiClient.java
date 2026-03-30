package com.marsa.luberight.service;

import com.marsa.luberight.dto.RemoteLubricationPointPayload;
import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;

@Service
public class RemoteApiClient {

  private static final Logger log = LoggerFactory.getLogger(RemoteApiClient.class);

  private final WebClient remoteApiWebClient;

  public RemoteApiClient(WebClient remoteApiWebClient) {
    this.remoteApiWebClient = remoteApiWebClient;
  }

  public List<RemoteLubricationPointPayload> fetchData(LocalDateTime updatedAfter) {
    try {
      return remoteApiWebClient
          .get()
          .uri(
              uriBuilder -> {
                uriBuilder.path("/api/data");
                if (updatedAfter != null) {
                  uriBuilder.queryParam("updatedAfter", updatedAfter);
                }
                return uriBuilder.build();
              })
          .retrieve()
          .bodyToFlux(RemoteLubricationPointPayload.class)
          .collectList()
          .block();
    } catch (WebClientResponseException ex) {
      log.error(
          "Remote API responded with status {} and body {}",
          ex.getStatusCode(),
          ex.getResponseBodyAsString(),
          ex);
      return Collections.emptyList();
    } catch (Exception ex) {
      log.error("Remote API call failed", ex);
      return Collections.emptyList();
    }
  }
}
