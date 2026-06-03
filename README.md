# 🌐 Premium Interactive Developer Portfolio & CV Hub 🚀

A state-of-the-art, ultra-high-performance personal portfolio website and interactive CV hub built using **Astro 5**, **React 19**, and **Tailwind CSS v4**.

---

<p align="center">
  🇺🇸 <b>English</b> | <a href="./README.es.md">🇪🇸 Español</a>
</p>

---

## 🌟 Overview

This repository houses the source code for my professional developer portfolio. It is designed to act as a sleek, interactive, and high-performance showcase of my GovTech, FinTech, and Cross-Platform Mobile capabilities, presenting my projects, professional CVs (both visual and ATS-optimized), and interactive layouts to recruiters and technical leaders.

---

## ✨ Key Features

*   **⚡ Code Splitting & Performance:** Powered by **Astro 5** with dynamic React `lazy` loading and `Suspense` for heavy components, plus asynchronous image decoding (`decoding="async"`) to minimize initial bundle size and ensure perfect Core Web Vitals.
*   **🎬 Premium Cinematic Aesthetics:** Implements a subtle fixed noise overlay, responsive magnetic hover effects on CTAs and Navbar links, dynamic color-coded project category badges, and realistic blinking terminal cursors.
*   **🎨 Glassmorphism & High-Tech Design:** Implements premium dark-theme glass designs with custom HSL styling and micro-animations backed by **Framer Motion 12**.
*   **💻 Mac Terminal Project Showcases:** Custom-built terminal and dashboard preview components with conditional device mockups (Smartphones/Laptops) for projects without video and secure production layout styles.
*   **🌐 Comprehensive Bilingual Support (i18n):** Fast, client-side language switching between Spanish and English using dynamic context management.
*   **📄 Embedded Dual CV Portals:** Hosts highly polished, downloadable CV files in both Visual (CSS styled) and ATS-Friendly formats.
*   **🐳 Containerized Architecture:** Pre-configured with a modular **Dockerfile** and **Docker Compose** structure for fast deployment and local isolation.

---

## 🛠️ Cutting-Edge Tech Stack

*   **Core Framework:** `Astro 5.2.0` (Static Page Generation)
*   **UI Library:** `React 19.0.0` (Interactive Components)
*   **Styling Engine:** `Tailwind CSS v4.0.0` & `Vanilla HSL variable tokens`
*   **Animation System:** `Framer Motion 12.0.0` (Mechanical spring transitions and layout animations)
*   **Language Support:** Custom React `LanguageContext` (JSON-based i18n translations)
*   **Type Safety:** `TypeScript 5.7.3`

---

## 🚦 Getting Started

### Prerequisites

*   **Node.js:** `>=18.0.0` (Node 20+ recommended)
*   **npm** or **yarn**
*   **Docker & Docker Compose** (Optional: for containerized running)

### Installation & Execution Guide

1.  **Clone the Repository:**
    ```bash
    git clone https://github.com/branmarvel/portafolio.git
    cd portafolio
    ```

2.  **Install Dependencies:**
    ```bash
    npm install
    ```

3.  **Run Development Server:**
    ```bash
    npm run dev
    ```
    Open your browser and navigate to `http://localhost:4321/` to view the interactive canvas locally.

4.  **Build Production Bundle:**
    ```bash
    npm run build
    ```
    This triggers typechecking via `@astrojs/check` and generates the optimized static bundle in the `dist/` directory.

---

## 🐳 Containerized Execution (Docker)

If you prefer to run the portfolio using Docker containerization:

*   **Using Docker Compose:**
    ```bash
    docker-compose up --build -d
    ```
    This builds the production container and hosts the static site on `http://localhost:8080/`.

---

## 📂 Project Architecture

This codebase features a clean separation between Astro pages (routes) and modular interactive React components:

```text
portafolio/
├── public/                 # Static assets (CV PDFs)
├── src/
│   ├── components/         # Interactive UI Components (React)
│   │   ├── ProjectsSection.jsx   # Projects slider featuring terminal mockups
│   │   ├── InteractiveCanvas.jsx # Interactive mouse-glow background canvas
│   │   ├── ProjectLens.jsx       # Circular project metadata viewer
│   │   └── HeroSection.jsx       # Typing intro layout
│   ├── context/            # Global React states (i18n Language Context)
│   ├── i18n/               # Translation dictionary assets
│   ├── layouts/            # Base HTML and metadata templates (Astro)
│   ├── pages/              # Routing entrypoints
│   │   └── index.astro     # Main portfolio page template
│   ├── styles/             # Core CSS rules and HSL design tokens
│   └── utils/              # Framer Motion animation presets
├── cv_projects/            # Professional CV assets (Visual & ATS HTML versions)
├── Dockerfile              # Docker compilation rules
├── docker-compose.yml      # Multi-container setup coordinates
├── astro.config.mjs        # Astro integration settings
└── tsconfig.json           # TypeScript configuration
```

---

## 🤝 Git Commit Guidelines

To maintain clean repository hygiene for both humans and AI agents, all commits must follow the conventions specified in [COMMIT_CONVENTION.md](COMMIT_CONVENTION.md). Make sure your commit messages start with appropriate emoji and Angular style prefixes (e.g., `⚡ perf(scope): description` or `💄 style(scope): description`).

---

## 📜 License

MIT License - [LICENSE](LICENSE)
