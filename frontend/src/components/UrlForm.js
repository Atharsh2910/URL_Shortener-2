import React from 'react';

// Equivalent of the "Task Form" component: an input field plus a button
// to add a new item (a URL instead of a todo task).
function UrlForm({ value, onChange, onSubmit }) {
  return (
    <form className="url-form" onSubmit={onSubmit}>
      <input
        type="text"
        placeholder="https://example.com/very/long/link"
        value={value}
        onChange={onChange}
      />
      <button type="submit">Shorten</button>
    </form>
  );
}

export default UrlForm;
