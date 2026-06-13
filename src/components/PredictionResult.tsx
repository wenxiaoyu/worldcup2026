import { motion } from 'framer-motion'
import { Team } from '../data/teams'
import { CompositeResult } from '../engines/composite'
import AstrologyEngine from './AstrologyEngine'
import WuxingEngine from './WuxingEngine'
import TarotEngine from './TarotEngine'
import NumerologyEngine from './NumerologyEngine'
import FinalScore from './FinalScore'

interface Props {
  teamA: Team
  teamB: Team
  result: CompositeResult
  onReset: () => void
}

export default function PredictionResult({ teamA, teamB, result, onReset }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-3 md:space-y-6"
    >
      <div className="text-center mb-2 md:mb-4">
        <div className="flex items-center justify-center gap-3 md:gap-4 text-2xl md:text-3xl mb-1 md:mb-2">
          <span>{teamA.flag}</span>
          <span className="text-gold-400 font-bold">{teamA.name}</span>
          <span className="text-nebula-300 text-xl">VS</span>
          <span className="text-gold-400 font-bold">{teamB.name}</span>
          <span>{teamB.flag}</span>
        </div>
      </div>

      <FinalScore teamA={teamA} teamB={teamB} result={result} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
        <AstrologyEngine result={result.astrology} teamA={teamA} teamB={teamB} />
        <WuxingEngine result={result.wuxing} teamA={teamA} teamB={teamB} />
        <TarotEngine result={result.tarot} />
        <NumerologyEngine result={result.numerology} teamA={teamA} teamB={teamB} />
      </div>

      <div className="bg-cosmic-800/40 border border-cosmic-700/30 rounded-xl p-3 md:p-4 space-y-1.5">
        <div className="flex items-center gap-1.5 text-xs text-gold-500/80 font-medium">
          <span>⚠</span>
          <span>娱乐风险提示</span>
        </div>
        <p className="text-[11px] text-gray-500 leading-relaxed">
          本推演结果基于星象、五行、塔罗、命理等玄学模型随机生成，仅供娱乐参考，不构成任何投注建议或赛事预测。所有"赔率"数据由用户自行输入，系统仅将其作为推演参数之一，不保证与实际赛果有任何关联。请理性对待，切勿沉迷，量力而行。
        </p>
        <p className="text-[10px] text-gray-600">
          免责声明：使用本工具产生的一切决策与后果由用户自行承担，开发者不对任何因参考本推演结果而产生的损失负责。
        </p>
      </div>

      <div className="text-center pt-4">
        <button
          onClick={onReset}
          className="px-6 py-3 border border-nebula-500 text-nebula-300 rounded-lg hover:bg-nebula-500/10 transition-colors"
        >
          再卜一卦
        </button>
      </div>
    </motion.div>
  )
}
