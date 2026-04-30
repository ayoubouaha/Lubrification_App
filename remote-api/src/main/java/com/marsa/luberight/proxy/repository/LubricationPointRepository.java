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
            adm.LubricantIndex AS lubricator,
            adm.[Interval] AS [interval],
            cal.ActualInterval AS actualInterval,
            COALESCE(cal.Amount, adm.Amount) AS plannedAmount,
            cal.ActualAmount AS actualAmount,
            cal.[TimeStamp] AS [timestamp]
          FROM dbo.Admin adm
          LEFT JOIN dbo.Calender cal
            ON cal.AdminIndex = adm.[Index]
          WHERE adm.Active = 1
          ORDER BY
            CASE WHEN cal.[TimeStamp] IS NULL THEN 1 ELSE 0 END,
            cal.[TimeStamp] ASC,
            cal.[Index] ASC
          """,
      nativeQuery = true)
  List<LubricationPointView> findForInitialLoad();

  @Query(
      value =
          """
          SELECT
            adm.Name AS name,
            adm.LubricantIndex AS lubricator,
            adm.[Interval] AS [interval],
            cal.ActualInterval AS actualInterval,
            COALESCE(cal.Amount, adm.Amount) AS plannedAmount,
            cal.ActualAmount AS actualAmount,
            cal.[TimeStamp] AS [timestamp]
          FROM dbo.Admin adm
          INNER JOIN dbo.Calender cal
            ON cal.AdminIndex = adm.[Index]
          WHERE adm.Active = 1
            AND cal.[TimeStamp] > :updatedAfter
          ORDER BY
            cal.[TimeStamp] ASC,
            cal.[Index] ASC
          """,
      nativeQuery = true)
  List<LubricationPointView> findIncremental(@Param("updatedAfter") LocalDateTime updatedAfter);
}
