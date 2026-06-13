import { useMemo } from 'react'
import { motion } from 'framer-motion'

const SYMBOLS = ['✦', '✧', '☯', '☰', '☱', '☲', '☳', '☴', '☵', '☶', '☷', '⬡', '◇', '✴']

export default function MysticalBackground() {
  const particles = useMemo(() => {
    return Array.from({ length: 18 }, (_, i) => ({
      id: i,
      symbol: SYMBOLS[i % SYMBOLS.length],
      left: Math.random() * 100,
      delay: Math.random() * 15,
      duration: 15 + Math.random() * 20,
      size: 10 + Math.random() * 16,
      opacity: 0.06 + Math.random() * 0.1,
    }))
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map(p => (
        <motion.span
          key={p.id}
          className="absolute text-nebula-300 select-none"
          style={{
            left: `${p.left}%`,
            bottom: '-30px',
            fontSize: `${p.size}px`,
            opacity: p.opacity,
          }}
          animate={{
            y: [0, -window.innerHeight - 60],
            rotate: [0, 360],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          {p.symbol}
        </motion.span>
      ))}
    </div>
  )
}
