# LubeRight Remote API

Minimal Spring Boot service that exposes the existing SQL query used by the legacy app. It reads directly from the production schema (`dbo.Admin` and `dbo.Calender`) and returns DTOs for downstream consumers (the Backend cache and the front-end during dev).

## Requirements
- Java 17
- Maven 3.9+
- SQL Server with the LubeRight schema (tables `Admin`, `Calender`)
- Network access from the service host to SQL Server

## Configuration
Create `remote-api/.env`:
```
DB_URL=jdbc:sqlserver://<host>;databaseName=LubeRightNET;encrypt=true;trustServerCertificate=true
DB_USERNAME=...
DB_PASSWORD=...
```
`server.port` defaults to `8082` (override via `-Dserver.port=...`).

## Run locally
```bash
cd remote-api
mvn spring-boot:run
# http://localhost:8082
```

## Endpoint
- `GET /api/data?updatedAfter=2024-01-01T00:00:00`
  - Omitting `updatedAfter` returns all active lubrication points.
  - When provided, only rows whose latest calendar timestamp is greater than the supplied ISO date-time are returned.
  - Response shape:
    ```json
    {
      "name": "Pump-01",
      "interval": 30,
      "plannedAmount": 12.5,
      "actualAmount": 11.8,
      "timestamp": "2024-03-18T10:42:00"
    }
    ```

## Notes
- Uses a native SQL query to pick the latest calendar entry per Admin row, preferring rows with actual amounts.
- No schema changes are applied by this service; it is read-only against the source database.
- Actuator endpoints are enabled for `health` and `info`.
