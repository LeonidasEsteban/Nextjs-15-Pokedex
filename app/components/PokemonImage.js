'use client';
import { useEffect, useRef, useState } from 'react';

const globalStartTimeRef = { current: performance.now() };

export default function PokemonImage({ sprite, name, colors }) {
  const animationRef = useRef(null);
  const [currentSprite, setCurrentSprite] = useState(0);
  const sprites = [
    sprite, // front_default
    sprite.replace('front_default', 'back_default'),
    sprite.replace('front_default', 'front_shiny'),
    sprite.replace('front_default', 'back_shiny')
  ];

  useEffect(() => {
    const nextButton = document.getElementById('next-image');
    const prevButton = document.getElementById('prev-image');

    const handleNext = () => {
      setCurrentSprite((prev) => (prev + 1) % sprites.length);
    };

    const handlePrev = () => {
      setCurrentSprite((prev) => (prev - 1 + sprites.length) % sprites.length);
    };

    nextButton?.addEventListener('click', handleNext);
    prevButton?.addEventListener('click', handlePrev);

    return () => {
      nextButton?.removeEventListener('click', handleNext);
      prevButton?.removeEventListener('click', handlePrev);
    };
  }, [sprites.length]);

  useEffect(() => {
    const duration = 4000; // 4 segundos

    const animate = (currentTime) => {
      if (!globalStartTimeRef.current) {
        globalStartTimeRef.current = currentTime;
      }

      const elapsed = (currentTime - globalStartTimeRef.current) % duration;
      const progress = elapsed / duration;

      // Calcular posiciones usando funciones sinusoidales para movimiento circular suave
      const x1 = 40 + 20 * Math.sin(progress * 2 * Math.PI);
      const y1 = 20 + 20 * Math.cos(progress * 2 * Math.PI);
      const x2 = 80 + 20 * Math.sin(progress * 2 * Math.PI + 2 * Math.PI / 3);
      const y2 = 0 + 20 * Math.cos(progress * 2 * Math.PI + 2 * Math.PI / 3);
      const x3 = 0 + 20 * Math.sin(progress * 2 * Math.PI + 4 * Math.PI / 3);
      const y3 = 50 + 20 * Math.cos(progress * 2 * Math.PI + 4 * Math.PI / 3);

      document.documentElement.style.setProperty('--x1', x1);
      document.documentElement.style.setProperty('--y1', y1);
      document.documentElement.style.setProperty('--x2', x2);
      document.documentElement.style.setProperty('--y2', y2);
      document.documentElement.style.setProperty('--x3', x3);
      document.documentElement.style.setProperty('--y3', y3);

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  useEffect(() => {
    document.documentElement.style.setProperty('--gradient1', colors[0]);
    document.documentElement.style.setProperty('--gradient2', colors[1]);
    document.documentElement.style.setProperty('--gradient3', colors[2]);
  }, [colors]);

  return (
    <div className="screen">
      <div className="screen-border">
        <div className="screen-safeArea" id="screen"
          style={{
            backgroundColor: colors[0]
          }}
        >
          <div className="gradient-background"></div>
          <img
            src={sprites[currentSprite]}
            alt={name}
            className="screen-image"
          />
        </div>
      </div>
    </div>
  );
}