import React from 'react';

// Equivalent of the "Task Item" component: renders a single record from
// the "urls" array (one shortened URL and its long-URL / hit count).
function UrlItem({ entry }) {
  const shortUrl = entry.shortUrl || `${window.location.origin}/${entry.code}`;

  return (
    <li className="url-item">
      <div>
        <a className="short-url" href={shortUrl} target="_blank" rel="noreferrer">
          {shortUrl}
        </a>
        <span className="long-url">{entry.longUrl}</span>
      </div>
      <span className="hits">{entry.hits || 0} hits</span>
    </li>
  );
}

export default UrlItem;
