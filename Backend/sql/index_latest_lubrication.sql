-- Requested pattern:
-- CREATE INDEX idx_name_timestamp ON lubrication_table(Name, TimeStamp DESC);
--
-- Equivalent for current LubeRightNET schema:
--   Name is in dbo.Admin
--   TimeStamp is in dbo.Calender
-- so we index the join path used by latest query.

IF NOT EXISTS (
  SELECT 1
  FROM sys.indexes
  WHERE name = 'idx_admin_name_index'
    AND object_id = OBJECT_ID('dbo.Admin')
)
BEGIN
  CREATE INDEX idx_admin_name_index
  ON dbo.Admin (Name, [Index]);
END;
GO

IF NOT EXISTS (
  SELECT 1
  FROM sys.indexes
  WHERE name = 'idx_name_timestamp'
    AND object_id = OBJECT_ID('dbo.Calender')
)
BEGIN
  CREATE INDEX idx_name_timestamp
  ON dbo.Calender (AdminIndex, [TimeStamp] DESC);
END;
GO
