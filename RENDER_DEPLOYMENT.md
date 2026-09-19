# Render.com Deployment Guide

This guide provides step-by-step instructions to deploy the Airbnb Clone (Spring Boot Backend + Next.js Frontend) to **[Render.com](https://render.com)**.

---

## Why standard Spring Boot shows "Whitelabel Error Page" on Root (`/`)
By default, Spring Boot REST APIs do not map the root URL (`/`) unless explicit mapping is declared. Opening `https://airbnb-clone-backend.onrender.com/` in your browser or hit by Render health checks directly used to return a `404 Whitelabel Error Page`.

**Fixed**: We added a [`HomeController.java`](file:///e:/airbnb-clone/src/main/java/com/playpower/airbnb_clone/controller/HomeController.java) that handles `/` and `/api/health` with a clean `200 OK` JSON response.

---

## Method 1: Automatic 1-Click Blueprint Deployment (Recommended)

This repository includes a pre-configured `render.yaml` file. Render will automatically detect and configure both services for you.

### Steps:
1. Log in to [Render Dashboard](https://dashboard.render.com).
2. Click **New +** at the top right and select **Blueprint**.
3. Connect your GitHub/GitLab repository.
4. Render will read `render.yaml` and create two web services:
   - `airbnb-clone-backend` (Docker Spring Boot service)
   - `airbnb-clone-frontend` (Node.js Next.js service)
5. Click **Apply**.
6. Render will build and deploy both services automatically!

---

## Method 2: Manual Setup on Render Dashboard

If you prefer to configure each service manually via the Render Dashboard:

### Step 1: Deploy the Spring Boot Backend

1. On the Render Dashboard, click **New +** -> **Web Service**.
2. Connect your Git repository.
3. Configure the following fields:
   - **Name**: `airbnb-clone-backend`
   - **Region**: Oregon (or your preferred region)
   - **Language / Environment**: `Docker`
   - **Dockerfile Path**: `./Dockerfile`
   - **Instance Type**: `Free`
4. Expand **Advanced / Environment Variables** and add:
   - `PORT`: `10000` (Render passes `PORT` automatically)
   - `ALLOWED_ORIGINS`: `*` (or your frontend Render URL e.g. `https://airbnb-clone-frontend.onrender.com`)
5. Click **Create Web Service**.
6. Once deployed, test your backend by visiting `https://airbnb-clone-backend.onrender.com/` (it should return `{"status": "UP"}`).

---

### Step 2: Deploy the Next.js Frontend

1. On the Render Dashboard, click **New +** -> **Web Service**.
2. Connect your Git repository.
3. Configure the following fields:
   - **Name**: `airbnb-clone-frontend`
   - **Region**: Oregon (same region as backend)
   - **Root Directory**: `frontend`
   - **Language / Environment**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm run start`
   - **Instance Type**: `Free`
4. Expand **Environment Variables** and add:
   - `NEXT_PUBLIC_API_URL`: `https://airbnb-clone-backend.onrender.com/api` (replace with your backend service URL)
   - `BACKEND_URL`: `https://airbnb-clone-backend.onrender.com`
5. Click **Create Web Service**.

---

## Environment Variables Reference

| Service | Key | Value / Example | Description |
|---|---|---|---|
| Backend | `PORT` | `10000` | Dynamic port assigned by Render |
| Backend | `ALLOWED_ORIGINS` | `*` or `https://airbnb-clone-frontend.onrender.com` | Allowed CORS origins for REST API |
| Frontend | `NEXT_PUBLIC_API_URL` | `https://airbnb-clone-backend.onrender.com/api` | Public REST API base URL for client fetches |
| Frontend | `BACKEND_URL` | `https://airbnb-clone-backend.onrender.com` | Server-side proxy rewrite destination |
