package com.marsa.luberight.proxy.repository;

import com.marsa.luberight.proxy.domain.Admin;
import java.time.LocalDateTime;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface LubricationPointRepository extends JpaRepository<Admin, Integer> {

  @Query(
      value =
          """
          SELECT
            adm.Name AS name,
            COALESCE(latestCal.ActualInterval, adm.[Interval]) AS [interval],
            adm.Amount AS plannedAmount,
            latestCal.ActualAmount AS actualAmount,
            latestCal.[TimeStamp] AS [timestamp]
          FROM dbo.Admin adm
          OUTER APPLY (
            SELECT TOP (1)
              cal.ActualInterval,
              cal.ActualAmount,
              cal.[TimeStamp],
              cal.[Index]
            FROM dbo.Calender cal
            WHERE cal.AdminIndex = adm.[Index]
            ORDER BY
              CASE WHEN cal.ActualAmount IS NULL THEN 1 ELSE 0 END,
              cal.[TimeStamp] DESC,
              cal.[Index] DESC
          ) AS latestCal
          WHERE adm.Active = 1
            AND (:updatedAfter IS NULL OR latestCal.[TimeStamp] > :updatedAfter)
          """,
      nativeQuery = true)
  List<LubricationPointView> findLatest(@Param("updatedAfter") LocalDateTime updatedAfter);
}
