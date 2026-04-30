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

  @Column(name = "lubricator_value")
  private Integer lubricator;

  @Column(name = "planned_amount")
  private BigDecimal plannedAmount;

  @Column(name = "actual_amount")
  private BigDecimal actualAmount;

  protected CalenderSnapshot() {}

  public CalenderSnapshot(
      CalenderSnapshotId id,
      Integer actualInterval,
      Integer lubricator,
      BigDecimal plannedAmount,
      BigDecimal actualAmount) {
    this.id = id;
    this.actualInterval = actualInterval;
    this.lubricator = lubricator;
    this.plannedAmount = plannedAmount;
    this.actualAmount = actualAmount;
  }

  public CalenderSnapshotId getId() {
    return id;
  }

  public Integer getActualInterval() {
    return actualInterval;
  }

  public Integer getLubricator() {
    return lubricator;
  }

  public BigDecimal getPlannedAmount() {
    return plannedAmount;
  }

  public BigDecimal getActualAmount() {
    return actualAmount;
  }

  public void setActualInterval(Integer actualInterval) {
    this.actualInterval = actualInterval;
  }

  public void setLubricator(Integer lubricator) {
    this.lubricator = lubricator;
  }

  public void setPlannedAmount(BigDecimal plannedAmount) {
    this.plannedAmount = plannedAmount;
  }

  public void setActualAmount(BigDecimal actualAmount) {
    this.actualAmount = actualAmount;
  }
}
