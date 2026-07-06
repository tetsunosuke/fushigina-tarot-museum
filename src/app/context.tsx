'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_CONSULTATIONS, ConsultationCase } from '@/data/artMuseumData';

interface GameStateContextProps {
  consultations: ConsultationCase[];
  completedCases: string[];
  pendingCases: { caseId: string; resolveAt: number; cardId: string; sentHighlights: string[] }[];
  sendCurationHighlights: (caseId: string, cardId: string, highlights: string[]) => void;
  isAllSolved: boolean;
  playerChosenCard: string | null;
  setPlayerChosenCard: React.Dispatch<React.SetStateAction<string | null>>;
  resetGame: () => void;
}

const GameStateContext = createContext<GameStateContextProps | undefined>(undefined);

export const GameStateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [completedCases, setCompletedCases] = useState<string[]>([]);
  const [pendingCases, setPendingCases] = useState<{ caseId: string; resolveAt: number; cardId: string; sentHighlights: string[] }[]>([]);
  const [consultations, setConsultations] = useState<ConsultationCase[]>(INITIAL_CONSULTATIONS);
  const [isAllSolved, setIsAllSolved] = useState(false);
  const [playerChosenCard, setPlayerChosenCard] = useState<string | null>(null);

  // タイマー監視による pending 状態から solved への移行
  useEffect(() => {
    const timer = setInterval(() => {
      const now = Date.now();
      const resolved = pendingCases.filter(p => now >= p.resolveAt);
      
      if (resolved.length > 0) {
        resolved.forEach(p => {
          if (!completedCases.includes(p.caseId)) {
            setCompletedCases(prev => [...prev, p.caseId]);
          }
        });
        setPendingCases(prev => prev.filter(p => now < p.resolveAt));
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [pendingCases, completedCases]);

  // consultationsのステータス同期
  useEffect(() => {
    setConsultations(prev =>
      prev.map(c => {
        const pending = pendingCases.find(p => p.caseId === c.id);
        if (pending) {
          return {
            ...c,
            status: 'pending',
            resolveAt: pending.resolveAt,
            sentCardId: pending.cardId,
            sentHighlights: pending.sentHighlights
          };
        }
        if (completedCases.includes(c.id)) {
          return {
            ...c,
            status: 'solved'
          };
        }
        return {
          ...c,
          status: 'unresolved'
        };
      })
    );
  }, [completedCases, pendingCases]);

  // 全解決チェック
  useEffect(() => {
    if (completedCases.length >= INITIAL_CONSULTATIONS.length && INITIAL_CONSULTATIONS.length > 0) {
      setIsAllSolved(true);
    } else {
      setIsAllSolved(false);
    }
  }, [completedCases]);

  const sendCurationHighlights = (caseId: string, cardId: string, highlights: string[]) => {
    const resolveAt = Date.now() + 30000; // 30秒後に返信が届く演出
    setPendingCases(prev => [
      ...prev.filter(p => p.caseId !== caseId),
      { caseId, resolveAt, cardId, sentHighlights: highlights }
    ]);

    setConsultations(prev =>
      prev.map(c => {
        if (c.id === caseId) {
          return {
            ...c,
            status: 'pending',
            resolveAt,
            sentCardId: cardId,
            sentHighlights: highlights
          };
        }
        return c;
      })
    );
  };

  const resetGame = () => {
    setCompletedCases([]);
    setPendingCases([]);
    setPlayerChosenCard(null);
    setIsAllSolved(false);
    setConsultations(INITIAL_CONSULTATIONS);
  };

  return (
    <GameStateContext.Provider
      value={{
        consultations,
        completedCases,
        pendingCases,
        sendCurationHighlights,
        isAllSolved,
        playerChosenCard,
        setPlayerChosenCard,
        resetGame,
      }}
    >
      {children}
    </GameStateContext.Provider>
  );
};

export const useGameState = () => {
  const context = useContext(GameStateContext);
  if (!context) {
    throw new Error('useGameState must be used within a GameStateProvider');
  }
  return context;
};
