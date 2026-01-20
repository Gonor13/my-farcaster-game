// Monster Phase Logic
export interface MonsterState {
  hp: number; // 3 hearts
  maxHp: number;
  xp: number;
  kills: number;
  timeInForm: number; // seconds
  xpMultiplier: number; // increases with time
}

export function calculateXPMultiplier(timeInSeconds: number): number {
  // Base: 3x, increases by 0.1x every 10 seconds
  return 3 + Math.floor(timeInSeconds / 10) * 0.1;
}

export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

export interface AttackArea {
  x: number;
  y: number;
  radius: number;
  startTime: number;
  duration: number; // ms
}

export function createAttackArea(x: number, y: number): AttackArea {
  return {
    x,
    y,
    radius: 80,
    startTime: Date.now(),
    duration: 300, // 300ms attack animation
  };
}

export function isAttackAreaActive(area: AttackArea): boolean {
  return Date.now() - area.startTime < area.duration;
}

export function checkAttackHit(
  attackArea: AttackArea,
  enemyX: number,
  enemyY: number,
  enemyRadius: number
): boolean {
  const dx = attackArea.x - enemyX;
  const dy = attackArea.y - enemyY;
  const distance = Math.sqrt(dx * dx + dy * dy);
  return distance < attackArea.radius + enemyRadius;
}
