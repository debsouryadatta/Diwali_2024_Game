"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGame } from "./game-provider";
import { Flame, Sparkles, Gift } from "lucide-react";

interface GameItem {
  id: number;
  x: number;
  y: number;
  points: number;
  size: number;
  type: 'diya' | 'sparkler' | 'gift';
}

export function GameScreen() {
  const { gameState, score, timeLeft, incrementScore } = useGame();
  const [items, setItems] = useState<GameItem[]>([]);

  useEffect(() => {
    if (gameState !== "playing") return;

    const interval = setInterval(() => {
      const type = Math.random() > 0.7 ? 'gift' : Math.random() > 0.5 ? 'sparkler' : 'diya';
      const newItem: GameItem = {
        id: Date.now(),
        x: Math.random() * (window.innerWidth - 100),
        y: Math.random() * (window.innerHeight - 100),
        points: type === 'gift' ? 5 : type === 'sparkler' ? 3 : 1,
        size: type === 'gift' ? 40 : 30,
        type,
      };

      setItems((prev) => [...prev, newItem]);
    }, 600);

    return () => clearInterval(interval);
  }, [gameState]);

  const handleItemClick = (item: GameItem) => {
    incrementScore(item.points);
    setItems((prev) => prev.filter((i) => i.id !== item.id));
    
    // Create explosion effect
    const explosion = document.createElement('div');
    explosion.className = 'fixed pointer-events-none';
    explosion.style.left = `${item.x}px`;
    explosion.style.top = `${item.y}px`;
    document.body.appendChild(explosion);
    setTimeout(() => explosion.remove(), 1000);
  };

  if (gameState !== "playing") return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0"
    >
      <div className="fixed top-4 left-4 right-4 flex justify-between items-center px-6 py-3 bg-black/30 rounded-full backdrop-blur-sm">
        <div className="text-2xl font-bold">Score: {score}</div>
        <div className="text-2xl font-bold">Time: {timeLeft}s</div>
      </div>

      <AnimatePresence>
        {items.map((item) => (
          <motion.div
            key={item.id}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            style={{
              position: "absolute",
              left: item.x,
              top: item.y,
              cursor: "pointer",
            }}
            onClick={() => handleItemClick(item)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="relative"
          >
            <div className="relative">
              {item.type === 'diya' && (
                <Flame
                  className="text-yellow-400"
                  style={{ width: item.size, height: item.size }}
                />
              )}
              {item.type === 'sparkler' && (
                <Sparkles
                  className="text-purple-400"
                  style={{ width: item.size, height: item.size }}
                />
              )}
              {item.type === 'gift' && (
                <Gift
                  className="text-pink-400"
                  style={{ width: item.size, height: item.size }}
                />
              )}
              <motion.div
                className="absolute inset-0"
                animate={{
                  opacity: [0.5, 1, 0.5],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 1,
                }}
              >
                <div className={`w-full h-full rounded-full blur-md ${
                  item.type === 'gift' ? 'bg-pink-400/30' :
                  item.type === 'sparkler' ? 'bg-purple-400/30' :
                  'bg-yellow-400/30'
                }`} />
              </motion.div>
            </div>
            <motion.div
              className="absolute -top-6 left-1/2 transform -translate-x-1/2"
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              +{item.points}
            </motion.div>
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
}