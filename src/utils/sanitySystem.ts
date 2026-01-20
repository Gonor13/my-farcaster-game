// Sanity System - Levels of Madness
export enum SanityLevel {
  Stable = 5,    // 100-80%
  Uneasy = 4,    // 80-60%
  Anxious = 3,   // 60-40%
  Terrified = 2, // 40-20%
  Eldritch = 1,  // 20-0% - TRANSFORMATION
}

export interface SanityState {
  current: number; // 0-100
  level: SanityLevel;
  maxHits: number; // 5 hits = transformation
}

export function getSanityLevel(sanity: number): SanityLevel {
  if (sanity >= 80) return SanityLevel.Stable;
  if (sanity >= 60) return SanityLevel.Uneasy;
  if (sanity >= 40) return SanityLevel.Anxious;
  if (sanity >= 20) return SanityLevel.Terrified;
  return SanityLevel.Eldritch;
}

export function reduceSanity(current: number, damage: number): number {
  return Math.max(0, current - damage);
}

export function getSanityColor(level: SanityLevel): string {
  switch (level) {
    case SanityLevel.Stable: return '#10b981'; // green
    case SanityLevel.Uneasy: return '#f59e0b'; // yellow
    case SanityLevel.Anxious: return '#f97316'; // orange
    case SanityLevel.Terrified: return '#dc2626'; // red
    case SanityLevel.Eldritch: return '#7c3aed'; // purple
    default: return '#ffffff';
  }
}

export function getSanityFilter(level: SanityLevel): string {
  switch (level) {
    case SanityLevel.Uneasy: return 'sepia(20%) contrast(110%)';
    case SanityLevel.Anxious: return 'sepia(40%) hue-rotate(10deg) contrast(120%)';
    case SanityLevel.Terrified: return 'sepia(60%) hue-rotate(20deg) contrast(130%) brightness(90%)';
    case SanityLevel.Eldritch: return 'invert(90%) hue-rotate(180deg) contrast(150%)';
    default: return 'none';
  }
}

export function getEldritchSymbols(count: number): string[] {
  const symbols = ['༒', '࿓', 'ꙮ', '☠', '⚰', '☣', '☢', '⚠', '⚡', '⛧'];
  const result: string[] = [];
  for (let i = 0; i < count; i++) {
    result.push(symbols[Math.floor(Math.random() * symbols.length)]);
  }
  return result;
}
