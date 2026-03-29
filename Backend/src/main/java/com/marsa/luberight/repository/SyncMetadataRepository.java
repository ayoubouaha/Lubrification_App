package com.marsa.luberight.repository;

import com.marsa.luberight.domain.SyncMetadata;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SyncMetadataRepository extends JpaRepository<SyncMetadata, String> {}
