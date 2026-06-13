import { motion } from 'framer-motion'
import { Team } from '../data/teams'
import { CompositeResult } from '../engines/composite'

interface Props {
  teamA: Team
  teamB: Team
  result: CompositeResult
}

const LABELS = ['第一推演', '第二推演', '第三推演']

export default function FinalScore({ teamA, teamB, result }: Props) {
  const scores = result.predictedScores

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="gradient-border rounded-2xl p-4 md:p-8 text-center card-glow"
    >
      <h3 className="text-xs md:text-sm text-nebula-300 mb-2 md:mb-4 uppercase tracking-widest">天命预测比分</h3>

      <div className="flex items-center justify-center gap-4 md:gap-6 mb-4 md:mb-6">
        <div className="text-center">
          <div className="text-2xl mb-1">{teamA.flag}</div>
          <div className="text-sm text-gray-400">{teamA.name}</div>
        </div>

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', delay: 0.5 }}
          className="flex items-center gap-3"
        >
          <span className="text-5xl md:text-6xl font-bold text-gold-400 glow-text">
            {scores[0][0]}
          </span>
          <span className="text-3xl text-gray-500">:</span>
          <span className="text-5xl md:text-6xl font-bold text-gold-400 glow-text">
            {scores[0][1]}
          </span>
        </motion.div>

        <div className="text-center">
          <div className="text-2xl mb-1">{teamB.flag}</div>
          <div className="text-sm text-gray-400">{teamB.name}</div>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex justify-between text-xs text-gray-500 mb-1">
          <span>{teamA.name} 天命指数 {result.teamAFinalScore}</span>
          <span>{teamB.name} 天命指数 {result.teamBFinalScore}</span>
        </div>
        <div className="h-3 bg-cosmic-700 rounded-full overflow-hidden flex">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${(result.teamAFinalScore / (result.teamAFinalScore + result.teamBFinalScore)) * 100}%` }}
            transition={{ duration: 1, delay: 0.8 }}
            className="h-full bg-gradient-to-r from-nebula-500 to-mystic-400"
          />
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${(result.teamBFinalScore / (result.teamAFinalScore + result.teamBFinalScore)) * 100}%` }}
            transition={{ duration: 1, delay: 0.8 }}
            className="h-full bg-gradient-to-r from-gold-500 to-gold-300"
          />
        </div>
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="text-base md:text-lg text-gold-300 font-bold mb-4 md:mb-6"
      >
        {result.verdict}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0 }}
      >
        <div className="text-xs text-gray-500 mb-3 tracking-wide">天机三式 · 比分推演</div>
        <div className="grid grid-cols-3 gap-3">
          {scores.map((score, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.1 + i * 0.15 }}
              className={`rounded-xl p-3 border ${
                i === 0
                  ? 'bg-gold-500/10 border-gold-500/30 shadow-lg shadow-gold-500/10'
                  : 'bg-cosmic-700/50 border-cosmic-600'
              }`}
            >
              <div className={`text-[10px] mb-2 font-medium ${
                i === 0 ? 'text-gold-400' : 'text-gray-500'
              }`}>
                {LABELS[i]}
              </div>
              <div className="flex items-center justify-center gap-2">
                <span className="text-xs text-gray-400">{teamA.flag}</span>
                <span className={`text-2xl font-bold ${
                  i === 0 ? 'text-gold-400' : 'text-nebula-300'
                }`}>
                  {score[0]}
                </span>
                <span className={`text-sm ${
                  i === 0 ? 'text-gold-500/60' : 'text-gray-600'
                }`}>:</span>
                <span className={`text-2xl font-bold ${
                  i === 0 ? 'text-gold-400' : 'text-nebula-300'
                }`}>
                  {score[1]}
                </span>
                <span className="text-xs text-gray-400">{teamB.flag}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}
