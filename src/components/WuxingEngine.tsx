import { motion } from 'framer-motion'
import { Team } from '../data/teams'
import { WuxingResult } from '../engines/wuxing'

interface Props {
  result: WuxingResult
  teamA: Team
  teamB: Team
}

const elementColors: Record<string, string> = {
  '金': 'text-yellow-300',
  '木': 'text-green-400',
  '水': 'text-blue-400',
  '火': 'text-red-400',
  '土': 'text-amber-600',
}

export default function WuxingEngine({ result, teamA, teamB }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.4 }}
      className="gradient-border rounded-xl p-5"
    >
      <div className="flex items-center gap-2 mb-3">
        <span className="text-2xl">☯</span>
        <h4 className="text-lg font-bold text-nebula-300">五行八卦</h4>
      </div>

      <div className="flex justify-between items-center mb-3">
        <div className="text-center">
          <div className="text-sm text-gray-400">{teamA.name}</div>
          <div className={`text-xl font-bold ${elementColors[result.teamAElement]}`}>
            {result.teamAElement} · {result.teamATrigram}
          </div>
        </div>
        <div className="text-center">
          <div className="text-sm text-gray-400">{teamB.name}</div>
          <div className={`text-xl font-bold ${elementColors[result.teamBElement]}`}>
            {result.teamBElement} · {result.teamBTrigram}
          </div>
        </div>
      </div>

      <div className="text-xs text-mystic-400 mb-2 text-center bg-mystic-500/10 rounded py-1">
        {result.relation}
      </div>

      <div className="text-xs text-gray-400 mb-2">📅 日柱：{result.dayPillar}</div>

      <div className="flex gap-2 mb-2">
        <div className="flex-1 bg-cosmic-700 rounded-full h-2">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${result.teamAScore}%` }}
            transition={{ duration: 1, delay: 0.7 }}
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
            transition={{ duration: 1, delay: 0.8 }}
            className="h-full bg-gold-500 rounded-full"
          />
        </div>
        <span className="text-xs text-gold-300 w-8">{result.teamBScore}</span>
      </div>
    </motion.div>
  )
}
