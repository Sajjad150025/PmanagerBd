# PmanagerBd - Real Estate Marketplace (MERN Stack)

A modern real estate marketplace built with MongoDB, Express, React, and Node.js.

## Deployment Guide

### Backend Deployment (e.g., Render, Railway)

1. **Root Directory:** Set to `backend` (if the platform allows) or point to the root and use `cd backend && npm install` as the build command.
2. **Build Command:** `npm install`
3. **Start Command:** `npm start`
4. **Environment Variables:**
   - `MONGO_URI`: Your MongoDB connection string.
   - `JWT_SECRET`: A secure secret key for tokens.
   - `PORT`: Usually provided by the platform (e.g., 10000 on Render).
   - `FRONTEND_URL`: Your deployed frontend URL (e.g., `https://pmanager-bd.vercel.app`).
   - `NODE_ENV`: `production`

### Frontend Deployment (Vercel)

1. **Framework Preset:** `Vite`
2. **Root Directory:** `frontend`
3. **Build Command:** `npm run build`
4. **Output Directory:** `dist`
5. **Environment Variables:**
   - `VITE_API_URL`: Your deployed backend URL (e.g., `https://pmanager-bd-backend.onrender.com`).

## Features
- User Authentication (JWT)
- Property Listings (Rent, Buy, Sell, Need)
- Image Uploads
- Responsive Design (Tailwind CSS)
- Modern Search & Filtering
