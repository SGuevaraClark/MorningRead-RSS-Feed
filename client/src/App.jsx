import { useEffect, useState } from 'react'
import './App.css'
import Feed from './components/Feed'

function App() {
  const [articles, setArticles] = useState([])
  const [selectedSource, setSelectedSource] = useState('all')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const getArticles = async () => {
    try {
      setLoading(true)
      setError(null)
      const codespaceHost = window.location.hostname.replace('5174', '3000')
      const baseUrl = `https://${codespaceHost}`
      const url = selectedSource === 'all' 
        ? baseUrl + '/'
        : `${baseUrl}/${selectedSource}`
      
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const data = await response.json()
      setArticles(data)
    } catch (error) {
      console.error('Error fetching articles:', error)
      setError('Failed to fetch articles. Please try again later.')
    } finally {
      setLoading(false)
    }
  }
  
  useEffect(() => {
    getArticles()
  }, [selectedSource])

  return (
<div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold text-gray-900">Costa Rica News</h1>
            <select 
              value={selectedSource} 
              onChange={(e) => setSelectedSource(e.target.value)}
              className="block w-48 px-3 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            >
              <option value="all">Todas las fuentes</option>
              <option value="Delfino">Delfino</option>
              <option value="Crhoy">CR Hoy</option>
              <option value="Nacion">La Nación</option>
              <option value="Amprensa">AM Prensa</option>
              <option value="Observador">Observador</option>
              <option value="MundoCR">El Mundo CR</option>
            </select>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="rounded-md bg-red-50 p-4 mb-6">
            <div className="text-sm text-red-700">{error}</div>
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((item, i) => (
              <Feed
                key={i}
                title={item.item.title}
                link={item.item.link}
                date={item.item.pubDate}
                source={item.item.source}
                content={item.item.contentSnippet}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

export default App

