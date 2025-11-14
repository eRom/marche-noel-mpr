"use client";

import { createContext, ReactNode, useContext, useState } from "react";

interface SnowflakeHuntContextType {
  foundSnowflakes: Set<number>;
  totalSnowflakes: number;
  collectSnowflake: (id: number) => void;
  hasFoundAll: boolean;
}

const SnowflakeHuntContext = createContext<
  SnowflakeHuntContextType | undefined
>(undefined);

export function SnowflakeHuntProvider({ children }: { children: ReactNode }) {
  const [foundSnowflakes, setFoundSnowflakes] = useState<Set<number>>(
    new Set()
  );
  const totalSnowflakes = 9;

  const collectSnowflake = (id: number) => {
    setFoundSnowflakes((prev) => {
      const newSet = new Set(prev);
      newSet.add(id);
      return newSet;
    });
  };

  const hasFoundAll = foundSnowflakes.size === totalSnowflakes;

  return (
    <SnowflakeHuntContext.Provider
      value={{
        foundSnowflakes,
        totalSnowflakes,
        collectSnowflake,
        hasFoundAll,
      }}
    >
      {children}
    </SnowflakeHuntContext.Provider>
  );
}

export function useSnowflakeHunt() {
  const context = useContext(SnowflakeHuntContext);
  if (context === undefined) {
    throw new Error(
      "useSnowflakeHunt must be used within a SnowflakeHuntProvider"
    );
  }
  return context;
}
