import { type DiagramPoint } from './types';
import { type LubricationPointDto } from '../../types/lubricationPoint';

const K3_IDENTIFIER_PATTERN = /^(K3|T2)-(STR|SROT|FLECHE|SLEV|POULIE)-[A-Z0-9-]+$/i;
const DB_IDENTIFIER_PATTERN = /^[A-Z0-9-]+$/i;

const extractFirstK3Identifier = (value: string): string | null => {
  const candidates = value
    .split(/\s*\/\s*|\r?\n|\s*,\s*/)
    .map(token => token.trim())
    .filter(Boolean);

  for (const candidate of candidates) {
    if (K3_IDENTIFIER_PATTERN.test(candidate)) {
      return candidate;
    }
  }

  return null;
};

const getDbName = (point?: DiagramPoint | null): string | null => {
  if (!point) {
    return null;
  }

  if (point.dbName?.trim() && DB_IDENTIFIER_PATTERN.test(point.dbName.trim())) {
    return point.dbName.trim();
  }

  if (point.tagPrimary) {
    const identifier = extractFirstK3Identifier(point.tagPrimary);
    if (identifier) {
      return identifier;
    }
  }

  if (point.tagSecondary) {
    const identifier = extractFirstK3Identifier(point.tagSecondary);
    if (identifier) {
      return identifier;
    }
  }

  const normalizedName = point.name.trim();
  if (K3_IDENTIFIER_PATTERN.test(normalizedName)) {
    return normalizedName;
  }

  return null;
};

export const getDbNameCandidates = (point?: DiagramPoint | null): string[] => {
  if (!point) {
    return [];
  }

  const candidates = new Set<string>();
  const dbName = getDbName(point);
  if (dbName) {
    candidates.add(dbName);
  }

  const rawIdentifiers = [point.tagPrimary, point.tagSecondary].filter(Boolean).join(' / ');
  if (rawIdentifiers.trim()) {
    rawIdentifiers
      .split(/\s*\/\s*|\r?\n|\s*,\s*/)
      .map(value => value.trim())
      .filter(Boolean)
      .forEach(identifier => {
        if (K3_IDENTIFIER_PATTERN.test(identifier)) {
          candidates.add(identifier);
        }
      });
  }

  return [...candidates];
};

export const pickLubricationData = (
  map: Map<string, LubricationPointDto> | undefined,
  candidates: string[],
): LubricationPointDto | null => {
  if (!map || !candidates.length) return null;

  for (const name of candidates) {
    const candidate = map.get(name);
    if (candidate) return candidate;
  }

  return null;
};

export const isCriticalLubricationPoint = (data: LubricationPointDto | null | undefined): boolean => {
  if (!data) return false;

  const actual = data.actualAmount;
  const planned = data.plannedAmount;

  if (actual === null || actual === undefined) {
    return true;
  }

  if (planned === null || planned === undefined || planned <= 0) {
    return false;
  }

  return actual < planned * 0.5;
};
