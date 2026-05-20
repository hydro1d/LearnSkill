# 🎓 SkillSphere - Elite E-Learning & Professional Skills Platform

SkillSphere is a cutting-edge, high-end online learning platform built for modern learners to explore courses, master industry-relevant skills, and advance their professional careers. The platform specializes in three core disciplines: **Development**, **Design**, and **Digital Marketing**.

---

## 🔗 Project Links & Info

- **Tech Stack**: Next.js 16 (App Router), Tailwind CSS v4, DaisyUI v5, BetterAuth Mock Engine, Framer Motion, and Lucide React.
- **Design Inspiration**: Sleek dark modes with glassmorphic cards, vibrant gradients, and premium micro-animations (inspired by elite Dribbble interfaces).

---

## 🌟 Key Features

1. **🔒 Secure Protected Routes**: Crucial pages like the Course Details page require a logged-in session. Unauthenticated access displays a security lockout and redirects the user to the login gateway.
2. **🔄 Interactive Back-Redirection**: If a logged-out user tries to access a protected course (e.g., `/courses/3`), they are redirected to login. Once successfully signed in, they are immediately redirected *straight back* to that specific course.
3. **⚡ Reactive Mock BetterAuth Engine**: Exposes exact, compliant BetterAuth client APIs (`authClient.signIn.email`, `authClient.signUp.email`, `authClient.signIn.social` for Google, `authClient.updateUser`, and the reactive `useSession` hook) backed by `localStorage` so login state changes instantly sync across the navbar, profile page, and details view.
4. **🔍 Instant Course Search & Filtering**: Learners can search the course catalog by course title in real-time, or filter courses by category (Development, Design, Marketing) with responsive item count badges.
5. **🎨 Premium Profile Customization**: An active student dashboard presenting achievements and enrolled courses, with a dedicated update portal using the BetterAuth API (`authClient.updateUser({ name, image })`) featuring a live avatar photo preview!
6. **🚀 science-backed Learning Tips**: Integrated learning card blocks illustrating the Pomodoro technique, Spaced Repetition, and the Feynman technique to maximize study efficiency.
7. **⏱️ Async Skeleton Loader**: Simulates realistic asynchronous database API calls upon entering the Courses page to display premium, animated skeleton screens.
8. **🧭 Custom 404 Route**: A beautifully tailored Not Found fallback incorporating spinning navigational guides and redirection CTAs.
9. **📱 100% Fully Responsive Layout**: Perfect visual adapting from small mobile viewports (collapsible drawer-style navbar) to widescreen 4K displays.

---

## 📦 Installed NPM Packages

The following packages are installed to provide full feature compliance and premium micro-animations:

| Package Name | Purpose |
| :--- | :--- |
| **`better-auth`** | Exposes schemas and APIs for user and account state management. |
| **`daisyui`** *(v5+)* | Provides premium Tailwind CSS UI design components. |
| **`framer-motion`** *(Motion)* | Drives top-grade entrance animations, layout transitions, and interactive scale effects. |
| **`lucide-react`** | Implements clean, modern SVG vector outline iconography. |
| **`react-hot-toast`** | Manages gorgeous, customizable status/error pop-up toast alerts. |

---

## 🛠️ Environment Variables Configuration

To run this platform securely and successfully in a production or hosting environment, secure your configuration variables by duplicating the sample structure:

Create a `.env.local` file at the root of the workspace:

```env
# Next.js Application General URLs
NEXT_PUBLIC_APP_URL=http://localhost:3000

# BetterAuth Security Secrets (Mock & Future Production compatibility)
BETTER_AUTH_SECRET=a_secure_random_64_character_hex_hash
BETTER_AUTH_URL=http://localhost:3000
```

---

## 🚀 Getting Started Locally

### 1. Clone the project and navigate to the folder
```bash
git clone <repository-url>
cd skillsphere
```

### 2. Install dependencies
```bash
npm install
```

### 3. Setup environment variables
Create `.env.local` as described in the section above.

### 4. Run the development server
```bash
npm run dev
```

### 5. Build for production compilation
```bash
npm run build
```

Open [http://localhost:3000](http://localhost:3000) in your browser to explore **SkillSphere**.
