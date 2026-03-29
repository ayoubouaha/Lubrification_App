package com.marsa.luberight.repository;

import com.marsa.luberight.domain.CalenderSnapshot;
import com.marsa.luberight.domain.CalenderSnapshotId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CalenderSnapshotRepository
    extends JpaRepository<CalenderSnapshot, CalenderSnapshotId> {}
