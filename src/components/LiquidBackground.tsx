'use client';

import { useEffect, useRef, useId } from 'react';

interface LiquidBackgroundProps {
  scrollProgress: number; // 0が満タン、1が空
  fixedPosition?: boolean; // モバイル版で固定位置にするかどうか
}

export default function LiquidBackground({ scrollProgress, fixedPosition = false }: LiquidBackgroundProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const gradientId = useId(); // ユニークなIDを生成
  
  // 【重要】 最新のprogressを保持するためのRef
  // これにより、アニメーションループをリセットせずに水位だけを変更できます
  const progressRef = useRef(scrollProgress);

  // propsが変わったらRefを同期
  // fixedPositionがtrueの場合は常に0（満タン）に設定
  useEffect(() => {
    if (fixedPosition) {
      progressRef.current = 0;
    } else {
      progressRef.current = scrollProgress;
    }
  }, [scrollProgress, fixedPosition]);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    // prefers-reduced-motion が有効な場合は静的な水面を表示
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const paths = svg.querySelectorAll('path');
    let animationId: number;
    let time = 0;

    // 波の設定：[速さ, 高さ(振幅), 周波数, 位相ズレ]
    const layers = [
      { speed: 0.002, amp: 5, freq: 0.015, offset: 0 },   // 奥
      { speed: 0.003, amp: 7, freq: 0.025, offset: 2 },   // 中
      { speed: 0.004, amp: 4, freq: 0.03, offset: 4 },    // 手前
    ];

    // 静的な水面パスを生成する関数
    const setStaticPaths = () => {
      const currentProgress = progressRef.current;
      const progress = fixedPosition ? 0 : currentProgress;
      const baseY = 15 + (progress * 105);

      paths.forEach(() => {
        // フラットな水面
      });
      paths.forEach((path) => {
        const pathData = `M 0,100 L 0,${baseY} L 100,${baseY} L 100,100 Z`;
        path.setAttribute('d', pathData);
      });
    };

    if (prefersReducedMotion) {
      setStaticPaths();
      return;
    }

    const animate = () => {
      time += 1;

      // Refから最新の進捗を取得
      const currentProgress = progressRef.current;

      // 水位の計算
      // 0 (満タン) -> 15
      // 1 (空) -> 110 (画面外)
      // モバイル版で固定位置の場合は、高い位置（満タン）で固定
      const progress = fixedPosition ? 0 : currentProgress;
      const baseY = 15 + (progress * 105);

      paths.forEach((path, layerIndex) => {
        const layer = layers[layerIndex % layers.length];
        const points = [];
        const segments = 40;

        for (let i = 0; i <= segments; i++) {
          const x = (i / segments) * 100;

          // ノイズのような動きを作るための波の合成
          const y1 = Math.sin(time * layer.speed + x * layer.freq + layer.offset);
          const y2 = Math.sin(time * layer.speed * 1.5 + x * layer.freq * 2.5) * 0.3;

          // 進捗に合わせて波を少し穏やかにする（液体が減る演出）
          // fixedPositionの場合は常に満タン状態なので、dampenerは1.0
          const progressForDampener = fixedPosition ? 0 : currentProgress;
          const dampener = Math.max(0.2, 1 - (progressForDampener * 0.8));
          const waveY = (y1 + y2) * layer.amp * dampener;

          points.push([x, baseY + waveY]);
        }

        const pathData = [
          `M 0,100`,
          `L 0,${points[0][1]}`,
          ...points.map(p => `L ${p[0]},${p[1]}`),
          `L 100,${points[points.length - 1][1]}`,
          `L 100,100`,
          `Z`
        ].join(' ');

        path.setAttribute('d', pathData);
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();
    
    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []); // 依存配列は空（マウント時のみ起動）

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <svg
        ref={svgRef}
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="none"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#4e342e" /> {/* 表面: 明るめ */}
            <stop offset="100%" stopColor="#251610" /> {/* 深層: 濃い色 */}
          </linearGradient>
        </defs>
        
        <path fill={`url(#${gradientId})`} opacity="0.6" />
        <path fill={`url(#${gradientId})`} opacity="0.8" />
        <path fill={`url(#${gradientId})`} opacity="1.0" />
      </svg>
    </div>
  );
}
