'use client';

import React, { useState } from 'react';
import { TAROT_CARDS, TarotCard } from '@/data/artMuseumData';
import Image from 'next/image';
import dynamic from 'next/dynamic';

// SSRエラーを防止するため、3Dビューワはクライアントサイドでのみ遅延ロードする
const GalleryViewer = dynamic(() => import('./GalleryViewer'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[500px] md:h-[600px] rounded-3xl bg-[#121110] border border-[#ebdcd0] flex flex-col items-center justify-center gap-3">
      <div className="w-6 h-6 border-2 border-[#b39369] border-t-transparent rounded-full animate-spin"></div>
      <span className="text-[10px] text-[#8e857b] font-mono tracking-widest">3D空間を構築中...</span>
    </div>
  ),
});

type ViewMode = '3d' | 'archive';
type Category = 'all' | 'major' | 'wands' | 'cups' | 'swords' | 'pentacles';

export default function ExhibitionPage() {
  const [viewMode, setViewMode] = useState<ViewMode>('3d');
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');
  const [selectedCardId, setSelectedCardId] = useState<string>('magician');
  const [isMobileModalOpen, setIsMobileModalOpen] = useState<boolean>(false);
  
  // 3D展示室用の選択中の部屋ステート ('lobby' | 'major' | 'wands' | 'cups' | 'swords' | 'pentacles')
  const [selected3DRoom, setSelected3DRoom] = useState<string>('lobby');

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

  const handleSelectCardFrom3D = (card: TarotCard) => {
    setSelectedCardId(card.id);
    setIsMobileModalOpen(true); // モバイル・レスポンシブ用にモーダルもトリガー
  };

  const categories: { key: Category; label: string }[] = [
    { key: 'all', label: 'すべて' },
    { key: 'major', label: '大アルカナ' },
    { key: 'wands', label: 'ワンド' },
    { key: 'cups', label: 'カップ' },
    { key: 'swords', label: 'ソード' },
    { key: 'pentacles', label: 'ペンタクル' },
  ];

  return (
    <div className="space-y-8 animate-fade-in max-w-7xl mx-auto">
      {/* ページヘッダー */}
      <div className="text-center space-y-2">
        <span className="text-[10px] font-mono tracking-widest text-[#b39369] uppercase font-bold">ONLINE MUSEUM ARCHIVE</span>
        <h2 className="text-3xl font-serif font-bold text-[#2b2825]">オンライン展示室</h2>
        <p className="text-xs text-[#6e675f] max-w-md mx-auto leading-relaxed">
          タロットアーカイブ。それぞれのシンボルが持つ本来の意味や、自己探求を促す哲学的解釈を鑑賞いただけます。
        </p>
        <div className="w-16 h-[1px] bg-[#b39369] mx-auto mt-4"></div>
      </div>

      {/* 表示モード切り替えスイッチ */}
      <div className="flex justify-center">
        <div className="inline-flex rounded-xl bg-[#f4efe8] p-1 border border-[#ebdcd0]/40">
          <button
            onClick={() => setViewMode('3d')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
              viewMode === '3d' ? 'bg-[#b39369] text-white shadow-sm' : 'text-[#6e675f] hover:text-[#2b2825]'
            }`}
          >
            🏛️ 3D展示室を歩く
          </button>
          <button
            onClick={() => setViewMode('archive')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
              viewMode === 'archive' ? 'bg-[#b39369] text-white shadow-sm' : 'text-[#6e675f] hover:text-[#2b2825]'
            }`}
          >
            📖 平面図録で見る
          </button>
        </div>
      </div>

      {/* 3D展示室ビュー */}
      {viewMode === '3d' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* 左側：Babylon.js製 3Dギャラリー */}
          <div className="lg:col-span-8 space-y-3">
            <GalleryViewer
              onSelectCard={handleSelectCardFrom3D}
              selectedRoom={selected3DRoom}
              onChangeRoom={(room) => setSelected3DRoom(room)}
            />
            
            <div className="bg-[#fcfaf7] border border-[#ebdcd0]/60 px-4 py-3 rounded-2xl text-[10px] text-[#6e675f] flex flex-col sm:flex-row justify-between items-center gap-2 shadow-inner">
              <span>🎮 <strong>操作:</strong> 左右矢印キー(またはA/Dキー) ＆ マウス・スマホドラッグで「左右の視点回転（首振り）」</span>
              <span className="text-[#8c6239] font-bold">🏛️ 中央の定位置から、周囲360度の壁面に並ぶカードを見渡せます</span>
            </div>
          </div>

          {/* 右側（PC用デスクトップ表示）：選択したカードの解説パネル */}
          <div className="hidden lg:block lg:col-span-4 border border-[#ebdcd0] bg-white rounded-3xl p-6 shadow-sm space-y-6">
            <div className="text-center space-y-2">
              <span className="text-[10px] font-mono text-[#b39369] font-bold tracking-wider">{selectedCard.exhibitionNo}</span>
              <div className="relative w-32 aspect-[1/1.6] mx-auto rounded-xl overflow-hidden border border-[#ebdcd0] shadow bg-[#faf8f5]">
                <Image
                  src={selectedCard.imagePath}
                  alt={selectedCard.name}
                  fill
                  sizes="130px"
                  className="object-cover"
                />
              </div>
              <h3 className="text-lg font-serif font-bold text-[#2b2825] mt-1">{selectedCard.name}</h3>
              <p className="text-xs text-[#8e857b] font-mono italic">{selectedCard.nameEn} ({selectedCard.symbol})</p>
            </div>

            <div className="border-t border-[#ebdcd0]/60 pt-4 space-y-4">
              <div>
                <h5 className="text-[10px] font-mono font-bold tracking-wider text-[#8c7e6c] uppercase mb-1.5">キャプション</h5>
                <p className="text-[11px] text-[#4a453f] leading-relaxed italic font-serif">
                  {selectedCard.caption}
                </p>
              </div>

              <div>
                <h5 className="text-[10px] font-mono font-bold tracking-wider text-[#8c7e6c] uppercase mb-2">主要なシンボルと哲学的解釈</h5>
                <div className="space-y-2.5 max-h-[220px] overflow-y-auto pr-1">
                  {selectedCard.symbols.map(sym => (
                    <div key={sym.id} className="bg-[#fcfaf7] border border-[#ebdcd0]/40 rounded-xl p-3 space-y-1">
                      <div className="flex justify-between items-center text-[10px]">
                        <span className="font-bold text-[#2b2825]">{sym.name}</span>
                        <span className="text-[8px] font-mono px-1 rounded bg-[#f4efe8] text-[#8c7e6c]">{sym.location}</span>
                      </div>
                      <p className="text-[9px] text-[#6e675f] leading-relaxed">
                        {sym.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* モバイル/タブレット用前面ポップアップモーダル */}
          {isMobileModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm lg:hidden animate-fade-in">
              <div className="bg-white w-full max-w-md rounded-3xl border border-[#ebdcd0] p-6 shadow-2xl space-y-5 relative max-h-[90vh] overflow-y-auto">
                <button
                  onClick={() => setIsMobileModalOpen(false)}
                  className="absolute top-4 right-4 text-[#8e857b] hover:text-[#2b2825] text-lg font-bold w-8 h-8 rounded-full bg-[#f4efe8] flex items-center justify-center"
                >
                  ✕
                </button>
                <div className="text-center space-y-2 pt-2">
                  <span className="text-[10px] font-mono text-[#b39369] font-bold tracking-wider">{selectedCard.exhibitionNo}</span>
                  <div className="relative w-28 aspect-[1/1.6] mx-auto rounded-xl overflow-hidden border border-[#ebdcd0] shadow">
                    <Image
                      src={selectedCard.imagePath}
                      alt={selectedCard.name}
                      fill
                      sizes="110px"
                      className="object-cover"
                    />
                  </div>
                  <h3 className="text-lg font-serif font-bold text-[#2b2825] mt-1">{selectedCard.name}</h3>
                  <p className="text-xs text-[#8e857b] font-mono italic">{selectedCard.nameEn} ({selectedCard.symbol})</p>
                </div>

                <div className="border-t border-[#ebdcd0]/60 pt-4 space-y-4 text-left">
                  <div>
                    <h5 className="text-[10px] font-mono font-bold tracking-wider text-[#8c7e6c] uppercase mb-1">キャプション</h5>
                    <p className="text-[11px] text-[#4a453f] leading-relaxed italic font-serif">
                      {selectedCard.caption}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h5 className="text-[10px] font-mono font-bold tracking-wider text-[#8c7e6c] uppercase mb-1">主要なシンボルと解釈</h5>
                    <div className="space-y-2 max-h-[160px] overflow-y-auto pr-1">
                      {selectedCard.symbols.map(sym => (
                        <div key={sym.id} className="bg-[#fcfaf7] border border-[#ebdcd0]/40 rounded-xl p-3 space-y-1">
                          <div className="flex justify-between items-center text-[10px]">
                            <span className="font-bold text-[#2b2825]">{sym.name}</span>
                            <span className="text-[8px] font-mono px-1 rounded bg-[#f4efe8] text-[#8c7e6c]">{sym.location}</span>
                          </div>
                          <p className="text-[9px] text-[#6e675f] leading-relaxed">
                            {sym.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 平面図録ビュー（既存のアーカイブブラウザレイアウト） */}
      {viewMode === 'archive' && (
        <div className="space-y-6">
          {/* カテゴリフィルタータブ */}
          <div className="flex flex-wrap justify-center gap-1.5 border-b border-[#ebdcd0]/60 pb-3">
            {categories.map(cat => (
              <button
                key={cat.key}
                onClick={() => {
                  setSelectedCategory(cat.key);
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

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* 左側：カードリスト */}
            <div className="lg:col-span-4 border border-[#ebdcd0] rounded-2xl bg-white p-4 max-h-[600px] overflow-y-auto space-y-1.5 shadow-sm scrollbar-thin">
              <p className="text-[10px] font-mono tracking-wider text-[#8c7e6c] uppercase border-b border-[#ebdcd0] pb-1.5 mb-2">作品リスト ({filteredCards.length})</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-1 gap-1.5">
                {filteredCards.map(card => (
                  <button
                    key={card.id}
                    onClick={() => setSelectedCardId(card.id)}
                    className={`text-left px-3 py-2.5 rounded-xl border text-xs transition-all flex items-center gap-2.5 ${
                      selectedCardId === card.id
                        ? 'border-[#b39369] bg-[#fdfbf7] font-bold text-[#2b2825]'
                        : 'border-[#ebdcd0]/40 hover:bg-[#fcfaf7] text-[#6e675f] bg-white'
                    }`}
                  >
                    <span className={`w-5 h-7 rounded flex items-center justify-center text-[9px] font-mono shrink-0 border ${
                      selectedCardId === card.id ? 'bg-[#b39369] text-white border-[#b39369]' : 'bg-[#f4efe8] text-[#8c7e6c] border-[#ebdcd0]/60'
                    }`}>
                      {card.symbol}
                    </span>
                    <div className="leading-tight truncate">
                      <span className="block truncate">{card.name}</span>
                      <span className="text-[9px] text-[#8e857b] font-mono block truncate">{card.nameEn}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* 右側：カードの詳細展示 */}
            <div className="lg:col-span-8 border border-[#ebdcd0] bg-white rounded-3xl p-6 md:p-8 shadow-sm grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
              <div className="md:col-span-5 flex flex-col items-center">
                <div className="relative w-full max-w-[240px] aspect-[1/1.6] rounded-2xl overflow-hidden border border-[#ebdcd0] shadow-md bg-[#faf8f5]">
                  <Image
                    src={selectedCard.imagePath}
                    alt={selectedCard.name}
                    fill
                    sizes="(max-w-768px) 100vw, 250px"
                    className="object-cover"
                    priority
                  />
                </div>
                <div className="mt-4 text-center">
                  <span className="text-[10px] font-mono text-[#b39369] font-bold tracking-wider">{selectedCard.exhibitionNo}</span>
                  <h3 className="text-xl font-serif font-bold text-[#2b2825] mt-1">{selectedCard.name}</h3>
                  <p className="text-xs text-[#8e857b] font-mono italic">{selectedCard.nameEn} ({selectedCard.symbol})</p>
                  <p className="text-[9px] text-[#b39369] mt-2 font-mono">収蔵年: {selectedCard.acquisitionYear}年</p>
                </div>
              </div>

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
                    {selectedCard.symbols.map(sym => (
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
      )}
    </div>
  );
}
