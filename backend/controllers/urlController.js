const crypto = require('crypto');
const Url = require('../models/Url');

const BASE_URL = process.env.BASE_URL || 'http://localhost:5000';

function generateCode(length = 6) {
  return crypto.randomBytes(8).toString('base64url').slice(0, length);
}

function isValidUrl(str) {
  try {
    // eslint-disable-next-line no-new
    new URL(str);
    return true;
  } catch {
    return false;
  }
}

// GET /api/urls  -> fetch every shortened URL (used on componentDidMount)
async function getUrls(req, res) {
  try {
    const urls = await Url.find().sort({ createdAt: -1 });
    res.status(200).json(urls);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// POST /api/shorten  -> create a new shortened URL
async function createUrl(req, res) {
  try {
    const { url } = req.body;

    if (!url || !isValidUrl(url)) {
      return res.status(400).json({ error: 'Provide a valid "url" field, e.g. https://example.com' });
    }

    // reuse an existing code if this long URL was already shortened
    const existing = await Url.findOne({ longUrl: url });
    if (existing) {
      return res.status(200).json({
        ...existing.toObject(),
        shortUrl: `${BASE_URL}/${existing.code}`,
        reused: true
      });
    }

    let code = generateCode();
    // eslint-disable-next-line no-await-in-loop
    while (await Url.findOne({ code })) code = generateCode();

    const newUrl = await Url.create({ longUrl: url, code });

    res.status(201).json({
      ...newUrl.toObject(),
      shortUrl: `${BASE_URL}/${newUrl.code}`
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// GET /:code  -> redirect to the original URL and bump the hit counter
async function redirectToUrl(req, res) {
  try {
    const { code } = req.params;
    const entry = await Url.findOne({ code });

    if (!entry) {
      return res.status(404).json({ error: `No URL found for code "${code}"` });
    }

    entry.hits += 1;
    await entry.save();

    res.redirect(entry.longUrl);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// GET /api/stats/:code  -> hit count / metadata for one code
async function getStats(req, res) {
  try {
    const { code } = req.params;
    const entry = await Url.findOne({ code });

    if (!entry) {
      return res.status(404).json({ error: `No URL found for code "${code}"` });
    }

    res.status(200).json(entry);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// DELETE /api/urls/:id  -> remove a shortened URL (bonus CRUD op)
async function deleteUrl(req, res) {
  try {
    const { id } = req.params;
    const deleted = await Url.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ error: 'URL entry not found' });
    }

    res.status(200).json({ message: 'Deleted', id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  getUrls,
  createUrl,
  redirectToUrl,
  getStats,
  deleteUrl
};
