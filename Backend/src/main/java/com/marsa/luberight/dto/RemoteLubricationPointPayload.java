package com.marsa.luberight.dto;

import java.time.LocalDateTime;

public record RemoteLubricationPointPayload(
    String name,
    Integer lubricator,
    Integer interval,
    Integer actualInterval,
    Double plannedAmount,
    Double actualAmount,
    Long sourceRowId,
    LocalDateTime timestamp) {}
