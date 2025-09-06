'use client';

import React, { useState, useEffect } from 'react';

const CelebrationAnimation = ({ isVisible, onComplete }) => {
  const [particles, setParticles] = useState([]);
  const [confetti, setConfetti] = useState([]);

  useEffect(() => {
    if (isVisible) {
      // Create flying paper particles
      const newParticles = Array.from({ length: 25 }, (_, i) => ({
        id: i,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 10,
        vy: (Math.random() - 0.5) * 10,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 15,
        size: Math.random() * 25 + 15,
        color: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9'][Math.floor(Math.random() * 10)],
        opacity: 1,
        delay: i * 80
      }));
      
      // Create confetti particles
      const newConfetti = Array.from({ length: 50 }, (_, i) => ({
        id: `confetti-${i}`,
        x: Math.random() * window.innerWidth,
        y: -20,
        vx: (Math.random() - 0.5) * 6,
        vy: Math.random() * 3 + 2,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 20,
        size: Math.random() * 8 + 4,
        color: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9', '#F1948A', '#85C1E9'][Math.floor(Math.random() * 12)],
        opacity: 1,
        delay: i * 50
      }));
      
      setParticles(newParticles);
      setConfetti(newConfetti);

      // Auto-hide after animation
      const timer = setTimeout(() => {
        setParticles([]);
        setConfetti([]);
        if (onComplete) onComplete();
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [isVisible, onComplete]);

  useEffect(() => {
    if (particles.length === 0 && confetti.length === 0) return;

    const animationFrame = requestAnimationFrame(() => {
      // Update paper particles
      setParticles(prevParticles => 
        prevParticles.map(particle => {
          const newX = particle.x + particle.vx;
          const newY = particle.y + particle.vy;
          const newRotation = particle.rotation + particle.rotationSpeed;
          
          // Bounce off walls
          let newVx = particle.vx;
          let newVy = particle.vy;
          
          if (newX <= 0 || newX >= window.innerWidth) {
            newVx = -particle.vx * 0.8;
          }
          if (newY <= 0 || newY >= window.innerHeight) {
            newVy = -particle.vy * 0.8;
          }

          // Add gravity effect
          newVy += 0.3;

          // Fade out over time
          const newOpacity = Math.max(0, particle.opacity - 0.008);

          return {
            ...particle,
            x: newX,
            y: newY,
            rotation: newRotation,
            vx: newVx,
            vy: newVy,
            opacity: newOpacity
          };
        }).filter(particle => particle.opacity > 0)
      );

      // Update confetti particles
      setConfetti(prevConfetti => 
        prevConfetti.map(confettiPiece => {
          const newX = confettiPiece.x + confettiPiece.vx;
          const newY = confettiPiece.y + confettiPiece.vy;
          const newRotation = confettiPiece.rotation + confettiPiece.rotationSpeed;
          
          // Add gravity
          const newVy = confettiPiece.vy + 0.5;
          
          // Fade out when hitting bottom
          let newOpacity = confettiPiece.opacity;
          if (newY > window.innerHeight - 50) {
            newOpacity = Math.max(0, confettiPiece.opacity - 0.02);
          }

          return {
            ...confettiPiece,
            x: newX,
            y: newY,
            rotation: newRotation,
            vy: newVy,
            opacity: newOpacity
          };
        }).filter(confettiPiece => confettiPiece.opacity > 0 && confettiPiece.y < window.innerHeight + 100)
      );
    });

    return () => cancelAnimationFrame(animationFrame);
  }, [particles, confetti]);

  if (!isVisible || (particles.length === 0 && confetti.length === 0)) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {/* Paper particles */}
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute"
          style={{
            left: particle.x,
            top: particle.y,
            transform: `rotate(${particle.rotation}deg)`,
            opacity: particle.opacity,
            transition: `opacity ${particle.delay}ms ease-in`
          }}
        >
          {/* Paper particle */}
          <div
            className="relative"
            style={{
              width: particle.size,
              height: particle.size * 1.4,
              backgroundColor: particle.color,
              borderRadius: '2px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
            }}
          >
            {/* Paper fold lines */}
            <div className="absolute top-1/3 left-0 right-0 h-px bg-white opacity-60"></div>
            <div className="absolute top-2/3 left-0 right-0 h-px bg-white opacity-60"></div>
            <div className="absolute top-0 bottom-0 left-1/3 w-px bg-white opacity-60"></div>
            <div className="absolute top-0 bottom-0 left-2/3 w-px bg-white opacity-60"></div>
            
            {/* Paper texture */}
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white to-transparent opacity-20"></div>
          </div>
        </div>
      ))}

      {/* Confetti particles */}
      {confetti.map(confettiPiece => (
        <div
          key={confettiPiece.id}
          className="absolute"
          style={{
            left: confettiPiece.x,
            top: confettiPiece.y,
            transform: `rotate(${confettiPiece.rotation}deg)`,
            opacity: confettiPiece.opacity,
            transition: `opacity ${confettiPiece.delay}ms ease-in`
          }}
        >
          <div
            className="w-2 h-2"
            style={{
              backgroundColor: confettiPiece.color,
              borderRadius: Math.random() > 0.5 ? '50%' : '0%',
              width: confettiPiece.size,
              height: confettiPiece.size
            }}
          />
        </div>
      ))}
      
      {/* Center burst effect */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="w-6 h-6 bg-yellow-400 rounded-full animate-ping"></div>
        <div className="w-4 h-4 bg-pink-400 rounded-full animate-ping absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" style={{ animationDelay: '0.2s' }}></div>
        <div className="w-2 h-2 bg-blue-400 rounded-full animate-ping absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" style={{ animationDelay: '0.4s' }}></div>
      </div>

      {/* Additional sparkles */}
      <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-yellow-300 rounded-full animate-ping"></div>
      <div className="absolute top-1/4 right-1/4 w-1.5 h-1.5 bg-purple-300 rounded-full animate-ping" style={{ animationDelay: '0.3s' }}></div>
      <div className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-cyan-300 rounded-full animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/3 w-1.5 h-1.5 bg-pink-300 rounded-full animate-bounce"></div>
    </div>
  );
};

export default CelebrationAnimation;
