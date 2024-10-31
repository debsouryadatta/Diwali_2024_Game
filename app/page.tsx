"use client";

import { GameProvider } from "@/components/game/game-provider";
import { WelcomeScreen } from "@/components/game/welcome-screen";
import { GameScreen } from "@/components/game/game-screen";
import { ScoreScreen } from "@/components/game/score-screen";
import { BackgroundEffects } from "@/components/game/background-effects";

export default function Home() {
  return (
    <GameProvider>
      <main className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white overflow-hidden">
        <BackgroundEffects />
        <WelcomeScreen />
        <GameScreen />
        <ScoreScreen />
      </main>
    </GameProvider>
  );
}