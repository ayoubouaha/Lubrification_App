package com.marsa.luberight.proxy.controller;

import com.marsa.luberight.proxy.domain.LubricationPointResponse;
import com.marsa.luberight.proxy.service.LubricationPointService;
import java.time.LocalDateTime;
import java.util.List;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LubricationPointController {

  private final LubricationPointService service;

  public LubricationPointController(LubricationPointService service) {
    this.service = service;
  }

  @GetMapping("/api/data")
  public ResponseEntity<List<LubricationPointResponse>> findData(
      @RequestParam(value = "updatedAfter", required = false)
          @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
          LocalDateTime updatedAfter) {
    return ResponseEntity.ok(service.fetch(updatedAfter));
  }
}
