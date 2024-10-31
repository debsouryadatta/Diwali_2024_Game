"use client";

import { motion } from "framer-motion";
import { useGame } from "./game-provider";
import { Button } from "@/components/ui/button";
import { Trophy, Share2, Sparkles, Copy } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export function ScoreScreen() {
  const { gameState, score, startGame } = useGame();
  const [isCopying, setIsCopying] = useState(false);

  if (gameState !== "ended") return null;

  const shareScore = async () => {
    const shareText = `🪔 I scored ${score} points in Diwali Sparkler Frenzy! Happy Diwali 2024! ✨`;
    
    try {
      if (navigator.share) {
        await navigator.share({
          title: "Diwali Sparkler Frenzy",
          text: shareText,
          url: window.location.href,
        });
        toast.success("Shared successfully!");
      } else {
        // Fallback to clipboard copy
        await navigator.clipboard.writeText(shareText);
        toast.success("Copied to clipboard!");
      }
    } catch (error) {
      if (error instanceof Error) {
        // Only show error if it's not a user cancellation
        if (error.name !== "AbortError") {
          toast.error("Couldn't share. Try copying instead!");
        }
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-gray-900/90 backdrop-blur-lg rounded-2xl p-8 max-w-md w-full text-center space-y-6 border border-yellow-500/20"
      >
        <motion.div className="space-y-4">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 5, -5, 0],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Sparkles className="w-20 h-20 mx-auto text-yellow-400" />
          </motion.div>
          
          <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-600 text-transparent bg-clip-text">
            Happy Diwali 2024!
          </h1>
          
          <div className="py-4">
            <h2 className="text-2xl font-bold text-yellow-400">Score: {score} Points</h2>
            <p className="text-yellow-200/80 mt-2">
              May your life be as bright as the diyas you collected! 🪔
            </p>
          </div>
        </motion.div>

        <div className="flex flex-col gap-4">
          <Button
            onClick={startGame}
            className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-lg py-6"
          >
            Play Again
          </Button>
          
          <Button
            onClick={shareScore}
            variant="outline"
            className="w-full border-yellow-500/50 hover:bg-yellow-500/10"
          >
            {navigator.share ? (
              <>
                <Share2 className="w-4 h-4 mr-2" />
                Share Diwali Wishes
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 mr-2" />
                Copy Diwali Wishes
              </>
            )}
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
}