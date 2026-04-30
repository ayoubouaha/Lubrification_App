package com.marsa.luberight.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.LocalDateTime;

@Entity
@Table(name = "sync_metadata")
public class SyncMetadata {

  @Id
  @Column(name = "id", nullable = false)
  private String id;

  @Column(name = "last_sync_timestamp")
  private LocalDateTime lastSyncTimestamp;

  @Column(name = "last_sync_source_row_id")
  private Long lastSyncSourceRowId;

  @Column(name = "initial_sync_completed", nullable = false)
  private boolean initialSyncCompleted;

  protected SyncMetadata() {}

  public SyncMetadata(String id) {
    this.id = id;
    this.initialSyncCompleted = false;
  }

  public String getId() {
    return id;
  }

  public LocalDateTime getLastSyncTimestamp() {
    return lastSyncTimestamp;
  }

  public void setLastSyncTimestamp(LocalDateTime lastSyncTimestamp) {
    this.lastSyncTimestamp = lastSyncTimestamp;
  }

  public Long getLastSyncSourceRowId() {
    return lastSyncSourceRowId;
  }

  public void setLastSyncSourceRowId(Long lastSyncSourceRowId) {
    this.lastSyncSourceRowId = lastSyncSourceRowId;
  }

  public boolean isInitialSyncCompleted() {
    return initialSyncCompleted;
  }

  public void setInitialSyncCompleted(boolean initialSyncCompleted) {
    this.initialSyncCompleted = initialSyncCompleted;
  }
}
