# ParGive - Golf Performance & Charity Platform

ParGive is a premium, subscription-driven web application that combines golf performance tracking, monthly prize draws, and charitable giving. It is built with Next.js 14, Tailwind CSS, and Supabase.

## 🚀 Key Features

- **Subscription Engine**: Support for Monthly and Yearly plans via a premium subscription interface.
- **5-Score Rolling Logic**: Users enter their latest Stableford scores (1-45). The system automatically retains only the latest 5 scores, replacing the oldest as new ones are added.
- **Custom Draw Engine**: Algorithm-powered draws that can be weighted by most/least frequent user scores or purely random.
- **Charity Integration**: Users select a charity and contribution percentage (min 10%) during onboarding.
- **Admin Dashboard**: Comprehensive control over draws (simulation & publishing), winner verification, and platform analytics.
- **Winner Verification**: Winners can upload proof of their scores, which administrators then review and approve for payout.
- **Premium UI/UX**: Motion-enhanced, modern design focused on impact rather than traditional golf clichés.

## 🛠️ Technology Stack

- **Frontend**: Next.js 14 (App Router), React, Tailwind CSS, Framer Motion, Lucide React.
- **Backend**: Supabase (Auth, Database, RLS).
- **Styling**: Vanilla CSS with Tailwind utilities for a premium look.

## 📁 Project Structure

```text
src/
├── app/
│   ├── (auth)/          # Authentication (Login/Signup)
│   ├── admin/           # Admin Dashboard
│   ├── charities/       # Charity Directory
│   ├── dashboard/       # User Dashboard
│   ├── onboarding/      # Post-signup charity selection
│   ├── subscribe/       # Subscription plans
│   └── layout.tsx       # Root layout with premium styling
├── components/          # Reusable UI components
├── lib/
│   ├── supabase.ts      # Supabase client and type definitions
│   └── draw-engine.ts   # Core logic for draws and prize pools
└── supabase_schema.sql  # Database schema and RLS policies
```

## ⚙️ Setup & Deployment

1. **Supabase Setup**:
   - Run the contents of `supabase_schema.sql` in your Supabase SQL Editor.
   - Add initial data to `charities` table to enable onboarding.

2. **Environment Variables**:
   Create a `.env.local` file with:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

3. **Install Dependencies**:
   ```bash
   npm install
   ```

4. **Run Locally**:
   ```bash
   npm run dev
   ```

## 🎯 Evaluation Checklist Compliance

- [x] User signup & login functional.
- [x] Subscription flow (mocked) and plans implemented.
- [x] 5-score rolling logic enforced in the dashboard.
- [x] Draw system logic and simulation implemented in admin.
- [x] Charity selection and contribution calculation in onboarding.
- [x] Winner verification flow and payout tracking in both panels.
- [x] Responsive design for mobile and desktop.
- [x] Premium, emotion-driven UI/UX.

---
*Prepared as a sample assignment for Digital Heroes evaluation.*
