package com.marsa.luberight.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "lubrication_point_snapshot")
public class LubricationPointSnapshot {

  @Id
  @Column(name = "name", nullable = false, unique = true)
  private String name;

  @Column(name = "interval_value")
  private Integer interval;

  @Column(name = "lubricator_value")
  private Integer lubricator;

  @Column(name = "planned_amount")
  private BigDecimal plannedAmount;

  @Column(name = "actual_amount")
  private BigDecimal actualAmount;

  @Column(name = "timestamp_value")
  private LocalDateTime timestamp;

  protected LubricationPointSnapshot() {}

  public LubricationPointSnapshot(
      String name,
      Integer lubricator,
      Integer interval,
      BigDecimal plannedAmount,
      BigDecimal actualAmount,
      LocalDateTime timestamp) {
    this.name = name;
    this.lubricator = lubricator;
    this.interval = interval;
    this.plannedAmount = plannedAmount;
    this.actualAmount = actualAmount;
    this.timestamp = timestamp;
  }

  public String getName() {
    return name;
  }

  public Integer getInterval() {
    return interval;
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

  public LocalDateTime getTimestamp() {
    return timestamp;
  }

  public void setInterval(Integer interval) {
    this.interval = interval;
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

  public void setTimestamp(LocalDateTime timestamp) {
    this.timestamp = timestamp;
  }
}
