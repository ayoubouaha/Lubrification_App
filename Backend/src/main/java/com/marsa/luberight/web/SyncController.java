package com.marsa.luberight.web;

import com.marsa.luberight.dto.RemoteLubricationPointPayload;
import com.marsa.luberight.service.DataSyncService;
import java.time.LocalDateTime;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/lubrication/sync")
public class SyncController {

  private final DataSyncService dataSyncService;

  public SyncController(DataSyncService dataSyncService) {
    this.dataSyncService = dataSyncService;
  }

  @GetMapping("/last-processed")
  public ResponseEntity<SyncStateResponse> getLastProcessedTimestamp() {
    DataSyncService.SyncState state = dataSyncService.getSyncState();
    return ResponseEntity.ok(
        new SyncStateResponse(
            state.lastProcessedTimestamp(),
            state.lastProcessedSourceRowId(),
            state.initialSyncCompleted()));
  }

  @PostMapping("/batch")
  public ResponseEntity<SyncIngestResponse> ingestBatch(
      @RequestBody List<RemoteLubricationPointPayload> payloads) {
    int insertedRows = dataSyncService.ingestBatch(payloads);
    DataSyncService.SyncState state = dataSyncService.getSyncState();
    return ResponseEntity.ok(new SyncIngestResponse(payloads == null ? 0 : payloads.size(), insertedRows, state));
  }

  public record SyncStateResponse(
      LocalDateTime lastProcessedTimestamp,
      Long lastProcessedSourceRowId,
      boolean initialSyncCompleted) {}

  public record SyncIngestResponse(int receivedRows, int insertedRows, DataSyncService.SyncState state) {}
}
