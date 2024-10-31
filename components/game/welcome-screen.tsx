"use client";

import { motion } from "framer-motion";
import { useGame } from "./game-provider";
import { Button } from "@/components/ui/button";
import { Flame, Sparkles, Gift } from "lucide-react";

export function WelcomeScreen() {
  const { gameState, startGame } = useGame();

  if (gameState !== "welcome") return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 flex flex-col items-center justify-center p-4 text-center"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="space-y-8 bg-gray-900/50 backdrop-blur-lg p-8 rounded-2xl border border-yellow-500/20"
      >
        <div className="flex justify-center space-x-4">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <Flame className="h-12 w-12 text-yellow-400" />
          </motion.div>
          <motion.div
            animate={{ rotate: [0, -10, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2, delay: 0.5 }}
          >
            <Sparkles className="h-12 w-12 text-purple-400" />
          </motion.div>
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 2, delay: 1 }}
          >
            <Gift className="h-12 w-12 text-pink-400" />
          </motion.div>
        </div>

        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-600 text-transparent bg-clip-text mb-2">
            Diwali Sparkler Frenzy
          </h1>
          <p className="text-lg text-yellow-100/80">
            Collect diyas, sparklers, and gifts in this festive celebration!
          </p>
        </div>

        <div className="space-y-4">
          <p className="text-sm text-yellow-200/60">
            🕒 15 seconds • Diyas: 1pt • Sparklers: 3pts • Gifts: 5pts
          </p>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              onClick={startGame}
              className="text-xl px-8 py-6 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white rounded-full shadow-lg"
            >
              Start Celebration
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}