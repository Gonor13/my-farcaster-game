"use client";

import { useState } from "react";
import { formatTime } from "@/utils/monsterLogic";

interface PostGameStats {
  humanKills: number;
  monsterKills: number;
  totalXP: number;
  timeInMonsterForm: number;
  maxMadnessLevel: number;
}

interface PostGameScreenProps {
  stats: PostGameStats;
  onShare: (type: 'human' | 'monster' | 'full') => void;
  onRestart: () => void;
}

export default function PostGameScreen({ stats, onShare, onRestart }: PostGameScreenProps) {
  const [sharing, setSharing] = useState<string | null>(null);
  
  const handleShare = async (type: 'human' | 'monster' | 'full') => {
    setSharing(type);
    onShare(type);
    // Reset after animation
    setTimeout(() => setSharing(null), 2000);
  };
  
  return (
    <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-gradient-to-b from-purple-900/50 to-black/90 border border-purple-500/30 rounded-lg p-6 backdrop-blur-sm">
        <h2 className="text-3xl font-bold text-white mb-4 text-center">
          <span className="text-4xl">🪬</span>
          <br />
          Transformation Complete
        </h2>
        
        <div className="space-y-3 mb-6 font-mono text-white">
          <div className="flex justify-between p-2 bg-black/30 rounded">
            <span>🔪 Human Kills:</span>
            <span className="font-bold">{stats.humanKills}</span>
          </div>
          <div className="flex justify-between p-2 bg-black/30 rounded">
            <span>🪬 Monster Kills:</span>
            <span className="font-bold">{stats.monsterKills}</span>
          </div>
          <div className="flex justify-between p-2 bg-black/30 rounded">
            <span>⭐ Total XP:</span>
            <span className="font-bold">{stats.totalXP}</span>
          </div>
          <div className="flex justify-between p-2 bg-black/30 rounded">
            <span>⏱️ Time in Form:</span>
            <span className="font-bold">{formatTime(stats.timeInMonsterForm)}</span>
          </div>
          <div className="flex justify-between p-2 bg-black/30 rounded">
            <span>👁️ Max Madness:</span>
            <span className="font-bold">Level {stats.maxMadnessLevel}</span>
          </div>
        </div>
        
        <div className="space-y-2 mb-4">
          <h3 className="text-white text-sm font-semibold mb-2">Share Your Legacy:</h3>
          <button
            onClick={() => handleShare('human')}
            disabled={sharing !== null}
            className="w-full bg-green-600/80 hover:bg-green-600 text-white p-3 rounded transition-all disabled:opacity-50"
          >
            🔪 My Human Legacy
          </button>
          <button
            onClick={() => handleShare('monster')}
            disabled={sharing !== null}
            className="w-full bg-purple-600/80 hover:bg-purple-600 text-white p-3 rounded transition-all disabled:opacity-50"
          >
            🪬 My Monster Reign
          </button>
          <button
            onClick={() => handleShare('full')}
            disabled={sharing !== null}
            className="w-full bg-red-600/80 hover:bg-red-600 text-white p-3 rounded transition-all disabled:opacity-50"
          >
            ⚡ My Descent into Madness
          </button>
        </div>
        
        <button
          onClick={onRestart}
          className="w-full bg-gray-700 hover:bg-gray-600 text-white p-3 rounded transition-all"
        >
          Play Again
        </button>
      </div>
    </div>
  );
}
