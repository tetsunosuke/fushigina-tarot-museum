'use client';

import React, { useState } from 'react';
import { useGameState } from '../context';
import { TAROT_CARDS } from '@/data/artMuseumData';
import Link from 'next/link';

export default function DirectorRoomPage() {
  const { isAllSolved, playerChosenCard, setPlayerChosenCard, resetGame } = useGameState();
  const [revealChoice, setRevealChoice] = useState(false);

  if (!isAllSolved) {
    return (
      <div className="max-w-xl mx-auto py-12 text-center space-y-4">
        <h2 className="text-xl font-serif text-[#2b2825]">アクセス制限</h2>
        <p className="text-stone-500 text-sm">
          この区画は、すべての相談事例に対するキュレーションが完了し、ワークショップが終了した時点で解放されます。
        </p>
        <Link href="/consultation" className="inline-block text-xs px-4 py-2 rounded-xl bg-[#b39369] text-white font-bold transition">
          お悩み受付へ戻る
        </Link>
      </div>
    );
  }

  const handleCardChoose = (cardName: string) => {
    setPlayerChosenCard(cardName);
    setRevealChoice(true);
  };

  return (
    <div className="max-w-xl mx-auto py-6 space-y-8 animate-fade-in">
      <div className="text-center space-y-2">
        <div className="inline-block px-3 py-1 rounded bg-[#b39369]/10 text-[#b39369] font-serif text-[10px] tracking-widest font-bold">
          DIRECTOR&apos;S PRIVATE ROOM
        </div>
        <h2 className="text-3xl font-serif font-bold text-[#2b2825]">
          館長の書斎
        </h2>
        <p className="text-[11px] text-[#6e675f]">
          すべてのワークショップを修了したキュレーターに宛てたメッセージ。
        </p>
      </div>

      {!revealChoice ? (
        <div className="space-y-6">
          {/* 前館長からの手紙 */}
          <div className="museum-panel rounded-2xl p-6 bg-white border border-[#eae5db] space-y-4">
            <h3 className="text-base font-bold font-serif text-[#2b2825] border-b border-[#eae5db] pb-2">
              客員キュレーターとなったあなたへ
            </h3>
            <div className="text-xs text-[#6e675f] leading-relaxed space-y-3 font-serif">
              <p>
                おめでとうございます。すべての相談者が、あなたが提示したタロット本来のシンボル解釈を通じて、他者に選択を委ねる依存状態から『自律』へと歩み出しました。彼らはもう、AI占いの決定論的な言葉に流されることはありません。
              </p>
              <p>
                現代の社会は、失敗を過度に恐れるあまり、選択そのものをアルゴリズムや外部の「誰か」へと外部化しがちです。しかし、占いは未来の拘束衣ではなく、自分自身と深く対話し、意思決定を行うための道具でなければなりません。この美術館の目的は、タロットを示すことではなく、人が自らの意思で生きる勇気を取り戻すための場所を遺すことでした。
              </p>
              <p>
                そして、最後に一つの問いがあります。
                他者を導いてくれたあなた自身は、これからの自分自身の未来を、どの意志で紡いでいきますか？
              </p>
              <p className="pt-2 text-right text-[#b39369] font-bold">
                前館長 ── アーサー・D
              </p>
            </div>
          </div>

          {/* プレイヤーの自律のカード選択 */}
          <div className="space-y-4">
            <span className="text-xs font-bold text-[#2b2825] block text-center">
              【最後の問い】あなた自身の未来を決めるため、最後のカードを選択してください。
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {TAROT_CARDS.map((card) => (
                <button
                  key={card.id}
                  onClick={() => handleCardChoose(card.name)}
                  className="p-5 rounded-2xl border border-[#eae5db] bg-white hover:border-[#b39369] transition-all text-center flex flex-col items-center justify-center gap-2 group cursor-pointer shadow-sm"
                >
                  <span className="text-xl font-mono text-[#b39369] font-bold group-hover:scale-105 transition-transform">{card.symbol}</span>
                  <span className="text-xs font-bold text-[#2b2825] font-serif">{card.name}</span>
                  <span className="text-[9px] text-[#6e675f]">{card.nameEn}の意志</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* エンディング画面 */
        <div className="museum-panel rounded-3xl p-8 bg-white border border-[#eae5db] text-center space-y-6 animate-fade-in">
          <div className="w-16 h-16 rounded-full bg-[#f0f7f4] border border-[#d8ebd4] text-[#2d6a4f] flex items-center justify-center text-3xl mx-auto shadow-sm">
            ✨
          </div>
          
          <div className="space-y-3">
            <h3 className="text-xl font-bold font-serif text-[#2b2825]">
              キュレーターからの卒業
            </h3>
            <p className="text-xs text-[#6e675f] max-w-md mx-auto leading-relaxed">
              あなたは「{playerChosenCard}」のカードを、自分自身の未来として選択しました。
              誰かに委ねるのではなく、自らの内なる声と自己の価値観に従い、能動的にこれからの人生を選択していく覚悟が、あなたの自律を完成させます。
            </p>
            <p className="text-xs text-[#2b2825] font-bold">
              これで「デジタル・タロット美術館 SOPHIA」のワークショップはすべて完了です。
            </p>
          </div>

          <div className="p-4 bg-[#faf8f5] rounded-xl border border-[#eae5db] text-[11px] text-[#6e675f] font-serif leading-relaxed max-w-sm mx-auto">
            『あなたの引いたカードは、運命の終わりではなく、あなた自身の自由な人生への招待状です。』
          </div>

          <div className="pt-4 flex flex-col sm:flex-row justify-center gap-2">
            <button
              onClick={resetGame}
              className="px-6 py-2.5 rounded-xl font-bold bg-[#b39369] text-white hover:bg-[#a3835a] text-xs transition shadow-sm"
            >
              もう一度ワークショップを始める
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
