"use client";

import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    // Редирект на игру сразу
    window.location.href = "/game.html";
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white crt flex items-center justify-center">
      <div className="scan-line"></div>
      
      <div className="text-center p-8">
        <div className="mb-8">
          <h1 className="text-5xl md:text-7xl font-bold glow-green font-orbitron mb-4">
            ELDRITCH <span className="text-white">HUNTER</span>
          </h1>
          <p className="text-gray-400 text-xl font-oxanium">
            Survival shooter on Farcaster
          </p>
        </div>
        
        <div className="mb-12">
          <div className="inline-block animate-pulse">
            <div className="text-6xl mb-4">🎮</div>
          </div>
          <div className="text-2xl text-green-400 font-orbitron mb-2">
            Loading the hunt...
          </div>
          <div className="text-gray-500">
            Redirecting to the game
          </div>
        </div>
        
        <div className="max-w-md mx-auto bg-gray-900/50 rounded-xl p-6 border border-green-500/30">
          <div className="text-green-400 font-bold mb-4 font-orbitron">
            🎯 GAME CONTROLS
          </div>
          <div className="grid grid-cols-2 gap-4 text-left">
            <div className="bg-gray-800/50 p-3 rounded">
              <div className="text-gray-400 text-sm">MOVEMENT</div>
              <div className="font-bold">WASD / Arrows</div>
            </div>
            <div className="bg-gray-800/50 p-3 rounded">
              <div className="text-gray-400 text-sm">SHOOT</div>
              <div className="font-bold">Click / Space</div>
            </div>
            <div className="bg-gray-800/50 p-3 rounded">
              <div className="text-gray-400 text-sm">RELOAD</div>
              <div className="font-bold">R Key</div>
            </div>
            <div className="bg-gray-800/50 p-3 rounded">
              <div className="text-gray-400 text-sm">PAUSE</div>
              <div className="font-bold">ESC / P</div>
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t border-gray-800">
            <div className="text-gray-500 text-sm">
              If redirect doesn't work, <a href="/game.html" className="text-green-400 underline">click here</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
