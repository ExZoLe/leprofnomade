'use client';

import { useState, useEffect } from 'react';

const cities = [
  { name: 'Londres', color: '#1B4965' },
  { name: 'Séoul', color: '#8338EC' },
  { name: 'Rome', color: '#E63946' },
];

export function HeroAnimatedCity() {
  const [idx, setIdx] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIdx((i) => (i + 1) % cities.length);
        setVisible(true);
      }, 400);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  const city = cities[idx];

  return (
    <span
      className="inline-block transition-all duration-400 border-b-[3px] pb-0.5"
      style={{
        color: city.color,
        borderColor: `${city.color}40`,
        opacity: visible ? 1 : 0,
      }}
    >
      {city.name}
    </span>
  );
}
