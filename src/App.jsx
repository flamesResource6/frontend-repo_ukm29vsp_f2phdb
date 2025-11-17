import { useEffect, useMemo, useState } from 'react'
import MoodForm from './components/MoodForm'
import MoodHistory from './components/MoodHistory'
import MoodChart from './components/MoodChart'

const API = import.meta.env.VITE_BACKEND_URL || ''

async function apiGet(path) {
  const res = await fetch(`${API}${path}`)
  if (!res.ok) throw new Error('Request failed')
  return res.json()
}
async function apiPost(path, body) {
  const res = await fetch(`${API}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  })
  if (!res.ok) throw new Error('Request failed')
  return res.json()
}

export default function App() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  const load = async () => {
    setLoading(true)
    try {
      const data = await apiGet('/api/moods')
      setItems(data.items || [])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  const save = async (entry) => {
    await apiPost('/api/moods', entry)
    await load()
  }

  const downloadCsv = () => {
    const url = `${API}/api/moods/export`
    window.open(url, '_blank')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <header className="px-6 py-5">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-white flex items-center justify-center text-2xl">🧠</div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">MoodTrackr</h1>
              <p className="text-sm text-gray-500">Log how you feel each day with a quick emoji tap</p>
            </div>
          </div>
          <button onClick={downloadCsv} className="bg-white hover:bg-gray-50 border px-4 py-2 rounded-lg text-sm">Export CSV</button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 pb-16">
        <section className="bg-white rounded-2xl shadow-sm border p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Add today’s mood</h2>
          <MoodForm onSave={save} />
        </section>

        <div className="grid lg:grid-cols-2 gap-6">
          <section className="bg-white rounded-2xl shadow-sm border p-6">
            <h2 className="text-lg font-semibold mb-4">Monthly calendar</h2>
            {loading ? <p className="text-sm text-gray-500">Loading...</p> : <MoodHistory items={items} />}
          </section>

          <section className="bg-white rounded-2xl shadow-sm border p-6">
            <h2 className="text-lg font-semibold mb-4">Trend</h2>
            {loading ? <p className="text-sm text-gray-500">Loading...</p> : <MoodChart items={items} />}
          </section>
        </div>
      </main>
    </div>
  )
}
