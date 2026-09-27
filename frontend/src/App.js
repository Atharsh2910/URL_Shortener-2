import React, { Component } from 'react';
import UrlForm from './components/UrlForm';
import UrlList from './components/UrlList';
import './index.css';

// Base URL of the Express API. In development, CRA's "proxy" field in
// package.json forwards /api/* requests to http://localhost:5000, so this
// can stay relative.
const API_BASE = '/api';

class App extends Component {
  constructor(props) {
    super(props);

    // Step 2: initialize state -> "urls" (equivalent of "todos") and
    // "newUrl" (equivalent of "newTodo").
    this.state = {
      urls: [],
      newUrl: '',
      error: ''
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // Step 3: on mount, GET the existing shortened URLs from MongoDB via the
  // Express API.
  componentDidMount() {
    fetch(`${API_BASE}/urls`)
      .then((response) => response.json())
      // Step 4: update the "urls" state with the retrieved data.
      .then((data) => this.setState({ urls: data }))
      .catch((err) => this.setState({ error: `Could not load URLs: ${err.message}` }));
  }

  // Step 6: update "newUrl" as the user types.
  handleInputChange(event) {
    this.setState({ newUrl: event.target.value, error: '' });
  }

  // Steps 7-10: validate, POST the new URL, then update state.
  handleSubmit(event) {
    event.preventDefault();
    const { newUrl } = this.state;

    // Step 7: if the input is empty, do nothing.
    if (!newUrl.trim()) {
      return;
    }

    // Step 8: build the payload the API expects.
    const payload = { url: newUrl.trim() };

    // Step 9: POST the new URL to the server / database.
    fetch(`${API_BASE}/shorten`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || 'Request failed');
        return data;
      })
      // Step 10: prepend the newly created entry and clear the input.
      .then((created) => {
        this.setState((prevState) => ({
          urls: [created, ...prevState.urls],
          newUrl: '',
          error: ''
        }));
      })
      .catch((err) => this.setState({ error: err.message }));
  }

  render() {
    const { urls, newUrl, error } = this.state;

    return (
      <div className="app">
        <h1>MERN URL Shortener</h1>
        <p className="subtitle">Paste a long link, get a short one, backed by MongoDB.</p>

        <UrlForm
          value={newUrl}
          onChange={this.handleInputChange}
          onSubmit={this.handleSubmit}
        />

        {error && <p className="error">{error}</p>}

        {/* Step 12: map through urls and render each one via UrlList/UrlItem. */}
        <UrlList urls={urls} />
      </div>
    );
  }
}

export default App;
