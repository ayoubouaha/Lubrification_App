package com.marsa.luberight.domain;

import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import java.math.BigDecimal;

@Entity
@Table(name = "calender_snapshot")
public class CalenderSnapshot {

  @EmbeddedId private CalenderSnapshotId id;

  @Column(name = "actual_interval")
  private Integer actualInterval;

  @Column(name = "actual_amount")
  private BigDecimal actualAmount;

  protected CalenderSnapshot() {}

  public CalenderSnapshot(
      CalenderSnapshotId id, Integer actualInterval, BigDecimal actualAmount) {
    this.id = id;
    this.actualInterval = actualInterval;
    this.actualAmount = actualAmount;
  }

  public CalenderSnapshotId getId() {
    return id;
  }

  public Integer getActualInterval() {
    return actualInterval;
  }

  public BigDecimal getActualAmount() {
    return actualAmount;
  }

  public void setActualInterval(Integer actualInterval) {
    this.actualInterval = actualInterval;
  }

  public void setActualAmount(BigDecimal actualAmount) {
    this.actualAmount = actualAmount;
  }
}
