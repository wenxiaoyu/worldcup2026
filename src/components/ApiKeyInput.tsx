import { useState, useEffect } from 'react'

interface Props {
  apiKey: string
  onApiKeyChange: (key: string) => void
}

const KEY_RE = /^sk-[a-zA-Z0-9]+$/

export default function ApiKeyInput({ apiKey, onApiKeyChange }: Props) {
  const [input, setInput] = useState(apiKey)
  const [expanded, setExpanded] = useState(false)
  const saved = input === apiKey && apiKey.length > 0
  const invalid = input.length > 0 && !KEY_RE.test(input)

  useEffect(() => { setInput(apiKey) }, [apiKey])

  return (
    <div className="bg-cosmic-800/40 border border-cosmic-700/40 rounded-xl p-3 md:p-4">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between text-left"
      >
        <div className="flex items-center gap-2">
          <span className="text-sm">🤖</span>
          <span className="text-xs md:text-sm text-gray-400">AI 增强推演</span>
          {saved && <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">已配置</span>}
        </div>
        <span className="text-xs text-gray-600">{expanded ? '收起' : '展开'}</span>
      </button>

      {expanded && (
        <div className="mt-3 space-y-2">
          <p className="text-[10px] text-gray-500 leading-relaxed">
            输入 DeepSeek API Key 可接入 AI 大模型辅助推演，密钥仅存储在本地浏览器中。
            <a href="https://platform.deepseek.com/api_keys" target="_blank" rel="noopener" className="text-nebula-400 ml-1 underline">获取 Key</a>
          </p>
          <div className="flex gap-2">
            <input
              type="password"
              placeholder="输入 DeepSeek API Key"
              value={input}
              onChange={e => setInput(e.target.value.trim())}
              className={`flex-1 bg-cosmic-900/60 border rounded-lg px-3 py-1.5 text-sm text-white placeholder:text-gray-600 focus:outline-none transition-colors ${invalid ? 'border-red-500/60' : 'border-cosmic-600 focus:border-nebula-500/50'}`}
            />
            <button
              onClick={() => {
                const key = input.trim()
                if (!KEY_RE.test(key)) return
                onApiKeyChange(key)
                try { localStorage.setItem('deepseek_api_key', key) } catch {}
              }}
              disabled={invalid}
              className="shrink-0 px-3 py-1.5 bg-nebula-500/20 border border-nebula-500/40 text-nebula-300 rounded-lg text-xs font-medium hover:bg-nebula-500/30 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              保存
            </button>
            {saved && (
              <button
                onClick={() => {
                  setInput('')
                  onApiKeyChange('')
                  try { localStorage.removeItem('deepseek_api_key') } catch {}
                }}
                className="shrink-0 px-3 py-1.5 bg-red-500/10 border border-red-500/30 text-red-400 rounded-lg text-xs font-medium hover:bg-red-500/20 transition-colors"
              >
                清除
              </button>
            )}
          </div>
          {invalid && (
            <p className="text-[10px] text-red-400">Key 格式不正确，应以 sk- 开头，仅含字母和数字。请检查是否多复制了多余字符。</p>
          )}
        </div>
      )}
    </div>
  )
}
