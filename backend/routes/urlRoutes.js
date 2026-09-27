const express = require('express');
const {
  getUrls,
  createUrl,
  getStats,
  deleteUrl
} = require('../controllers/urlController');

const router = express.Router();

// Endpoints mounted under /api in server.js
router.get('/urls', getUrls);          // GET  /api/urls
router.post('/shorten', createUrl);    // POST /api/shorten
router.get('/stats/:code', getStats);  // GET  /api/stats/:code
router.delete('/urls/:id', deleteUrl); // DELETE /api/urls/:id

module.exports = router;
