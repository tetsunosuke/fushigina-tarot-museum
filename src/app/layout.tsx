'use client';

import React from 'react';
import { Outfit, Noto_Serif_JP } from 'next/font/google';
import './globals.css';
import { GameStateProvider, useGameState } from './context';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const outfit = Outfit({ subsets: ['latin'] });
const notoSerifJP = Noto_Serif_JP({ subsets: ['latin'], weight: ['400', '700'] });

function LayoutContent({ children }: { children: React.ReactNode }) {
  const { resetGame, completedCases, isAllSolved } = useGameState();
  const pathname = usePathname();

  const navItems = [
    { href: '/exhibition', label: 'オンライン展示室' },
    { href: '/consultation', label: 'お悩み受付・活動レポート' },
    { href: '/dashboard', label: 'キュレーター用管理画面' }
  ];
  return (
    <div className="min-h-screen flex flex-col bg-[#faf8f5]">
      {/* 美術館らしい上品で清潔感のあるヘッダー */}
      <header className="sticky top-0 z-50 bg-[#faf8f5]/90 border-b border-[#eae5db] text-[#2b2825] backdrop-blur-md px-6 py-4">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-6">
            <Link href="/exhibition" className="text-xs tracking-wider hover:text-[#b39369] transition">
              オンライン展示室
            </Link>
            <Link href="/workshop" className="text-xs tracking-wider hover:text-[#b39369] transition">
              ワークショップの部屋
            </Link>
            <Link href="/consultation" className="text-xs tracking-wider hover:text-[#b39369] transition">
              お悩み受付・レポート
            </Link>
          </div>
          <p className="text-[9px] text-[#6e675f] tracking-wider">
            SOPHIA Online Museum — 自律を促す対話型アート・アーカイブ
          </p>

          <div className="flex items-center gap-3">
            {/* 全員解決した時のみ出現する「館長の書斎（最終メッセージ解放）」への特別ルートリンク */}
            {isAllSolved && (
              <Link
                href="/director-room"
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all border animate-pulse ${
                  pathname === '/director-room'
                    ? 'bg-[#8c6239] text-white border-[#8c6239]'
                    : 'bg-[#faf8f5] text-[#8c6239] border-[#8c6239] hover:bg-[#8c6239]/10'
                }`}
              >
                🏛️ 館長の書斎へ
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="flex-1 max-w-4xl w-full mx-auto p-6 md:p-8">
        {children}
      </main>

      {/* フッター */}
      <footer className="py-8 text-center text-[10px] text-[#6e675f] border-t border-[#eae5db]">
        <div className="max-w-4xl mx-auto flex justify-between items-center px-6">
          <span>&copy; SOPHIA Art & Counseling Workshop. All Rights Reserved.</span>
          {completedCases.length > 0 && (
            <button
              onClick={resetGame}
              className="text-xs text-[#b39369] hover:underline font-medium border border-[#eae5db] px-2.5 py-1 rounded bg-white transition"
            >
              来館セッションの初期化
            </button>
          )}
        </div>
      </footer>
    </div>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${outfit.className} ${notoSerifJP.className} bg-[#fcfaf7] text-[#4a453f] min-h-screen flex flex-col`}>
        <GameStateProvider>
          <LayoutContent>{children}</LayoutContent>
        </GameStateProvider>
      </body>
    </html>
  );
}
