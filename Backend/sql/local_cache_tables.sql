-- Tables for local cache (no changes to existing source tables)

IF NOT EXISTS (SELECT 1 FROM sys.tables WHERE name = 'lubrication_point_snapshot' AND schema_id = SCHEMA_ID('dbo'))
BEGIN
  CREATE TABLE dbo.lubrication_point_snapshot (
    name NVARCHAR(255) NOT NULL PRIMARY KEY,
    lubricator_value INT NULL,
    interval_value INT NULL,
    planned_amount DECIMAL(19, 2) NULL,
    actual_amount DECIMAL(19, 2) NULL,
    timestamp_value DATETIME2 NULL
  );
END

IF NOT EXISTS (SELECT 1 FROM sys.tables WHERE name = 'calender_snapshot' AND schema_id = SCHEMA_ID('dbo'))
BEGIN
  CREATE TABLE dbo.calender_snapshot (
    name NVARCHAR(255) NOT NULL,
    timestamp_value DATETIME2 NOT NULL,
    actual_interval INT NULL,
    lubricator_value INT NULL,
    planned_amount DECIMAL(19, 2) NULL,
    actual_amount DECIMAL(19, 2) NULL,
    CONSTRAINT PK_calender_snapshot PRIMARY KEY (name, timestamp_value)
  );
END

IF NOT EXISTS (SELECT 1 FROM sys.tables WHERE name = 'sync_metadata' AND schema_id = SCHEMA_ID('dbo'))
BEGIN
  CREATE TABLE dbo.sync_metadata (
    id NVARCHAR(255) NOT NULL PRIMARY KEY,
    last_sync_timestamp DATETIME2 NULL
  );
END

IF COL_LENGTH('dbo.lubrication_point_snapshot', 'lubricator_value') IS NULL
BEGIN
  ALTER TABLE dbo.lubrication_point_snapshot
  ADD lubricator_value INT NULL;
END

IF COL_LENGTH('dbo.calender_snapshot', 'lubricator_value') IS NULL
BEGIN
  ALTER TABLE dbo.calender_snapshot
  ADD lubricator_value INT NULL;
END

IF COL_LENGTH('dbo.calender_snapshot', 'planned_amount') IS NULL
BEGIN
  ALTER TABLE dbo.calender_snapshot
  ADD planned_amount DECIMAL(19, 2) NULL;
END
