'use client';

import React from 'react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="max-w-2xl mx-auto flex flex-col items-center justify-center min-h-[65vh] text-center gap-6 animate-fade-in py-8">
      {/* 美術館のシンボルデコレーター */}
      <div className="w-16 h-16 rounded-full bg-[#f7f4ee] border border-[#eae5db] flex items-center justify-center text-[#b39369] text-2xl font-mono shadow-sm">
        🏛️
      </div>

      <div className="space-y-3">
        <span className="text-[10px] font-mono tracking-widest text-[#b39369] uppercase font-bold">SOPHIA Interactive Art & Counseling</span>
        <h2 className="text-3xl font-serif font-extrabold tracking-tight text-[#2b2825]">
          オンライン美術館 SOPHIA
        </h2>
        <p className="text-[#6e675f] text-xs max-w-md mx-auto leading-relaxed">
          私たちの展示室へようこそ。ここではタロットのシンボルが持つ本来の意味を再解釈し、来館者が自律した選択を行えるよう支援する対話型ワークショップを開催しています。
        </p>
      </div>

      <div className="w-full max-w-md p-8 rounded-2xl museum-panel bg-white space-y-6">
        <div className="space-y-1 text-left">
          <span className="text-[10px] uppercase font-mono tracking-widest text-[#b39369]">Current Event</span>
          <h3 className="text-md font-serif font-bold text-[#2b2825]">対話型キュレーション・ワークショップ</h3>
        </div>

        <p className="text-xs text-[#6e675f] text-left leading-relaxed">
          現在、周囲の意見に流されて進路に迷っている学生「ユウタ」の相談事例が展示されています。展示室のアーカイブからヒントを探索し、適切なシンボルの意味をキュレーションすることで、彼の迷いを自律的な意思決定へと反転させましょう。
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <Link 
            href="/exhibition" 
            className="block w-full py-2.5 rounded-xl font-bold bg-[#f7f4ee] hover:bg-[#eae5db] border border-[#eae5db] text-[#b39369] text-xs tracking-wider transition-all"
          >
            展示室を探索する
          </Link>
          <Link 
            href="/consultation" 
            className="block w-full py-2.5 rounded-xl font-bold bg-[#b39369] hover:bg-[#a3835a] text-white text-xs tracking-wider transition-all shadow-sm"
          >
            お悩み・レポートを見る
          </Link>
        </div>
      </div>
    </div>
  );
}
