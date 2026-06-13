import { useMemo } from 'react'
import { motion } from 'framer-motion'

const TRIGRAMS = ['☰', '☱', '☲', '☳', '☴', '☵', '☶', '☷']

const isMobile = typeof window !== 'undefined' && window.innerWidth < 768

function BaguaRing({ radius, count, speed, opacity, color }: {
  radius: number
  count: number
  speed: number
  opacity: number
  color: string
}) {
  const symbols = useMemo(() =>
    Array.from({ length: count }, (_, i) => ({
      symbol: TRIGRAMS[i % TRIGRAMS.length],
      angle: (360 / count) * i,
    })), [count])

  return (
    <motion.div
      className="absolute rounded-full"
      style={{
        width: radius * 2,
        height: radius * 2,
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        border: `1px solid rgba(${color}, ${opacity * 0.2})`,
      }}
      animate={{ rotate: speed > 0 ? 360 : -360 }}
      transition={{ duration: Math.abs(speed), repeat: Infinity, ease: 'linear' }}
    >
      {symbols.map((s, i) => (
        <span
          key={i}
          className="absolute"
          style={{
            left: '50%',
            top: '50%',
            transform: `rotate(${s.angle}deg) translateY(-${radius}px) translate(-50%, -50%)`,
            fontSize: `${12 + radius * 0.02}px`,
            color: `rgba(${color}, ${opacity})`,
          }}
        >
          {s.symbol}
        </span>
      ))}
    </motion.div>
  )
}

function ShootingStar({ delay, top, left }: { delay: number; top: number; left: number }) {
  return (
    <motion.div
      className="absolute w-[1.5px] h-[1.5px] bg-white rounded-full"
      style={{ top: `${top}%`, left: `${left}%` }}
      animate={{
        x: [0, 160],
        y: [0, 100],
        opacity: [0, 0.8, 0.8, 0],
        boxShadow: [
          '0 0 3px 1px rgba(255,255,255,0.4)',
          '0 0 6px 3px rgba(165,180,252,0.5)',
          '0 0 3px 1px rgba(255,255,255,0.2)',
          '0 0 0px 0px transparent',
        ],
      }}
      transition={{
        duration: 1,
        delay,
        repeat: Infinity,
        repeatDelay: 12 + Math.random() * 15,
        ease: 'easeOut',
      }}
    />
  )
}

function FloatingParticle({ symbol, color, size, x, duration, delay }: {
  symbol: string
  color: string
  size: number
  x: number
  duration: number
  delay: number
}) {
  return (
    <motion.span
      className="absolute select-none"
      style={{
        left: `${x}%`,
        bottom: '-40px',
        fontSize: `${size}px`,
        color,
      }}
      animate={{
        y: [0, -(typeof window !== 'undefined' ? window.innerHeight + 80 : 1200)],
        x: [0, (Math.random() - 0.5) * 60],
        rotate: [0, 360 * (Math.random() > 0.5 ? 1 : -1)],
        opacity: [0, 0.4, 0.4, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'linear',
      }}
    >
      {symbol}
    </motion.span>
  )
}

export default function MysticalBackground() {
  const particleCount = isMobile ? 4 : 8
  const shootingStarCount = isMobile ? 1 : 2

  const particles = useMemo(() => {
    const colors = [
      'rgba(165,180,252,0.35)',
      'rgba(167,139,250,0.3)',
      'rgba(251,191,36,0.25)',
    ]
    return Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      symbol: TRIGRAMS[i % TRIGRAMS.length],
      color: colors[i % colors.length],
      x: 10 + Math.random() * 80,
      delay: Math.random() * 25,
      duration: 18 + Math.random() * 22,
      size: 10 + Math.random() * (isMobile ? 8 : 14),
    }))
  }, [])

  const shootingStars = useMemo(() =>
    Array.from({ length: shootingStarCount }, (_, i) => ({
      id: i,
      delay: i * 6 + Math.random() * 8,
      top: Math.random() * 35,
      left: Math.random() * 60,
    })), [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <BaguaRing radius={isMobile ? 100 : 160} count={8} speed={80} opacity={isMobile ? 0.05 : 0.06} color="99,102,241" />

      {shootingStars.map(s => (
        <ShootingStar key={s.id} delay={s.delay} top={s.top} left={s.left} />
      ))}

      {particles.map(p => (
        <FloatingParticle key={p.id} {...p} />
      ))}
    </div>
  )
}
