# Crevo - The Creator Operating System

![Crevo Dashboard Preview](public/placeholder-logo.svg)

Crevo is a unified full-stack application for modern creators, seamlessly blending social media scheduling, AI copilots, direct analytics, and community management. 

Currently, Crevo consolidates powerful features extracted from multiple dedicated micro-apps into a single Next.js monolith. 

## 🌟 Key Features

### 1. Unified Social Media Dashboard
Manage all your profiles in a single place:
- **Comprehensive Overview:** Snapshots of follower growth, engagement rates, and recent activity.
- **Analytics Engine:** Track post performance across Twitter/X, Instagram, LinkedIn, and more.
- **Audience Deep Dives:** Analyze user demographics, locations, and top advocates.

### 2. Multi-Platform Smart Scheduler
- **Write Once, Post Everywhere:** Compose updates simultaneously for 18+ different social platforms.
- **Auto-Formatting:** Automatically restricts character counts and validates media types based on the target network.
- **Peak Engagement Times:** Intelligent suggestions for the best time to post based on historical data.
- **Calendar Visualization:** Month, week, day, and list views to track upcoming scheduled content.

### 3. Integrated AI Copilots
Generate content on the fly without leaving the platform.
- **Chat Interface:** Converse dynamically with AI models (NVIDIA NIM, Groq, or Google Gemini).
- **Quick Actions:** One-click buttons to "Generate Caption", "Find Trending Hashtags", or "Write Script Hook".

### 4. Direct Connect OAuth Handlers
- Secure backend routing mapped specifically to receive callback tokens after users connect their social profiles.

## 🛠️ Technology Stack

* **Framework:** [Next.js 15 (App Router)](https://nextjs.org/)
* **Language:** TypeScript
* **Styling:** Tailwind CSS + Radix UI Primitives (shadcn/ui)
* **State Management:** Zustand
* **Authentication:** NextAuth / Firebase Auth (Environment dependent)
* **Backend Processing:** Edge APIs + Redis Queue Workers (Local)
* **Deployment Automation:** GitHub Actions (CI/CD)
* **Containerization:** Docker multi-stage Alpine build

## 🚀 Getting Started

### Prerequisites

You need the following installed:
* Node.js (v18 or higher)
* PNPM or NPM
* Docker (Optional, for running full containerized tests)

### Local Development Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/sru-codes/Crevo.git
   cd Crevo
   ```

2. **Install dependencies:**
   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Environment Setup:**
   Duplicate the `.env.example` file and rename it to `.env.local`. Fill in the required API keys (Gemini, Groq, Firebase, Stripe, etc.)
   ```bash
   cp .env.example .env.local
   ```

4. **Start the Development Server:**
   ```bash
   pnpm dev
   # or
   npm run dev
   ```

5. **Open in Browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Architecture & Structure

```text
Crevo/
├── .github/          # CI/CD Workflows
├── app/              # Next.js App Router & API Endpoints
├── components/       # Reusable React UI & Dashboard Modules
├── lib/              # Core Logic (Platforms, Scheduler, DB)
├── public/           # Static Assets
├── scripts/          # Automation (PS1 Backup & Recovery)
├── stores/           # Zustand Global State
└── styles/           # Global CSS (Tailwind entry)
```

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! 
Feel free to check [issues page](https://github.com/sru-codes/Crevo/issues).

## 📝 License

This project is licensed under the MIT License.
