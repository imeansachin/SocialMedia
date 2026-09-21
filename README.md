# Social Media App

A simple full-stack social media app that I built while learning and working with React and backend development.

Users can view posts, upload an image with a caption, and delete posts. The frontend and backend are deployed separately.

## Live Demo

Frontend: https://social-media-nu-sand.vercel.app/

Backend: https://social-media-backend-gnon.onrender.com/

## What I used

### Frontend
- React
- Vite
- Tailwind CSS
- Axios
- React Router
- JavaScript

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- Multer
- CORS
- dotenv

### Services
- MongoDB Atlas
- ImageKit
- Render
- Vercel

## Features

- View all posts
- Create a post with an image and caption
- Delete posts
- Like UI
- Share post
- Image upload with ImageKit
- Responsive design
- REST API

## Project Structure

```text
SocialMedia/
│
├── Backend/
│   ├── src/
│   │   ├── db/
│   │   │   └── db.js
│   │   ├── models/
│   │   │   └── post.model.js
│   │   ├── services/
│   │   │   └── storage.service.js
│   │   └── app.js
│   │
│   ├── .env
│   ├── package.json
│   └── server.js
│
├── Frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Feed.jsx
│   │   │   └── CreatePost.jsx
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── package.json
│   ├── vite.config.js
│   └── vercel.json
│
├── .gitignore
└── README.md
