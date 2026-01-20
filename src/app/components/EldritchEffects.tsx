"use client";

import { useEffect, useState } from "react";
import { SanityLevel, getEldritchSymbols, getSanityFilter } from "@/utils/sanitySystem";

interface EldritchEffectsProps {
  sanityLevel: SanityLevel;
  width: number;
  height: number;
}

interface FloatingSymbol {
  id: number;
  x: number;
  y: number;
  symbol: string;
  opacity: number;
  speed: number;
}

export default function EldritchEffects({ sanityLevel, width, height }: EldritchEffectsProps) {
  const [symbols, setSymbols] = useState<FloatingSymbol[]>([]);
  
  useEffect(() => {
    if (sanityLevel <= SanityLevel.Terrified) {
      // Spawn eldritch symbols
      const count = SanityLevel.Terrified - sanityLevel + 1; // More symbols as sanity decreases
      const eldritchSymbols = getEldritchSymbols(count * 3);
      const newSymbols: FloatingSymbol[] = eldritchSymbols.map((symbol, i) => ({
        id: i,
        x: Math.random() * width,
        y: Math.random() * height,
        symbol,
        opacity: Math.random() * 0.3 + 0.2,
        speed: Math.random() * 0.5 + 0.2,
      }));
      setSymbols(newSymbols);
      
      // Animate symbols
      const interval = setInterval(() => {
        setSymbols(prev => prev.map(s => ({
          ...s,
          y: (s.y + s.speed) % height,
          opacity: Math.sin(Date.now() / 1000 + s.id) * 0.2 + 0.3,
        })));
      }, 50);
      
      return () => clearInterval(interval);
    } else {
      setSymbols([]);
    }
  }, [sanityLevel, width, height]);
  
  const filterStyle = getSanityFilter(sanityLevel);
  
  return (
    <>
      {/* Color filter overlay */}
      {filterStyle !== 'none' && (
        <div
          className="absolute inset-0 pointer-events-none z-20 mix-blend-overlay"
          style={{
            filter: filterStyle,
            opacity: sanityLevel <= SanityLevel.Anxious ? 0.3 : 0.1,
          }}
        />
      )}
      
      {/* Floating eldritch symbols */}
      {symbols.map(symbol => (
        <div
          key={symbol.id}
          className="absolute pointer-events-none text-3xl font-bold text-purple-400 z-10"
          style={{
            left: `${symbol.x}px`,
            top: `${symbol.y}px`,
            opacity: symbol.opacity,
            transform: `rotate(${symbol.id * 15}deg)`,
          }}
        >
          {symbol.symbol}
        </div>
      ))}
    </>
  );
}
