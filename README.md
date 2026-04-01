# TrackHire - Job Application Tracker

TrackHire is a full-stack MERN (MongoDB, Express, React, Node.js) application designed to help job seekers efficiently manage and track their job applications, interviews, and offers in one organized dashboard.

## Features
- **User Authentication**: Secure JWT-based login and registration.
- **Dashboard Analytics**: Visual breakdown of application statuses using Chart.js.
- **Job Management**: Complete CRUD capabilities for job applications (Add, Edit, View, Delete).
- **Search & Filtering**: Easily search jobs by company or position, and filter by pipeline status.
- **Responsive UI**: Built with Tailwind CSS for a seamless desktop and mobile experience.

## Tech Stack
- **Frontend**: React (Vite), Tailwind CSS, React Router, Axios, Chart.js.
- **Backend**: Node.js, Express.js, MongoDB (Mongoose), JSON Web Tokens (JWT), Bcrypt.

## Local Development Setup

1. **Clone & Install Dependencies**
   Run the following commands in the root `job-tracker-app` directory:
   
   **Terminal 1 (Backend):**
   ```bash
   cd server
   npm install
   npm run dev
   ```

   **Terminal 2 (Frontend):**
   ```bash
   cd client
   npm install
   npm run dev
   ```

2. **Environment Variables (.env)**
   Ensure the `server/.env` file contains your MongoDB URI and JWT Secret:
   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_super_secret_key
   PORT=5000
   ```

## Deployment Instructions

### Backend (Render / Heroku)
1. Push your repository to GitHub.
2. Link the repository to your Render.com account as a Web Service.
3. Set the Root Directory to `server`.
4. Add the `MONGO_URI` and `JWT_SECRET` inside the Environment Variables section.
5. Deploy.

### Frontend (Vercel / Netlify)
1. Link your repository to Vercel.
2. Set the Root Directory to `client`.
3. Vercel will auto-detect Vite settings and deploy.
4. Ensure you update `services/api.js` `baseURL` to point to the live Render backend URL before pushing.

## Portfolio Section Details

**Project Title**: TrackHire - Full Stack Job Application Tracker
**Summary**: Engineered a responsive MERN stack application allowing users to monitor their job hunt pipeline. Implemented secure RESTful APIs with JWT authentication and integrated dynamic Chart.js data visualizations to summarize application conversion rates.
**Skills Highlighted**: React.js, Express.js, MongoDB, REST API Design, Tailwind CSS, System Architecture, State Management.
