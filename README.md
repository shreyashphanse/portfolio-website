# Full Stack Portfolio Website

A full-stack portfolio website built with React, Node.js, Express, and MongoDB.

## Live Website

https://portfolio-frontend-nogx.onrender.com

## Tech Stack

Frontend:

- React
- Vite
- CSS

Backend:

- Node.js
- Express

Database:

- MongoDB Atlas

Hosting:

- Render

## Features

- Dynamic portfolio content
- Project showcase
- Achievement modal with image uploads
- Admin panel for editing portfolio content
- Secure admin routes
- Image upload support

## Admin Routes

```
/post
/edit
/settings
```

## Local Setup

Clone repository

```
git clone <repo-url>
```

Install backend dependencies

```
cd backend
npm install
```

Install frontend dependencies

```
cd ../frontend
npm install
```

Run backend

```
npm run dev
```

Run frontend

```
npm run dev
```

## Environment Variables

Backend `.env`

```
MONGO_URI=your_mongodb_atlas_uri
ADMIN_PASSWORD=your_admin_password
PORT=5000
```

Frontend `.env`

```
VITE_ADMIN_PASSWORD=your_admin_password
```

## License

Personal project.
