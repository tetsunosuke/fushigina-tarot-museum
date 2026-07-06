'use client';

import React from 'react';
import { TAROT_CARDS } from '@/data/artMuseumData';
import Image from 'next/image';

export default function ExhibitionPage() {
  return (
    <div className="space-y-12 animate-fade-in max-w-5xl mx-auto">
      {/* ページヘッダー */}
      <div className="text-center space-y-2">
        <span className="text-[10px] font-mono tracking-widest text-[#b39369] uppercase font-bold">ONLINE MUSEUM EXHIBITION</span>
        <h2 className="text-3xl font-serif font-bold text-[#2b2825]">オンライン展示室</h2>
        <p className="text-xs text-[#6e675f] max-w-md mx-auto leading-relaxed">
          タロットカードのシンボルが持つ本来の意味や、自己探求・自律的な思考を促すための哲学的解釈を展示しています。
        </p>
        <div className="w-16 h-[1px] bg-[#b39369] mx-auto mt-4"></div>
      </div>

      {/* タロットカードの展示 */}
      <div className="space-y-16">
        {TAROT_CARDS.map((card) => (
          <div key={card.id} className="border border-[#ebdcd0] bg-white rounded-3xl p-6 md:p-8 shadow-sm grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            {/* 左側：画像 */}
            <div className="md:col-span-4 flex flex-col items-center">
              <div className="relative w-full max-w-[240px] aspect-[1/1.6] rounded-2xl overflow-hidden border border-[#ebdcd0] shadow-md bg-[#faf8f5]">
                <Image
                  src={card.imagePath}
                  alt={card.name}
                  fill
                  sizes="(max-w-768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 hover:scale-105"
                  priority
                />
              </div>
              <div className="mt-4 text-center">
                <span className="text-[10px] font-mono text-[#b39369] font-bold tracking-wider">{card.exhibitionNo}</span>
                <h3 className="text-xl font-serif font-bold text-[#2b2825] mt-1">{card.name}</h3>
                <p className="text-xs text-[#8e857b] font-mono italic">{card.nameEn} ({card.symbol})</p>
              </div>
            </div>

            {/* 右側：解説・シンボル */}
            <div className="md:col-span-8 space-y-6">
              <div>
                <h4 className="text-xs font-mono font-bold tracking-wider text-[#8c7e6c] uppercase border-b border-[#ebdcd0] pb-1 mb-2">キャプション</h4>
                <p className="text-xs text-[#4a453f] leading-relaxed italic">
                  {card.caption}
                </p>
              </div>

              <div className="space-y-4">
                <h4 className="text-xs font-mono font-bold tracking-wider text-[#8c7e6c] uppercase border-b border-[#ebdcd0] pb-1">主要なシンボルと哲学的解釈</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {card.symbols.map((sym) => (
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
        ))}
      </div>
    </div>
  );
}
