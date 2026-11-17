'use client'
import { useState } from 'react'

export default function Home() {
  const [topic, setTopic] = useState('')
  const [topics, setTopics] = useState<string[]>([])
  const [script, setScript] = useState('')
  const [loading, setLoading] = useState(false)

  const getTopics = async () => {
    setLoading(true)
    const res = await fetch('/api/topics')
    const data = await res.json()
    setTopics(data.topics || [])
    setLoading(false)
  }

  const getScript = async (t: string) => {
    setTopic(t); setLoading(true)
    const res = await fetch('/api/generate', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ topic: t }) })
    const data = await res.json()
    setScript(data.script || 'ما طلع سكربت')
    setLoading(false)
  }

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: 20, direction: 'rtl' }}>
      <h1 style={{ textAlign: 'center', color: '#1877F2' }}>🎬 صانع الريلز</h1>
      <p style={{ textAlign: 'center' }}>اختار موضوع واعمل سكربت جاهز للفيسبوك</p>
      <button onClick={getTopics} style={{ width: '100%', padding: 14, background: '#1877F2', color: '#fff', border: 0, borderRadius: 10, fontSize: 16 }}>
        {loading ? 'جاري...' : '✨ جيبلي مواضيع ترند'}
      </button>
      <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
        {topics.map((t, i) => (
          <button key={i} onClick={() => getScript(t)} style={{ padding: 12, background: '#fff', border: '1px solid #ddd', borderRadius: 10, textAlign: 'right' }}>{t}</button>
        ))}
      </div>
      {script && (
        <div style={{ marginTop: 20, background: '#fff', padding: 16, borderRadius: 12, whiteSpace: 'pre-wrap', lineHeight: 1.8 }}>{script}</div>
      )}
    </div>
  )
}
