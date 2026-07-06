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

    // --- 選択した部屋に応じてカメラの初期位置を変える ---
    // ロビーや展示室の「中央の定位置」にカメラを置く
    let cameraStartPos = new BABYLON.Vector3(0, 1.7, -15); // デフォルトロビー位置
    if (selectedRoom === 'major') cameraStartPos = new BABYLON.Vector3(-20, 1.7, 20);
    else if (selectedRoom === 'wands') cameraStartPos = new BABYLON.Vector3(20, 1.7, 20);
    else if (selectedRoom === 'cups') cameraStartPos = new BABYLON.Vector3(-20, 1.7, -20);
    else if (selectedRoom === 'swords') cameraStartPos = new BABYLON.Vector3(20, 1.7, -20);
    else if (selectedRoom === 'pentacles') cameraStartPos = new BABYLON.Vector3(-20, 1.7, 0);

    const camera = new BABYLON.FreeCamera('freeCamera', cameraStartPos, scene);
    camera.attachControl(canvasRef.current, true);
    
    // カメラの初期方向を設定 (ロビー時は正面の展示室方向を向くように設定)
    if (selectedRoom === 'lobby') {
      // 整列した看板（Z: -10.5mあたり）を正面から見るように設定
      camera.setTarget(new BABYLON.Vector3(0, 1.7, -10.5));
    }
    
    // 前後左右の「移動キー」をすべて空配列にし、キーボードによる移動（歩行）を完全に禁止する
    camera.keysUp = [];
    camera.keysDown = [];
    camera.keysLeft = [];
    camera.keysRight = [];
    
    // 移動スピードを0に設定
    camera.speed = 0;
    camera.angularSensibility = 1000;
    
    // キーボードの矢印キー（左右）や A / D キーでの「回転のみ」をイベント処理でハンドリングする
    const handleKeyDown = (evt: KeyboardEvent) => {
      // 矢印左(37) または A(65)
      if (evt.keyCode === 37 || evt.keyCode === 65) {
        camera.cameraRotation.y -= 0.05;
      }
      // 矢印右(39) または D(68)
      if (evt.keyCode === 39 || evt.keyCode === 68) {
        camera.cameraRotation.y += 0.05;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    
    // 衝突判定と重力（静止カメラなので不要ですが念のため残します）
    scene.collisionsEnabled = false;
    camera.checkCollisions = false;
    camera.applyGravity = false;

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

    // 仕切り用の壁配置（通路部分をくり抜くため、ソリッドな長壁を複数に分割して開口部を作る）
    const walls = [
      // 中央縦壁（北側: z: 10m〜42.5m, 南側: z: -42.5m〜-10m）
      { x: 0, z: 26.25, w: 1, d: 32.5 },
      { x: 0, z: -26.25, w: 1, d: 32.5 },
      
      // ロビー正面境界壁 (開口部を通るように調整)
      // 左側部屋（カップ・ペンタクル・大アルカナ）の仕切り
      { x: -30, z: -10, w: 20, d: 1 }, // 通路用に中間にスペースを作る (x: -20付近にドア)
      { x: -10, z: -10, w: 15, d: 1 },
      
      // 右側部屋（ソード・ワンド）の仕切り
      { x: 10, z: -10, w: 15, d: 1 },
      { x: 30, z: -10, w: 20, d: 1 } // (x: 20付近にドア)
    ];

    walls.forEach((pos, idx) => {
      const w = BABYLON.MeshBuilder.CreateBox(`partWall_${idx}`, { width: pos.w, height: 5.5, depth: pos.d }, scene);
      w.position.set(pos.x, 2.75, pos.z);
      w.material = partitionMaterial;
      w.checkCollisions = true;
    });

    // --- 各展示室への扉 / ワープポータルを設置 ---
    // ロビーから案内板を正面から読めるよう、ロビー内部の円形（Z: -12m〜-10mあたり）に配置し、看板がすべて中央（0, 1.7, -15）側を向くように設定します。
    const roomPortals = [
      { name: '大アルカナ室', key: 'major', x: -3.5, z: -10.5, rotationY: Math.PI / 6 },
      { name: 'ワンド室', key: 'wands', x: 3.5, z: -10.5, rotationY: -Math.PI / 6 },
      { name: 'カップ室', key: 'cups', x: -5.5, z: -12.5, rotationY: Math.PI / 3 },
      { name: 'ソード室', key: 'swords', x: 5.5, z: -12.5, rotationY: -Math.PI / 3 },
      { name: 'ペンタクル室', key: 'pentacles', x: -6.5, z: -14.5, rotationY: Math.PI / 2 },
      { name: 'ロビーへ戻る', key: 'lobby', x: 0, z: -25.5, rotationY: 0 } // ロビー以外の部屋用
    ];

    roomPortals.forEach(portal => {
      // 案内看板として立体柱を設置
      const pillar = BABYLON.MeshBuilder.CreateCylinder(`portal_${portal.key}`, { height: 2.2, diameter: 0.8 }, scene);
      pillar.position.set(portal.x, 1.1, portal.z);
      
      const pillarMat = new BABYLON.StandardMaterial(`pillarMat_${portal.key}`, scene);
      pillarMat.diffuseColor = portal.key === 'lobby' ? new BABYLON.Color3(0.5, 0.2, 0.2) : new BABYLON.Color3(0.65, 0.52, 0.35);
      pillarMat.emissiveColor = portal.key === 'lobby' ? new BABYLON.Color3(0.15, 0.05, 0.05) : new BABYLON.Color3(0.1, 0.08, 0.05);
      pillar.material = pillarMat;
      pillar.metadata = { type: 'portal', key: portal.key, name: portal.name };

      // 看板テキストボード（看板の正面をプレイヤー向きに回転）
      const sign = BABYLON.MeshBuilder.CreatePlane(`sign_${portal.key}`, { width: 1.2, height: 0.5 }, scene);
      sign.position.set(portal.x, 2.0, portal.z);
      sign.rotation.y = (portal.rotationY || 0) + Math.PI; // プレイヤーの方向（手前）を向くように設定
      
      // DynamicTextureによるテキスト描画
      const signTexture = GUI.AdvancedDynamicTexture.CreateForMesh(sign, 512, 256);
      
      const textBlock = new GUI.TextBlock();
      textBlock.text = portal.name;
      textBlock.color = "#f4efe8"; // 明るいアンティークベージュ
      textBlock.fontSize = 44;
      textBlock.fontFamily = "serif";
      textBlock.fontWeight = "bold";
      
      // 看板全体の背景色設定
      const signBg = new GUI.Rectangle();
      signBg.background = "#1a1816"; // シックなダーク背景
      signBg.thickness = 2;
      signBg.color = portal.key === 'lobby' ? "#a63c3c" : "#b39369"; // 枠線カラー
      signBg.addControl(textBlock);
      
      signTexture.addControl(signBg);

      // --- 【要件追加】ロビーの看板の上に、対応する展示室を象徴する画像（5枚）を飾る ---
      if (portal.key !== 'lobby') {
        // 各展示室の「象徴的なカード画像パス」をマッピング
        const previewImageMap: Record<string, string> = {
          major: "/tarot/magician.jpg", // 大アルカナ
          wands: "/tarot/w1.jpg",      // ワンド
          cups: "/tarot/c1.jpg",       // カップ
          swords: "/tarot/s1.jpg",     // ソード
          pentacles: "/tarot/p1.jpg"   // ペンタクル
        };

        // 看板の真上（Y: 2.85m付近）にミニ額縁として画像を飾る
        const frame = BABYLON.MeshBuilder.CreateBox(`lobby_preview_frame_${portal.key}`, { width: 0.9, height: 1.2, depth: 0.1 }, scene);
        frame.position.set(portal.x, 2.85, portal.z);
        frame.rotation.y = (portal.rotationY || 0) + Math.PI;
        const frameMat = new BABYLON.StandardMaterial(`lobby_preview_frame_mat_${portal.key}`, scene);
        frameMat.diffuseColor = new BABYLON.Color3(0.08, 0.06, 0.04);
        frame.material = frameMat;

        const canvas = BABYLON.MeshBuilder.CreatePlane(`lobby_preview_canvas_${portal.key}`, { width: 0.8, height: 1.1 }, scene);
        // 額縁の少し手前
        const rad = portal.rotationY || 0;
        canvas.position.set(
          portal.x + Math.sin(rad) * 0.06,
          2.85,
          portal.z - Math.cos(rad) * 0.06
        );
        canvas.rotation.y = rad + Math.PI;

        const artMat = new BABYLON.StandardMaterial(`lobby_preview_art_mat_${portal.key}`, scene);
        artMat.diffuseTexture = new BABYLON.Texture(previewImageMap[portal.key], scene);
        canvas.material = artMat;

        // メタデータに "lobby_portal_card" として登録し、クリック時に部屋ワープをトリガーさせる
        canvas.metadata = { type: 'lobby_portal_card', key: portal.key };
      }
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
          } else if (meta.type === 'portal' || meta.type === 'lobby_portal_card') {
            // 看板・柱、あるいはロビーの5枚のポータル絵画をクリックしたら部屋を切り替える
            onChangeRoom(meta.key);
          }
        }
      }
    };

    setLoadingProgress('');

    // --- アニメーションループ ---
    engine.runRenderLoop(() => {
      // 縦方向の首振り（ピッチ・ロール）を完全にロックし、左右の回転（ヨー）のみを許可する
      camera.rotation.x = 0;
      camera.rotation.z = 0;
      scene.render();
    });

    const handleResize = () => {
      engine.resize();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('keydown', handleKeyDown);
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
