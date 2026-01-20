"use client";

import { useEffect, useRef, useState, useCallback } from "react";

interface VirtualJoystickProps {
  onMove: (x: number, y: number) => void;
  size?: number;
  color?: string;
}

export default function VirtualJoystick({ 
  onMove, 
  size = 120, 
  color = '#7c3aed' 
}: VirtualJoystickProps) {
  const [isActive, setIsActive] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const joystickRef = useRef<HTMLDivElement>(null);
  const stickRef = useRef<HTMLDivElement>(null);
  const touchIdRef = useRef<number | null>(null);

  const getJoystickBounds = useCallback(() => {
    if (!joystickRef.current) return { left: 0, top: 0, width: size, height: size };
    const rect = joystickRef.current.getBoundingClientRect();
    return {
      left: rect.left,
      top: rect.top,
      width: rect.width,
      height: rect.height,
    };
  }, [size]);

  const handleStart = useCallback((clientX: number, clientY: number, touchId?: number) => {
    if (touchId !== undefined) {
      touchIdRef.current = touchId;
    }
    const bounds = getJoystickBounds();
    const centerX = bounds.left + bounds.width / 2;
    const centerY = bounds.top + bounds.height / 2;
    
    setIsActive(true);
    updatePosition(clientX, clientY, centerX, centerY);
  }, [getJoystickBounds]);

  const updatePosition = useCallback((clientX: number, clientY: number, centerX: number, centerY: number) => {
    const bounds = getJoystickBounds();
    const maxDistance = bounds.width / 2 - 30; // Leave space for stick
    
    const deltaX = clientX - centerX;
    const deltaY = clientY - centerY;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    
    let x = deltaX;
    let y = deltaY;
    
    if (distance > maxDistance) {
      x = (deltaX / distance) * maxDistance;
      y = (deltaY / distance) * maxDistance;
    }
    
    setPosition({ x, y });
    
    // Normalize to -1 to 1
    const normalizedX = x / maxDistance;
    const normalizedY = y / maxDistance;
    
    onMove(normalizedX, normalizedY);
  }, [getJoystickBounds, onMove]);

  const handleMove = useCallback((clientX: number, clientY: number) => {
    if (!isActive) return;
    
    const bounds = getJoystickBounds();
    const centerX = bounds.left + bounds.width / 2;
    const centerY = bounds.top + bounds.height / 2;
    
    updatePosition(clientX, clientY, centerX, centerY);
  }, [isActive, updatePosition, getJoystickBounds]);

  const handleEnd = useCallback(() => {
    setIsActive(false);
    setPosition({ x: 0, y: 0 });
    touchIdRef.current = null;
    onMove(0, 0);
  }, [onMove]);

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (touch && joystickRef.current?.contains(touch.target as Node)) {
        e.preventDefault();
        handleStart(touch.clientX, touch.clientY, touch.identifier);
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (touchIdRef.current !== null && isActive) {
        const touch = Array.from(e.touches).find(t => t.identifier === touchIdRef.current);
        if (touch) {
          e.preventDefault();
          handleMove(touch.clientX, touch.clientY);
        }
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (touchIdRef.current !== null) {
        const touch = Array.from(e.changedTouches).find(t => t.identifier === touchIdRef.current);
        if (touch) {
          e.preventDefault();
          handleEnd();
        }
      }
    };

    window.addEventListener('touchstart', handleTouchStart, { passive: false });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd, { passive: false });

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [handleStart, handleMove, handleEnd, isActive]);

  const stickRadius = 25;
  const stickPosition = {
    x: position.x,
    y: position.y,
  };

  return (
    <div
      ref={joystickRef}
      className="absolute bottom-6 left-6 z-50 touch-none"
      style={{
        width: `${size}px`,
        height: `${size}px`,
      }}
    >
      {/* Background circle */}
      <div
        className="absolute inset-0 rounded-full border-4 opacity-60"
        style={{
          borderColor: color,
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
        }}
      />
      
      {/* Stick */}
      <div
        ref={stickRef}
        className="absolute rounded-full transition-transform duration-100"
        style={{
          width: `${stickRadius * 2}px`,
          height: `${stickRadius * 2}px`,
          left: `calc(50% + ${stickPosition.x}px - ${stickRadius}px)`,
          top: `calc(50% + ${stickPosition.y}px - ${stickRadius}px)`,
          backgroundColor: isActive ? color : `${color}80`,
          transform: 'translate(-50%, -50%)',
          transition: isActive ? 'none' : 'all 0.2s ease-out',
        }}
      />
    </div>
  );
}
