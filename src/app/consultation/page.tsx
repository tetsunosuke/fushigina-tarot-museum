'use client';

import React, { useState } from 'react';
import { useGameState } from '../context';
import Link from 'next/link';

export default function ConsultationPage() {
  const { consultations } = useGameState();
  const [selectedCaseId, setSelectedCaseId] = useState<string | null>(null);

  const activeCase = consultations.find(c => c.id === selectedCaseId);

  return (
    <div className="space-y-8 animate-fade-in max-w-4xl mx-auto">
      {/* ページヘッダー */}
      <div className="text-center space-y-2">
        <span className="text-[10px] font-mono tracking-widest text-[#b39369] uppercase font-bold">CONSULTATION & WORKSHOP REPORTS</span>
        <h2 className="text-2xl font-serif font-bold text-[#2b2825]">お悩み受付・活動レポート</h2>
        <p className="text-xs text-[#6e675f] max-w-md mx-auto leading-relaxed">
          美術館に寄せられた悩みと、ワークショップを通じて参加者が内省を深め、自律へと向かったプロセスの記録です。
        </p>
        <div className="w-16 h-[1px] bg-[#b39369] mx-auto mt-4"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* 左側：相談リスト */}
        <div className="md:col-span-1 space-y-3">
          <p className="text-[10px] font-mono tracking-wider text-[#6e675f] uppercase border-b border-[#ebdcd0] pb-1">相談ケース一覧</p>
          <div className="space-y-2">
            {consultations.map(c => {
              let statusLabel = '未解決';
              let statusClass = 'bg-[#f4efe8] text-[#8c7e6c]';
              if (c.status === 'pending') {
                statusLabel = '返信待ち';
                statusClass = 'bg-[#fffbeb] text-[#d97706]';
              } else if (c.status === 'solved') {
                statusLabel = '対話完了';
                statusClass = 'bg-[#f0f7f4] text-[#2d6a4f]';
              }

              return (
                <button
                  key={c.id}
                  onClick={() => setSelectedCaseId(c.id)}
                  className={`w-full text-left p-3.5 rounded-xl border transition flex flex-col gap-1.5 ${
                    selectedCaseId === c.id
                      ? 'border-[#b39369] bg-[#fdfbf7] shadow-sm'
                      : 'border-[#ebdcd0]/60 hover:bg-[#fcfaf7]/50 bg-white'
                  }`}
                >
                  <div className="flex justify-between items-center w-full">
                    <span className="text-[9px] font-mono text-[#8c7e6c] tracking-wider">{c.caseNo}</span>
                    <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded ${statusClass}`}>
                      {statusLabel}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{c.clientAvatar}</span>
                    <div className="leading-tight">
                      <h4 className="text-xs font-bold text-[#2b2825]">{c.clientName}</h4>
                      <p className="text-[9px] text-[#8e857b]">{c.clientTitle}</p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 右側：詳細表示 */}
        <div className="md:col-span-2">
          {activeCase ? (
            <div className="border border-[#ebdcd0] bg-white rounded-2xl p-6 space-y-6 shadow-sm">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-3xl p-2 bg-[#fdfbf7] rounded-2xl border border-[#ebdcd0]/50">{activeCase.clientAvatar}</span>
                  <div>
                    <h3 className="text-sm font-bold text-[#2b2825]">{activeCase.clientName}</h3>
                    <p className="text-[10px] text-[#8e857b] font-mono">{activeCase.clientTitle}</p>
                  </div>
                </div>
                <div className="bg-[#fcfaf7] border border-[#ebdcd0]/40 rounded-xl p-4">
                  <p className="text-xs text-[#4a453f] leading-relaxed italic">
                    「{activeCase.text}」
                  </p>
                </div>
              </div>

              {/* ステータスに応じた表示 */}
              {activeCase.status === 'unresolved' && (
                <div className="bg-[#fffbeb] border border-[#fef3c7] text-[#92400e] rounded-xl p-4 space-y-3">
                  <p className="text-xs leading-relaxed">
                    💡 この来館者の悩みを解決するヒントを、ワークショップの部屋でタロットカードの対話を通じて届けてください。
                  </p>
                  <div className="flex justify-end">
                    <Link
                      href="/workshop"
                      className="px-4 py-2 rounded-xl text-center text-xs font-bold bg-[#b39369] hover:bg-[#a3835a] text-white transition shadow-sm"
                    >
                      ワークショップに参加する
                    </Link>
                  </div>
                </div>
              )}

              {activeCase.status === 'pending' && (
                <div className="bg-[#fffbeb] border border-[#fef3c7] text-[#92400e] rounded-xl p-4 flex items-center gap-3 animate-pulse">
                  <span className="text-lg">⏳</span>
                  <div className="leading-tight">
                    <h5 className="text-xs font-bold">返信を整理中...</h5>
                    <p className="text-[9px] text-[#b45309]">あなたが送ったカードとシンボルの解釈を読み、相談者が内省を行っています。</p>
                  </div>
                </div>
              )}

              {activeCase.status === 'solved' && (
                <div className="space-y-4">
                  <div className="border border-[#d8ebd4] bg-[#f0f7f4] rounded-xl p-5 space-y-3 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1.5 h-full bg-[#2d6a4f]"></div>
                    <div className="flex justify-between items-center text-[10px] text-[#2d6a4f] font-bold font-mono">
                      <span>✓ 対話と内省の完了</span>
                      <span>ACTIVITY REPORT</span>
                    </div>
                    <p className="text-xs text-[#2d6a4f] leading-relaxed whitespace-pre-wrap">
                      {activeCase.sentCardId && activeCase.resolutionReports[activeCase.sentCardId]}
                    </p>
                  </div>

                  {activeCase.sentHighlights && activeCase.sentHighlights.length > 0 && (
                    <div className="border border-[#ebdcd0]/60 bg-[#fdfbf7]/50 rounded-xl p-4 space-y-2">
                      <h5 className="text-[10px] font-bold text-[#8c7e6c] tracking-wider uppercase font-mono">あなたが届けたカードの言葉：</h5>
                      <ul className="list-disc pl-4 text-[11px] text-[#6e675f] space-y-1">
                        {activeCase.sentHighlights.map((hl, idx) => (
                          <li key={idx} className="leading-relaxed">{hl}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div className="border border-dashed border-[#ebdcd0] rounded-2xl p-12 text-center text-xs text-[#8c7e6c]">
              左側の相談リストから、詳細を確認したいケースを選択してください。
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
