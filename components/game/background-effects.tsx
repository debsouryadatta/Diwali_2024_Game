"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from 'react';

export function BackgroundEffects() {
  const [screenSize, setScreenSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (typeof window !== "undefined") {
      setScreenSize({ width: window.innerWidth, height: window.innerHeight });
    }
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none">
      {/* Animated rangoli patterns */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-64 h-64 bg-[url('https://images.unsplash.com/photo-1604423043492-41303788de89')] bg-contain bg-no-repeat opacity-30" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-[url('https://images.unsplash.com/photo-1604423043492-41303788de89')] bg-contain bg-no-repeat opacity-30 rotate-180" />
      </div>

      {/* Floating diyas */}
      {Array.from({ length: 15 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-yellow-400 rounded-full"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.4, 1, 0.4],
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}

      {/* Text overlay */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.05 }}
      >
        <h1 className="text-[20vw] font-bold text-white whitespace-nowrap">
          HAPPY DIWALI
        </h1>
      </motion.div>
    </div>
  );
}