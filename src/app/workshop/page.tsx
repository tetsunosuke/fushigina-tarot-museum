'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useGameState } from '../context';
import { TAROT_CARDS, FACILITATOR, TarotCard } from '@/data/artMuseumData';
import Image from 'next/image';

interface ChatMsg {
  sender: 'facilitator' | 'client' | 'player' | 'system';
  name: string;
  avatar: string;
  text: string;
  align: 'left' | 'right' | 'center';
}

export default function WorkshopPage() {
  const { consultations, sendCurationHighlights, pendingCases, completedCases } = useGameState();
  const [selectedCaseId, setSelectedCaseId] = useState<string | null>(null);
  
  // ワークショップ内の対話進行状態
  const [step, setStep] = useState<number>(0); // 0:挨拶のみ, 1:ドロー待ち, 2:第一対話ターン, 3:第二対話ターン/ハイライト選択, 4:完了
  const [drawnCard, setDrawnCard] = useState<TarotCard | null>(null);
  const [selectedHighlights, setSelectedHighlights] = useState<string[]>([]);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [typingText, setTypingText] = useState<string>('');
  
  const chatEndRef = useRef<HTMLDivElement>(null);
  const activeCase = consultations.find(c => c.id === selectedCaseId);

  // 相談者を切り替えたら状態をリセット
  useEffect(() => {
    setStep(0);
    setDrawnCard(null);
    setSelectedHighlights([]);
    setIsTyping(false);
  }, [selectedCaseId]);

  // チャットログが更新されたら自動スクロール
  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // 進行ステップの変化時やタイピング終了時に自動スクロール
  useEffect(() => {
    scrollToBottom();
  }, [step, isTyping, selectedCaseId]);

  // VTSの進行用ディレイ演出
  const startNextStep = (nextStep: number, delay = 2000, typingMsg = '対話が進行中...') => {
    setTypingText(typingMsg);
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setStep(nextStep);
    }, delay);
  };

  // カードを引く
  const handleDrawCard = () => {
    if (!activeCase) return;
    const availableCardIds = Object.keys(activeCase.vtsDialogues);
    if (availableCardIds.length === 0) return;
    
    const randomCardId = availableCardIds[Math.floor(Math.random() * availableCardIds.length)];
    const card = TAROT_CARDS.find(c => c.id === randomCardId);
    if (card) {
      setDrawnCard(card);
      startNextStep(2, 2200, `${activeCase.clientName}さんがカードを見つめています...`);
    }
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

  // pending状態の相談者が解決するまでの残り時間 (秒) を管理
  const [timeLeft, setTimeLeft] = useState<number>(0);
  useEffect(() => {
    if (!activeCase || activeCase.status !== 'pending' || !activeCase.resolveAt) {
      setTimeLeft(0);
      return;
    }
    const updateTimer = () => {
      const remaining = Math.max(0, Math.floor((activeCase.resolveAt! - Date.now()) / 1000));
      setTimeLeft(remaining);
    };
    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [activeCase, activeCase?.status, activeCase?.resolveAt]);

  // ------------------------------------------------------------
  // チャットログの動的組み立て
  // ------------------------------------------------------------
  const chatMessages: ChatMsg[] = [];
  
  if (activeCase) {
    // 1. ファシリテーターの挨拶
    chatMessages.push({
      sender: 'facilitator',
      name: FACILITATOR.name,
      avatar: FACILITATOR.avatar,
      text: FACILITATOR.greeting,
      align: 'left'
    });

    if (step >= 1 || activeCase.status !== 'unresolved') {
      // 2. ファシリテーター「カードを引いてみましょう」
      chatMessages.push({
        sender: 'facilitator',
        name: FACILITATOR.name,
        avatar: FACILITATOR.avatar,
        text: "では、本日の対話の鏡となるカードを1枚引いてみましょう。正解はありません。偶然選ばれた絵を前にして、何を感じるかをお互いに話していきます。",
        align: 'left'
      });
    }

    const cardId = activeCase.status !== 'unresolved' ? activeCase.sentCardId : (drawnCard?.id);
    const card = TAROT_CARDS.find(c => c.id === cardId);

    if (card) {
      // 3. システムメッセージ: カードドロー
      chatMessages.push({
        sender: 'system',
        name: "SYSTEM",
        avatar: "⚙️",
        text: `『${card.name} (${card.symbol})』のカードがドローされました。`,
        align: 'center'
      });

      const dialogues = activeCase.vtsDialogues[card.id] || [];

      // 4. 第一の対話ターン
      if (dialogues.length > 0 && (step >= 2 || activeCase.status !== 'unresolved')) {
        chatMessages.push({
          sender: 'facilitator',
          name: FACILITATOR.name,
          avatar: FACILITATOR.avatar,
          text: dialogues[0].question,
          align: 'left'
        });
        chatMessages.push({
          sender: 'client',
          name: activeCase.clientName,
          avatar: activeCase.clientAvatar,
          text: dialogues[0].clientResponse,
          align: 'right'
        });
      }

      // 5. 第二の対話ターン
      if (dialogues.length > 1 && (step >= 3 || activeCase.status !== 'unresolved')) {
        chatMessages.push({
          sender: 'facilitator',
          name: FACILITATOR.name,
          avatar: FACILITATOR.avatar,
          text: dialogues[1].question,
          align: 'left'
        });
        chatMessages.push({
          sender: 'client',
          name: activeCase.clientName,
          avatar: activeCase.clientAvatar,
          text: dialogues[1].clientResponse,
          align: 'right'
        });
      }

      // 6. 第三の対話ターン（もし存在すれば）
      if (dialogues.length > 2 && (step >= 3 || activeCase.status !== 'unresolved')) {
        chatMessages.push({
          sender: 'facilitator',
          name: FACILITATOR.name,
          avatar: FACILITATOR.avatar,
          text: dialogues[2].question,
          align: 'left'
        });
        chatMessages.push({
          sender: 'client',
          name: activeCase.clientName,
          avatar: activeCase.clientAvatar,
          text: dialogues[2].clientResponse,
          align: 'right'
        });
      }

      // 7. ファシリテーターからメッセージ送信を求める声がけ
      if (step >= 3 || activeCase.status !== 'unresolved') {
        chatMessages.push({
          sender: 'facilitator',
          name: FACILITATOR.name,
          avatar: FACILITATOR.avatar,
          text: `プレイヤーさん、この『${card.name}』のシンボル解釈の中で、${activeCase.clientName}さんの対話を深め、自律へのヒントとなりそうな一節を選択して届けていただけますか？`,
          align: 'left'
        });
      }

      // 8. 送信したアドバイス（ハイライト）のログ
      const highlights = activeCase.status !== 'unresolved' ? activeCase.sentHighlights : [];
      if (highlights && highlights.length > 0) {
        chatMessages.push({
          sender: 'player',
          name: "あなた",
          avatar: "👤",
          text: `（以下のシンボル解釈を選択して送信しました）\n\n` + highlights.map(h => `・${h}`).join('\n'),
          align: 'right'
        });

        chatMessages.push({
          sender: 'facilitator',
          name: FACILITATOR.name,
          avatar: FACILITATOR.avatar,
          text: `プレイヤーさんからメッセージが届きました。${activeCase.clientName}さん、こちらのシンボル解釈について、ご自身ではどのように感じられますか？`,
          align: 'left'
        });

        chatMessages.push({
          sender: 'client',
          name: activeCase.clientName,
          avatar: activeCase.clientAvatar,
          text: "ありがとうございます。いただいた言葉をしっかりと読み込んで、自分自身の心と対話してみますね。",
          align: 'right'
        });
      }

      // 9. 解決（気づき）のチャットログ
      if (activeCase.status === 'solved') {
        const report = activeCase.resolutionReports[card.id];
        if (report) {
          chatMessages.push({
            sender: 'client',
            name: activeCase.clientName,
            avatar: activeCase.clientAvatar,
            text: `少し一人で考えてみました。\n\n${report}`,
            align: 'right'
          });

          chatMessages.push({
            sender: 'facilitator',
            name: FACILITATOR.name,
            avatar: FACILITATOR.avatar,
            text: `${activeCase.clientName}さん、素晴らしい気づきですね。偶然引いたカードを鏡として、自分自身の中にある「自律の力」に目覚められたようです。あなたのこれからの自立した選択を心より応援しています。`,
            align: 'left'
          });

          chatMessages.push({
            sender: 'system',
            name: "SYSTEM",
            avatar: "⚙️",
            text: `✓ ${activeCase.clientName}さんとの対話セッションが完了し、自律への気付きが解放されました。`,
            align: 'center'
          });
        }
      }
    }
  }

  return (
    <div className="space-y-8 animate-fade-in max-w-5xl mx-auto">
      {/* ページヘッダー */}
      <div className="text-center space-y-2">
        <span className="text-xs font-mono tracking-widest text-[#b39369] uppercase font-bold">DIALOGUE WORKSHOP ROOM</span>
        <h2 className="text-3xl font-serif font-bold text-[#2b2825]">対話型ワークショップの部屋</h2>
        <p className="text-sm text-[#6e675f] max-w-lg mx-auto leading-relaxed">
          ファシリテーターの進行に沿って、相談者とタロットカードを見つめ、内省を深めるための対話劇を行います。
        </p>
        <div className="w-16 h-[1px] bg-[#b39369] mx-auto mt-4"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* 左側：ペアを組む参加者を選択 */}
        <div className="lg:col-span-3 space-y-4">
          <p className="text-xs font-mono tracking-wider text-[#6e675f] uppercase border-b border-[#ebdcd0] pb-1.5 font-bold">参加者リスト</p>
          <div className="space-y-2.5">
            {consultations.map(c => {
              const isPending = pendingCases.some(p => p.caseId === c.id);
              const isSolved = completedCases.includes(c.id);
              
              let badge = null;
              if (isPending) badge = <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded-md ml-auto">内省中...</span>;
              else if (isSolved) badge = <span className="text-[10px] bg-green-100 text-green-800 font-bold px-2 py-0.5 rounded-md ml-auto">対話完了</span>;

              return (
                <button
                  key={c.id}
                  onClick={() => setSelectedCaseId(c.id)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all flex items-center gap-3.5 ${
                    selectedCaseId === c.id
                      ? 'border-[#b39369] bg-[#fdfbf7] shadow-sm font-bold scale-[1.02]'
                      : 'border-[#ebdcd0]/60 hover:bg-[#fcfaf7]/50 bg-white'
                  }`}
                >
                  <span className="text-2xl">{c.clientAvatar}</span>
                  <div className="leading-tight">
                    <h4 className="text-sm font-bold text-[#2b2825]">{c.clientName}</h4>
                    <p className="text-[11px] text-[#8e857b] mt-0.5">{c.clientTitle}</p>
                  </div>
                  {badge}
                </button>
              );
            })}
          </div>
        </div>

        {/* 右側：対話メインスペース（チャットルーム） */}
        <div className="lg:col-span-9">
          {activeCase ? (
            <div className="border border-[#ebdcd0] bg-white rounded-3xl shadow-sm overflow-hidden flex flex-col h-[650px]">
              {/* チャットヘッダー */}
              <div className="bg-[#fcfaf7] px-6 py-4 border-b border-[#f4efe8] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl p-1.5 bg-white rounded-xl border border-[#ebdcd0]/50">{activeCase.clientAvatar}</span>
                  <div>
                    <h3 className="text-sm font-bold text-[#2b2825]">{activeCase.clientName} さんとのワークショップ</h3>
                    <p className="text-xs text-[#8e857b] mt-0.5">{activeCase.clientTitle}</p>
                  </div>
                </div>
                <div>
                  {activeCase.status === 'solved' && (
                    <span className="text-xs bg-green-100 text-green-800 px-2.5 py-1 rounded-full font-bold">対話完了</span>
                  )}
                  {activeCase.status === 'pending' && (
                    <span className="text-xs bg-amber-100 text-amber-800 px-2.5 py-1 rounded-full font-bold animate-pulse">内省中</span>
                  )}
                  {activeCase.status === 'unresolved' && (
                    <span className="text-xs bg-gray-100 text-gray-700 px-2.5 py-1 rounded-full font-bold">未解決</span>
                  )}
                </div>
              </div>

              {/* チャット会話ログエリア */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#fcfaf7]/30">
                {/* 相談者の悩みカード */}
                <div className="bg-[#1a1816] text-[#ebdcd0] rounded-2xl p-5 space-y-2 border border-[#b39369]/20 shadow-sm max-w-2xl mx-auto mb-4">
                  <span className="text-[10px] font-mono tracking-wider text-[#b39369] font-bold">相談者の悩み（テーマ）</span>
                  <p className="text-sm leading-relaxed text-white/90 font-serif">「{activeCase.text}」</p>
                </div>

                {/* 動的チャットメッセージの描画 */}
                {chatMessages.map((msg, index) => {
                  if (msg.sender === 'system') {
                    return (
                      <div key={index} className="flex justify-center my-3">
                        <div className="bg-[#f4efe8]/70 border border-[#ebdcd0]/50 rounded-xl px-4 py-2 text-xs font-mono text-[#8c7e6c] max-w-[80%] text-center">
                          {msg.text}
                        </div>
                      </div>
                    );
                  }

                  const isLeft = msg.align === 'left';
                  return (
                    <div key={index} className={`flex gap-3 items-start ${isLeft ? 'justify-start' : 'justify-end'}`}>
                      {isLeft && (
                        <span className="text-xl p-2 bg-white rounded-xl border border-[#ebdcd0]/50 shadow-sm">{msg.avatar}</span>
                      )}
                      
                      <div className={`max-w-[75%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm ${
                        msg.sender === 'facilitator'
                          ? 'bg-white text-[#2b2825] border border-[#ebdcd0]/60'
                          : msg.sender === 'player'
                          ? 'bg-[#1a1816] text-white'
                          : 'bg-[#f0f7f4] text-[#2d6a4f] border border-[#d8ebd4]'
                      }`}>
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`text-[10px] font-bold ${
                            msg.sender === 'facilitator'
                              ? 'text-[#8c7e6c]'
                              : msg.sender === 'player'
                              ? 'text-[#b39369]'
                              : 'text-[#2d6a4f]/80'
                          }`}>
                            {msg.name}
                          </span>
                        </div>
                        <p className="whitespace-pre-line text-[13px]">{msg.text}</p>
                      </div>

                      {!isLeft && (
                        <span className="text-xl p-2 bg-[#f0f7f4] rounded-xl border border-[#ebdcd0]/40 shadow-sm">{msg.avatar}</span>
                      )}
                    </div>
                  );
                })}

                {/* 進行中のカード情報表示（Step2/3でアドバイス選択前） */}
                {activeCase.status === 'unresolved' && step >= 2 && drawnCard && (
                  <div className="flex flex-col items-center py-4 bg-white border border-[#ebdcd0]/50 rounded-2xl shadow-sm max-w-sm mx-auto space-y-3">
                    <div className="relative w-36 aspect-[1/1.6] rounded-xl overflow-hidden border border-[#ebdcd0] shadow-sm bg-[#faf8f5]">
                      <Image
                        src={drawnCard.imagePath}
                        alt={drawnCard.name}
                        fill
                        sizes="160px"
                        className="object-cover"
                      />
                    </div>
                    <div className="text-center">
                      <h4 className="text-sm font-bold text-[#2b2825]">{drawnCard.name} ({drawnCard.symbol})</h4>
                      <p className="text-[10px] text-[#8e857b] font-mono italic">{drawnCard.nameEn}</p>
                    </div>
                  </div>
                )}

                {/* タイピング状態表示 */}
                {isTyping && (
                  <div className="flex gap-3 items-start justify-start">
                    <span className="text-xl p-2 bg-white rounded-xl border border-gray-100 animate-pulse">🎓</span>
                    <div className="bg-white border border-gray-100 text-[#8e857b] rounded-2xl px-4 py-3 text-xs flex items-center gap-2">
                      <div className="flex gap-1">
                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></span>
                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-100"></span>
                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-200"></span>
                      </div>
                      <span className="font-mono text-[11px]">{typingText}</span>
                    </div>
                  </div>
                )}

                {/* 内省待ちの時差演出タイマー表示 */}
                {activeCase.status === 'pending' && timeLeft > 0 && (
                  <div className="bg-[#fffbeb] border border-[#fef3c7] rounded-2xl p-5 space-y-4 max-w-md mx-auto my-4 text-center">
                    <div className="flex justify-center text-2xl animate-spin duration-1000">⏳</div>
                    <div className="space-y-1">
                      <h4 className="text-sm font-bold text-[#b39369]">{activeCase.clientName}さんが内省を深めています</h4>
                      <p className="text-xs text-[#8c7e6c]">あなたが送った言葉をもとに、自分自身に向き合っています。</p>
                    </div>
                    {/* プログレスバー */}
                    <div className="w-full bg-[#f3ece2] h-1.5 rounded-full overflow-hidden">
                      <div 
                        className="bg-[#b39369] h-full transition-all duration-1000"
                        style={{ width: `${((30 - timeLeft) / 30) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-xs font-mono text-[#8c7e6c] block">残り時間: 約 {timeLeft} 秒</span>
                  </div>
                )}

                <div ref={chatEndRef} />
              </div>

              {/* チャットフッターコントロールエリア */}
              <div className="border-t border-[#f4efe8] p-5 bg-white">
                {/* 進行コントロール（入室時・カードドロー） */}
                {activeCase.status === 'unresolved' && step === 0 && (
                  <div className="flex justify-center py-2">
                    <button
                      onClick={() => setStep(1)}
                      className="px-6 py-3 rounded-xl text-sm font-bold bg-[#b39369] hover:bg-[#a3835a] text-white transition shadow-sm font-mono tracking-wider"
                    >
                      対話を開始する
                    </button>
                  </div>
                )}

                {activeCase.status === 'unresolved' && step === 1 && (
                  <div className="flex justify-center py-2">
                    <button
                      onClick={handleDrawCard}
                      className="px-6 py-3 rounded-xl text-sm font-bold bg-[#b39369] hover:bg-[#a3835a] text-white transition shadow-sm font-mono tracking-wider flex items-center gap-2"
                    >
                      <span>🃏</span> カードを引いて対話を開く
                    </button>
                  </div>
                )}

                {activeCase.status === 'unresolved' && step === 2 && !isTyping && (
                  <div className="flex justify-end py-1">
                    <button
                      onClick={() => startNextStep(3, 1500, `${activeCase.clientName}さんがカードの細部（シンボル）を観察しています...`)}
                      className="px-5 py-2.5 rounded-xl text-sm font-bold bg-[#b39369] hover:bg-[#a3835a] text-white transition shadow-sm"
                    >
                      次へ進む
                    </button>
                  </div>
                )}

                {/* アドバイス（ハイライト）の選択UI（ステップ3） */}
                {activeCase.status === 'unresolved' && step === 3 && !isTyping && drawnCard && (
                  <div className="space-y-4 animate-fade-in">
                    <div className="space-y-1 text-left">
                      <h5 className="text-xs font-bold text-[#8c7e6c] tracking-wider uppercase font-mono">
                        対話のまとめ：{activeCase.clientName}さんへ届ける一節の選択（複数選択可）
                      </h5>
                      <p className="text-[11px] text-[#8e857b]">
                        相談者がカードの絵の中に見出したものと呼応する解釈を選び、気づきを促すアドバイスとして送信します。
                      </p>
                    </div>

                    <div className="grid grid-cols-1 gap-2.5 max-h-[180px] overflow-y-auto pr-1">
                      {drawnCard.symbols.map((sym) => {
                        const isSelected = selectedHighlights.includes(sym.highlightPassage);
                        return (
                          <button
                            key={sym.id}
                            onClick={() => toggleHighlight(sym.highlightPassage)}
                            className={`w-full text-left p-3.5 rounded-xl border text-xs leading-relaxed transition-all ${
                              isSelected
                                ? 'border-[#b39369] bg-[#fdfbf7] font-medium text-[#2b2825] shadow-sm'
                                : 'border-[#ebdcd0]/50 hover:bg-[#faf8f5]/50 text-[#6e675f]'
                            }`}
                          >
                            <span className="font-bold text-[11px] text-[#b39369] block mb-1">
                              {sym.name} ({sym.location})
                            </span>
                            {sym.highlightPassage}
                          </button>
                        );
                      })}
                    </div>

                    <div className="flex justify-between items-center pt-2 border-t border-[#f4efe8]">
                      <span className="text-xs text-[#8e857b]">選択済み: {selectedHighlights.length} 件</span>
                      <button
                        disabled={selectedHighlights.length === 0}
                        onClick={handleSubmit}
                        className={`px-5 py-3 rounded-xl text-xs font-bold text-white transition-all shadow-sm ${
                          selectedHighlights.length === 0
                            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                            : 'bg-[#2d6a4f] hover:bg-[#224f3b] active:scale-[0.98]'
                        }`}
                      >
                        この言葉を届けて対話を終える
                      </button>
                    </div>
                  </div>
                )}

                {/* 完了およびpending時 */}
                {activeCase.status !== 'unresolved' && (
                  <div className="text-center py-2 text-xs font-mono text-[#8c7e6c]">
                    {activeCase.status === 'solved' ? (
                      <span className="text-green-700 font-bold">✓ このワークショップセッションは完了しました。</span>
                    ) : (
                      <span className="text-amber-700 font-bold animate-pulse">⌛ {activeCase.clientName}さんの内省完了を待っています...</span>
                    )}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="border border-dashed border-[#ebdcd0] rounded-3xl p-12 text-center text-sm text-[#8c7e6c] bg-white flex flex-col items-center justify-center h-[500px] gap-3">
              <span className="text-4xl">🏛️</span>
              <p className="max-w-xs leading-relaxed">
                左側の「参加者リスト」から、本日セッションを行うパートナーを選択してください。
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
