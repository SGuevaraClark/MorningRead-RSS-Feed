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
    <>
      <h1 className="text-3xl font-bold mb-6">Costa Rica News Feed</h1>
      
      {/* Source selector */}
      <div className="mb-4">
        <select 
          value={selectedSource} 
          onChange={(e) => setSelectedSource(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="all">All Sources</option>
          <option value="delfino">Delfino</option>
          <option value="crhoy">CR Hoy</option>
          <option value="nacion">La Nación</option>
          <option value="amprensa">AM Prensa</option>
          <option value="semanario">Semanario</option>
        </select>
      </div>

      {/* Error message */}
      {error && (
        <div className="text-red-500 mb-4">
          {error}
        </div>
      )}

      {/* Loading state */}
      {loading ? (
        <div className="text-gray-500">Loading articles...</div>
      ) : (
        <div className="w-3/4 max-w-lg border mx-auto">
          {articles.map((item, i) => (
            <Feed
              key={i}
              title={item.item.title}
              link={item.item.link}
              date={item.item.pubDate}
              source={item.item.source} 
            />
          ))}
        </div>
      )}
    </>
  )
}

export default App

