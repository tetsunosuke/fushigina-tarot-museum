'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_CONSULTATIONS, ConsultationCase } from '@/data/artMuseumData';

interface CompletedCase {
  caseId: string;
  cardId: string;
  sentHighlights: string[];
}

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
  const [completedDetails, setCompletedDetails] = useState<CompletedCase[]>([]);
  const [pendingCases, setPendingCases] = useState<{ caseId: string; resolveAt: number; cardId: string; sentHighlights: string[] }[]>([]);
  const [consultations, setConsultations] = useState<ConsultationCase[]>(INITIAL_CONSULTATIONS);
  const [isAllSolved, setIsAllSolved] = useState(false);
  const [playerChosenCard, setPlayerChosenCard] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // 公開用 completedCases（他ファイルとの互換性のため文字列配列として公開）
  const completedCases = completedDetails.map(d => d.caseId);

  // マウント時に localStorage から状態を復元
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedCompleted = localStorage.getItem('sophia_completed_details');
      if (savedCompleted) {
        try {
          setCompletedDetails(JSON.parse(savedCompleted));
        } catch (e) {
          console.error('Failed to parse completed details', e);
        }
      }
      const savedPending = localStorage.getItem('sophia_pending_cases');
      if (savedPending) {
        try {
          setPendingCases(JSON.parse(savedPending));
        } catch (e) {
          console.error('Failed to parse pending cases', e);
        }
      }
      setIsLoaded(true);
    }
  }, []);

  // 状態変更時に localStorage へ保存（読み込みが完了している場合のみ）
  useEffect(() => {
    if (isLoaded && typeof window !== 'undefined') {
      localStorage.setItem('sophia_completed_details', JSON.stringify(completedDetails));
    }
  }, [completedDetails, isLoaded]);

  useEffect(() => {
    if (isLoaded && typeof window !== 'undefined') {
      localStorage.setItem('sophia_pending_cases', JSON.stringify(pendingCases));
    }
  }, [pendingCases, isLoaded]);

  // タイマー監視による pending 状態から solved への移行
  useEffect(() => {
    const timer = setInterval(() => {
      const now = Date.now();
      const resolved = pendingCases.filter(p => now >= p.resolveAt);
      
      if (resolved.length > 0) {
        resolved.forEach(p => {
          if (!completedDetails.some(d => d.caseId === p.caseId)) {
            setCompletedDetails(prev => [
              ...prev,
              { caseId: p.caseId, cardId: p.cardId, sentHighlights: p.sentHighlights }
            ]);
          }
        });
        setPendingCases(prev => prev.filter(p => now < p.resolveAt));
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [pendingCases, completedDetails]);

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
        const solved = completedDetails.find(d => d.caseId === c.id);
        if (solved) {
          return {
            ...c,
            status: 'solved',
            sentCardId: solved.cardId,
            sentHighlights: solved.sentHighlights
          };
        }
        return {
          ...c,
          status: 'unresolved'
        };
      })
    );
  }, [completedDetails, pendingCases]);

  // 全解決チェック
  useEffect(() => {
    if (completedDetails.length >= INITIAL_CONSULTATIONS.length && INITIAL_CONSULTATIONS.length > 0) {
      setIsAllSolved(true);
    } else {
      setIsAllSolved(false);
    }
  }, [completedDetails]);

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
    setCompletedDetails([]);
    setPendingCases([]);
    setPlayerChosenCard(null);
    setIsAllSolved(false);
    setConsultations(INITIAL_CONSULTATIONS);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('sophia_completed_details');
      localStorage.removeItem('sophia_pending_cases');
    }
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
