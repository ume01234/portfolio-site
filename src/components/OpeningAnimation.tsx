'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface OpeningAnimationProps {
  onComplete: () => void;
}

export default function OpeningAnimation({ onComplete }: OpeningAnimationProps) {
  const [isFinished, setIsFinished] = useState(false);
  const hasCompleted = useRef(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const fadeTimerRef = useRef<NodeJS.Timeout | null>(null);

  const finishAnimation = useCallback(() => {
    if (hasCompleted.current) return;
    hasCompleted.current = true;

    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    if (fadeTimerRef.current) {
      clearTimeout(fadeTimerRef.current);
      fadeTimerRef.current = null;
    }

    setIsFinished(true);
    fadeTimerRef.current = setTimeout(onComplete, 800);
  }, [onComplete]);

  // アニメーション全体のシーケンス管理
  useEffect(() => {
    // 合計時間が経過したら完了通知を送る
    // 線画(1.5s) + 注ぎ(0.5s) + 溜まる(2.0s) + 余韻(0.5s) = 約4.5s
    timerRef.current = setTimeout(() => {
      finishAnimation();
    }, 4500);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (fadeTimerRef.current) clearTimeout(fadeTimerRef.current);
    };
  }, [finishAnimation]);

  // カップの形状（パスデータ）
  const cupPath = "M 30 40 L 30 85 Q 30 100 45 100 L 75 100 Q 90 100 90 85 L 90 40";
  const handlePath = "M 90 55 Q 105 55 105 70 Q 105 85 90 85";

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }} // 完了時にふわっと消える
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#f5f0e6] cursor-pointer" // 背景色: Latte/Cream
          onClick={finishAnimation}
        >
          <div className="relative w-64 h-64">
            <svg
              viewBox="0 0 120 120"
              className="w-full h-full drop-shadow-xl"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                {/* 液体をカップの形に切り抜くためのマスク */}
                <mask id="cup-mask">
                  <path d={cupPath} fill="white" />
                </mask>
                {/* コーヒーのグラデーション */}
                <linearGradient id="liquid-gradient" x1="0" y1="1" x2="0" y2="0">
                  <stop offset="0%" stopColor="#2c1810" />
                  <stop offset="100%" stopColor="#4e342e" />
                </linearGradient>
              </defs>

              {/* 1. 注がれるコーヒー（上からの一本線） */}
              <motion.line
                x1="60" y1="0" x2="60" y2="100"
                stroke="#2c1810"
                strokeWidth="4"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{
                  pathLength: [0, 1, 1],
                  opacity: [0, 1, 0], // 注ぎ終わったら消える
                  y: [0, 0, 15] // 少し下に落ちる動き
                }}
                transition={{
                  duration: 2.5,
                  times: [0, 0.2, 1], // 最初の20%で出現、最後は消える
                  delay: 1.2, // カップが描かれ始めてから注ぐ
                  ease: "linear"
                }}
              />

              {/* 2. カップの中に溜まっていく液体 */}
              <g mask="url(#cup-mask)">
                <motion.rect
                  x="0" y="100" width="120" height="100"
                  fill="url(#liquid-gradient)"
                  initial={{ y: 0 }}
                  animate={{ y: -65 }} // 下から上へ水位上昇
                  transition={{
                    duration: 2.0,
                    delay: 1.5, // 注ぎ始めと同期
                    ease: "easeInOut"
                  }}
                />

                {/* 液面のゆらぎ（波） */}
                <motion.path
                  d="M 0 0 Q 60 10 120 0"
                  fill="none"
                  stroke="#5d4e37"
                  strokeWidth="2"
                  strokeOpacity="0.3"
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ y: 35, opacity: 1 }}
                  transition={{ duration: 2.0, delay: 1.5 }}
                />
              </g>

              {/* 3. カップの輪郭線（ライン描画アニメーション） */}
              <motion.path
                d={cupPath}
                fill="none"
                stroke="#3e2723"
                strokeWidth="3"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              />
              <motion.path
                d={handlePath}
                fill="none"
                stroke="#3e2723"
                strokeWidth="3"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
              />

              {/* 4. 湯気（最後にふわっと出現） */}
              {[1, 2, 3].map((i) => (
                <motion.path
                  key={i}
                  d={`M ${45 + i * 10} 30 Q ${50 + i * 10} 20 ${45 + i * 10} 10`}
                  fill="none"
                  stroke="#8d6e63"
                  strokeWidth="2"
                  strokeLinecap="round"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: [0, 0.6, 0], y: -10 }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: 3.5 + i * 0.2, // すべてが終わった頃に出現
                    ease: "easeInOut"
                  }}
                />
              ))}
            </svg>
          </div>

          {/* テキスト */}
          <div className="absolute bottom-10 flex flex-col items-center gap-2">
            <motion.div
              className="text-[#3e2723] font-serif tracking-widest text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              BREWING...
            </motion.div>
            <motion.div
              className="text-[#3e2723]/30 text-xs tracking-wide"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              Click to skip
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
