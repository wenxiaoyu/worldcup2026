import { motion } from 'framer-motion'

const TABS = [
  { key: 'predict', label: '天机推演' },
  { key: 'schedule', label: '赛程' },
  { key: 'standings', label: '积分榜' },
]

interface Props {
  active: string
  onChange: (tab: string) => void
}

export default function TabBar({ active, onChange }: Props) {
  return (
    <div className="sticky top-0 z-30 bg-cosmic-900/80 backdrop-blur-md border-b border-cosmic-700/50">
      <div className="max-w-5xl mx-auto flex">
        {TABS.map(tab => (
          <button
            key={tab.key}
            onClick={() => onChange(tab.key)}
            className={`flex-1 py-2.5 md:py-3 text-sm md:text-base font-medium transition-colors relative ${
              active === tab.key ? 'text-gold-400' : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            {tab.label}
            {active === tab.key && (
              <motion.div
                layoutId="tab-indicator"
                className="absolute bottom-0 left-1/4 right-1/4 h-0.5 bg-gold-400 rounded-full"
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>
    </div>
  )
}
