import { useMemo } from 'react'
import { motion } from 'framer-motion'

const TRIGRAMS = ['☰', '☱', '☲', '☳', '☴', '☵', '☶', '☷']
const MYSTIC_SYMBOLS = ['✦', '✧', '☯', '⬡', '◇', '✴', '⟡', '⊛']

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
        border: `1px solid rgba(${color}, ${opacity * 0.3})`,
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
            fontSize: `${14 + radius * 0.03}px`,
            color: `rgba(${color}, ${opacity})`,
            textShadow: `0 0 8px rgba(${color}, ${opacity * 0.5})`,
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
      className="absolute w-[2px] h-[2px] bg-white rounded-full"
      style={{ top: `${top}%`, left: `${left}%` }}
      animate={{
        x: [0, 200],
        y: [0, 120],
        opacity: [0, 1, 1, 0],
        boxShadow: [
          '0 0 4px 2px rgba(255,255,255,0.6)',
          '0 0 8px 4px rgba(165,180,252,0.8)',
          '0 0 4px 2px rgba(255,255,255,0.3)',
          '0 0 0px 0px transparent',
        ],
      }}
      transition={{
        duration: 1.2,
        delay,
        repeat: Infinity,
        repeatDelay: 8 + Math.random() * 12,
        ease: 'easeOut',
      }}
    />
  )
}

function EnergyPulse({ delay, color }: { delay: number; color: string }) {
  return (
    <motion.div
      className="absolute rounded-full"
      style={{
        top: '50%',
        left: '50%',
        width: 10,
        height: 10,
        transform: 'translate(-50%, -50%)',
        border: `1px solid rgba(${color}, 0.4)`,
      }}
      animate={{
        width: [10, isMobile ? 400 : 600],
        height: [10, isMobile ? 400 : 600],
        opacity: [0.6, 0],
        borderWidth: ['2px', '0.5px'],
      }}
      transition={{
        duration: 6,
        delay,
        repeat: Infinity,
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
        textShadow: `0 0 ${size}px ${color}`,
      }}
      animate={{
        y: [0, -(typeof window !== 'undefined' ? window.innerHeight + 80 : 1200)],
        x: [0, (Math.random() - 0.5) * 100],
        rotate: [0, 360 * (Math.random() > 0.5 ? 1 : -1)],
        opacity: [0, 0.8, 0.8, 0],
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
  const particleCount = isMobile ? 10 : 24
  const shootingStarCount = isMobile ? 2 : 5

  const particles = useMemo(() => {
    const colors = [
      'rgba(165,180,252,0.7)',
      'rgba(167,139,250,0.6)',
      'rgba(251,191,36,0.5)',
      'rgba(99,102,241,0.6)',
      'rgba(139,92,246,0.5)',
    ]
    return Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      symbol: i < 8 ? TRIGRAMS[i] : MYSTIC_SYMBOLS[i % MYSTIC_SYMBOLS.length],
      color: colors[i % colors.length],
      x: Math.random() * 100,
      delay: Math.random() * 20,
      duration: 12 + Math.random() * 18,
      size: 12 + Math.random() * (isMobile ? 12 : 20),
    }))
  }, [])

  const shootingStars = useMemo(() =>
    Array.from({ length: shootingStarCount }, (_, i) => ({
      id: i,
      delay: i * 4 + Math.random() * 6,
      top: Math.random() * 40,
      left: Math.random() * 70,
    })), [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <BaguaRing radius={isMobile ? 80 : 120} count={8} speed={60} opacity={isMobile ? 0.08 : 0.12} color="99,102,241" />
      {!isMobile && <BaguaRing radius={200} count={12} speed={-90} opacity={0.07} color="167,139,250" />}
      {!isMobile && <BaguaRing radius={300} count={16} speed={120} opacity={0.04} color="251,191,36" />}

      <EnergyPulse delay={0} color="99,102,241" />
      {!isMobile && <EnergyPulse delay={2} color="139,92,246" />}
      {!isMobile && <EnergyPulse delay={4} color="251,191,36" />}

      {shootingStars.map(s => (
        <ShootingStar key={s.id} delay={s.delay} top={s.top} left={s.left} />
      ))}

      {particles.map(p => (
        <FloatingParticle key={p.id} {...p} />
      ))}
    </div>
  )
}
