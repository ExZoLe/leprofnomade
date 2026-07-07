'use client';

import { useState, useEffect } from 'react';

const cities = [
  { name: 'Londres', color: '#D6A23D' }, // mustard
  { name: 'Séoul', color: '#C86E46' },   // terracotta
  { name: 'Rome', color: '#6B7B3E' },    // olive
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
