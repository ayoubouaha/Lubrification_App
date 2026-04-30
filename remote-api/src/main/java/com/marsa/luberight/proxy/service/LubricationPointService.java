package com.marsa.luberight.proxy.service;

import com.marsa.luberight.proxy.domain.LubricationPointResponse;
import com.marsa.luberight.proxy.sync.BackendSyncClient;
import com.marsa.luberight.proxy.repository.LubricationPointRepository;
import com.marsa.luberight.proxy.repository.LubricationPointView;
import java.math.BigDecimal;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class LubricationPointService {

  private final LubricationPointRepository repository;

  public LubricationPointService(LubricationPointRepository repository) {
    this.repository = repository;
  }

  public List<LubricationPointResponse> fetch(BackendSyncClient.SyncStateResponse syncState) {
    if (syncState == null || !Boolean.TRUE.equals(syncState.initialSyncCompleted())) {
      return repository.findForInitialLoad().stream().map(this::mapToResponse).toList();
    }

    long lastSourceRowId = syncState.lastProcessedSourceRowId() == null ? 0L : syncState.lastProcessedSourceRowId();
    return repository.findIncremental(lastSourceRowId).stream()
        .map(this::mapToResponse)
        .toList();
  }

  private LubricationPointResponse mapToResponse(LubricationPointView view) {
    return new LubricationPointResponse(
        view.getName(),
        view.getLubricator(),
        view.getInterval(),
        view.getActualInterval(),
        toDouble(view.getPlannedAmount()),
        toDouble(view.getActualAmount()),
        view.getSourceRowId(),
        view.getTimestamp());
  }

  private Double toDouble(BigDecimal value) {
    return value == null ? null : value.doubleValue();
  }
}
