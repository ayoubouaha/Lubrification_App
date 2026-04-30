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
  )
END;

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
  )
END;

IF NOT EXISTS (SELECT 1 FROM sys.tables WHERE name = 'sync_metadata' AND schema_id = SCHEMA_ID('dbo'))
BEGIN
  CREATE TABLE dbo.sync_metadata (
    id NVARCHAR(255) NOT NULL PRIMARY KEY,
    last_sync_timestamp DATETIME2 NULL,
    last_sync_source_row_id BIGINT NULL,
    initial_sync_completed BIT NOT NULL CONSTRAINT DF_sync_metadata_initial_sync_completed DEFAULT 0
  )
END;

IF COL_LENGTH('dbo.lubrication_point_snapshot', 'lubricator_value') IS NULL
BEGIN
  ALTER TABLE dbo.lubrication_point_snapshot
  ADD lubricator_value INT NULL
END;

IF COL_LENGTH('dbo.calender_snapshot', 'lubricator_value') IS NULL
BEGIN
  ALTER TABLE dbo.calender_snapshot
  ADD lubricator_value INT NULL
END;

IF COL_LENGTH('dbo.calender_snapshot', 'planned_amount') IS NULL
BEGIN
  ALTER TABLE dbo.calender_snapshot
  ADD planned_amount DECIMAL(19, 2) NULL
END;

IF COL_LENGTH('dbo.sync_metadata', 'last_sync_source_row_id') IS NULL
BEGIN
  ALTER TABLE dbo.sync_metadata
  ADD last_sync_source_row_id BIGINT NULL
END;

IF COL_LENGTH('dbo.sync_metadata', 'initial_sync_completed') IS NULL
BEGIN
  ALTER TABLE dbo.sync_metadata
  ADD initial_sync_completed BIT NOT NULL CONSTRAINT DF_sync_metadata_initial_sync_completed DEFAULT 0
END;
