package com.marsa.luberight.proxy.sync;

import com.marsa.luberight.proxy.domain.LubricationPointResponse;
import com.marsa.luberight.proxy.service.LubricationPointService;
import jakarta.annotation.PostConstruct;
import java.time.LocalDateTime;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class TwoPhaseSyncScheduler {

  private static final Logger log = LoggerFactory.getLogger(TwoPhaseSyncScheduler.class);

  private final LubricationPointService lubricationPointService;
  private final BackendSyncClient backendSyncClient;

  public TwoPhaseSyncScheduler(
      LubricationPointService lubricationPointService, BackendSyncClient backendSyncClient) {
    this.lubricationPointService = lubricationPointService;
    this.backendSyncClient = backendSyncClient;
  }

  @PostConstruct
  public void runOnStartup() {
    runSyncCycle();
  }

  @Scheduled(fixedDelayString = "${sync.interval:7200000}", initialDelayString = "${sync.initial-delay:7200000}")
  public void scheduledSync() {
    runSyncCycle();
  }

  private void runSyncCycle() {
    try {
      LocalDateTime lastProcessedTimestamp = backendSyncClient.fetchLastProcessedTimestamp();
      List<LubricationPointResponse> payload = lubricationPointService.fetch(lastProcessedTimestamp);

      if (payload.isEmpty()) {
        log.info("Two-phase sync: no new data (lastProcessedTimestamp={})", lastProcessedTimestamp);
        return;
      }

      backendSyncClient.pushBatch(payload);
      log.info(
          "Two-phase sync: pushed {} rows (lastProcessedTimestamp={})",
          payload.size(),
          lastProcessedTimestamp);
    } catch (Exception ex) {
      log.error("Two-phase sync failed", ex);
    }
  }
}
