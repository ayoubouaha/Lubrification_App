# LubeRight Backend

Spring Boot service that keeps a lightweight cache of lubrication data and exposes a clean API for the front‑end. It periodically pulls fresh rows from the **remote-api** service, stores snapshots in SQL Server, and serves the latest values per lubrication point.

## What it does
- Scheduled sync job fetches changes from `remote-api` (default every 5s via `SYNC_INTERVAL`).
- Persists two cache tables: `lubrication_point_snapshot` (latest per name) and `calender_snapshot` (history by timestamp). Sync progress is tracked in `sync_metadata`.
- REST endpoint `GET /api/lubrication/latest/{name}` returns the most recent snapshot for a point, with no-cache headers for dashboards.

## Requirements
- Java 17
- Maven 3.9+
- SQL Server instance accessible from the host
- Environment file `.env` alongside `pom.xml` (see sample below)

## Configuration
Create `Backend/.env` with:
```
DB_URL=jdbc:sqlserver://localhost;databaseName=LubeRightCache;encrypt=true;trustServerCertificate=true
DB_USERNAME=...
DB_PASSWORD=...

# Where to pull live data from (remote-api)
REMOTE_API_BASE_URL=http://localhost:8082
SYNC_INTERVAL=5000   # milliseconds between sync runs
```
You can override any property with JVM args, e.g. `-Dsync.interval=10000`.

## Database setup
1) Run `sql/local_cache_tables.sql` on the cache database (creates the three tables used by this service).
2) Optional but recommended on the *source* database (where `remote-api` reads `Admin` and `Calender`): run `sql/index_latest_lubrication.sql` to add covering indexes for the “latest record per point” query.

## Run locally
```bash
cd Backend
mvn spring-boot:run
# listens on http://localhost:8081
```

## API
- `GET /api/lubrication/latest/{name}`
  - Path variable: `name` (string, required)
  - Response body:
    ```json
    {
      "name": "Pump-01",
      "interval": 30,
      "plannedAmount": 12.5,
      "actualAmount": 11.8,
      "timestamp": "2024-03-18T10:42:00"
    }
    ```


## How the sync works
1) On startup it ensures a `sync_metadata` row exists.
2) Every `SYNC_INTERVAL` ms it calls `remote-api` with `updatedAfter=<last_sync>`.
3) Upserts snapshots and calendar rows; then updates `lastSyncTimestamp` to the newest payload timestamp.
4) If the remote call fails, it logs and leaves existing cache untouched (no data loss).

## Troubleshooting
- No data returning: verify `REMOTE_API_BASE_URL` and that `remote-api` is reachable; check `sync_metadata.last_sync_timestamp` in the cache DB.
- Missing tables: re-run `sql/local_cache_tables.sql`.
- Performance: apply `sql/index_latest_lubrication.sql` on the source DB to speed up the remote query.
