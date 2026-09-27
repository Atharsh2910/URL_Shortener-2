## URL Shortener

## Project structure

```
url-shortener-mern/
├── backend/
│   ├── config/db.js           
│   ├── models/Url.js           
│   ├── controllers/urlController.js
│   ├── routes/urlRoutes.js
│   ├── server.js                
│   ├── package.json
│   └── .env.example
└── frontend/
    ├── public/index.html
    └── src/
        ├── App.js               
        ├── index.js / index.css
        └── components/
            ├── UrlForm.js        
            ├── UrlList.js         
            └── UrlItem.js        
```

## Prerequisites

- Node.js v18+ and npm
- MongoDB running locally (`mongodb://127.0.0.1:27017`) **or** a free
  [MongoDB Atlas](https://www.mongodb.com/atlas) connection string

## 1. Backend setup

```bash
cd url-shortener-mern/backend
npm install```


```
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/urlShortenerDB
BASE_URL=http://localhost:5000
```

Start the API:

```bash
npm run dev    

```
MongoDB connected -> mongodb://127.0.0.1:27017/urlShortenerDB
Server running at http://localhost:5000
```

## 2. Frontend setup

Open a **second terminal**:

```bash
cd url-shortener-mern/frontend
npm install
npm start
```

This opens `http://localhost:3000` in your browser.

## 3. Using the app

1. Paste a full URL (e.g. `https://www.google.com`) into the input box and
   click **Shorten**.
2. The new entry appears at the top of the list with its short link and hit
   count (starts at 0).
3. Click the short link to be redirected to the original URL — refresh the
   page (or re-fetch) and the hit count goes up.
4. Refresh the whole app (`F5`) — the list still loads from MongoDB via
   `componentDidMount`, so your data survives a page reload/server restart.

## API endpoints (for reference / curl testing)

| Method | Path              | Description                          |
|--------|-------------------|---------------------------------------|
| GET    | `/api/urls`       | list all shortened URLs               |
| POST   | `/api/shorten`    | body `{ "url": "https://..." }`       |
| GET    | `/api/stats/:code`| hit count / metadata for one code     |
| DELETE | `/api/urls/:id`   | delete a shortened URL                |
| GET    | `/:code`          | redirect to the original long URL     |

```bash
curl -X POST http://localhost:5000/api/shorten \
  -H "Content-Type: application/json" \
  -d '{"url": "https://www.google.com"}'
```