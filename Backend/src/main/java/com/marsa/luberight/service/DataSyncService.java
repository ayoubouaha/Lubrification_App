package com.marsa.luberight.service;

import com.marsa.luberight.domain.CalenderSnapshot;
import com.marsa.luberight.domain.CalenderSnapshotId;
import com.marsa.luberight.domain.LubricationPointSnapshot;
import com.marsa.luberight.domain.SyncMetadata;
import com.marsa.luberight.dto.RemoteLubricationPointPayload;
import com.marsa.luberight.repository.CalenderSnapshotRepository;
import com.marsa.luberight.repository.LubricationPointRepository;
import com.marsa.luberight.repository.SyncMetadataRepository;
import jakarta.annotation.PostConstruct;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class DataSyncService {

  private static final Logger log = LoggerFactory.getLogger(DataSyncService.class);
  private static final String SYNC_ID = "lubrication-sync";

  private final LubricationPointRepository snapshotRepository;
  private final SyncMetadataRepository metadataRepository;
  private final CalenderSnapshotRepository calenderSnapshotRepository;

  public DataSyncService(
      LubricationPointRepository snapshotRepository,
      SyncMetadataRepository metadataRepository,
      CalenderSnapshotRepository calenderSnapshotRepository) {
    this.snapshotRepository = snapshotRepository;
    this.metadataRepository = metadataRepository;
    this.calenderSnapshotRepository = calenderSnapshotRepository;
  }

  @PostConstruct
  @Transactional
  public void ensureMetadataRowExists() {
    metadataRepository.findById(SYNC_ID).orElseGet(() -> metadataRepository.save(new SyncMetadata(SYNC_ID)));
  }

  @Transactional(readOnly = true)
  public LocalDateTime getLastProcessedTimestamp() {
    return metadataRepository.findById(SYNC_ID).map(SyncMetadata::getLastSyncTimestamp).orElse(null);
  }

  @Transactional
  public int ingestBatch(List<RemoteLubricationPointPayload> payloads) {
    if (payloads == null || payloads.isEmpty()) {
      return 0;
    }

    SyncMetadata metadata = metadataRepository.findById(SYNC_ID).orElseGet(() -> new SyncMetadata(SYNC_ID));
    LocalDateTime maxTimestamp = metadata.getLastSyncTimestamp();

    int insertedRows = 0;
    for (RemoteLubricationPointPayload payload : payloads) {
      upsertSnapshot(payload);
      if (insertCalenderIfNew(payload)) {
        insertedRows++;
      }

      LocalDateTime timestamp = payload.timestamp();
      if (timestamp != null && (maxTimestamp == null || timestamp.isAfter(maxTimestamp))) {
        maxTimestamp = timestamp;
      }
    }

    if (maxTimestamp != null
        && (metadata.getLastSyncTimestamp() == null || maxTimestamp.isAfter(metadata.getLastSyncTimestamp()))) {
      metadata.setLastSyncTimestamp(maxTimestamp);
      metadataRepository.save(metadata);
    }

    return insertedRows;
  }

  private void upsertSnapshot(RemoteLubricationPointPayload response) {
    if (response.name() == null) {
      log.warn("Skipping entry with null name: {}", response);
      return;
    }

    LubricationPointSnapshot snapshot =
        snapshotRepository
            .findById(response.name())
            .orElseGet(
                () ->
                    new LubricationPointSnapshot(
                        response.name(),
                        null,
                        null,
                        null,
                        null,
                        null));

    if (!shouldApplySnapshotUpdate(snapshot.getTimestamp(), response.timestamp())) {
      return;
    }

    snapshot.setLubricator(response.lubricator());
    snapshot.setInterval(response.interval());
    snapshot.setPlannedAmount(toBigDecimal(response.plannedAmount()));
    snapshot.setActualAmount(toBigDecimal(response.actualAmount()));
    snapshot.setTimestamp(response.timestamp());

    snapshotRepository.save(snapshot);
  }

  private boolean insertCalenderIfNew(RemoteLubricationPointPayload response) {
    if (response.name() == null || response.timestamp() == null) {
      return false;
    }

    CalenderSnapshotId id = new CalenderSnapshotId(response.name(), response.timestamp());
    Optional<CalenderSnapshot> existing = calenderSnapshotRepository.findById(id);
    if (existing.isPresent()) {
      return false;
    }

    CalenderSnapshot calender =
        new CalenderSnapshot(
            id,
            response.actualInterval(),
            response.lubricator(),
            toBigDecimal(response.plannedAmount()),
            toBigDecimal(response.actualAmount()));

    calenderSnapshotRepository.save(calender);
    return true;
  }

  private boolean shouldApplySnapshotUpdate(
      LocalDateTime currentTimestamp, LocalDateTime incomingTimestamp) {
    if (incomingTimestamp == null) {
      return currentTimestamp == null;
    }

    if (currentTimestamp == null) {
      return true;
    }

    return !incomingTimestamp.isBefore(currentTimestamp);
  }

  private BigDecimal toBigDecimal(Double value) {
    return value == null ? null : BigDecimal.valueOf(value);
  }
}
