# Bella Vista Restaurant

Full-stack restaurant website built with Next.js 14, TypeScript, Prisma, and NextAuth.

## Live Demo

**Website:** [https://bella-vista-restaurant-theta.vercel.app](https://bella-vista-restaurant-theta.vercel.app)

## Features

- 🍕 Browse menu with cart functionality
- 🛒 Place orders online
- 📅 Make table reservations
- 🔐 User authentication
- 👨‍💼 Admin dashboard
- 📱 Responsive design

## Tech Stack

- Next.js 14
- TypeScript
- Prisma ORM
- PostgreSQL (Supabase)
- NextAuth.js
- Tailwind CSS
- Vercel (Deployment)

## Getting Started

1. Clone the repository

```bash
git clone https://github.com/ishwarsinghnaruka/bella-vista-restaurant.git
cd bella-vista-restaurant
```

2. Install dependencies: `npm install`

3. Set up environment variables

```env
DATABASE_URL="your-supabase-postgresql-url"
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"
```

4. Database setup:

```bash
npx prisma generate
npx prisma db push
```

5. Run development server: `npm run dev`

## Demo Credentials

Admin: admin@example.com / admin123

## Project Structure

```
app/
├── api/                 # Backend API routes
├── admin/              # Admin dashboard
├── components/         # Reusable components
├── lib/               # Database & auth config
├── menu/              # Menu pages
├── cart/              # Shopping cart
└── reservations/      # Booking system
```

## Developer

**Ishwar Singh Naruka**  
GitHub: [@ishwarsinghnaruka](https://github.com/ishwarsinghnaruka)
