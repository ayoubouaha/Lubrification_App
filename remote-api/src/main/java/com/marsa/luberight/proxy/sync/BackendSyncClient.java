package com.marsa.luberight.proxy.sync;

import com.marsa.luberight.proxy.domain.LubricationPointResponse;
import java.time.LocalDateTime;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

@Component
public class BackendSyncClient {

  private static final Logger log = LoggerFactory.getLogger(BackendSyncClient.class);

  private final RestTemplate restTemplate;
  private final String backendBaseUrl;
  private final String backendHealthPath;

  public BackendSyncClient(
      RestTemplate restTemplate,
      @Value("${backend.api.base-url:http://localhost:8081}") String backendBaseUrl,
      @Value("${backend.api.health-path:/actuator/health}") String backendHealthPath) {
    this.restTemplate = restTemplate;
    this.backendBaseUrl = backendBaseUrl;
    this.backendHealthPath = backendHealthPath;
  }

  public boolean isBackendAvailable() {
    if (isPathReachable(backendHealthPath)) {
      return true;
    }
    return isPathReachable("/health");
  }

  public SyncStateResponse fetchSyncState() {
    String url = backendBaseUrl + "/api/lubrication/sync/last-processed";
    ResponseEntity<SyncStateResponse> response = restTemplate.getForEntity(url, SyncStateResponse.class);
    return response.getBody();
  }

  public void pushBatch(List<LubricationPointResponse> payloads) {
    String url = backendBaseUrl + "/api/lubrication/sync/batch";
    HttpEntity<List<LubricationPointResponse>> requestEntity = new HttpEntity<>(payloads);
    ResponseEntity<SyncIngestResponse> response =
        restTemplate.exchange(url, HttpMethod.POST, requestEntity, SyncIngestResponse.class);

    SyncIngestResponse body = response.getBody();
    if (body != null) {
      log.info(
          "Backend sync accepted batch: receivedRows={}, insertedRows={}, lastProcessedTimestamp={}, lastProcessedSourceRowId={}, initialSyncCompleted={}",
          body.receivedRows(),
          body.insertedRows(),
          body.state() == null ? null : body.state().lastProcessedTimestamp(),
          body.state() == null ? null : body.state().lastProcessedSourceRowId(),
          body.state() != null && Boolean.TRUE.equals(body.state().initialSyncCompleted()));
    }
  }

  private boolean isPathReachable(String path) {
    try {
      String normalizedPath = path.startsWith("/") ? path : "/" + path;
      String url = backendBaseUrl + normalizedPath;
      ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);
      return response.getStatusCode().is2xxSuccessful();
    } catch (Exception ex) {
      log.debug("Backend health check failed at path {}: {}", path, ex.getMessage());
      return false;
    }
  }

  public record SyncStateResponse(
      LocalDateTime lastProcessedTimestamp, Long lastProcessedSourceRowId, Boolean initialSyncCompleted) {}

  public record SyncIngestResponse(int receivedRows, int insertedRows, SyncStateResponse state) {}
}
