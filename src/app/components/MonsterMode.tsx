"use client";

import { MonsterState, formatTime, calculateXPMultiplier } from "@/utils/monsterLogic";

interface MonsterModeProps {
  monsterState: MonsterState;
}

export default function MonsterMode({ monsterState }: MonsterModeProps) {
  const { hp, maxHp, xp, kills, timeInForm } = monsterState;
  const multiplier = calculateXPMultiplier(timeInForm);
  
  const hearts = [];
  for (let i = 0; i < maxHp; i++) {
    hearts.push(
      <span
        key={i}
        className={`text-2xl transition-opacity duration-300 ${
          i < hp ? 'opacity-100' : 'opacity-20'
        }`}
      >
        ❤️
      </span>
    );
  }
  
  return (
    <div className="bg-black/70 p-3 rounded-lg backdrop-blur-sm" style={{ minWidth: '44px', minHeight: '44px' }}>
      <div className="text-white text-lg font-bold mb-2 flex items-center gap-2">
        <span className="text-2xl">🪬</span>
        <span>Eldritch Abomination</span>
      </div>
      <div className="flex items-center gap-2 mb-2">
        {hearts}
      </div>
      <div className="text-white text-sm font-mono space-y-1">
        <div>Kills: {kills}</div>
        <div>XP: {xp}</div>
        <div>Multiplier: {multiplier.toFixed(1)}x</div>
        <div className="text-xs opacity-75">Time in form: {formatTime(timeInForm)}</div>
      </div>
    </div>
  );
}
