import { useState, useEffect } from 'react'
import { Team, teams } from './data/teams'
import { calculateComposite, CompositeResult, Odds } from './engines/composite'
import { fetchWorldCupMatches, findMatch, findNextMatch, findLocalTeam, namesMatch, Match } from './services/matchData'
import { predictWithLLM } from './services/llm'
import Header from './components/Header'
import TabBar from './components/TabBar'
import TeamSelector from './components/TeamSelector'
import PredictionResult from './components/PredictionResult'
import RealMatchResult from './components/RealMatchResult'
import ScheduleView from './components/ScheduleView'
import StandingsView from './components/StandingsView'
import MysticalBackground from './components/MysticalBackground'

export default function App() {
  const [activeTab, setActiveTab] = useState('schedule')
  const [teamA, setTeamA] = useState<Team | null>(null)
  const [teamB, setTeamB] = useState<Team | null>(null)
  const [result, setResult] = useState<CompositeResult | null>(null)
  const [realMatch, setRealMatch] = useState<Match | null>(null)
  const [isRevealing, setIsRevealing] = useState(false)
  const [nextMatch, setNextMatch] = useState<Match | null>(null)
  const [matches, setMatches] = useState<Match[]>([])
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null)
  const [odds, setOdds] = useState<{ home: string; draw: string; away: string }>({ home: '', draw: '', away: '' })
  const [apiKey, setApiKey] = useState(() => {
    try { return localStorage.getItem('deepseek_api_key') ?? '' } catch { return '' }
  })

  useEffect(() => {
    fetchWorldCupMatches().then(data => {
      setMatches(data)
      const next = findNextMatch(data)
      if (next) setNextMatch(next)
      if (!next) return
      const a = findLocalTeam(next.team1, teams) as Team | undefined
      const b = findLocalTeam(next.team2, teams) as Team | undefined
      if (a && b) {
        setTeamA(a)
        setTeamB(b)
        setSelectedMatch(next)
      }
    })
  }, [])

  const handlePredict = async () => {
    if (!teamA || !teamB) return
    setIsRevealing(true)
    setResult(null)
    setRealMatch(null)

    try {
      const match = findMatch(teamA.nameEn, teamB.nameEn, matches)
      if (match) {
        setRealMatch(match)
        setIsRevealing(false)
        return
      }
    } catch {
      // fallback to prediction
    }

    const isNext = nextMatch && teamA && teamB && (
      (namesMatch(teamA.nameEn, nextMatch.team1) && namesMatch(teamB.nameEn, nextMatch.team2)) ||
      (namesMatch(teamA.nameEn, nextMatch.team2) && namesMatch(teamB.nameEn, nextMatch.team1))
    )
    const matchTime = isNext ? `${nextMatch!.date} ${nextMatch!.time}` : undefined
    const h = parseFloat(odds.home)
    const d = parseFloat(odds.draw)
    const a = parseFloat(odds.away)
    const parsedOdds: Odds | undefined = (h > 1 && d > 1 && a > 1) ? { home: h, draw: d, away: a } : undefined

    const llmPromise = apiKey
      ? predictWithLLM(apiKey, teamA, teamB, selectedMatch?.round).catch(() => [] as [number, number][])
      : Promise.resolve([] as [number, number][])

    const [, llmScores] = await Promise.all([
      new Promise(r => setTimeout(r, 3000)),
      llmPromise,
    ])

    console.log('[推演] LLM 比分:', llmScores)

    try {
      const prediction = calculateComposite(teamA, teamB, matchTime, parsedOdds, llmScores.length > 0 ? llmScores : undefined)
      console.log('[推演] 最终比分:', prediction.predictedScores, '判词:', prediction.verdict)
      setResult(prediction)
    } catch (e) {
      console.error('推演失败:', e)
    }
    setIsRevealing(false)
  }

  const handleMatchClick = (match: Match) => {
    const a = findLocalTeam(match.team1, teams) as Team | undefined
    const b = findLocalTeam(match.team2, teams) as Team | undefined
    if (a && b) {
      setTeamA(a)
      setTeamB(b)
      setResult(null)
      setRealMatch(null)
      setSelectedMatch(match)
      setActiveTab('predict')
    }
  }

  const handleOddsChange = (field: 'home' | 'draw' | 'away', value: string) => {
    setOdds(prev => ({ ...prev, [field]: value }))
  }

  const handleReset = () => {
    setTeamA(null)
    setTeamB(null)
    setResult(null)
    setRealMatch(null)
    setSelectedMatch(null)
    setOdds({ home: '', draw: '', away: '' })
    setActiveTab('schedule')
  }

  return (
    <div className="min-h-screen stars-bg">
      <MysticalBackground />
      <Header />
      <TabBar active={activeTab} onChange={setActiveTab} />
      <main className="max-w-5xl mx-auto px-3 py-3 md:px-4 md:py-8 pb-safe">
        {activeTab === 'predict' && (
          <>
            {!result && !realMatch && !isRevealing && (
              <TeamSelector
                teamA={teamA}
                teamB={teamB}
                nextMatch={nextMatch}
                selectedMatch={selectedMatch}
                odds={odds}
                onOddsChange={handleOddsChange}
                apiKey={apiKey}
                onApiKeyChange={setApiKey}
                onPredict={handlePredict}
                onGoToSchedule={() => setActiveTab('schedule')}
              />
            )}

            {isRevealing && (
              <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
                <div className="text-7xl md:text-8xl spin-inline mb-8 pulse-glow">☯</div>
                <p className="text-lg md:text-xl text-nebula-300 animate-pulse font-medium">气运流转，卦象推演中...</p>
                <div className="flex items-center gap-3 mt-4 text-sm text-gray-500">
                  <span className="animate-pulse" style={{ animationDelay: '0s' }}>观星象</span>
                  <span className="text-cosmic-600">·</span>
                  <span className="animate-pulse" style={{ animationDelay: '0.3s' }}>演五行</span>
                  <span className="text-cosmic-600">·</span>
                  <span className="animate-pulse" style={{ animationDelay: '0.6s' }}>翻塔罗</span>
                  <span className="text-cosmic-600">·</span>
                  <span className="animate-pulse" style={{ animationDelay: '0.9s' }}>起六爻</span>
                </div>
              </div>
            )}

            {realMatch && teamA && teamB && (
              <RealMatchResult
                teamA={teamA}
                teamB={teamB}
                match={realMatch}
                onReset={handleReset}
              />
            )}

            {result && teamA && teamB && !realMatch && (
              <PredictionResult
                teamA={teamA}
                teamB={teamB}
                result={result}
                onReset={handleReset}
              />
            )}
          </>
        )}

        {activeTab === 'schedule' && (
          <ScheduleView matches={matches} onMatchClick={handleMatchClick} />
        )}

        {activeTab === 'standings' && (
          <StandingsView matches={matches} />
        )}
      </main>
    </div>
  )
}
