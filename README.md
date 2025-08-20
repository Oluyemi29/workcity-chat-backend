# Real Time Chat App Backend

This is the backend for **Real Time Chat App**, built using **Node.js**, **Express**, and **TypeScript**. It provides APIs and real-time messaging functionality for users, admins, agents, designers, merchants, and customers.

---

## Table of Contents

- [Technologies](#technologies)
- [Setup](#setup)
- [Challenges](#challenges)

---

## Technologies

- **Node.js** - JavaScript runtime environment  
- **Express** - Backend framework for building APIs  
- **TypeScript** - Type safety for JavaScript  
- **MongoDB** - NoSQL database for storing users and messages  
- **Mongoose** - MongoDB object modeling  
- **Socket.IO** - Real-time communication for chat  
- **Bcrypt** - Password hashing  
- **JSON Web Token (JWT)** - Authentication and authorization  
- **Cron** - Scheduled background tasks  
- **Dotenv** - Environment variables management  

---

## Setup

1. **Clone the repository:**

```bash
git clone https://github.com/Oluyemi29/workcity-chat-backend.git
cd backend
```

2. **Install dependencies:**

```bash
npm install
```

3. **Configure environment variables:**
   Create a .env file at the root:

```bash
PORT=5000
MONGODB=<your-mongo-db-connection-string>
NODE_ENV=<your-mode>
JWT_SECRETKEY=<your-jwt-secret>
FrontendUrl=<your-frontend-url>
API_URL=<your-backend-url>
```
4. **Running the Project:**
   Development mode (hot reload):

```bash
npm run dev
```

5. **Production build:**

```bash
npm run build
npm start
```

## Challenges

**Challenges**

Handling TypeScript types:
Managing type definitions for Express, Socket.IO, and JWT was tricky and required @types packages and proper tsconfig setup.

Online Users Indicator:
Ensuring the online users list updated correctly in real-time without duplicates using Socket.IO.

Scroll-to-Bottom for Messages:
Implementing real-time updates and scroll management for incoming messages with proper frontend-backend coordination.

Persistent Authentication:
Managing cookies and JWTs for authentication so users remain logged in after reloads or page navigation.

**Deployment**

The backend is deployed on Render, configured to work with the frontend hosted on Vercel.
