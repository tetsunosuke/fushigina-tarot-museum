'use client';

import React, { useState } from 'react';
import { TAROT_CARDS } from '@/data/artMuseumData';
import Image from 'next/image';

type Category = 'all' | 'major' | 'wands' | 'cups' | 'swords' | 'pentacles';

export default function ExhibitionPage() {
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');
  const [selectedCardId, setSelectedCardId] = useState<string>('magician');

  // カテゴリに応じたフィルタリング
  const filteredCards = TAROT_CARDS.filter(card => {
    if (selectedCategory === 'all') return true;
    if (selectedCategory === 'major') {
      const num = parseInt(card.symbol);
      return !isNaN(num) || ['0','I','II','III','IV','V','VI','VII','VIII','IX','X','XI','XII','XIII','XIV','XV','XVI','XVII','XVIII','XIX','XX','XXI'].includes(card.symbol);
    }
    return card.id.startsWith(selectedCategory.slice(0, -1)); // wands -> wand, cups -> cup etc.
  });

  const selectedCard = TAROT_CARDS.find(c => c.id === selectedCardId) || TAROT_CARDS[0];

  const categories: { key: Category; label: string }[] = [
    { key: 'all', label: 'すべて' },
    { key: 'major', label: '大アルカナ' },
    { key: 'wands', label: 'ワンド' },
    { key: 'cups', label: 'カップ' },
    { key: 'swords', label: 'ソード' },
    { key: 'pentacles', label: 'ペンタクル' },
  ];

  return (
    <div className="space-y-8 animate-fade-in max-w-6xl mx-auto">
      {/* ページヘッダー */}
      <div className="text-center space-y-2">
        <span className="text-[10px] font-mono tracking-widest text-[#b39369] uppercase font-bold">ONLINE MUSEUM ARCHIVE</span>
        <h2 className="text-3xl font-serif font-bold text-[#2b2825]">オンライン展示室</h2>
        <p className="text-xs text-[#6e675f] max-w-md mx-auto leading-relaxed">
          全78枚のタロットアーカイブ。それぞれのシンボルが持つ本来の意味や、自己探求を促す哲学的解釈を鑑賞いただけます。
        </p>
        <div className="w-16 h-[1px] bg-[#b39369] mx-auto mt-4"></div>
      </div>

      {/* カテゴリフィルタータブ */}
      <div className="flex flex-wrap justify-center gap-1.5 border-b border-[#ebdcd0]/60 pb-3">
        {categories.map(cat => (
          <button
            key={cat.key}
            onClick={() => {
              setSelectedCategory(cat.key);
              // フィルタリングされた最初のカードを自動選択
              const firstFiltered = TAROT_CARDS.find(card => {
                if (cat.key === 'all') return true;
                if (cat.key === 'major') {
                  const num = parseInt(card.symbol);
                  return !isNaN(num) || ['0','I','II','III','IV','V','VI','VII','VIII','IX','X','XI','XII','XIII','XIV','XV','XVI','XVII','XVIII','XIX','XX','XXI'].includes(card.symbol);
                }
                return card.id.startsWith(cat.key.slice(0, -1));
              });
              if (firstFiltered) setSelectedCardId(firstFiltered.id);
            }}
            className={`px-3 py-1.5 rounded-xl text-xs transition-all ${
              selectedCategory === cat.key
                ? 'bg-[#b39369] text-white shadow-sm font-bold'
                : 'text-[#6e675f] hover:text-[#2b2825] hover:bg-[#f2eee6]'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* アーカイブ・ブラウザレイアウト */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* 左側：カードリスト (スクロール領域) */}
        <div className="lg:col-span-4 border border-[#ebdcd0] rounded-2xl bg-white p-4 max-h-[600px] overflow-y-auto space-y-1.5 shadow-sm scrollbar-thin">
          <p className="text-[10px] font-mono tracking-wider text-[#8c7e6c] uppercase border-b border-[#ebdcd0] pb-1.5 mb-2">作品リスト ({filteredCards.length})</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-1 gap-1.5">
            {filteredCards.map(card => {
              const isSelected = selectedCardId === card.id;
              const hasRealImage = card.imagePath !== '/tarot/back.jpg';
              return (
                <button
                  key={card.id}
                  onClick={() => setSelectedCardId(card.id)}
                  className={`text-left px-3 py-2.5 rounded-xl border text-xs transition-all flex items-center gap-2.5 ${
                    isSelected
                      ? 'border-[#b39369] bg-[#fdfbf7] font-bold text-[#2b2825]'
                      : 'border-[#ebdcd0]/40 hover:bg-[#fcfaf7] text-[#6e675f] bg-white'
                  }`}
                >
                  <span className={`w-5 h-7 rounded flex items-center justify-center text-[9px] font-mono shrink-0 border ${
                    isSelected ? 'bg-[#b39369] text-white border-[#b39369]' : 'bg-[#f4efe8] text-[#8c7e6c] border-[#ebdcd0]/60'
                  }`}>
                    {card.symbol}
                  </span>
                  <div className="leading-tight truncate">
                    <span className="block truncate">{card.name}</span>
                    <span className="text-[9px] text-[#8e857b] font-mono block truncate">{card.nameEn}</span>
                  </div>
                  {hasRealImage && <span className="ml-auto text-[9px] bg-emerald-50 text-emerald-700 px-1 rounded border border-emerald-200 shrink-0 font-mono">Real</span>}
                </button>
              );
            })}
          </div>
        </div>

        {/* 右側：選択されたカードの詳細展示 */}
        <div className="lg:col-span-8 border border-[#ebdcd0] bg-white rounded-3xl p-6 md:p-8 shadow-sm grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* 詳細 - 左カラム: ビジュアル展示 */}
          <div className="md:col-span-5 flex flex-col items-center">
            {selectedCard.imagePath !== '/tarot/back.jpg' ? (
              <div className="relative w-full max-w-[240px] aspect-[1/1.6] rounded-2xl overflow-hidden border border-[#ebdcd0] shadow-md bg-[#faf8f5]">
                <Image
                  src={selectedCard.imagePath}
                  alt={selectedCard.name}
                  fill
                  sizes="(max-w-768px) 100vw, 250px"
                  className="object-cover transition-transform duration-700 hover:scale-105"
                  priority
                />
              </div>
            ) : (
              // 実画像がない場合の、CSSによる神秘的なタロット裏面デザイン
              <div className="w-full max-w-[240px] aspect-[1/1.6] rounded-2xl border-4 border-[#b39369] bg-[#2b2825] p-3 shadow-md flex flex-col justify-between relative overflow-hidden group select-none">
                {/* 幾何学的装飾ライン */}
                <div className="absolute inset-2 border border-[#b39369]/30 rounded-xl pointer-events-none"></div>
                <div className="absolute inset-0 bg-[radial-gradient(#b39369_1px,transparent_1px)] [background-size:16px_16px] opacity-10"></div>
                
                <div className="text-[9px] font-mono text-[#b39369]/60 tracking-widest text-center">SOPHIA MUSEUM</div>
                <div className="flex-1 flex flex-col items-center justify-center text-center space-y-2">
                  <div className="w-12 h-12 rounded-full border border-[#b39369]/40 flex items-center justify-center text-xl text-[#b39369] bg-[#2b2825] shadow-inner group-hover:rotate-45 transition-transform duration-1000">
                    ✦
                  </div>
                  <span className="text-[10px] font-mono text-[#b39369] tracking-widest">{selectedCard.symbol}</span>
                </div>
                <div className="text-[8px] font-mono text-[#b39369]/60 tracking-wider text-center font-bold">TAROT ARCHIVE</div>
              </div>
            )}
            <div className="mt-4 text-center">
              <span className="text-[10px] font-mono text-[#b39369] font-bold tracking-wider">{selectedCard.exhibitionNo}</span>
              <h3 className="text-xl font-serif font-bold text-[#2b2825] mt-1">{selectedCard.name}</h3>
              <p className="text-xs text-[#8e857b] font-mono italic">{selectedCard.nameEn} ({selectedCard.symbol})</p>
              <p className="text-[9px] text-[#b39369] mt-2 font-mono">収蔵年: {selectedCard.acquisitionYear}年</p>
            </div>
          </div>

          {/* 詳細 - 右カラム: テキスト解説 */}
          <div className="md:col-span-7 space-y-6">
            <div>
              <h4 className="text-xs font-mono font-bold tracking-wider text-[#8c7e6c] uppercase border-b border-[#ebdcd0] pb-1 mb-2">キャプション</h4>
              <p className="text-xs text-[#4a453f] leading-relaxed italic font-serif">
                {selectedCard.caption}
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="text-xs font-mono font-bold tracking-wider text-[#8c7e6c] uppercase border-b border-[#ebdcd0] pb-1">主要なシンボルと哲学的解釈</h4>
              <div className="space-y-3">
                {selectedCard.symbols.map((sym) => (
                  <div key={sym.id} className="bg-[#fcfaf7] border border-[#ebdcd0]/40 rounded-xl p-3.5 space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="text-[11px] font-bold text-[#2b2825]">{sym.name}</span>
                      <span className="text-[8px] font-mono px-1.5 py-0.5 rounded bg-[#f4efe8] text-[#8c7e6c]">{sym.location}</span>
                    </div>
                    <p className="text-[10px] text-[#6e675f] leading-relaxed">
                      {sym.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
