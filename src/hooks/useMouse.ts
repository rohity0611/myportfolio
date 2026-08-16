"use client";

import { useRef, useCallback, useEffect, useState } from "react";

interface MouseState {
  x: number;
  y: number;
  vx: number;
  vy: number;
  speed: number;
  normalX: number;
  normalY: number;
}

export function useMouse() {
  const state = useRef<MouseState>({
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    speed: 0,
    normalX: 0,
    normalY: 0,
  });

  const spring = useRef({ x: 0, y: 0 });
  const raf = useRef<number>(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [smoothPosition, setSmoothPosition] = useState({ x: 0, y: 0 });
  const [velocity, setVelocity] = useState(0);
  const [isMoving, setIsMoving] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const prev = { x: state.current.x, y: state.current.y };
    state.current.x = e.clientX;
    state.current.y = e.clientY;
    state.current.vx = e.clientX - prev.x;
    state.current.vy = e.clientY - prev.y;
    state.current.speed = Math.sqrt(state.current.vx ** 2 + state.current.vy ** 2);
    state.current.normalX = (e.clientX / window.innerWidth) * 2 - 1;
    state.current.normalY = -(e.clientY / window.innerHeight) * 2 + 1;
    setIsMoving(true);

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setIsMoving(false), 150);
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    const animate = () => {
      const s = state.current;
      const springFactor = 0.08;

      spring.current.x += (s.x - spring.current.x) * springFactor;
      spring.current.y += (s.y - spring.current.y) * springFactor;

      setPosition({ x: s.x, y: s.y });
      setSmoothPosition({ x: spring.current.x, y: spring.current.y });
      setVelocity(s.speed);

      raf.current = requestAnimationFrame(animate);
    };
    raf.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(raf.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [handleMouseMove]);

  return {
    position,
    smoothPosition,
    velocity,
    isMoving,
    state,
  };
}
