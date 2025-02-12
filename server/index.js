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