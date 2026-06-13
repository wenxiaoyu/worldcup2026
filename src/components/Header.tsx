import { motion } from 'framer-motion'

export default function Header() {
  return (
    <header className="relative py-3 md:py-8 text-center overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-2xl md:text-5xl font-bold glow-text mb-0.5 md:mb-2">
          ⚽ 天命之战 ⚽
        </h1>
        <p className="text-nebula-300 text-sm md:text-lg">2026 世界杯玄学比分预测</p>
        <p className="hidden md:block text-gray-500 text-sm mt-1">
          星象 · 五行 · 塔罗 · 命理 — 四维天机，一卦一乾坤
        </p>
      </motion.div>
      <div className="hidden md:block absolute top-4 left-8 text-3xl float-animation opacity-30">✦</div>
      <div className="hidden md:block absolute top-12 right-12 text-2xl float-animation opacity-20" style={{ animationDelay: '1s' }}>✧</div>
      <div className="hidden md:block absolute bottom-4 left-1/4 text-xl float-animation opacity-25" style={{ animationDelay: '0.5s' }}>⬡</div>
    </header>
  )
}
