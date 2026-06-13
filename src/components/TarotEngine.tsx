import { motion } from 'framer-motion'
import { TarotResult } from '../engines/tarot'

interface Props {
  result: TarotResult
}

const cardBackgrounds = [
  'from-purple-900/50 to-indigo-900/50',
  'from-blue-900/50 to-purple-900/50',
  'from-indigo-900/50 to-violet-900/50',
]

export default function TarotEngine({ result }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="gradient-border rounded-xl p-5"
    >
      <div className="flex items-center gap-2 mb-3">
        <span className="text-2xl">🃏</span>
        <h4 className="text-lg font-bold text-nebula-300">塔罗占卜</h4>
      </div>

      <div className="flex gap-2 mb-3">
        {result.cards.map((drawn, i) => (
          <motion.div
            key={i}
            initial={{ rotateY: 180, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            transition={{ delay: 0.8 + i * 0.3, duration: 0.6 }}
            className={`flex-1 bg-gradient-to-b ${cardBackgrounds[i]} rounded-lg p-2 text-center border border-mystic-500/30`}
          >
            <div className="text-xs text-gray-500 mb-1">{drawn.position}</div>
            <div className="text-sm font-bold text-gold-400 mb-1">
              {drawn.card.name}
            </div>
            <div className={`text-xs ${drawn.isUpright ? 'text-green-400' : 'text-red-400'}`}>
              {drawn.isUpright ? '正位 ↑' : '逆位 ↓'}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="space-y-1">
        {result.cards.map((drawn, i) => (
          <div key={i} className="text-xs text-gray-400">
            <span className="text-mystic-400">[{drawn.position}]</span>{' '}
            {drawn.card.name} — {drawn.isUpright ? drawn.card.upright : drawn.card.reversed}
          </div>
        ))}
      </div>

      <div className="flex gap-2 mt-3 mb-1">
        <div className="flex-1 bg-cosmic-700 rounded-full h-2">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${result.teamAScore}%` }}
            transition={{ duration: 1, delay: 1.5 }}
            className="h-full bg-nebula-500 rounded-full"
          />
        </div>
        <span className="text-xs text-nebula-300 w-8">{result.teamAScore}</span>
      </div>
      <div className="flex gap-2">
        <div className="flex-1 bg-cosmic-700 rounded-full h-2">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${result.teamBScore}%` }}
            transition={{ duration: 1, delay: 1.6 }}
            className="h-full bg-gold-500 rounded-full"
          />
        </div>
        <span className="text-xs text-gold-300 w-8">{result.teamBScore}</span>
      </div>
    </motion.div>
  )
}
