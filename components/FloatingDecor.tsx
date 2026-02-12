import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Star, Sparkles } from 'lucide-react';

export const FloatingDecor: React.FC = () => {
  // Generate random positions and delays for particles
  const particles = Array.from({ length: 15 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100, // Random horizontal position %
    delay: Math.random() * 5,
    duration: 10 + Math.random() * 10,
    size: 10 + Math.random() * 20,
    Type: [Heart, Star, Sparkles][Math.floor(Math.random() * 3)],
    color: ['text-kawaii-pink', 'text-kawaii-blue', 'text-kawaii-purple', 'text-kawaii-mint'][Math.floor(Math.random() * 4)]
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className={`absolute bottom-0 ${p.color} opacity-30`}
          style={{ left: `${p.x}%` }}
          animate={{
            y: [0, -1000], // Move up
            opacity: [0, 0.5, 0], // Fade in/out
            rotate: [0, 360], // Spin
            x: [0, Math.random() * 50 - 25] // Wiggle horizontally
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "linear"
          }}
        >
          <p.Type size={p.size} fill="currentColor" />
        </motion.div>
      ))}
    </div>
  );
};