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

  protected SyncMetadata() {}

  public SyncMetadata(String id) {
    this.id = id;
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
}
