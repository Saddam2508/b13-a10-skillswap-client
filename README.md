# SkillSwap - Client

A modern freelance marketplace where clients can post tasks and freelancers can submit proposals. Clients can review proposals, complete payment, and manage projects while freelancers can work on assigned tasks and submit deliverables.

## 🌐 Live Website

https://b13-a10-skillswap.vercel.app/

## 🔗 Backend API

https://b13-a10-skillswap-server.vercel.app/

---

# Features

## Authentication

- Firebase Authentication
- Email & Password Login
- Google Login
- Protected Routes
- JWT Authentication

## Client Features

- Create new tasks
- Edit task
- Delete task
- View own tasks
- View received proposals
- Accept or Reject proposals
- Dummy payment gateway
- Track task status

## Freelancer Features

- Browse available tasks
- Submit proposals
- View active tasks
- Submit project deliverables
- View completed projects

## Task Management

- Create Task
- Update Task
- Delete Task
- Task Status
  - Open
  - In Progress
  - Completed

## Proposal Management

- Submit Proposal
- Accept Proposal
- Reject Proposal
- Prevent duplicate proposal submission

## Payment

- Dummy Checkout Page
- Payment Success Screen
- Automatically starts project after payment

## Dashboard

Separate dashboards for

- Client
- Freelancer

---

# Tech Stack

## Frontend

- Next.js 16
- React 19
- Tailwind CSS
- HeroUI
- Firebase Authentication
- React Hook Form
- React Icons
- SweetAlert2

---

# Folder Structure

src/
│
├── app/
├── components/
├── lib/
│ ├── actions/
│ ├── api/
│ └── auth/
├── hooks/
├── providers/
└── utils/

---

# Environment Variables

Create a `.env.local`

```env
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=

NEXT_PUBLIC_API_URL=https://b13-a10-skillswap-server.vercel.app
```

# Installation

Clone Repository

```bash
git clone https://github.com/your-username/b13-a10-skillswap-client.git
```

Go to project

```bash
cd b13-a10-skillswap-client
```

Install packages

```bash
npm install
```

Run Development Server

```bash
npm run dev
```

Build

```bash
npm run build
```

Start Production

```bash
npm start
```

---

# Pages

- /
- /login
- /register
- /browse-tasks
- /task/[id]
- /dashboard/client
- /dashboard/freelancer
- /payment/checkout

---

# Authentication

- Firebase Authentication
- JWT Protected API
- Private Dashboard
- Route Protection

---

# Future Improvements

- Real Payment Gateway
- Real-time Chat
- Notification System
- Rating & Review
- Email Notification
- Admin Dashboard

---

# Author

Md Saddam Hossain