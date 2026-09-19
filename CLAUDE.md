# CLAUDE.md - Airbnb Clone Development Guide

This document provides developer guidelines, build commands, tech stack specs, design tokens, and key feature behaviors for coding agents working on this Airbnb Clone project (Playpower Labs Assessment).

---

## 1. Build & Run Commands

### Frontend (Next.js 14+ App Router)
- **Directory**: `frontend/`
- **Development Server**: `npm run dev` (Runs on http://localhost:3000)
- **Production Build**: `npm run build`
- **Start Production**: `npm start`
- **Lint**: `npm run lint`

### Backend (Spring Boot 3 / Java 17)
- **Directory**: `./` (Root directory)
- **Run Application**: `./mvnw spring-boot:run` (Runs REST API on http://localhost:8080)
- **Compile & Test**: `./mvnw clean test-compile`
- **Package JAR**: `./mvnw clean package`
- **H2 Console**: http://localhost:8080/h2-console (JDBC URL: `jdbc:h2:mem:...`)

---

## 2. Project Tech Stack & Structure

### Frontend Stack
- **Framework**: Next.js (App Router, TypeScript)
- **Styling**: Tailwind CSS
- **Icons & Motion**: Lucide React Icons (`lucide-react`), Framer Motion (`framer-motion`)
- **API Integration**: REST API Client (`src/lib/api.ts`) with Next.js Proxy Rewrite (`/api/:path*` -> `http://localhost:8080/api/:path*`) and local JSON fallback (`src/data/listingFallback.ts`).

### Backend Stack
- **Language & Framework**: Java 17+, Spring Boot 3
- **Data Access**: Spring Data JPA, Hibernate ORM
- **Database**: H2 In-Memory Database (Pre-seeded on startup via `DataLoader.java`)
- **Build System**: Apache Maven (`mvnw`)

---

## 3. Code Quality & Design Guidelines

### Design Tokens (Exact Airbnb Branding)
- **Primary Red**: `#FF385C`
- **Dark Text**: `#222222`
- **Secondary Gray**: `#717171`
- **Light Border**: `#DDDDDD`
- **Light Background**: `#F7F7F7`

### Strict Data Models (TypeScript & Java Entities)
- **Listing**: `id`, `title` ("Romantic Jacuzzi 18HK Candolim  Mirashya UG10"), `location` ("Candolim, Goa, India"), `rating` (4.91), `reviewCount` (43), `maxGuests` (2), `bedrooms` (1), `beds` (1), `baths` (1), `basePrice` (3500), `cleaningFee` (500), `serviceFee` (350), `description`, `hostName` ("Mirashya Stays"), `hostAvatar`, `isSuperhost` (true).
- **ListingImage**: `id`, `url`, `caption`, `category` ("Living room 1", "Living room 2", "Full kitchen", "Bedroom", "Full bathroom", "Gym", "Exterior", "Pool", "Additional photos"), `features`, `isHero`.
- **Amenity**: `id`, `name`, `category`, `iconName`.
- **Review**: `id`, `authorName`, `authorAvatar`, `rating`, `date`, `comment`.

### Controller Standard
- **Endpoints**:
  - `GET /api/listings/{id}` -> Returns complete property details.
  - `POST /api/listings/{id}/reserve` -> Accepts `checkIn`, `checkOut`, `guests` and calculates stay duration & total pricing.

---

## 4. Key Modal Behaviors & Hotkeys

### Photo Tour Scrollable View
- **URL Trigger**: `?modal=PHOTO_TOUR_SCROLLABLE`
- **Features**: Top category thumbnail navigation grid, 2-column room breakdown (room title + subtext features on left, high-res photo card on right), smooth section scroll anchors.

### Single-Photo Lightbox Viewer
- **Trigger**: Clicking any photo inside the Photo Tour or hero gallery.
- **Backdrop**: Pitch-black overlay (`bg-black`) with photo counter (`1 / 9`), category tag, and captions.
- **Keyboard Hotkeys**:
  - `ArrowRight`: Advance to next image.
  - `ArrowLeft`: Go back to previous image.
  - `Escape`: Close lightbox / return to Photo Tour modal.
