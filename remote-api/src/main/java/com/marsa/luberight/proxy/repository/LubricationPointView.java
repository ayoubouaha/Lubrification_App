package com.marsa.luberight.proxy.repository;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public interface LubricationPointView {
  String getName();

  Integer getInterval();

  BigDecimal getPlannedAmount();

  BigDecimal getActualAmount();

  LocalDateTime getTimestamp();
}
