"use client";

import { useEffect, useRef } from "react";

interface AttackButtonProps {
  onAttack: () => void;
  isMonster: boolean;
  size?: number;
  color?: string;
}

export default function AttackButton({ 
  onAttack, 
  isMonster, 
  size = 80, 
  color = '#dc2626' 
}: AttackButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const isPressedRef = useRef(false);

  useEffect(() => {
    if (!isMonster) return;

    const handleTouchStart = (e: TouchEvent) => {
      if (buttonRef.current?.contains(e.target as Node)) {
        e.preventDefault();
        isPressedRef.current = true;
        onAttack();
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (isPressedRef.current) {
        e.preventDefault();
        isPressedRef.current = false;
      }
    };

    const button = buttonRef.current;
    if (button) {
      button.addEventListener('touchstart', handleTouchStart, { passive: false });
      button.addEventListener('touchend', handleTouchEnd, { passive: false });
    }

    return () => {
      if (button) {
        button.removeEventListener('touchstart', handleTouchStart);
        button.removeEventListener('touchend', handleTouchEnd);
      }
    };
  }, [onAttack, isMonster]);

  if (!isMonster) return null;

  return (
    <button
      ref={buttonRef}
      onClick={onAttack}
      className="absolute bottom-6 right-6 z-50 rounded-full border-4 shadow-lg active:scale-95 transition-transform touch-none"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        borderColor: color,
        backgroundColor: 'rgba(220, 38, 38, 0.8)',
        fontSize: `${size * 0.4}px`,
        minWidth: '44px',
        minHeight: '44px',
      }}
      aria-label="Attack"
    >
      <span className="font-bold text-white">⚔️</span>
      <span className="block text-xs text-white mt-1 font-bold">АТАКА</span>
    </button>
  );
}
