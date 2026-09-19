# AGENTS.md - AI Agent Workflows & Sub-Agent Responsibilities

This document defines specialized AI agent roles, sub-agent workflows, and domain responsibilities for developing, maintaining, and scaling the Airbnb Clone application (Playpower Labs Assessment).

---

## Sub-Agent Roles & Workflows

### 1. UI/UX Parity Agent
- **Domain**: Frontend components, Tailwind CSS styling, responsive layout fidelity.
- **Responsibilities**:
  - Replicate the exact visual layout of `https://airbnb-clone-umber-two.vercel.app/`.
  - Maintain Airbnb design tokens (`#FF385C` primary red, `#222222` dark text, `#717171` secondary gray, `#DDDDDD` borders).
  - Implement the **5-photo hero mosaic grid** with rounded corners and image dimming hover states.
  - Maintain the **floating sticky reservation card** (`sticky top-28`) with live check-in/checkout date range calculations, guest dropdowns, and dynamic pricing breakdown.
  - Build the **Photo Tour Scrollable Modal** (`?modal=PHOTO_TOUR_SCROLLABLE`) featuring top thumbnail grid navigation and 2-column room feature breakdowns.

---

### 2. Backend Data Agent
- **Domain**: Java 17+, Spring Boot, JPA Entities, Database Migrations & Data Pre-Seeding.
- **Responsibilities**:
  - Manage JPA entities (`Listing`, `ListingImage`, `Amenity`, `Review`) and Spring Data JPA repositories.
  - Configure `DataLoader.java` for clean database pre-seeding on application startup without Hibernate detached entity or optimistic locking exceptions (`ObjectOptimisticLockingFailureException`).
  - Implement RESTful controllers (`ListingController.java`) for property details (`GET /api/listings/{id}`) and reservation cost calculation (`POST /api/listings/{id}/reserve`).
  - Maintain CORS configurations and Next.js proxy rewrite integration (`next.config.ts`).

---

### 3. Accessibility & Keyboard Navigation Agent
- **Domain**: Modal overlays, focus traps, event listeners, keyboard navigation.
- **Responsibilities**:
  - Manage focus traps and scroll-locking (`document.body.style.overflow = 'hidden'`) whenever full-screen modals open.
  - Implement global keyboard shortcuts for the **Single-Photo Lightbox Viewer** (`LightboxModal.tsx`):
    - `ArrowRight`: Navigate to the next photo.
    - `ArrowLeft`: Navigate to the previous photo.
    - `Escape`: Close lightbox / return to Photo Tour.
  - Ensure ARIA labels, semantic HTML tags, and accessible contrast ratios across interactive controls.
