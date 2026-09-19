# Single-Link Render.com Deployment Guide

This setup packages the **Next.js frontend** and **Spring Boot backend** into a **single unified Web Service container**. You get a **single deployment link** (e.g. `https://airbnb-clone.onrender.com`), with zero CORS configuration needed!

---

## How It Works

1. The Docker build (`Dockerfile`) statically exports the Next.js frontend (`frontend/out/`).
2. It embeds those static HTML, JS, and CSS files directly into Spring Boot's `src/main/resources/static/`.
3. Spring Boot serves:
   - **`GET /`**: Renders the complete Next.js Airbnb Clone UI.
   - **`GET /api/listings/{id}`**: Handles property details REST API.
   - **`POST /api/listings/{id}/reserve`**: Handles reservation calculations.
   - **`GET /api/health`**: Health check endpoint (`{"status": "UP"}`).

---

## Method 1: 1-Click Blueprint Deployment (Recommended)

1. Log in to [Render Dashboard](https://dashboard.render.com).
2. Click **New +** -> **Blueprint**.
3. Connect your GitHub/GitLab repository.
4. Render will read `render.yaml` and create a single web service (`airbnb-clone`).
5. Click **Apply**.
6. Render will build the single container and give you **one single live link**!

---

## Method 2: Manual Web Service Setup

If configuring manually on the Render Dashboard:

1. Click **New +** -> **Web Service**.
2. Connect your Git repository.
3. Configure:
   - **Name**: `airbnb-clone`
   - **Environment**: `Docker`
   - **Dockerfile Path**: `./Dockerfile`
   - **Instance Type**: `Free`
4. Click **Create Web Service**.
5. Once built, open the generated Render link. You will see your full Airbnb application running on a single URL!

---

## Advantages of Single-Service Deployment
- **Single URL/Link**: One link for your entire project.
- **Zero CORS Issues**: Frontend and Backend run on the exact same port and origin.
- **Simpler Management**: Only 1 Web Service running on Render Free Tier.
