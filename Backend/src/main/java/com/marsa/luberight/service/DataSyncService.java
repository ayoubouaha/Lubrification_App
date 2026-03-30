package com.marsa.luberight.service;

import com.marsa.luberight.domain.LubricationPointSnapshot;
import com.marsa.luberight.domain.SyncMetadata;
import com.marsa.luberight.domain.CalenderSnapshot;
import com.marsa.luberight.domain.CalenderSnapshotId;
import com.marsa.luberight.dto.RemoteLubricationPointPayload;
import com.marsa.luberight.repository.CalenderSnapshotRepository;
import com.marsa.luberight.repository.LubricationPointRepository;
import com.marsa.luberight.repository.SyncMetadataRepository;
import jakarta.annotation.PostConstruct;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class DataSyncService {

  private static final Logger log = LoggerFactory.getLogger(DataSyncService.class);
  private static final String SYNC_ID = "lubrication-sync";

  private final RemoteApiClient remoteApiClient;
  private final LubricationPointRepository snapshotRepository;
  private final SyncMetadataRepository metadataRepository;
  private final CalenderSnapshotRepository calenderSnapshotRepository;

  public DataSyncService(
      RemoteApiClient remoteApiClient,
      LubricationPointRepository snapshotRepository,
      SyncMetadataRepository metadataRepository,
      CalenderSnapshotRepository calenderSnapshotRepository) {
    this.remoteApiClient = remoteApiClient;
    this.snapshotRepository = snapshotRepository;
    this.metadataRepository = metadataRepository;
    this.calenderSnapshotRepository = calenderSnapshotRepository;
  }

  @PostConstruct
  @Transactional
  public void ensureMetadataRowExists() {
    metadataRepository.findById(SYNC_ID).orElseGet(() -> metadataRepository.save(new SyncMetadata(SYNC_ID)));
  }

  @Scheduled(fixedDelayString = "${sync.interval:5000}")
  @Transactional
  public void sync() {
    SyncMetadata metadata = metadataRepository.findById(SYNC_ID).orElseGet(() -> new SyncMetadata(SYNC_ID));
    LocalDateTime lastSync = metadata.getLastSyncTimestamp();

    // Always refresh latest snapshots so Admin-only updates (interval/planned amount)
    // are not missed when no new Calender timestamp exists.
    List<RemoteLubricationPointPayload> latestPayload = remoteApiClient.fetchData(null);
    if (latestPayload != null && !latestPayload.isEmpty()) {
      latestPayload.forEach(this::upsertSnapshot);
    }

    List<RemoteLubricationPointPayload> incrementalPayload;
    if (lastSync == null) {
      incrementalPayload = latestPayload;
    } else {
      incrementalPayload = remoteApiClient.fetchData(lastSync);
    }

    if (incrementalPayload == null || incrementalPayload.isEmpty()) {
      return;
    }

    incrementalPayload.forEach(this::upsertCalender);

    Optional<LocalDateTime> maxTimestamp =
        incrementalPayload.stream()
            .map(RemoteLubricationPointPayload::timestamp)
            .filter(ts -> ts != null)
            .max(Comparator.naturalOrder());

    maxTimestamp.ifPresent(
        ts -> {
          metadata.setLastSyncTimestamp(ts);
          metadataRepository.save(metadata);
        });
  }

  private void upsertSnapshot(RemoteLubricationPointPayload response) {
    if (response.name() == null) {
      log.warn("Skipping entry with null name: {}", response);
      return;
    }

    LubricationPointSnapshot snapshot =
        snapshotRepository
            .findById(response.name())
            .orElseGet(() -> new LubricationPointSnapshot(response.name(), null, null, null, null));

    snapshot.setInterval(response.interval());
    snapshot.setPlannedAmount(toBigDecimal(response.plannedAmount()));
    snapshot.setActualAmount(toBigDecimal(response.actualAmount()));
    snapshot.setTimestamp(response.timestamp());

    snapshotRepository.save(snapshot);
  }

  private void upsertCalender(RemoteLubricationPointPayload response) {
    if (response.name() == null || response.timestamp() == null) {
      return;
    }

    CalenderSnapshotId id = new CalenderSnapshotId(response.name(), response.timestamp());
    CalenderSnapshot calender =
        calenderSnapshotRepository
            .findById(id)
            .orElseGet(() -> new CalenderSnapshot(id, null, null));

    calender.setActualInterval(response.actualInterval());
    calender.setActualAmount(toBigDecimal(response.actualAmount()));

    calenderSnapshotRepository.save(calender);
  }

  private BigDecimal toBigDecimal(Double value) {
    return value == null ? null : BigDecimal.valueOf(value);
  }
}
