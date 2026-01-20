"use client";

import { SanityLevel, getSanityLevel } from "@/utils/sanitySystem";

interface SanityMeterProps {
  sanity: number; // 0-100
}

export default function SanityMeter({ sanity }: SanityMeterProps) {
  const level = getSanityLevel(sanity);
  const eyesCount = level; // 5 eyes max, decreases with sanity loss
  const eyes = [];
  
  // Create eye indicators (👁️)
  for (let i = 0; i < 5; i++) {
    eyes.push(
      <span
        key={i}
        className={`text-2xl transition-opacity duration-300 ${
          i < eyesCount ? 'opacity-100' : 'opacity-20'
        }`}
      >
        👁️
      </span>
    );
  }
  
  const levelNames = {
    [SanityLevel.Stable]: 'Stable',
    [SanityLevel.Uneasy]: 'Uneasy',
    [SanityLevel.Anxious]: 'Anxious',
    [SanityLevel.Terrified]: 'Terrified',
    [SanityLevel.Eldritch]: 'ELDRITCH',
  };
  
  return (
    <div className="bg-black/70 p-3 rounded-lg backdrop-blur-sm" style={{ minWidth: '44px', minHeight: '44px' }}>
      <div className="flex items-center gap-2 mb-1">
        {eyes}
      </div>
      <div className="text-white text-sm font-mono">
        <div>Sanity: {sanity.toFixed(0)}%</div>
        <div className="text-xs opacity-75">{levelNames[level]}</div>
      </div>
      <div className="w-full h-2 bg-gray-800 rounded-full mt-2 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 transition-all duration-300"
          style={{ width: `${sanity}%` }}
        />
      </div>
    </div>
  );
}
