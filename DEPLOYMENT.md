# Deployment Guide for Notes App

This guide explains how to deploy the Notes App to Render.

## Prerequisites

1. A GitHub account
2. A Render account (sign up at [render.com](https://render.com/))
3. A MongoDB Atlas database (or any MongoDB-compatible database)

## Deployment Steps

### 1. Set up MongoDB Database

1. Create a new MongoDB Atlas cluster at [https://www.mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a database user and note down the credentials
3. Get the connection string (URI) for your database

### 2. Deploy to Render

1. Push your code to a GitHub repository
2. Go to [Render Dashboard](https://dashboard.render.com/)
3. Click "New" and select "Web Service"
4. Connect your GitHub repository
5. Configure the service:
   - **Name**: notes-app (or your preferred name)
   - **Region**: Choose the region closest to your users
   - **Branch**: main (or your main branch)
   - **Build Command**: `npm run build`
   - **Start Command**: `npm start`
6. Add environment variables:
   ```
   NODE_ENV=production
   MONGODB_URI=your_mongodb_connection_string
   PORT=10000
   JWT_SECRET=your_secure_jwt_secret
   JWT_EXPIRE=30d
   ```
7. Click "Create Web Service"

### 3. Set up Automatic Deploys (Optional)

1. In your Render dashboard, go to your web service
2. Click on the "Auto-Deploy" tab
3. Enable "Auto-Deploy" for your main branch

## Environment Variables

Create a `.env` file in the backend directory with the following variables:

```
MONGODB_URI=your_mongodb_connection_string
PORT=5001
NODE_ENV=development
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRE=30d
```

## Development Setup

1. Install dependencies:
   ```bash
   npm install
   cd Notes_App/backend && npm install
   cd ../frontend && npm install
   ```

2. Start the development servers:
   ```bash
   # From project root
   npm run dev
   ```

## Production Build

To create a production build:

```bash
# Build the frontend
cd Notes_App/frontend
npm run build

# The build files will be in Notes_App/frontend/dist
# The backend will serve these files in production mode
```

## Troubleshooting

- If you get build errors, check the build logs in the Render dashboard
- Ensure all environment variables are set correctly
- Check the server logs in the Render dashboard for runtime errors
- Make sure your MongoDB connection string is correct and the database is accessible from Render's IP addresses
