const mongoose = require('mongoose');

// Schema for a single shortened URL, replacing the old urlStore.json entries.
const UrlSchema = new mongoose.Schema({
  longUrl: {
    type: String,
    required: [true, 'longUrl is required'],
    trim: true
  },
  code: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  hits: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Url', UrlSchema);
