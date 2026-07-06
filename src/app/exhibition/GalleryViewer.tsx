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
    const camera = new BABYLON.FreeCamera('freeCamera', new BABYLON.Vector3(0, 1.7, -10), scene);
    camera.attachControl(canvasRef.current, true);
    
    // 操作キー設定（WASDと矢印キーの両方で移動できるようにする）
    camera.keysUp = [87, 38];    // W or UpArrow
    camera.keysDown = [83, 40];  // S or DownArrow
    camera.keysLeft = [65, 37];  // A or LeftArrow
    camera.keysRight = [68, 39]; // D or RightArrow
    
    // タッチ＆マウスドラッグによる前進も可能にする
    // PCでは右ドラッグまたは左ドラッグで視点旋回、スマホ等のタッチデバイスではドラッグで旋回、ダブルタップまたは長押しで前進などのコントロールを有効化
    camera.speed = 0.45;
    camera.angularSensibility = 1000;
    
    // タッチデバイスでのピンチ・スワイプ入力感度の調整
    if (camera.inputs.attached.touch) {
      // モバイル用のタッチコントロール設定
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
    light1.intensity = 0.55;
    light1.specular = new BABYLON.Color3(0.2, 0.15, 0.1);

    const light2 = new BABYLON.DirectionalLight('dirLight', new BABYLON.Vector3(0, -1, 0.5), scene);
    light2.intensity = 0.35;
    light2.diffuse = new BABYLON.Color3(1.0, 0.95, 0.85); // 暖かいスポットライト

    // --- ギャラリー展示室（建築構造）の生成 ---
    // 床の生成
    const floor = BABYLON.MeshBuilder.CreateGround('floor', { width: 60, height: 60 }, scene);
    const floorMaterial = new BABYLON.StandardMaterial('floorMat', scene);
    floorMaterial.diffuseColor = new BABYLON.Color3(0.18, 0.16, 0.14);
    floorMaterial.specularColor = new BABYLON.Color3(0.05, 0.05, 0.05);
    floor.material = floorMaterial;
    floor.checkCollisions = true;

    // 天井の生成
    const ceiling = BABYLON.MeshBuilder.CreatePlane('ceiling', { width: 60, height: 60 }, scene);
    ceiling.rotation.x = Math.PI / 2;
    ceiling.position.y = 5.0;
    const ceilingMaterial = new BABYLON.StandardMaterial('ceilingMat', scene);
    ceilingMaterial.diffuseColor = new BABYLON.Color3(0.08, 0.07, 0.06);
    ceiling.material = ceilingMaterial;

    // 外壁の生成
    const wallLeft = BABYLON.MeshBuilder.CreateBox('wallLeft', { width: 1, height: 5, depth: 60 }, scene);
    wallLeft.position.set(-30, 2.5, 0);
    wallLeft.checkCollisions = true;
    
    const wallRight = BABYLON.MeshBuilder.CreateBox('wallRight', { width: 1, height: 5, depth: 60 }, scene);
    wallRight.position.set(30, 2.5, 0);
    wallRight.checkCollisions = true;

    const wallBack = BABYLON.MeshBuilder.CreateBox('wallBack', { width: 60, height: 5, depth: 1 }, scene);
    wallBack.position.set(0, 2.5, 30);
    wallBack.checkCollisions = true;

    const wallFront = BABYLON.MeshBuilder.CreateBox('wallFront', { width: 60, height: 5, depth: 1 }, scene);
    wallFront.position.set(0, 2.5, -30);
    wallFront.checkCollisions = true;

    const wallsMat = new BABYLON.StandardMaterial('wallsMat', scene);
    wallsMat.diffuseColor = new BABYLON.Color3(0.15, 0.13, 0.12);
    wallLeft.material = wallsMat;
    wallRight.material = wallsMat;
    wallBack.material = wallsMat;
    wallFront.material = wallsMat;

    // --- 展示パネル（パーティション壁）の自動配置 ---
    // 78枚のカードを並べるため、大・小アルカナごとにいくつかの回廊風に仕切る
    const partitionMaterial = new BABYLON.StandardMaterial('partitionMat', scene);
    partitionMaterial.diffuseColor = new BABYLON.Color3(0.22, 0.20, 0.18);
    partitionMaterial.specularColor = new BABYLON.Color3(0.1, 0.1, 0.1);

    const partitionPositions = [
      // 大アルカナの展示エリアパーティション
      { x: -15, z: 15, w: 20, d: 0.8, r: 0 },
      { x: 15, z: 15, w: 20, d: 0.8, r: 0 },
      // 小アルカナの展示エリアパーティション
      { x: -15, z: -15, w: 20, d: 0.8, r: 0 },
      { x: 15, z: -15, w: 20, d: 0.8, r: 0 },
      // 中央回廊
      { x: 0, z: 0, w: 0.8, d: 30, r: 0 }
    ];

    partitionPositions.forEach((pos, idx) => {
      const part = BABYLON.MeshBuilder.CreateBox(`partition_${idx}`, { width: pos.w || 1, height: 4, depth: pos.d || 1 }, scene);
      part.position.set(pos.x, 2, pos.z);
      if (pos.r) part.rotation.y = pos.r;
      part.material = partitionMaterial;
      part.checkCollisions = true;
    });

    // --- 78枚のタロットアートの配置 ---
    setLoadingProgress('絵画を展示中...');

    // 均等に部屋全体にグリッド状に絵を配置する
    TAROT_CARDS.forEach((card, index) => {
      // 78枚をらせん・または部屋の周回壁沿いに綺麗に並べる
      // 10x8のグリッド空間をシミュレート
      const row = Math.floor(index / 10);
      const col = index % 10;
      
      const x = -22 + col * 5.0;
      const z = -20 + row * 8.0;
      const y = 2.0; // 目の高さに展示

      // 絵画フレームの台座
      const frame = BABYLON.MeshBuilder.CreateBox(`frame_${card.id}`, { width: 1.6, height: 2.5, depth: 0.12 }, scene);
      frame.position.set(x, y, z);
      
      const frameMat = new BABYLON.StandardMaterial(`frameMat_${card.id}`, scene);
      frameMat.diffuseColor = new BABYLON.Color3(0.08, 0.06, 0.04); // ウッディなダークフレーム
      frameMat.specularColor = new BABYLON.Color3(0.1, 0.1, 0.1);
      frame.material = frameMat;
      frame.checkCollisions = true;


      // キャンバス（絵のテクスチャ貼り付け部）
      const canvas = BABYLON.MeshBuilder.CreatePlane(`canvas_${card.id}`, { width: 1.45, height: 2.3 }, scene);
      canvas.position.set(x, y, z - 0.07); // フレームの少し手前に配置
      canvas.rotation.y = 0; // カメラ側（手前）に向くように設定
      
      const artMat = new BABYLON.StandardMaterial(`artMat_${card.id}`, scene);
      // ローカルのタロット画像をテクスチャとしてロード
      artMat.diffuseTexture = new BABYLON.Texture(card.imagePath, scene);
      artMat.backFaceCulling = false; // 裏面も考慮して表示を保証
      canvas.material = artMat;

      // メタデータをメッシュに保持
      canvas.metadata = card;

      // 各絵画の上に小さなスポットライト（イルミネーション）用の光球を配置
      const lamp = BABYLON.MeshBuilder.CreateSphere(`lamp_${card.id}`, { diameter: 0.15 }, scene);
      lamp.position.set(x, y + 1.4, z - 0.3);
      const lampMat = new BABYLON.StandardMaterial(`lampMat_${card.id}`, scene);
      lampMat.emissiveColor = new BABYLON.Color3(0.95, 0.9, 0.75); // 電球色
      lamp.material = lampMat;
    });

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

    // リサイズハンドラ
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
          <span>🎮 <strong>操作方法:</strong> WASD / 矢印キーで移動 ＆ マウス・タッチドラッグで視点移動（スマホ対応）</span>
        </div>
        <div>
          <span>🎨 <strong>タップ / クリック:</strong> 絵画の解説ボードを表示</span>
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
