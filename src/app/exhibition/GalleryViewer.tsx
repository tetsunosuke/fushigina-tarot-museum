'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as BABYLON from 'babylonjs';
import 'babylonjs-loaders';
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

    // --- 選択した部屋に応じてカメラの初期位置を変える ---
    let cameraStartPos = new BABYLON.Vector3(0, 1.7, -15); // デフォルトロビー位置
    if (selectedRoom === 'major') cameraStartPos = new BABYLON.Vector3(-20, 1.7, 20 - 5);
    else if (selectedRoom === 'wands') cameraStartPos = new BABYLON.Vector3(20, 1.7, 20 - 5);
    else if (selectedRoom === 'cups') cameraStartPos = new BABYLON.Vector3(-20, 1.7, -20 - 5);
    else if (selectedRoom === 'swords') cameraStartPos = new BABYLON.Vector3(20, 1.7, -20 - 5);
    else if (selectedRoom === 'pentacles') cameraStartPos = new BABYLON.Vector3(-20, 1.7, 0 - 5);

    const camera = new BABYLON.FreeCamera('freeCamera', cameraStartPos, scene);
    camera.attachControl(canvasRef.current, true);
    
    // 操作キー設定（WASDと矢印キー）
    camera.keysUp = [87, 38];
    camera.keysDown = [83, 40];
    camera.keysLeft = [65, 37];
    camera.keysRight = [68, 39];
    
    camera.speed = 0.35;
    camera.angularSensibility = 1000;
    
    // 衝突判定と重力
    scene.collisionsEnabled = true;
    camera.checkCollisions = true;
    camera.applyGravity = true;
    camera.ellipsoid = new BABYLON.Vector3(0.6, 0.9, 0.6);

    // --- 照明の追加 ---
    const light1 = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 1, 0), scene);
    light1.intensity = 0.65;
    light1.specular = new BABYLON.Color3(0.2, 0.15, 0.1);

    const light2 = new BABYLON.DirectionalLight('dirLight', new BABYLON.Vector3(0, -1, 0.5), scene);
    light2.intensity = 0.45;
    light2.diffuse = new BABYLON.Color3(1.0, 0.95, 0.85);

    // --- ギズモ / 案内標識などを設置するマテリアル ---
    const labelMat = new BABYLON.StandardMaterial('labelMat', scene);
    labelMat.emissiveColor = new BABYLON.Color3(0.85, 0.72, 0.53); // 温かいゴールド

    // --- ギャラリー展示室（建築構造）の生成 ---
    // ロビーと5つの部屋が入る全体床 (80m × 80m)
    const floor = BABYLON.MeshBuilder.CreateGround('floor', { width: 85, height: 85 }, scene);
    const floorMaterial = new BABYLON.StandardMaterial('floorMat', scene);
    floorMaterial.diffuseColor = new BABYLON.Color3(0.18, 0.16, 0.14);
    floor.material = floorMaterial;
    floor.checkCollisions = true;

    // 天井
    const ceiling = BABYLON.MeshBuilder.CreatePlane('ceiling', { width: 85, height: 85 }, scene);
    ceiling.rotation.x = Math.PI / 2;
    ceiling.position.y = 5.5;
    const ceilingMaterial = new BABYLON.StandardMaterial('ceilingMat', scene);
    ceilingMaterial.diffuseColor = new BABYLON.Color3(0.08, 0.07, 0.06);
    ceiling.material = ceilingMaterial;

    // 外壁
    const wallLeft = BABYLON.MeshBuilder.CreateBox('wallLeft', { width: 1, height: 5.5, depth: 85 }, scene);
    wallLeft.position.set(-42.5, 2.75, 0);
    wallLeft.checkCollisions = true;
    
    const wallRight = BABYLON.MeshBuilder.CreateBox('wallRight', { width: 1, height: 5.5, depth: 85 }, scene);
    wallRight.position.set(42.5, 2.75, 0);
    wallRight.checkCollisions = true;

    const wallBack = BABYLON.MeshBuilder.CreateBox('wallBack', { width: 85, height: 5.5, depth: 1 }, scene);
    wallBack.position.set(0, 2.75, 42.5);
    wallBack.checkCollisions = true;

    const wallFront = BABYLON.MeshBuilder.CreateBox('wallFront', { width: 85, height: 5.5, depth: 1 }, scene);
    wallFront.position.set(0, 2.75, -42.5);
    wallFront.checkCollisions = true;

    const wallsMat = new BABYLON.StandardMaterial('wallsMat', scene);
    wallsMat.diffuseColor = new BABYLON.Color3(0.13, 0.12, 0.11);
    wallLeft.material = wallsMat;
    wallRight.material = wallsMat;
    wallBack.material = wallsMat;
    wallFront.material = wallsMat;

    // --- ロビーと各展示室の仕切り壁の生成 ---
    const partitionMaterial = new BABYLON.StandardMaterial('partitionMat', scene);
    partitionMaterial.diffuseColor = new BABYLON.Color3(0.20, 0.18, 0.16);

    // 仕切り用の壁配置
    const walls = [
      // 中央縦壁
      { x: 0, z: 0, w: 1, d: 85 },
      // 中央横壁
      { x: -21.25, z: 0, w: 42.5, d: 1 },
      { x: 21.25, z: 0, w: 42.5, d: 1 },
      // ロビー境界壁 (z: -10m 付近をロビー境界に)
      { x: -21.25, z: -10, w: 42.5, d: 1 },
      { x: 21.25, z: -10, w: 42.5, d: 1 }
    ];

    walls.forEach((pos, idx) => {
      const w = BABYLON.MeshBuilder.CreateBox(`partWall_${idx}`, { width: pos.w, height: 5.5, depth: pos.d }, scene);
      w.position.set(pos.x, 2.75, pos.z);
      w.material = partitionMaterial;
      w.checkCollisions = true;
    });

    // --- 各展示室への扉 / ワープポータルを設置 ---
    const roomPortals = [
      { name: '大アルカナ室', key: 'major', x: -20, z: -9.5, destX: -20, destZ: 15 },
      { name: 'ワンド室', key: 'wands', x: 20, z: -9.5, destX: 20, destZ: 15 },
      { name: 'カップ室', key: 'cups', x: -20, z: -10.5, destX: -20, destZ: -25 },
      { name: 'ソード室', key: 'swords', x: 20, z: -10.5, destX: 20, destZ: -25 },
      { name: 'ペンタクル室', key: 'pentacles', x: -20, z: -0.5, destX: -20, destZ: -5 },
      { name: 'ロビーへ戻る', key: 'lobby', x: 0, z: -14, destX: 0, destZ: -15 }
    ];

    roomPortals.forEach(portal => {
      // 案内看板として立体柱を設置
      const pillar = BABYLON.MeshBuilder.CreateCylinder(`portal_${portal.key}`, { height: 2.2, diameter: 0.8 }, scene);
      pillar.position.set(portal.x, 1.1, portal.z);
      
      const pillarMat = new BABYLON.StandardMaterial(`pillarMat_${portal.key}`, scene);
      // ロビーへ戻るポータルは赤め、その他はゴールドに
      pillarMat.diffuseColor = portal.key === 'lobby' ? new BABYLON.Color3(0.5, 0.2, 0.2) : new BABYLON.Color3(0.65, 0.52, 0.35);
      pillarMat.emissiveColor = portal.key === 'lobby' ? new BABYLON.Color3(0.15, 0.05, 0.05) : new BABYLON.Color3(0.1, 0.08, 0.05);
      pillar.material = pillarMat;
      pillar.metadata = { type: 'portal', key: portal.key, name: portal.name };

      // 看板テキストボード
      const sign = BABYLON.MeshBuilder.CreatePlane(`sign_${portal.key}`, { width: 1.2, height: 0.5 }, scene);
      sign.position.set(portal.x, 2.0, portal.z - 0.41);
      const signMat = new BABYLON.StandardMaterial(`signMat_${portal.key}`, scene);
      signMat.diffuseColor = new BABYLON.Color3(0.08, 0.07, 0.06);
      sign.material = signMat;
    });

    // --- 78枚のタロットアートの分類配置 ---
    setLoadingProgress('絵画を展示中...');

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

    // 展示個室での円状配置のレンダリング
    const renderRoom = (cards: TarotCard[], centerOffset: { x: number; z: number }) => {
      const total = cards.length;
      cards.forEach((card, index) => {
        const angle = (index / total) * Math.PI * 2;
        const radius = 8.0;

        const x = centerOffset.x + Math.sin(angle) * radius;
        const z = centerOffset.z + Math.cos(angle) * radius;
        const y = 2.0;

        // フレーム
        const frame = BABYLON.MeshBuilder.CreateBox(`frame_${card.id}`, { width: 1.6, height: 2.5, depth: 0.12 }, scene);
        frame.position.set(x, y, z);
        frame.rotation.y = angle + Math.PI;

        const frameMat = new BABYLON.StandardMaterial(`frameMat_${card.id}`, scene);
        frameMat.diffuseColor = new BABYLON.Color3(0.08, 0.06, 0.04);
        frame.material = frameMat;
        frame.checkCollisions = true;

        // キャンバス
        const canvas = BABYLON.MeshBuilder.CreatePlane(`canvas_${card.id}`, { width: 1.45, height: 2.3 }, scene);
        canvas.position.set(x + Math.sin(angle) * -0.07, y, z + Math.cos(angle) * -0.07);
        canvas.rotation.y = angle;

        const artMat = new BABYLON.StandardMaterial(`artMat_${card.id}`, scene);
        artMat.diffuseTexture = new BABYLON.Texture(card.imagePath, scene);
        canvas.material = artMat;
        canvas.metadata = { type: 'card', data: card };

        // スポットライト
        const lamp = BABYLON.MeshBuilder.CreateSphere(`lamp_${card.id}`, { diameter: 0.12 }, scene);
        lamp.position.set(x + Math.sin(angle) * -0.3, y + 1.4, z + Math.cos(angle) * -0.3);
        const lampMat = new BABYLON.StandardMaterial(`lampMat_${card.id}`, scene);
        lampMat.emissiveColor = new BABYLON.Color3(0.95, 0.9, 0.75);
        lamp.material = lampMat;
      });
    };

    // 5つの部屋それぞれに円状壁面配置
    renderRoom(categorizedCards.major, { x: -20, z: 20 });
    renderRoom(categorizedCards.wands, { x: 20, z: 20 });
    renderRoom(categorizedCards.cups, { x: -20, z: -20 });
    renderRoom(categorizedCards.swords, { x: 20, z: -20 });
    renderRoom(categorizedCards.pentacles, { x: -20, z: 0 });

    // --- クリック（タップ）によるイベント検知 ---
    scene.onPointerDown = (evt, pickResult) => {
      if (pickResult && pickResult.hit && pickResult.pickedMesh) {
        const mesh = pickResult.pickedMesh;
        const meta = mesh.metadata;

        if (meta) {
          if (meta.type === 'card') {
            onSelectCard(meta.data);
          } else if (meta.type === 'portal') {
            // 看板・柱をクリックしたら部屋を切り替える
            onChangeRoom(meta.key);
          }
        }
      }
    };

    setLoadingProgress('');

    // --- アニメーションループ ---
    engine.runRenderLoop(() => {
      scene.render();
    });

    const handleResize = () => {
      engine.resize();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      engine.dispose();
    };
  }, [selectedRoom, onSelectCard, onChangeRoom]);

  return (
    <div className="relative w-full h-[500px] md:h-[600px] rounded-3xl overflow-hidden border border-[#ebdcd0] bg-[#1a1816] shadow-inner select-none">
      <canvas ref={canvasRef} className="w-full h-full block focus:outline-none" />
      
      {loadingProgress && (
        <div className="absolute inset-0 bg-[#121110] flex flex-col items-center justify-center gap-3">
          <div className="w-6 h-6 border-2 border-[#b39369] border-t-transparent rounded-full animate-spin"></div>
          <span className="text-[10px] text-[#8e857b] font-mono tracking-widest uppercase">{loadingProgress}</span>
        </div>
      )}
    </div>
  );
}
