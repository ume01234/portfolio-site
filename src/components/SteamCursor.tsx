'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SteamCursor() {
  const [steams, setSteams] = useState<{ id: number; x: number; y: number }[]>([]);

  useEffect(() => {
    // prefers-reduced-motion が有効な場合はカーソルエフェクトを無効化
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      // 負荷軽減のため、マウスイベントの間引き（数回に1回だけ生成）
      if (Math.random() > 0.3) return;

      const newSteam = {
        id: Date.now() + Math.random(), // ユニークID生成（Date.now()ベース）
        x: e.clientX,
        y: e.clientY,
      };

      setSteams((prev) => [...prev.slice(-20), newSteam]); // 最大20個まで保持

      // 一定時間後に消す（Stateからも削除してメモリリーク防ぐ）
      setTimeout(() => {
        setSteams((prev) => prev.filter((s) => s.id !== newSteam.id));
      }, 2000);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[60] overflow-hidden">
      <AnimatePresence>
        {steams.map((steam) => (
          <motion.div
            key={steam.id}
            initial={{ 
              opacity: 0.4, 
              scale: 0.3,
              x: steam.x - 8, // 中心位置に調整（w-4 = 16pxなので8pxオフセット）
              y: steam.y - 8,
            }}
            animate={{
              opacity: [0.4, 0.6, 0],
              scale: [0.3, 1.5, 2],
              x: steam.x - 8 + (Math.random() - 0.5) * 30, // 左右に少し揺れる
              y: steam.y - 8 - 80, // 上に昇る
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute w-4 h-4 rounded-full blur-md"
            style={{
              background: 'radial-gradient(circle, rgba(255,255,255,0.6) 0%, rgba(200,180,160,0.3) 50%, transparent 100%)',
              borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
              left: 0,
              top: 0,
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}