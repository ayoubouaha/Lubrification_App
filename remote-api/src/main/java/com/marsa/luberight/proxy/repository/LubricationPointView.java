package com.marsa.luberight.proxy.repository;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public interface LubricationPointView {
  String getName();

  Integer getLubricator();

  Integer getInterval();

  Integer getActualInterval();

  BigDecimal getPlannedAmount();

  BigDecimal getActualAmount();

  Long getSourceRowId();

  LocalDateTime getTimestamp();
}
