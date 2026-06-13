import { Team } from '../data/teams'

const API_URL = 'https://api.deepseek.com/chat/completions'

function buildPrompt(teamA: Team, teamB: Team, round?: string): string {
  const roundInfo = round ? `赛事：2026世界杯 ${round}\n` : ''
  return `你是足球比赛预测专家。请根据两队实力、FIFA排名等因素预测3个最可能的比分。
${roundInfo}主队：${teamA.name}（FIFA排名第${teamA.fifaRanking}名）
客队：${teamB.name}（FIFA排名第${teamB.fifaRanking}名）
请仅返回JSON数组，格式：[[主队进球,客队进球],[主队进球,客队进球],[主队进球,客队进球]]，按可能性从高到低排列。不要返回任何其他文字。`
}

export async function predictWithLLM(
  apiKey: string,
  teamA: Team,
  teamB: Team,
  round?: string
): Promise<[number, number][]> {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 10000)

  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [{ role: 'user', content: buildPrompt(teamA, teamB, round) }],
        temperature: 0.7,
        max_tokens: 200,
      }),
      signal: controller.signal,
    })

    if (!res.ok) {
      console.warn('[LLM] API error:', res.status)
      return []
    }

    const data = await res.json()
    const text: string = data?.choices?.[0]?.message?.content ?? ''
    console.log('[LLM] 原始返回:', text)
    const match = text.match(/\[\s*\[.*\]\s*\]/s)
    if (!match) {
      console.warn('[LLM] 未匹配到比分数组')
      return []
    }

    const parsed: unknown = JSON.parse(match[0])
    if (!Array.isArray(parsed)) {
      console.warn('[LLM] 解析结果非数组:', parsed)
      return []
    }

    const scores = parsed
      .filter((s): s is number[] => Array.isArray(s) && s.length === 2 && Number.isInteger(s[0]) && Number.isInteger(s[1]))
      .map(s => [Math.max(0, Math.min(9, s[0])), Math.max(0, Math.min(9, s[1]))] as [number, number])
      .slice(0, 3)
    console.log('[LLM] 解析比分:', scores)
    return scores
  } catch (e) {
    console.warn('[LLM] 调用失败:', e)
    return []
  } finally {
    clearTimeout(timeout)
  }
}
