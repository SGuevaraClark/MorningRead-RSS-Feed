# .gitignore

```
# Dependencies
node_modules/
/.pnp
.pnp.js

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Testing
/coverage

# Production
/client/dist
/client/build

# Misc
.DS_Store
*.pem
.idea/
.vscode/
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?

# Debug logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

# Local files
*.local

# Editor directories and files
.vscode/*
!.vscode/extensions.json
```

# client/index.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Costa Rica News Feed</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

# client/package.json

```json
{
    "name": "rssfeed",
    "private": true,
    "version": "0.0.0",
    "type": "module",
    "scripts": {
      "dev": "vite",
      "build": "vite build",
      "lint": "eslint .",
      "preview": "vite preview"
    },
    "dependencies": {
      "axios": "^1.7.7",
      "react": "^18.3.1",
      "react-dom": "^18.3.1"
    },
    "devDependencies": {
      "@eslint/js": "^9.13.0",
      "@types/react": "^18.3.12",
      "@types/react-dom": "^18.3.1",
      "@vitejs/plugin-react": "^4.3.3",
      "autoprefixer": "^10.4.20",
      "eslint": "^9.13.0",
      "eslint-plugin-react": "^7.37.2",
      "eslint-plugin-react-hooks": "^5.0.0",
      "eslint-plugin-react-refresh": "^0.4.14",
      "globals": "^15.11.0",
      "postcss": "^8.4.49",
      "tailwindcss": "^3.4.15",
      "vite": "^5.4.10"
    }
  }
```

# client/src/App.css

```css
#root {
    max-width: 1280px;
    margin: 0 auto;
    padding: 2rem;
    text-align: center;
  }
  
  .logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
  }
  .logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
  .logo.react:hover {
    filter: drop-shadow(0 0 2em #61dafbaa);
  }
  
  @keyframes logo-spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
  
  @media (prefers-reduced-motion: no-preference) {
    a:nth-of-type(2) .logo {
      animation: logo-spin infinite 20s linear;
    }
  }
  
  .card {
    padding: 2em;
  }
  
  .read-the-docs {
    color: #888;
  }
  
```

# client/src/App.jsx

```jsx
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


```

# client/src/components/Feed.jsx

```jsx
function Feed({ title, link, date, source }) {
  return (
    <div className="p-6 border-b hover:bg-gray-50 transition-all duration-300">
      <h2 className="font-bold text-xl mb-3 text-gray-800 hover:text-gray-600 transition-colors">{title}</h2>
      <p className="text-sm text-gray-500 mb-3">
        {new Date(date).toLocaleDateString()} - {source}
      </p>
      <a 
        href={link} 
        target="_blank" 
        rel="noopener noreferrer"
        className="inline-block text-blue-500 hover:text-blue-700 transition-colors font-medium hover:underline"
      >
        Read More →
      </a>
    </div>
  )
}

export default Feed
```

# client/src/index.css

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
    @apply bg-gray-50;
  }
  
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .fade-in {
    animation: fadeIn 0.3s ease-out;
  }
```

# client/src/main.jsx

```jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)


```

# client/vite.config.js

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5174,
    strictPort: true
  }
})
```

# package.json

```json
{
    "name": "news-rss-feed",
    "version": "1.0.0",
    "description": "RSS Feed aggregator for Costa Rican news sources",
    "private": true,
    "scripts": {
      "install:all": "npm install && cd server && npm install && cd ../client && npm install",
      "server": "cd server && npm start",
      "client": "cd client && npm run dev",
      "dev": "concurrently \"npm run server\" \"npm run client\"",
      "build": "cd client && npm run build",
      "start": "cd server && npm start"
    },
    "devDependencies": {
      "concurrently": "^8.2.0"
    }
  }
```

# README.md

```md
# MorningRead-RSS-Feed
RSS Feed reader for Costa Rican news sources

```

# server/index.js

```js
import RSSParser from "rss-parser"
import cors from "cors"
import express from "express"
import dotenv from 'dotenv'

// Load environment variables from parent directory
dotenv.config({ path: '../.env' })

const PORT = process.env.PORT || 3000
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173'
const RSS_REFRESH_INTERVAL = process.env.RSS_REFRESH_INTERVAL || 30 * 60 * 1000 // 30 minutes

const feedURLs = {
    delfino: "https://delfino.cr/feed/",
    crhoy: "https://www.crhoy.com/feed/",
    nacion: "https://www.nacion.com/arcio/rss/",
    amprensa: "https://amprensa.com/feed/",
    semanario: "https://semanariouniversidad.com/feed/"
}

const parser = new RSSParser()
let articles = []

// Function to parse a single feed
const parseFeed = async (url, source) => {
    try {
        const feed = await parser.parseURL(url)
        return feed.items.map(item => ({
            item: {
                ...item,
                source: source
            }
        }))
    } catch (error) {
        console.error(`Error parsing ${source} feed:`, error)
        return []
    }
}

// Function to parse all feeds
const parseAllFeeds = async () => {
    try {
        const parsePromises = Object.entries(feedURLs).map(([source, url]) => 
            parseFeed(url, source)
        )
        
        const results = await Promise.all(parsePromises)
        articles = results.flat()
        console.log(`Successfully fetched ${articles.length} articles`)
    } catch (error) {
        console.error('Error parsing feeds:', error)
    }
}

// Initial parse of all feeds
parseAllFeeds()

// Refresh feeds periodically
setInterval(parseAllFeeds, RSS_REFRESH_INTERVAL)

const app = express()

// Configure CORS
app.use(cors({
    origin: process.env.CLIENT_URL || 'https://supreme-guide-r4r9rgv7v6qq3x9w4-5174.app.github.dev',
    methods: ['GET'],
    optionsSuccessStatus: 200
}));

// Routes
app.get('/', (req, res) => {
    res.json(articles)
})


app.get('/:source', (req, res) => {
    const source = req.params.source
    const sourceArticles = articles.filter(article => article.item.source === source)
    if (sourceArticles.length > 0) {
        res.json(sourceArticles)
    } else {
        res.status(404).json({ error: 'Source not found' })
    }
})

// Start server
const server = app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}/`)
})

export default server
```

# server/package.json

```json
{
    "name": "rssserver",
    "version": "1.0.0",
    "main": "index.js",
    "type": "module",
    "scripts": {
      "start": "nodemon index.js",
      "test": "echo \"Error: no test specified\" && exit 1"
    },
    "author": "",
    "license": "ISC",
    "description": "",
    "dependencies": {
      "cors": "^2.8.5",
      "dotenv": "^16.0.3",
      "express": "^4.21.1",
      "nodemon": "^3.1.7",
      "rss-parser": "^3.13.0"
    }
  }
```

