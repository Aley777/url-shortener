# URL Shortener

A simple URL shortener backend project built with Node.js, Express, and SQLite.

## Features

* Create short URLs from long URLs
* Store URLs in SQLite database
* Redirect short URLs to original URLs
* Click count tracking
* Stats endpoint for shortened URLs
* URL validation before shortening
* REST API structure with routes and controllers

## Technologies

* Node.js
* Express.js
* SQLite3

## Project Structure

```bash
src/
  app.js
  db.js
  controllers/
    urlController.js
  routes/
    urlRoutes.js
database.sqlite
package.json
```

## Installation

```bash
npm install
npm run dev
```

Server runs at:

```
http://localhost:3000
```

## API Endpoints

### Create Short URL

```http
POST /shorten
```

Request body:

```json
{
  "originalUrl": "https://www.google.com"
}
```

Response:

```json
{
  "message": "Short URL created successfully",
  "originalUrl": "https://www.google.com",
  "shortCode": "abc123",
  "shortUrl": "http://localhost:3000/abc123"
}
```

---

### Redirect to Original URL

```http
GET /:code
```

Example:

```
http://localhost:3000/abc123
```

This will redirect to the original URL.

---

### Get URL Stats

```http
GET /stats/:code
```

Response:

```json
{
  "originalUrl": "https://www.google.com",
  "shortCode": "abc123",
  "shortUrl": "http://localhost:3000/abc123",
  "clickCount": 3,
  "createdAt": "2026-04-23 16:24:33"
}
```

---

## Validation Rules

* URL must be a valid format
* URL must start with `http://` or `https://`

---

## Future Improvements

* Custom short codes
* Expiration date for URLs
* Frontend UI (React)
* Authentication system
* Deployment (Render / Railway)
