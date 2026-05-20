#  SkillSphere — Premium Online Learning & Skill Acquisition Platform

SkillSphere is a next-generation, high-fidelity LMS (Learning Management System) platform built with **Next.js 16 (App Router)** and **React 19**. It features a modern, warm, and natural light design system styled with **Tailwind CSS v4** and **DaisyUI v5**. 

The platform connects to a **MongoDB** database via the official **BetterAuth MongoDB Adapter** for server-side session management, while incorporating an automatic client-side **fail-safe local-storage backup** for zero-friction preview testing.

---

##  Design & Aesthetic System
The user interface has been customized with premium visual aesthetics tailored for a warm, natural, and engaging study environment:
*   **Warm Palette**: Accents of rich orange (`#ea580c`) and warm amber (`#f97316`) against a clean off-white canvas (`#fcfaf6`).
*   **Typography**: Clean font pairings featuring **Outfit** and **Inter** for exceptional readability.
*   **Premium Glassmorphism**: Cards and panels styled with `glass-panel` backdrops (fine-tuned white translucent borders, soft orange reflections, and back-blur).
*   **Micro-Animations**: Layout transitions, hover lift-ups, and interactive scaling driven by **Framer Motion**.
*   **Custom Scrollbars**: Modern, thin scroll tracks blending with the natural tone of the platform.

---

##  Tech Stack & Libraries

| Dependency | Version | Purpose / Feature |
| :--- | :--- | :--- |
| **Next.js** | `16.2.6` | App Router, Dynamic Route Handling, Optimization |
| **React** | `19.2.4` | Modern UI rendering and concurrent hook support |
| **BetterAuth** | `^1.6.11` | Client-Server Auth engine with OAuth & Credential support |
| **DaisyUI** | `^5.5.20` | Clean, Tailwind-native component primitives |
| **Tailwind CSS** | `^4.0.0` | Global styling engine with PostCSS support |
| **MongoDB** | `^7.1.0` | Database connection client for user persistence |
| **Framer Motion** | `^12.39.0` | Micro-interactions and smooth page transitions |
| **Lucide React** | `^1.16.0` | Clean outline SVG icons |
| **React Hot Toast** | `^2.6.0` | Smooth popup notification alerts |

---

## 🌟 Core Features & Modules

### 1. 🔍 Catalog Search & Advanced Filtering
*   **Real-time Matching**: Filter the entire course catalog by typing titles in the search bar.
*   **Category Tabs**: Segment courses by *Development*, *Design*, or *Marketing*.
*   **Interactive Badges**: Category pill-tabs feature reactive indicators counting current matching catalog items.
*   **Skeleton Loading State**: Realistic database retrieval simulations using animated, pulse-effect loading skeletons.

### 2. 🔒 Session-Aware Route Protection & Redirection
*   **Security Lockout**: Accessing detail routes (e.g. `/courses/[id]`) requires an active authenticated session. Unauthenticated guests are blocked and redirected to the login gateway.
*   **Referer Redirect Loop**: Redirections append a URL query state (e.g. `/login?redirectTo=/courses/3`). Once the user successfully registers or logs in, they are immediately navigated straight back to their chosen path.

### 3. 🏆 Personal Student Portfolio (Profile)
*   **Course Progress Tracking**: View enrolled courses accompanied by visual progress bar percentages.
*   **Gamified Achievements**: Earn status badges (such as the *Beta Pioneer Badge*) and personalized study insights.
*   **Profile Editor**: Customize account name and update avatar pictures using the client API `authClient.updateUser` with an instant-update live avatar preview.

### 4. 🧠 Science-Backed Learning Systems
*   **Pomodoro Technique**: Focus counters suggesting 25-minute intervals.
*   **Active Recall & Spaced Repetition**: Techniques to review concepts over 1-day, 3-day, and weekly loops.
*   **The Feynman Technique**: Insights prompting simplified explanations to lock in mastery.

---

## 📂 Project Structure

```text
skillsphere/
├── public/                  # Static assets and icons
├── src/
│   ├── app/                 # Next.js App Router (Layouts, pages, API routes)
│   │   ├── api/             # API routes including BetterAuth route catches
│   │   ├── courses/         # Course catalog and course detail page routes
│   │   ├── login/           # Authentication Login forms
│   │   ├── profile/         # User profile views and update settings
│   │   ├── register/        # Account registration views
│   │   ├── globals.css      # Core theme configuration, fonts & glassmorphism
│   │   ├── layout.js        # Global layout configuration
│   │   └── providers.js     # Global context providers (React Hot Toast)
│   ├── components/          # Reusable components (Navbar, Footer)
│   ├── data/                # Mock courses catalog JSON data source
│   └── lib/                 # Core server-side and client-side auth helpers
│       ├── auth-client.js          # Client-side auth Client with Mock fallback
│       └── better-auth-server.js   # Server BetterAuth config with MongoDB Adapter
├── .env.local.example       # Example variables for local database setup
└── package.json             # Build configuration and script definitions
```

---

## 🛠️ Environment Configuration

To configure database-backed sessions and Google Social login, duplicate the example file:
```bash
cp .env.local.example .env.local
```

Inside your `.env.local` file, update the following keys:
```env
# App Routing URLs
NEXT_PUBLIC_APP_URL=http://localhost:3000
BETTER_AUTH_URL=http://localhost:3000

# BetterAuth Security Secret (Should be a random 32-character string)
BETTER_AUTH_SECRET=your_better_auth_secret_here

# MongoDB Connection String & Target Database name
MONGODB_URI=mongodb://127.0.0.1:27017
MONGODB_DB=skillsphere

# Google Social Login credentials (Optional)
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here
```

---

## 🚀 Getting Started Locally

### 1. Clone the project and navigate to the directory
```bash
git clone <repository-url>
cd skillsphere
```

### 2. Install dependencies
```bash
npm install
```

### 3. Spin up the development server
```bash
npm run dev
```

### 4. Visit the web app
Open [http://localhost:3000](http://localhost:3000) on your local browser.
live link : https://learn-skill-cyan.vercel.app/
