package com.marsa.luberight.proxy.domain;

import java.time.LocalDateTime;

public record LubricationPointResponse(
    String name,
    Integer interval,
    Double plannedAmount,
    Double actualAmount,
    LocalDateTime timestamp) {}
