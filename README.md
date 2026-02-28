# MediSearch

MediSearch is a minimal, professional healthcare directory built with Vite + React (JavaScript) using plain CSS only. It displays mock doctors and provides fast real-time search + specialty filtering in a clean, responsive SaaS-style UI.

## Features

- Static mock doctor directory (no backend)
- Real-time search across:
  - name
  - specialty
  - clinic
  - location
- Specialty dropdown filter:
  - “All Specialties”
  - unique specialties generated from data
- Clear filters button (resets search + specialty)
- Dynamic results count
- Responsive full-width layout with max content width (1200px)
- Card grid: `repeat(auto-fill, minmax(280px, 1fr))`

## Tech Stack

- React (hooks)
- Vite
- JavaScript (no TypeScript)
- Plain CSS (no UI libraries, no frameworks, no Tailwind)

## Setup

1) Install dependencies:
```bash
npm install