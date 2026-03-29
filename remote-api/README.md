# LubeRight Remote API

A lightweight Spring Boot proxy that exposes the database queries currently used by the main
application. Runs next to SQL Server and serves the same DTO structure through HTTP.

## How to run

1. Ensure Java 17 and Maven are installed.
2. Configure database credentials in `.env` (sample provided).
3. Start the service:
   ```bash
   mvn spring-boot:run
   ```

The service listens on `http://localhost:8082` by default.

## Endpoint

- `GET /api/data?updatedAfter=2024-01-01T00:00:00`
  - No `updatedAfter` parameter returns all active lubrication points.
  - With `updatedAfter`, returns only rows whose latest calendar timestamp is greater than the
    provided value.

## Notes

- Reuses the exact SQL native query from the original repository.
- Outputs JSON matching `LubricationPointResponse` (name, interval, plannedAmount, actualAmount,
  timestamp).
