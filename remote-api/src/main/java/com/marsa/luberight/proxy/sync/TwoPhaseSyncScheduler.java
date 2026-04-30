package com.marsa.luberight.proxy.sync;

import com.marsa.luberight.proxy.domain.LubricationPointResponse;
import com.marsa.luberight.proxy.service.LubricationPointService;
import jakarta.annotation.PostConstruct;
import java.time.LocalDateTime;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.web.client.ResourceAccessException;

@Component
public class TwoPhaseSyncScheduler {

  private static final Logger log = LoggerFactory.getLogger(TwoPhaseSyncScheduler.class);

  private final LubricationPointService lubricationPointService;
  private final BackendSyncClient backendSyncClient;
  private final long backendCheckIntervalMs;

  public TwoPhaseSyncScheduler(
      LubricationPointService lubricationPointService,
      BackendSyncClient backendSyncClient,
      @Value("${sync.backend-check-interval:5000}") long backendCheckIntervalMs) {
    this.lubricationPointService = lubricationPointService;
    this.backendSyncClient = backendSyncClient;
    this.backendCheckIntervalMs = backendCheckIntervalMs;
  }

  @PostConstruct
  public void waitForBackendAvailability() {
    while (!backendSyncClient.isBackendAvailable()) {
      log.warn(
          "Backend is not reachable yet; waiting {} ms before retrying health check.",
          backendCheckIntervalMs);
      try {
        Thread.sleep(backendCheckIntervalMs);
      } catch (InterruptedException ex) {
        Thread.currentThread().interrupt();
        throw new IllegalStateException("Interrupted while waiting for backend availability", ex);
      }
    }
    log.info("Backend is reachable; two-phase sync is enabled.");
  }


  @Scheduled(fixedDelayString = "${sync.interval:7200000}", initialDelayString = "${sync.initial-delay:60000}")
  public void scheduledSync() {
    runSyncCycle();
  }

  private void runSyncCycle() {
    try {
      BackendSyncClient.SyncStateResponse syncState = backendSyncClient.fetchSyncState();
      List<LubricationPointResponse> payload = lubricationPointService.fetch(syncState);
      LocalDateTime lastProcessedTimestamp = syncState == null ? null : syncState.lastProcessedTimestamp();
      Long lastProcessedSourceRowId = syncState == null ? null : syncState.lastProcessedSourceRowId();

      if (payload.isEmpty()) {
        log.info(
            "Two-phase sync: no new data (lastProcessedTimestamp={}, lastProcessedSourceRowId={})",
            lastProcessedTimestamp,
            lastProcessedSourceRowId);
        return;
      }

      backendSyncClient.pushBatch(payload);
      log.info(
          "Two-phase sync: pushed {} rows (lastProcessedTimestamp={}, lastProcessedSourceRowId={})",
          payload.size(),
          lastProcessedTimestamp,
          lastProcessedSourceRowId);
    } catch (ResourceAccessException ex) {
      log.warn("Two-phase sync skipped: backend unreachable ({}). Will retry on next schedule.", ex.getMessage());
    } catch (Exception ex) {
      log.error("Two-phase sync failed", ex);
    }
  }
}
