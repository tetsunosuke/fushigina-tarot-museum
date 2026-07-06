'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as BABYLON from 'babylonjs';
import 'babylonjs-loaders';
import { TAROT_CARDS, TarotCard } from '@/data/artMuseumData';

interface GalleryProps {
  onSelectCard: (card: TarotCard) => void;
}

export default function GalleryViewer({ onSelectCard }: GalleryProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loadingProgress, setLoadingProgress] = useState<string>('初期化中...');

  useEffect(() => {
    if (!canvasRef.current) return;

    // --- 3D エンジンの初期化 ---
    const engine = new BABYLON.Engine(canvasRef.current, true);
    const scene = new BABYLON.Scene(engine);
    
    // 背景を美術館らしいシックなチャコールカラーに
    scene.clearColor = new BABYLON.Color4(0.12, 0.11, 0.10, 1.0);

    // --- カメラの設定（FPS風ナビゲーション） ---
    // スタート位置を大アルカナの入り口（中央）に設定
    const camera = new BABYLON.FreeCamera('freeCamera', new BABYLON.Vector3(0, 1.7, -24), scene);
    camera.attachControl(canvasRef.current, true);
    
    // 操作キー設定（WASDと矢印キーの両方で移動できるようにする）
    camera.keysUp = [87, 38];    // W or UpArrow
    camera.keysDown = [83, 40];  // S or DownArrow
    camera.keysLeft = [65, 37];  // A or LeftArrow
    camera.keysRight = [68, 39]; // D or RightArrow
    
    camera.speed = 0.4;
    camera.angularSensibility = 1000;
    
    // タッチデバイスでのピンチ・スワイプ入力感度の調整
    if (camera.inputs.attached.touch) {
      const touchInput = camera.inputs.attached.touch as BABYLON.FreeCameraTouchInput;
      touchInput.touchAngularSensibility = 1500;
      touchInput.touchMoveSensibility = 200;
    }
    
    // 衝突判定と重力の有効化（ギャラリーの床から落ちないようにする）
    scene.collisionsEnabled = true;
    camera.checkCollisions = true;
    camera.applyGravity = true;
    camera.ellipsoid = new BABYLON.Vector3(0.6, 0.9, 0.6);

    // --- 照明の追加 ---
    const light1 = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 1, 0), scene);
    light1.intensity = 0.6;
    light1.specular = new BABYLON.Color3(0.2, 0.15, 0.1);

    const light2 = new BABYLON.DirectionalLight('dirLight', new BABYLON.Vector3(0, -1, 0.5), scene);
    light2.intensity = 0.4;
    light2.diffuse = new BABYLON.Color3(1.0, 0.95, 0.85);

    // --- ギャラリー展示室（建築構造）の生成 ---
    // 部屋全体のサイズを大きく広げ、ゆったりと鑑賞できるようにする (幅80m × 奥行80m)
    const floor = BABYLON.MeshBuilder.CreateGround('floor', { width: 80, height: 80 }, scene);
    const floorMaterial = new BABYLON.StandardMaterial('floorMat', scene);
    floorMaterial.diffuseColor = new BABYLON.Color3(0.18, 0.16, 0.14);
    floorMaterial.specularColor = new BABYLON.Color3(0.05, 0.05, 0.05);
    floor.material = floorMaterial;
    floor.checkCollisions = true;

    // 天井の生成
    const ceiling = BABYLON.MeshBuilder.CreatePlane('ceiling', { width: 80, height: 80 }, scene);
    ceiling.rotation.x = Math.PI / 2;
    ceiling.position.y = 6.0;
    const ceilingMaterial = new BABYLON.StandardMaterial('ceilingMat', scene);
    ceilingMaterial.diffuseColor = new BABYLON.Color3(0.08, 0.07, 0.06);
    ceiling.material = ceilingMaterial;

    // 外壁の生成
    const wallLeft = BABYLON.MeshBuilder.CreateBox('wallLeft', { width: 1, height: 6, depth: 80 }, scene);
    wallLeft.position.set(-40, 3, 0);
    wallLeft.checkCollisions = true;
    
    const wallRight = BABYLON.MeshBuilder.CreateBox('wallRight', { width: 1, height: 6, depth: 80 }, scene);
    wallRight.position.set(40, 3, 0);
    wallRight.checkCollisions = true;

    const wallBack = BABYLON.MeshBuilder.CreateBox('wallBack', { width: 80, height: 6, depth: 1 }, scene);
    wallBack.position.set(0, 3, 40);
    wallBack.checkCollisions = true;

    const wallFront = BABYLON.MeshBuilder.CreateBox('wallFront', { width: 80, height: 6, depth: 1 }, scene);
    wallFront.position.set(0, 3, -40);
    wallFront.checkCollisions = true;

    const wallsMat = new BABYLON.StandardMaterial('wallsMat', scene);
    wallsMat.diffuseColor = new BABYLON.Color3(0.15, 0.13, 0.12);
    wallLeft.material = wallsMat;
    wallRight.material = wallsMat;
    wallBack.material = wallsMat;
    wallFront.material = wallsMat;

    // --- 展示パネル（パーティション壁）の配置 ---
    // 5つの異なる「展示室」に仕切る（大アルカナ室、ワンド室、カップ室、ソード室、ペンタクル室）
    const partitionMaterial = new BABYLON.StandardMaterial('partitionMat', scene);
    partitionMaterial.diffuseColor = new BABYLON.Color3(0.22, 0.20, 0.18);
    partitionMaterial.specularColor = new BABYLON.Color3(0.1, 0.1, 0.1);

    // 回廊風の部屋を仕切る巨大な壁
    const partitionPositions = [
      // 中央縦の仕切り
      { x: 0, z: 0, w: 1, d: 80, r: 0 },
      // 横の仕切り（4部屋の仕切り）
      { x: -20, z: 0, w: 40, d: 1, r: 0 },
      { x: 20, z: 0, w: 40, d: 1, r: 0 },
      // 大アルカナ室への入り口壁
      { x: -20, z: 20, w: 40, d: 1, r: 0 },
      { x: 20, z: -20, w: 40, d: 1, r: 0 }
    ];

    partitionPositions.forEach((pos, idx) => {
      const part = BABYLON.MeshBuilder.CreateBox(`partition_${idx}`, { width: pos.w, height: 5, depth: pos.d }, scene);
      part.position.set(pos.x, 2.5, pos.z);
      if (pos.r) part.rotation.y = pos.r;
      part.material = partitionMaterial;
      part.checkCollisions = true;
    });

    // 部屋名テキスト板を配置するためのマテリアル
    const fontMat = new BABYLON.StandardMaterial('fontMat', scene);
    fontMat.emissiveColor = new BABYLON.Color3(0.7, 0.58, 0.41); // 金色調

    // 各エリアのカード分類と座標
    // 大アルカナ: room-0 (z: 10m 〜 35m, x: -35m 〜 -5m)
    // ワンド: room-1 (z: 10m 〜 35m, x: 5m 〜 35m)
    // カップ: room-2 (z: -10m 〜 -35m, x: -35m 〜 -5m)
    // ソード: room-3 (z: -10m 〜 -35m, x: 5m 〜 35m)
    // ペンタクル: room-4 (z: -5m 〜 5m, x: -35m 〜 -5m)
    
    setLoadingProgress('絵画を種類別に展示中...');

    // 5つのスートを格納するための分類ロジック
    const categorizedCards = {
      major: [] as TarotCard[],
      wands: [] as TarotCard[],
      cups: [] as TarotCard[],
      swords: [] as TarotCard[],
      pentacles: [] as TarotCard[]
    };

    TAROT_CARDS.forEach(card => {
      const num = parseInt(card.symbol);
      const isMajor = !isNaN(num) || ['0','I','II','III','IV','V','VI','VII','VIII','IX','X','XI','XII','XIII','XIV','XV','XVI','XVII','XVIII','XIX','XX','XXI'].includes(card.symbol);
      if (isMajor) {
        categorizedCards.major.push(card);
      } else if (card.id.startsWith('wand')) {
        categorizedCards.wands.push(card);
      } else if (card.id.startsWith('cup')) {
        categorizedCards.cups.push(card);
      } else if (card.id.startsWith('sword')) {
        categorizedCards.swords.push(card);
      } else if (card.id.startsWith('pentacle')) {
        categorizedCards.pentacles.push(card);
      }
    });

    // 展示室ごとの配置用パラメータ
    // wall: 'north', 'south', 'east', 'west' に綺麗に配置する
    const renderRoom = (cards: TarotCard[], centerOffset: { x: number; z: number }) => {
      // 部屋の四方の壁に均等に並べるための座標計算
      const total = cards.length;
      cards.forEach((card, index) => {
        // 四方の壁 (幅18m × 奥行18mの小部屋と仮定して、壁面に沿って配置)
        // 外周に沿ってインデックスで等分
        const angle = (index / total) * Math.PI * 2;
        const radius = 8.5; // 壁までの距離

        const x = centerOffset.x + Math.sin(angle) * radius;
        const z = centerOffset.z + Math.cos(angle) * radius;
        const y = 2.0;

        // 絵画フレーム
        const frame = BABYLON.MeshBuilder.CreateBox(`frame_${card.id}`, { width: 1.6, height: 2.5, depth: 0.12 }, scene);
        frame.position.set(x, y, z);
        // 壁面を向くように回転（中心を向くように）
        frame.rotation.y = angle + Math.PI;

        const frameMat = new BABYLON.StandardMaterial(`frameMat_${card.id}`, scene);
        frameMat.diffuseColor = new BABYLON.Color3(0.08, 0.06, 0.04);
        frameMat.specularColor = new BABYLON.Color3(0.1, 0.1, 0.1);
        frame.material = frameMat;
        frame.checkCollisions = true;

        // キャンバス（絵のテクスチャ貼り付け部）
        const canvas = BABYLON.MeshBuilder.CreatePlane(`canvas_${card.id}`, { width: 1.45, height: 2.3 }, scene);
        canvas.position.set(x + Math.sin(angle) * -0.07, y, z + Math.cos(angle) * -0.07);
        canvas.rotation.y = angle; // 中心（カメラ側）を向くように回転
        
        const artMat = new BABYLON.StandardMaterial(`artMat_${card.id}`, scene);
        artMat.diffuseTexture = new BABYLON.Texture(card.imagePath, scene);
        artMat.backFaceCulling = true; // 正しい面だけを描画して不整合を解消
        canvas.material = artMat;
        canvas.metadata = card;

        // 電球
        const lamp = BABYLON.MeshBuilder.CreateSphere(`lamp_${card.id}`, { diameter: 0.12 }, scene);
        lamp.position.set(x + Math.sin(angle) * -0.3, y + 1.4, z + Math.cos(angle) * -0.3);
        const lampMat = new BABYLON.StandardMaterial(`lampMat_${card.id}`, scene);
        lampMat.emissiveColor = new BABYLON.Color3(0.95, 0.9, 0.75);
        lamp.material = lampMat;
      });
    };

    // 5つの部屋にそれぞれ配置
    renderRoom(categorizedCards.major, { x: -20, z: 20 });      // Room A: 大アルカナ
    renderRoom(categorizedCards.wands, { x: 20, z: 20 });      // Room B: ワンド
    renderRoom(categorizedCards.cups, { x: -20, z: -20 });     // Room C: カップ
    renderRoom(categorizedCards.swords, { x: 20, z: -20 });    // Room D: ソード
    renderRoom(categorizedCards.pentacles, { x: -20, z: 0 });   // Room E: ペンタクル

    // --- クリック（タップ）による絵画鑑賞検知 ---
    scene.onPointerDown = (evt, pickResult) => {
      if (pickResult && pickResult.hit && pickResult.pickedMesh) {
        const meshName = pickResult.pickedMesh.name;
        if (meshName.startsWith('canvas_') && pickResult.pickedMesh.metadata) {
          const card = pickResult.pickedMesh.metadata as TarotCard;
          onSelectCard(card);
        }
      }
    };

    setLoadingProgress('');

    // --- アニメーションループ ---
    engine.runRenderLoop(() => {
      scene.render();
    });

    // リサイズ
    const handleResize = () => {
      engine.resize();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      engine.dispose();
    };
  }, [onSelectCard]);

  return (
    <div className="relative w-full h-[500px] md:h-[600px] rounded-3xl overflow-hidden border border-[#ebdcd0] bg-[#1a1816] shadow-inner select-none">
      <canvas ref={canvasRef} className="w-full h-full block focus:outline-none" />
      
      {/* 操作ガイドオーバーレイ */}
      <div className="absolute bottom-4 left-4 right-4 flex flex-col md:flex-row justify-between items-center gap-2 bg-[#1a1816]/80 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-[#b39369]/20 text-[10px] text-[#ebdcd0] pointer-events-none">
        <div className="flex items-center gap-2.5">
          <span>🎮 <strong>操作:</strong> WASD / 矢印キーで移動 ＆ マウス・タッチドラッグで視点移動（スマホ対応）</span>
        </div>
        <div className="text-[#b39369] font-bold">
          <span>🏛️ 各個室の壁面に「大アルカナ」「ワンド」「カップ」等の種類別に整列展示されています</span>
        </div>
      </div>

      {loadingProgress && (
        <div className="absolute inset-0 bg-[#121110] flex flex-col items-center justify-center gap-3">
          <div className="w-6 h-6 border-2 border-[#b39369] border-t-transparent rounded-full animate-spin"></div>
          <span className="text-[10px] text-[#8e857b] font-mono tracking-widest uppercase">{loadingProgress}</span>
        </div>
      )}
    </div>
  );
}
