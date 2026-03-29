package com.marsa.luberight.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Objects;

@Embeddable
public class CalenderSnapshotId implements Serializable {

  @Column(name = "name", nullable = false)
  private String name;

  @Column(name = "timestamp_value", nullable = false)
  private LocalDateTime timestamp;

  public CalenderSnapshotId() {}

  public CalenderSnapshotId(String name, LocalDateTime timestamp) {
    this.name = name;
    this.timestamp = timestamp;
  }

  public String getName() {
    return name;
  }

  public LocalDateTime getTimestamp() {
    return timestamp;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) return true;
    if (o == null || getClass() != o.getClass()) return false;
    CalenderSnapshotId that = (CalenderSnapshotId) o;
    return Objects.equals(name, that.name) && Objects.equals(timestamp, that.timestamp);
  }

  @Override
  public int hashCode() {
    return Objects.hash(name, timestamp);
  }
}
