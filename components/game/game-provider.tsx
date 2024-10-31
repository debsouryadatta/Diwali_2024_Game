"use client";

import { createContext, useContext, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useSound from "use-sound";

type GameState = "welcome" | "playing" | "ended";

interface GameContextType {
  gameState: GameState;
  score: number;
  timeLeft: number;
  startGame: () => void;
  endGame: () => void;
  incrementScore: (points: number) => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [gameState, setGameState] = useState<GameState>("welcome");
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);

  const startGame = () => {
    setGameState("playing");
    setScore(0);
    setTimeLeft(15);
    
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setGameState("ended");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const endGame = () => {
    setGameState("ended");
  };

  const incrementScore = (points: number) => {
    setScore((prev) => prev + points);
  };

  return (
    <GameContext.Provider
      value={{
        gameState,
        score,
        timeLeft,
        startGame,
        endGame,
        incrementScore,
      }}
    >
      <AnimatePresence mode="wait">{children}</AnimatePresence>
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
}