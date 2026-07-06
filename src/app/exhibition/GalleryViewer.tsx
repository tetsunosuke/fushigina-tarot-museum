'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as BABYLON from 'babylonjs';
import 'babylonjs-loaders';
import * as GUI from 'babylonjs-gui';
import { TAROT_CARDS, TarotCard } from '@/data/artMuseumData';

interface GalleryProps {
  onSelectCard: (card: TarotCard) => void;
  selectedRoom: string; // 'lobby' | 'major' | 'wands' | 'cups' | 'swords' | 'pentacles'
  onChangeRoom: (room: string) => void;
}

export default function GalleryViewer({ onSelectCard, selectedRoom, onChangeRoom }: GalleryProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loadingProgress, setLoadingProgress] = useState<string>('初期化中...');

  useEffect(() => {
    if (!canvasRef.current) return;

    // --- 3D エンジンの初期化 ---
    const engine = new BABYLON.Engine(canvasRef.current, true);
    const scene = new BABYLON.Scene(engine);
    
    // 背景を美術館らしいシックなチャコールカラーに
    scene.clearColor = new BABYLON.Color4(0.12, 0.11, 0.10, 1.0);

    // --- 選択した部屋に応じたカメラ位置・向きの切り替え ---
    // 40m × 40m に縮小された空間に合わせ、カメラの初期座標と視線ターゲットを最適化
    let cameraStartPos = new BABYLON.Vector3(0, 1.7, -10);
    let cameraTarget = new BABYLON.Vector3(0, 1.7, -4.1); // デフォルト: 中央仕切り壁を向く

    if (selectedRoom === 'major') {
      cameraStartPos = new BABYLON.Vector3(0, 1.7, 14);
      cameraTarget = new BABYLON.Vector3(0, 1.7, 20.0); // 北壁（大アルカナ）を向く
    } else if (selectedRoom === 'wands') {
      cameraStartPos = new BABYLON.Vector3(14, 1.7, 0);
      cameraTarget = new BABYLON.Vector3(20.0, 1.7, 0); // 東壁（ワンド）を向く
    } else if (selectedRoom === 'cups') {
      cameraStartPos = new BABYLON.Vector3(-14, 1.7, 0);
      cameraTarget = new BABYLON.Vector3(-20.0, 1.7, 0); // 西壁（カップ）を向く
    } else if (selectedRoom === 'swords') {
      cameraStartPos = new BABYLON.Vector3(10, 1.7, -14);
      cameraTarget = new BABYLON.Vector3(10, 1.7, -20.0); // 南壁右側（ソード）を向く
    } else if (selectedRoom === 'pentacles') {
      cameraStartPos = new BABYLON.Vector3(-10, 1.7, -14);
      cameraTarget = new BABYLON.Vector3(-10, 1.7, -20.0); // 南壁左側（ペンタクル）を向く
    }

    const camera = new BABYLON.FreeCamera('freeCamera', cameraStartPos, scene);
    camera.attachControl(canvasRef.current, true);
    camera.setTarget(cameraTarget);
    
    // キーボードによる歩行移動を無効化
    camera.keysUp = [];
    camera.keysDown = [];
    camera.keysLeft = [];
    camera.keysRight = [];
    camera.speed = 0;
    camera.angularSensibility = 1000;

    // タッチ操作による視点回転を完全に無効化
    // (横スワイプはカスタムハンドラで「体ごと平行移動」として処理する)
    (camera.inputs as any).clear();
    
    // 左右スライド並行移動のイベント処理
    const moveStep = 0.5; // 1回の移動距離

    const performLateralMove = (direction: number) => {
      if (selectedRoom === 'lobby' || selectedRoom === 'major' || selectedRoom === 'swords' || selectedRoom === 'pentacles') {
        const sign = (selectedRoom === 'swords' || selectedRoom === 'pentacles') ? -direction : direction;
        let newX = camera.position.x + moveStep * sign;

        if (selectedRoom === 'swords') {
          newX = Math.max(0.5, Math.min(18, newX));
        } else if (selectedRoom === 'pentacles') {
          newX = Math.max(-18, Math.min(-0.5, newX));
        } else {
          newX = Math.max(-18, Math.min(18, newX));
        }

        camera.position.x = newX;

        if (selectedRoom === 'lobby') {
          camera.setTarget(new BABYLON.Vector3(newX, 1.7, -4.1));
        } else if (selectedRoom === 'major') {
          camera.setTarget(new BABYLON.Vector3(newX, 1.7, 20.0));
        } else {
          camera.setTarget(new BABYLON.Vector3(newX, 1.7, -20.0));
        }
      } else if (selectedRoom === 'wands' || selectedRoom === 'cups') {
        const sign = selectedRoom === 'wands' ? -direction : direction;
        let newZ = camera.position.z + moveStep * sign;
        newZ = Math.max(-16, Math.min(16, newZ));
        camera.position.z = newZ;

        if (selectedRoom === 'wands') {
          camera.setTarget(new BABYLON.Vector3(20.0, 1.7, newZ));
        } else {
          camera.setTarget(new BABYLON.Vector3(-20.0, 1.7, newZ));
        }
      }
    };

    const handleKeyDown = (evt: KeyboardEvent) => {
      const isLeft = evt.keyCode === 37 || evt.keyCode === 65;
      const isRight = evt.keyCode === 39 || evt.keyCode === 68;
      if (!isLeft && !isRight) return;
      performLateralMove(isLeft ? -1 : 1);
    };
    window.addEventListener('keydown', handleKeyDown);

    // --- スマホタッチ操作：横スワイプを平行移動に変換 ---
    let touchStartX = 0;
    let touchStartY = 0;
    const touchMoveThreshold = 12; // px：縦スクロールと区別するための最小水平移動量
    const touchMovePerStep = 60;   // px：この距離スワイプするごとに1ステップ移動

    const handleTouchStart = (evt: TouchEvent) => {
      if (evt.touches.length !== 1) return;
      touchStartX = evt.touches[0].clientX;
      touchStartY = evt.touches[0].clientY;
    };

    const handleTouchMove = (evt: TouchEvent) => {
      if (evt.touches.length !== 1) return;
      const dx = evt.touches[0].clientX - touchStartX;
      const dy = evt.touches[0].clientY - touchStartY;

      // 縦方向の動きが大きい場合はページスクロールとみなして無視
      if (Math.abs(dy) > Math.abs(dx)) return;
      if (Math.abs(dx) < touchMoveThreshold) return;

      // カメラ操作と判断してページスクロールを防止
      evt.preventDefault();

      if (Math.abs(dx) >= touchMovePerStep) {
        performLateralMove(dx > 0 ? -1 : 1);
        touchStartX = evt.touches[0].clientX;
        touchStartY = evt.touches[0].clientY;
      }
    };

    const canvas = canvasRef.current;
    canvas?.addEventListener('touchstart', handleTouchStart, { passive: true });
    canvas?.addEventListener('touchmove', handleTouchMove, { passive: false });

    scene.collisionsEnabled = false;
    camera.checkCollisions = false;
    camera.applyGravity = false;

    // --- 照明の追加 ---
    const light1 = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 1, 0), scene);
    light1.intensity = 1.15;
    light1.specular = new BABYLON.Color3(0.3, 0.25, 0.2);

    const light2 = new BABYLON.DirectionalLight('dirLight', new BABYLON.Vector3(0, -1, 0.5), scene);
    light2.intensity = 0.85;
    light2.diffuse = new BABYLON.Color3(1.0, 0.98, 0.92);

    // --- ギャラリー展示室（建築構造）の生成 ---
    // 全体床 (コンパクトな 40m × 40m に縮小)
    const floor = BABYLON.MeshBuilder.CreateGround('floor', { width: 40, height: 40 }, scene);
    const floorMaterial = new BABYLON.StandardMaterial('floorMat', scene);
    floorMaterial.diffuseColor = new BABYLON.Color3(0.18, 0.16, 0.14);
    floor.material = floorMaterial;

    // 天井
    const ceiling = BABYLON.MeshBuilder.CreatePlane('ceiling', { width: 40, height: 40 }, scene);
    ceiling.rotation.x = Math.PI / 2;
    ceiling.position.y = 5.0;
    const ceilingMaterial = new BABYLON.StandardMaterial('ceilingMat', scene);
    ceilingMaterial.diffuseColor = new BABYLON.Color3(0.08, 0.07, 0.06);
    ceiling.material = ceilingMaterial;

    // 外壁 (壁の位置を ±20m 面に配置)
    const wallsMat = new BABYLON.StandardMaterial('wallsMat', scene);
    wallsMat.diffuseColor = new BABYLON.Color3(0.13, 0.12, 0.11);

    const wallLeft = BABYLON.MeshBuilder.CreateBox('wallLeft', { width: 1, height: 5.0, depth: 40 }, scene);
    wallLeft.position.set(-20.0, 2.5, 0);
    wallLeft.material = wallsMat;
    
    const wallRight = BABYLON.MeshBuilder.CreateBox('wallRight', { width: 1, height: 5.0, depth: 40 }, scene);
    wallRight.position.set(20.0, 2.5, 0);
    wallRight.material = wallsMat;

    const wallBack = BABYLON.MeshBuilder.CreateBox('wallBack', { width: 40, height: 5.0, depth: 1 }, scene);
    wallBack.position.set(0, 2.5, 20.0);
    wallBack.material = wallsMat;

    const wallFront = BABYLON.MeshBuilder.CreateBox('wallFront', { width: 40, height: 5.0, depth: 1 }, scene);
    wallFront.position.set(0, 2.5, -20.0);
    wallFront.material = wallsMat;

    // --- 中央の案内用仕切り壁の生成 ---
    // 横幅 12m, 高さ 4.0m, 厚さ 0.8m
    const centerWall = BABYLON.MeshBuilder.CreateBox('centerWall', { width: 12, height: 4.0, depth: 0.8 }, scene);
    centerWall.position.set(0, 2.0, -4.0); // Z = -4.0 の位置
    const centerWallMat = new BABYLON.StandardMaterial('centerWallMat', scene);
    centerWallMat.diffuseColor = new BABYLON.Color3(0.20, 0.18, 0.16);
    centerWall.material = centerWallMat;

    // --- 南壁中央の仕切り壁の生成（ソードとペンタクルの境界） ---
    // 横幅 0.8m, 高さ 5.0m, 奥行き 6.0m (Z = -20m 面から北方向に伸びる)
    const dividerWall = BABYLON.MeshBuilder.CreateBox('dividerWall', { width: 0.8, height: 5.0, depth: 6.0 }, scene);
    dividerWall.position.set(0, 2.5, -17.0);
    dividerWall.material = wallsMat;

    // --- 案内用壁掛けカード（ポータル）の設置（中央の島壁の南面に配置、間隔 2.0m） ---
    const roomPortals = [
      { name: '大アルカナ', key: 'major',     x: -4.0 },
      { name: 'ワンド',     key: 'wands',     x: -2.0 },
      { name: 'カップ',     key: 'cups',      x:  0.0 },
      { name: 'ソード',     key: 'swords',    x:  2.0 },
      { name: 'ペンタクル', key: 'pentacles', x:  4.0 },
    ];

    const previewImageMap: Record<string, string> = {
      major:     '/tarot/1.jpg',
      wands:     '/tarot/w1.jpg',
      cups:      '/tarot/c1.jpg',
      swords:    '/tarot/s1.jpg',
      pentacles: '/tarot/p1.jpg',
    };

    roomPortals.forEach(portal => {
      const portalZ = -4.41; // Z: -4.0 の壁面より少し手前

      // 額縁の生成
      const frame = BABYLON.MeshBuilder.CreateBox(`lobby_preview_frame_${portal.key}`, { width: 0.8, height: 1.25, depth: 0.06 }, scene);
      frame.position.set(portal.x, 2.2, portalZ);
      const frameMat = new BABYLON.StandardMaterial(`lobby_preview_frame_mat_${portal.key}`, scene);
      frameMat.diffuseColor = new BABYLON.Color3(0.08, 0.06, 0.04);
      frame.material = frameMat;

      // キャンバス
      const canvas = BABYLON.MeshBuilder.CreatePlane(`lobby_preview_canvas_${portal.key}`, { width: 0.72, height: 1.17 }, scene);
      canvas.position.set(portal.x, 2.2, portalZ - 0.04);
      canvas.rotation.y = 0; // 南向き（カメラ正面）

      const artMat = new BABYLON.StandardMaterial(`lobby_preview_art_mat_${portal.key}`, scene);
      artMat.diffuseTexture = new BABYLON.Texture(previewImageMap[portal.key], scene);
      canvas.material = artMat;
      canvas.metadata = { type: 'lobby_portal_card', key: portal.key };

      // 案内看板テキスト
      const sign = BABYLON.MeshBuilder.CreatePlane(`sign_${portal.key}`, { width: 0.8, height: 0.22 }, scene);
      sign.position.set(portal.x, 1.35, portalZ - 0.02);
      sign.rotation.y = 0;

      const signTexture = GUI.AdvancedDynamicTexture.CreateForMesh(sign, 256, 64);
      const textBlock = new GUI.TextBlock();
      textBlock.text = portal.name;
      textBlock.color = '#f4efe8';
      textBlock.fontSize = 24;
      textBlock.fontFamily = 'serif';
      textBlock.fontWeight = 'bold';

      const signBg = new GUI.Rectangle();
      signBg.background = '#1a1816';
      signBg.thickness = 1.0;
      signBg.color = '#b39369';
      signBg.addControl(textBlock);
      signTexture.addControl(signBg);

      sign.metadata = { type: 'portal', key: portal.key, name: portal.name };
    });

    // --- 78枚のタロットカードの配置分類 ---
    setLoadingProgress('絵画を展示中...');

    const categorizedCards = {
      major: [] as TarotCard[],
      wands: [] as TarotCard[],
      cups: [] as TarotCard[],
      swords: [] as TarotCard[],
      pentacles: [] as TarotCard[]
    };

    TAROT_CARDS.forEach(card => {
      const isMajor = !card.id.startsWith('wand') && !card.id.startsWith('cup') && !card.id.startsWith('sword') && !card.id.startsWith('pentacle');
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

    // --- 78枚のアートを外壁に壁掛け配置する関数 ---
    const renderWallGroup = (cards: TarotCard[], startX: number, startZ: number, stepX: number, stepZ: number, faceAngle: number) => {
      cards.forEach((card, index) => {
        const x = startX + stepX * index;
        const z = startZ + stepZ * index;
        const y = 2.0;

        // 額縁 (幅1.2m, 高さ1.9m)
        const frame = BABYLON.MeshBuilder.CreateBox(`frame_${card.id}`, { width: 1.2, height: 1.9, depth: 0.08 }, scene);
        frame.position.set(x, y, z);
        frame.rotation.y = faceAngle;

        const frameMat = new BABYLON.StandardMaterial(`frameMat_${card.id}`, scene);
        frameMat.diffuseColor = new BABYLON.Color3(0.08, 0.06, 0.04);
        frame.material = frameMat;

        // キャンバス (幅1.1m, 高さ1.75m)
        const canvas = BABYLON.MeshBuilder.CreatePlane(`canvas_${card.id}`, { width: 1.1, height: 1.75 }, scene);
        const offsetDist = 0.05;
        const offsetX = Math.sin(faceAngle) * offsetDist;
        const offsetZ = Math.cos(faceAngle) * offsetDist;
        
        canvas.position.set(x + offsetX, y, z + offsetZ);
        canvas.rotation.y = faceAngle + Math.PI;

        const artMat = new BABYLON.StandardMaterial(`artMat_${card.id}`, scene);
        artMat.diffuseTexture = new BABYLON.Texture(card.imagePath, scene);
        canvas.material = artMat;
        canvas.metadata = { type: 'card', data: card };

        // 各絵画の上の小さなスポットライト
        const lamp = BABYLON.MeshBuilder.CreateSphere(`lamp_${card.id}`, { diameter: 0.10 }, scene);
        const lampOffsetX = Math.sin(faceAngle) * 0.25;
        const lampOffsetZ = Math.cos(faceAngle) * 0.25;
        lamp.position.set(x + lampOffsetX, y + 1.1, z + lampOffsetZ);
        const lampMat = new BABYLON.StandardMaterial(`lampMat_${card.id}`, scene);
        lampMat.emissiveColor = new BABYLON.Color3(0.95, 0.9, 0.75);
        lamp.material = lampMat;
      });
    };

    // 1. 北壁（大アルカナ 22枚）: Z = 19.3m 面 (1.7m 間隔)
    renderWallGroup(categorizedCards.major, -17.85, 19.3, 1.7, 0, Math.PI); // 南向き

    // 2. 東壁（ワンド 14枚）: X = 19.3m 面 (2.3m 間隔)
    renderWallGroup(categorizedCards.wands, 19.3, 14.95, 0, -2.3, -Math.PI / 2); // 西向き

    // 3. 西壁（カップ 14枚）: X = -19.3m 面 (2.3m 間隔)
    renderWallGroup(categorizedCards.cups, -19.3, 14.95, 0, -2.3, Math.PI / 2); // 東向き

    // 4. 南壁・右半分（ソード 14枚）: Z = -19.3m 面 (1.1m 間隔)
    renderWallGroup(categorizedCards.swords, 2.0, -19.3, 1.1, 0, 0); // 北向き

    // 5. 南壁・左半分（ペンタクル 14枚）: Z = -19.3m 面 (1.1m 間隔)
    renderWallGroup(categorizedCards.pentacles, -16.3, -19.3, 1.1, 0, 0); // 北向き

    // --- クリック（タップ）によるイベント検知 ---
    scene.onPointerDown = (evt, pickResult) => {
      if (pickResult && pickResult.hit && pickResult.pickedMesh) {
        const mesh = pickResult.pickedMesh;
        const meta = mesh.metadata;

        if (meta) {
          if (meta.type === 'card') {
            onSelectCard(meta.data);
          } else if (meta.type === 'portal' || meta.type === 'lobby_portal_card') {
            onChangeRoom(meta.key);
          }
        }
      }
    };

    setLoadingProgress('');

    // --- アニメーションループ ---
    engine.runRenderLoop(() => {
      camera.rotation.x = 0;
      camera.rotation.z = 0;
      camera.cameraRotation.x = 0; // マウス・スマホでの縦ドラッグ完全無効化
      scene.render();
    });

    const handleResize = () => {
      engine.resize();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('keydown', handleKeyDown);
      canvas?.removeEventListener('touchstart', handleTouchStart);
      canvas?.removeEventListener('touchmove', handleTouchMove);
      engine.dispose();
    };
  }, [selectedRoom, onSelectCard, onChangeRoom]);

  const rooms = [
    { key: 'lobby', label: '🏛️ ロビー' },
    { key: 'major', label: '🃏 大アルカナ' },
    { key: 'wands', label: '🪄 ワンド' },
    { key: 'cups', label: '🍷 カップ' },
    { key: 'swords', label: '⚔️ ソード' },
    { key: 'pentacles', label: '🪙 ペンタクル' },
  ];

  return (
    <div className="relative w-full h-[500px] md:h-[600px] rounded-3xl overflow-hidden border border-[#ebdcd0] bg-[#1a1816] shadow-inner select-none">
      <canvas ref={canvasRef} className="w-full h-full block focus:outline-none" />

      {/* ビューワー内にオーバーレイする部屋セレクター */}
      <div className="absolute top-4 left-4 right-4 flex flex-wrap justify-center gap-1.5 bg-[#1a1816]/75 backdrop-blur-md p-1.5 rounded-2xl border border-[#b39369]/20 z-10">
        {rooms.map(room => (
          <button
            key={room.key}
            onClick={() => onChangeRoom(room.key)}
            className={`px-3 py-1 rounded-xl text-[10px] md:text-xs font-bold transition-all ${
              selectedRoom === room.key
                ? 'bg-[#b39369] text-white shadow-sm'
                : 'text-[#ebdcd0] hover:text-white hover:bg-white/10'
            }`}
          >
            {room.label}
          </button>
        ))}
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
