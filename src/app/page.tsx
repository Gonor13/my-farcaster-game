"use client";

import { useEffect, useRef, useState } from "react";
import { sdk } from "@farcaster/miniapp-sdk";

interface GameObject {
  x: number;
  y: number;
  size: number;
}

export default function GamePage() {
  // === STATES ===
  const [sanity, setSanity] = useState(100);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [xp, setXp] = useState(0);
  const [gameActive, setGameActive] = useState(true);
  const [enemyCount, setEnemyCount] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  
  // === GAME REFS ===
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const playerRef = useRef<GameObject>({ x: 400, y: 300, size: 30 });
  const bulletsRef = useRef<Array<GameObject & { dx: number; dy: number }>>([]);
  const enemiesRef = useRef<Array<GameObject & { collided?: boolean }>>([]);
  const keysPressed = useRef<Set<string>>(new Set());
  const animationId = useRef<number>(0);
  const enemyInterval = useRef<NodeJS.Timeout | null>(null);
  
  // === FARCASTER SDK ===
  useEffect(() => {
    sdk.actions.ready();
  }, []);
  
  // === KEYBOARD HANDLING ===
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      keysPressed.current.add(e.key.toLowerCase());
    };
    
    const handleKeyUp = (e: KeyboardEvent) => {
      keysPressed.current.delete(e.key.toLowerCase());
    };
    
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);
  
  // === ENEMY SPAWNING ===
  const spawnEnemy = () => {
    const canvas = canvasRef.current;
    if (!canvas || !gameActive || gameOver) return;
    
    if (enemiesRef.current.length >= 10) return;
    
    const side = Math.floor(Math.random() * 4);
    let x = 0, y = 0;
    
    switch (side) {
      case 0: x = Math.random() * canvas.width; y = -30; break;
      case 1: x = canvas.width + 30; y = Math.random() * canvas.height; break;
      case 2: x = Math.random() * canvas.width; y = canvas.height + 30; break;
      case 3: x = -30; y = Math.random() * canvas.height; break;
    }
    
    enemiesRef.current.push({
      x,
      y,
      size: 28,
      collided: false
    });
    
    setEnemyCount(enemiesRef.current.length);
  };
  
  // === GAME LOOP ===
  useEffect(() => {
    if (!gameActive || gameOver) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    // Clear existing interval
    if (enemyInterval.current) {
      clearInterval(enemyInterval.current);
      enemyInterval.current = null;
    }
    
    // Start enemy spawning
    enemyInterval.current = setInterval(spawnEnemy, 1500);
    
    // Initial spawn
    setTimeout(() => {
      for (let i = 0; i < 3; i++) spawnEnemy();
    }, 500);
    
    const gameLoop = () => {
      if (!gameActive || gameOver) return;
      
      // Clear canvas
      ctx.fillStyle = "#1a1a2e";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      const player = playerRef.current;
      const keys = keysPressed.current;
      
      // === PLAYER MOVEMENT ===
      const speed = 6;
      if (keys.has("w") || keys.has("arrowup")) player.y -= speed;
      if (keys.has("s") || keys.has("arrowdown")) player.y += speed;
      if (keys.has("a") || keys.has("arrowleft")) player.x -= speed;
      if (keys.has("d") || keys.has("arrowright")) player.x += speed;
      
      // Screen boundaries
      player.x = Math.max(player.size/2, Math.min(canvas.width - player.size/2, player.x));
      player.y = Math.max(player.size/2, Math.min(canvas.height - player.size/2, player.y));
      
      // === BULLET MOVEMENT ===
      bulletsRef.current = bulletsRef.current.filter((bullet) => {
        bullet.x += bullet.dx;
        bullet.y += bullet.dy;
        
        return (
          bullet.x >= -50 &&
          bullet.x <= canvas.width + 50 &&
          bullet.y >= -50 &&
          bullet.y <= canvas.height + 50
        );
      });
      
      // === ENEMY MOVEMENT ===
      enemiesRef.current.forEach((enemy) => {
        const dx = player.x - enemy.x;
        const dy = player.y - enemy.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance > 0) {
          const enemySpeed = 1.5;
          enemy.x += (dx / distance) * enemySpeed;
          enemy.y += (dy / distance) * enemySpeed;
        }
        
        // Keep enemies on screen
        enemy.x = Math.max(-50, Math.min(canvas.width + 50, enemy.x));
        enemy.y = Math.max(-50, Math.min(canvas.height + 50, enemy.y));
      });
      
      setEnemyCount(enemiesRef.current.length);
      
      // === BULLET-ENEMY COLLISION ===
      bulletsRef.current.forEach((bullet, bulletIndex) => {
        enemiesRef.current.forEach((enemy, enemyIndex) => {
          const dx = bullet.x - enemy.x;
          const dy = bullet.y - enemy.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 10 + enemy.size / 2) {
            enemiesRef.current.splice(enemyIndex, 1);
            bulletsRef.current.splice(bulletIndex, 1);
            
            setScore(prev => prev + 1);
            setXp(prev => {
              const newXp = prev + 20;
              if (newXp >= 100) {
                setLevel(lvl => lvl + 1);
                playerRef.current.size += 3;
                return newXp - 100;
              }
              return newXp;
            });
            setEnemyCount(enemiesRef.current.length);
          }
        });
      });
      
      // === PLAYER-ENEMY COLLISION ===
      enemiesRef.current.forEach((enemy) => {
        const dx = player.x - enemy.x;
        const dy = player.y - enemy.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < player.size / 2 + enemy.size / 2) {
          if (!enemy.collided) {
            enemy.collided = true;
            
            setSanity(prev => {
              const newSanity = prev - 20;
              if (newSanity <= 0) {
                setGameOver(true);
                return 0;
              }
              return newSanity;
            });
            
            // Remove enemy after collision
            enemy.x = -1000;
          }
        }
      });
      
      // Filter out removed enemies
      enemiesRef.current = enemiesRef.current.filter(e => e.x > -500);
      
      // === DRAWING ===
      // Player
      ctx.fillStyle = "#22c55e";
      ctx.fillRect(player.x - player.size/2, player.y - player.size/2, player.size, player.size);
      
      // Player center dot
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.arc(player.x, player.y, 3, 0, Math.PI * 2);
      ctx.fill();
      
      // Enemies (red circles)
      enemiesRef.current.forEach((enemy) => {
        ctx.fillStyle = "#ef4444";
        ctx.beginPath();
        ctx.arc(enemy.x, enemy.y, enemy.size/2, 0, Math.PI * 2);
        ctx.fill();
      });
      
      // Bullets (blue circles)
      bulletsRef.current.forEach((bullet) => {
        ctx.fillStyle = "#3b82f6";
        ctx.beginPath();
        ctx.arc(bullet.x, bullet.y, 6, 0, Math.PI * 2);
        ctx.fill();
      });
      
      animationId.current = requestAnimationFrame(gameLoop);
    };
    
    animationId.current = requestAnimationFrame(gameLoop);
    
    return () => {
      if (enemyInterval.current) {
        clearInterval(enemyInterval.current);
        enemyInterval.current = null;
      }
      if (animationId.current) {
        cancelAnimationFrame(animationId.current);
        animationId.current = 0;
      }
    };
  }, [gameActive, gameOver]);
  
  // === SHOOTING ===
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!gameActive || gameOver) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;
    const player = playerRef.current;
    
    const dx = clickX - player.x;
    const dy = clickY - player.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    if (distance > 0) {
      bulletsRef.current.push({
        x: player.x,
        y: player.y,
        dx: (dx / distance) * 11,
        dy: (dy / distance) * 11,
        size: 10,
      });
    }
  };
  
  // === RESTART ===
  const restartGame = () => {
    setGameActive(true);
    setGameOver(false);
    setSanity(100);
    setScore(0);
    setXp(0);
    setLevel(1);
    enemiesRef.current = [];
    bulletsRef.current = [];
    playerRef.current = { x: 400, y: 300, size: 30 };
    keysPressed.current.clear();
    setEnemyCount(0);
  };
  
  // === SHARE TO FARCASTER ===
  const shareToFarcaster = () => {
    const shareText = `🎮 I scored ${score} points in Eldritch Hunter! Can you beat me?\n\nPlay: https://my-farcaster-game-gilt.vercel.app`;
    window.open(
      `https://warpcast.com/~/compose?text=${encodeURIComponent(shareText)}&embeds[]=${encodeURIComponent('https://my-farcaster-game-gilt.vercel.app')}`,
      '_blank'
    );
  };
  
  // === RENDER ===
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-4">
      <div className="max-w-4xl mx-auto">
        {/* TITLE */}
        <h1 className="text-3xl font-bold text-center mb-6 text-purple-400">
          ELDRITCH HUNTER
        </h1>
        
        {/* GAME OVER SCREEN */}
        {gameOver ? (
          <div className="bg-red-900/50 border border-red-700 rounded-xl p-8 text-center mb-8">
            <div className="text-4xl mb-6">💀 GAME OVER 💀</div>
            <div className="text-2xl mb-2">
              Final Score: <span className="text-yellow-300">{score}</span>
            </div>
            <div className="mb-6">
              <div>Kills: {score}</div>
              <div>Max Level: {level}</div>
              <div>Sanity: {sanity}%</div>
            </div>
            <div className="flex flex-col gap-4">
              <button
                onClick={restartGame}
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-xl font-bold text-xl"
              >
                🎮 PLAY AGAIN
              </button>
              <button
                onClick={shareToFarcaster}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 rounded-xl font-bold text-xl"
              >
                🏆 SHARE ON FARCASTER
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* STATS */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-gray-800/60 p-4 rounded-xl border border-gray-700">
                <div className="text-gray-400 text-sm">Level</div>
                <div className="text-2xl font-bold mt-1">{level}</div>
              </div>
              <div className="bg-gray-800/60 p-4 rounded-xl border border-gray-700">
                <div className="text-gray-400 text-sm">XP</div>
                <div className="text-2xl font-bold mt-1">{xp}/100</div>
              </div>
              <div className="bg-gray-800/60 p-4 rounded-xl border border-gray-700">
                <div className="text-gray-400 text-sm">Score</div>
                <div className="text-2xl font-bold mt-1">{score}</div>
              </div>
              <div className="bg-gray-800/60 p-4 rounded-xl border border-gray-700">
                <div className="text-gray-400 text-sm">Sanity</div>
                <div className="text-2xl font-bold mt-1">{sanity}%</div>
                <div className="text-xs text-gray-300 mt-1">
                  {sanity >= 80 ? "Stable" : 
                   sanity >= 60 ? "Uneasy" : 
                   sanity >= 40 ? "Anxious" : 
                   sanity >= 20 ? "Terrified" : 
                   "Eldritch"}
                </div>
              </div>
            </div>
            
            {/* SANITY HEARTS (5 жизней) */}
            <div className="mb-6">
              <div className="text-center text-gray-400 mb-2">Sanity (5 hits)</div>
              <div className="flex justify-center gap-2">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className={`text-4xl ${sanity > i * 20 ? "text-red-500" : "text-gray-700"}`}
                  >
                    {sanity > i * 20 ? "❤️" : "💔"}
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
        
        {/* GAME CANVAS */}
        <div className="relative mb-8">
          <canvas
            ref={canvasRef}
            width={800}
            height={500}
            className="w-full h-auto max-h-[70vh] border-4 border-purple-900/50 rounded-2xl bg-gray-900 cursor-crosshair"
            onClick={handleCanvasClick}
          />
          
          {/* DEBUG INFO */}
          <div className="absolute top-4 left-4 text-xs bg-black/50 px-2 py-1 rounded">
            Enemies: {enemyCount}
          </div>
          
          {/* HINTS */}
          <div className="mt-6 text-center space-y-2">
            <p className="text-gray-300">WASD/Arrows — move | Click — shoot</p>
            <p className="text-purple-400 font-bold">
              👹 Avoid red enemies! You have 5 hits (100% Sanity)
            </p>
          </div>
        </div>
        
        {/* RESTART BUTTON */}
        <div className="text-center">
          <button
            onClick={restartGame}
            className="px-6 py-3 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-xl font-bold"
          >
            🔄 Restart Game
          </button>
        </div>
      </div>
    </div>
  );
}