package com.marsa.luberight.service;

import com.marsa.luberight.dto.LubricationPointResponse;
import com.marsa.luberight.exception.ResourceNotFoundException;
import com.marsa.luberight.repository.LubricationPointRepository;
import com.marsa.luberight.repository.LubricationPointView;
import java.math.BigDecimal;
import org.springframework.stereotype.Service;

@Service
public class LubricationPointService {

  private final LubricationPointRepository repository;

  public LubricationPointService(LubricationPointRepository repository) {
    this.repository = repository;
  }

  public LubricationPointResponse findLatestByName(String name) {
    LubricationPointView view =
        repository
            .findLatestByName(name)
            .orElseThrow(
                () -> new ResourceNotFoundException("No lubrication data found for point: " + name));

    return new LubricationPointResponse(
        view.getName(),
        view.getInterval(),
        normalizeAmount(view.getPlannedAmount()),
        normalizeAmount(view.getActualAmount()),
        view.getTimestamp());
  }

  private Double normalizeAmount(BigDecimal amount) {
    if (amount == null) {
      return null;
    }

    return amount.doubleValue();
  }
}
