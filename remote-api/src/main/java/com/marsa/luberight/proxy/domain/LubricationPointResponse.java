package com.marsa.luberight.proxy.domain;

import java.time.LocalDateTime;

public record LubricationPointResponse(
    String name,
    Integer lubricator,
    Integer interval,
    Integer actualInterval,
    Double plannedAmount,
    Double actualAmount,
    Long sourceRowId,
    LocalDateTime timestamp) {}
