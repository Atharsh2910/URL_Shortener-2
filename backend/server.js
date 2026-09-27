require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const urlRoutes = require('./routes/urlRoutes');
const { redirectToUrl } = require('./controllers/urlController');

const app = express();
const PORT = process.env.PORT || 5000;

// ---------- middleware ----------
app.use(cors());
app.use(express.json());

// ---------- connect to MongoDB ----------
connectDB();

// ---------- API routes (used by the React frontend) ----------
app.use('/api', urlRoutes);

// ---------- root info route ----------
app.get('/', (req, res) => {
  res.json({
    message: 'MERN URL Shortener API',
    endpoints: {
      'GET /api/urls': 'list all shortened URLs',
      'POST /api/shorten': 'body: { "url": "https://example.com" } -> creates short code',
      'GET /api/stats/:code': 'hit count / metadata for a code',
      'DELETE /api/urls/:id': 'delete a shortened URL',
      'GET /:code': 'redirects to the original URL'
    }
  });
});

// ---------- short-code redirect (kept outside /api, like the old server) ----------
app.get('/:code', redirectToUrl);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
