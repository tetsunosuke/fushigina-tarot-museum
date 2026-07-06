'use client';

import React, { useState, useEffect } from 'react';
import { useGameState } from '../context';
import { TAROT_CARDS, FACILITATOR, TarotCard } from '@/data/artMuseumData';
import Image from 'next/image';
import Link from 'next/link';

export default function WorkshopPage() {
  const { consultations, sendCurationHighlights, pendingCases, completedCases } = useGameState();
  const [selectedCaseId, setSelectedCaseId] = useState<string | null>(null);
  
  // ワークショップ内の対話状態
  const [step, setStep] = useState<number>(0); // 0:入室前, 1:ドロー, 2:ファシリテーターQ1, 3:ファシリテーターQ2, 4:完了
  const [drawnCard, setDrawnCard] = useState<TarotCard | null>(null);
  const [selectedHighlights, setSelectedHighlights] = useState<string[]>([]);
  const [isTyping, setIsTyping] = useState<boolean>(false);

  const activeCase = consultations.find(c => c.id === selectedCaseId);

  // 相談者を切り替えたら状態をリセット
  useEffect(() => {
    setStep(0);
    setDrawnCard(null);
    setSelectedHighlights([]);
    setIsTyping(false);
  }, [selectedCaseId]);

  // VTSのタイピングアニメーション用
  const startNextStep = (nextStep: number, delay = 2000) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setStep(nextStep);
    }, delay);
  };

  // カードを引く
  const handleDrawCard = () => {
    const randomIndex = Math.floor(Math.random() * TAROT_CARDS.length);
    setDrawnCard(TAROT_CARDS[randomIndex]);
    startNextStep(2, 1500);
  };

  // ハイライト文節の選択トグル
  const toggleHighlight = (text: string) => {
    setSelectedHighlights(prev =>
      prev.includes(text) ? prev.filter(t => t !== text) : [...prev, text]
    );
  };

  // 選択した解釈を届ける
  const handleSubmit = () => {
    if (!selectedCaseId || !drawnCard || selectedHighlights.length === 0) return;
    sendCurationHighlights(selectedCaseId, drawnCard.id, selectedHighlights);
    setStep(4);
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-5xl mx-auto">
      {/* ページヘッダー */}
      <div className="text-center space-y-2">
        <span className="text-[10px] font-mono tracking-widest text-[#b39369] uppercase font-bold">DIALOGUE WORKSHOP ROOM</span>
        <h2 className="text-2xl font-serif font-bold text-[#2b2825]">対話型ワークショップの部屋</h2>
        <p className="text-xs text-[#6e675f] max-w-md mx-auto leading-relaxed">
          ファシリテーターの進行に沿って、たまたまペアとなった他の参加者とタロットカードを見つめ、対話を行います。
        </p>
        <div className="w-16 h-[1px] bg-[#b39369] mx-auto mt-4"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* 左側：ペアを組む参加者を選択 */}
        <div className="md:col-span-3 space-y-3">
          <p className="text-[10px] font-mono tracking-wider text-[#6e675f] uppercase border-b border-[#ebdcd0] pb-1">参加者リスト</p>
          <div className="space-y-2">
            {consultations.map(c => {
              const isPending = pendingCases.some(p => p.caseId === c.id);
              const isSolved = completedCases.includes(c.id);
              
              let badge = null;
              if (isPending) badge = <span className="text-[8px] bg-amber-100 text-amber-800 font-bold px-1.5 py-0.5 rounded ml-auto">整理中</span>;
              else if (isSolved) badge = <span className="text-[8px] bg-green-100 text-green-800 font-bold px-1.5 py-0.5 rounded ml-auto">対話完了</span>;

              return (
                <button
                  key={c.id}
                  disabled={isPending || isSolved}
                  onClick={() => setSelectedCaseId(c.id)}
                  className={`w-full text-left p-3.5 rounded-xl border transition flex items-center gap-3 ${
                    selectedCaseId === c.id
                      ? 'border-[#b39369] bg-[#fdfbf7] shadow-sm'
                      : (isPending || isSolved)
                      ? 'opacity-60 bg-gray-50 border-gray-100 cursor-not-allowed'
                      : 'border-[#ebdcd0]/60 hover:bg-[#fcfaf7]/50 bg-white'
                  }`}
                >
                  <span className="text-xl">{c.clientAvatar}</span>
                  <div className="leading-tight">
                    <h4 className="text-xs font-bold text-[#2b2825]">{c.clientName}</h4>
                    <p className="text-[9px] text-[#8e857b]">{c.clientTitle}</p>
                  </div>
                  {badge}
                </button>
              );
            })}
          </div>
        </div>

        {/* 右側：対話メインスペース */}
        <div className="md:col-span-9">
          {activeCase ? (
            <div className="border border-[#ebdcd0] bg-white rounded-3xl p-6 shadow-sm space-y-6">
              {/* 相談者のプロフィール＆悩み要約 */}
              <div className="flex items-center gap-3 border-b border-[#f4efe8] pb-4">
                <span className="text-2xl p-1.5 bg-[#fdfbf7] rounded-xl border border-[#ebdcd0]/50">{activeCase.clientAvatar}</span>
                <div>
                  <h3 className="text-xs font-bold text-[#2b2825]">ペア: {activeCase.clientName} さん</h3>
                  <p className="text-[9px] text-[#8e857b]">悩み: 「{activeCase.text.substring(0, 45)}...」</p>
                </div>
              </div>

              {/* ワークショップステップ */}
              {step === 0 && (
                <div className="space-y-6 text-center py-8">
                  <div className="flex justify-center text-4xl mb-2">{FACILITATOR.avatar}</div>
                  <div className="max-w-md mx-auto space-y-3">
                    <h4 className="text-sm font-serif font-bold text-[#2b2825]">{FACILITATOR.name}</h4>
                    <p className="text-xs text-[#6e675f] leading-relaxed">
                      {FACILITATOR.greeting}
                    </p>
                  </div>
                  <button
                    onClick={() => setStep(1)}
                    className="px-6 py-3 rounded-2xl text-xs font-bold bg-[#b39369] hover:bg-[#a3835a] text-white transition shadow-sm font-mono tracking-wider"
                  >
                    対話を開始する
                  </button>
                </div>
              )}

              {step === 1 && (
                <div className="space-y-6 text-center py-12">
                  <span className="text-3xl">🃏</span>
                  <div className="space-y-2">
                    <h4 className="text-sm font-bold text-[#2b2825]">対話を始めるためのカードを引きます</h4>
                    <p className="text-xs text-[#8c7e6c]">この美術館では、偶然引かれた1枚のカードを鏡として、参加者同士で対話を行います。</p>
                  </div>
                  <button
                    onClick={handleDrawCard}
                    className="px-6 py-3 rounded-2xl text-xs font-bold bg-[#b39369] hover:bg-[#a3835a] text-white transition shadow-sm font-mono tracking-wider"
                  >
                    カードを引く
                  </button>
                </div>
              )}

              {/* 対話フロー領域 (Step 2 & 3 & 4) */}
              {step >= 2 && drawnCard && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  {/* 左カラム：引かれたカード */}
                  <div className="lg:col-span-5 flex flex-col items-center space-y-3">
                    <div className="relative w-full max-w-[180px] aspect-[1/1.6] rounded-xl overflow-hidden border border-[#ebdcd0] shadow-sm bg-[#faf8f5]">
                      <Image
                        src={drawnCard.imagePath}
                        alt={drawnCard.name}
                        fill
                        sizes="200px"
                        className="object-cover"
                      />
                    </div>
                    <div className="text-center leading-tight">
                      <h4 className="text-xs font-bold text-[#2b2825]">{drawnCard.name} ({drawnCard.symbol})</h4>
                      <p className="text-[9px] text-[#8e857b] font-mono italic">{drawnCard.nameEn}</p>
                    </div>
                  </div>

                  {/* 右カラム：チャット・対話履歴 */}
                  <div className="lg:col-span-7 space-y-4">
                    {/* ファシリテーターの問いかけ1 */}
                    <div className="space-y-3">
                      <div className="flex gap-2 items-start">
                        <span className="text-base p-1 bg-[#f4efe8] rounded-lg">{FACILITATOR.avatar}</span>
                        <div className="bg-[#f4efe8] text-[#2b2825] rounded-2xl px-4 py-2.5 max-w-[85%] text-xs leading-relaxed">
                          <p className="font-bold text-[9px] text-[#8c7e6c] mb-0.5">{FACILITATOR.name}</p>
                          {activeCase.vtsDialogues[drawnCard.id]?.[0]?.question}
                        </div>
                      </div>

                      {/* 相談者の応答1 */}
                      <div className="flex gap-2 items-start justify-end">
                        <div className="bg-[#f0f7f4] text-[#2d6a4f] rounded-2xl px-4 py-2.5 max-w-[85%] text-xs leading-relaxed">
                          <p className="font-bold text-[9px] text-[#2d6a4f]/70 mb-0.5">{activeCase.clientName} さん</p>
                          {activeCase.vtsDialogues[drawnCard.id]?.[0]?.clientResponse}
                        </div>
                        <span className="text-base p-1 bg-[#f0f7f4] rounded-lg">{activeCase.clientAvatar}</span>
                      </div>
                    </div>

                    {/* 対話フェーズ2 */}
                    {step >= 3 && (
                      <div className="space-y-3 pt-2 border-t border-[#f4efe8]">
                        {/* ファシリテーターの問いかけ2 */}
                        <div className="flex gap-2 items-start">
                          <span className="text-base p-1 bg-[#f4efe8] rounded-lg">{FACILITATOR.avatar}</span>
                          <div className="bg-[#f4efe8] text-[#2b2825] rounded-2xl px-4 py-2.5 max-w-[85%] text-xs leading-relaxed">
                            <p className="font-bold text-[9px] text-[#8c7e6c] mb-0.5">{FACILITATOR.name}</p>
                            {activeCase.vtsDialogues[drawnCard.id]?.[1]?.question}
                          </div>
                        </div>

                        {/* 相談者の応答2 */}
                        <div className="flex gap-2 items-start justify-end">
                          <div className="bg-[#f0f7f4] text-[#2d6a4f] rounded-2xl px-4 py-2.5 max-w-[85%] text-xs leading-relaxed">
                            <p className="font-bold text-[9px] text-[#2d6a4f]/70 mb-0.5">{activeCase.clientName} さん</p>
                            {activeCase.vtsDialogues[drawnCard.id]?.[1]?.clientResponse}
                          </div>
                          <span className="text-base p-1 bg-[#f0f7f4] rounded-lg">{activeCase.clientAvatar}</span>
                        </div>
                      </div>
                    )}

                    {/* タイピング状態の表示 */}
                    {isTyping && (
                      <div className="flex gap-2 items-center text-xs text-[#8e857b] italic">
                        <span className="animate-bounce">●</span>
                        <span className="animate-bounce delay-100">●</span>
                        <span className="animate-bounce delay-200">●</span>
                        <span>ファシリテーターが整理しています...</span>
                      </div>
                    )}

                    {/* ボタンコントロール */}
                    {step === 2 && !isTyping && (
                      <div className="flex justify-end pt-2">
                        <button
                          onClick={() => startNextStep(3, 1000)}
                          className="px-4 py-2 rounded-xl text-xs font-bold bg-[#b39369] hover:bg-[#a3835a] text-white transition shadow-sm"
                        >
                          次へ進む
                        </button>
                      </div>
                    )}

                    {/* ハイライト解釈の選択フェーズ */}
                    {step === 3 && !isTyping && (
                      <div className="space-y-4 pt-4 border-t border-[#f4efe8]">
                        <div className="space-y-1">
                          <h5 className="text-[10px] font-bold text-[#8c7e6c] tracking-wider uppercase font-mono">
                            対話のまとめ：このカードから届けるメッセージの選択（複数選択可）
                          </h5>
                          <p className="text-[9px] text-[#8e857b]">
                            相談者が絵の中に見出したものと呼応するシンボル解釈をハイライトし、対話のフィードバックとして届けます。
                          </p>
                        </div>

                        <div className="space-y-2">
                          {drawnCard.symbols.map((sym) => (
                            <button
                              key={sym.id}
                              onClick={() => toggleHighlight(sym.highlightPassage)}
                              className={`w-full text-left p-3 rounded-xl border text-xs leading-relaxed transition ${
                                selectedHighlights.includes(sym.highlightPassage)
                                  ? 'border-[#b39369] bg-[#fdfbf7] font-medium text-[#2b2825]'
                                  : 'border-[#ebdcd0]/40 hover:bg-[#faf8f5]/50 text-[#6e675f]'
                              }`}
                            >
                              <span className="font-bold text-[10px] text-[#b39369] block mb-1">{sym.name} ({sym.location})</span>
                              {sym.highlightPassage}
                            </button>
                          ))}
                        </div>

                        <div className="flex justify-between items-center pt-2">
                          <span className="text-[10px] text-[#8e857b]">選択済み: {selectedHighlights.length} 件</span>
                          <button
                            disabled={selectedHighlights.length === 0}
                            onClick={handleSubmit}
                            className={`px-5 py-2.5 rounded-xl text-xs font-bold text-white transition shadow-sm ${
                              selectedHighlights.length === 0
                                ? 'bg-gray-300 cursor-not-allowed'
                                : 'bg-[#2d6a4f] hover:bg-[#224f3b]'
                            }`}
                          >
                            この言葉を届けて対話を終える
                          </button>
                        </div>
                      </div>
                    )}

                    {/* 完了フェーズ */}
                    {step === 4 && (
                      <div className="bg-[#f0f7f4] border border-[#d8ebd4] rounded-xl p-4 space-y-3 pt-4 border-t border-[#f4efe8]">
                        <h5 className="text-xs font-bold text-[#2d6a4f] flex items-center gap-1.5">
                          <span>✓ メッセージを送付しました</span>
                        </h5>
                        <p className="text-xs text-[#2d6a4f]/90 leading-relaxed">
                          ワークショップセッションお疲れ様でした。あなたが対話の中でハイライトした解釈が、相談者へと届けられました。
                          内省と体験整理には時差があります。活動レポートに変化があるまでしばらく（約30秒）お待ちください。
                        </p>
                        <div className="flex justify-end gap-3 pt-1">
                          <Link
                            href="/consultation"
                            className="px-4 py-2 rounded-xl text-center text-xs font-bold bg-[#2d6a4f] text-white hover:bg-[#224f3b] transition"
                          >
                            活動レポートを確認する
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="border border-dashed border-[#ebdcd0] rounded-3xl p-12 text-center text-xs text-[#8c7e6c] bg-white">
              左側の参加者リストから、今日セッションを行うパートナーを選択してください。
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
