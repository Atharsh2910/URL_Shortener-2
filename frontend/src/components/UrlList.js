import React from 'react';
import UrlItem from './UrlItem';

// Equivalent of the "Task List" component: maps over the "urls" array and
// renders a UrlItem for each one.
function UrlList({ urls }) {
  if (!urls.length) {
    return <p>No URLs shortened yet — add one above.</p>;
  }

  return (
    <ul className="url-list">
      {urls.map((entry) => (
        <UrlItem key={entry._id || entry.code} entry={entry} />
      ))}
    </ul>
  );
}

export default UrlList;
