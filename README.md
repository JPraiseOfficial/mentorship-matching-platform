# 🎓 Mentorship Matching Platform

The Mentorship Matching Platform is a full-stack web application that helps incubators and accelerator programs connect mentees with suitable mentors, schedule sessions, and track progress — all in one place.

---

## 🚀 Live Demo

🌐 **Frontend:** [https://mentorship-matching-platform-tau.vercel.app/login](https://mentorship-matching-platform-tau.vercel.app/login)  
🔗 **Backend API:** [https://mentorship-matching-platform-rxo7.onrender.com/](https://mentorship-matching-platform-rxo7.onrender.com/)

📖 **API Docs (Swagger):** [View here](https://yourapiurl.com/api/docs)

---

## ✅ Features

- **Role-Based Access Control**

  - Admin, Mentor, and Mentee roles
  - Secure JWT authentication

- **User Profiles**

  - Customizable profiles for admins, mentors and mentees
  - Name, skills, bio, and goals

- **Mentor Discovery**

  - Mentees can search and filter mentors by skill.
  - Profile details and availability are visible

- **Request & Approval Workflow**

  - Mentees send mentorship requests
  - Mentors accept or reject requests

- **Availability & Scheduling**

  - Mentors set weekly availability slots
  - Mentees book sessions within available slots
  - Calendar view for upcoming sessions
  - Automated email confirmations and reminders

- **Session Feedback**

  - Mentees rate and review sessions
  - Mentors can leave feedback notes

- **Admin Dashboard**
  - Manage all users, sessions, and mentor-mentee pairings
  - Manually assign mentors to mentees if needed
  - Monitor platform usage and session stats

---

## 🛠️ Tech Stack

- **Frontend:** React with TypeScript, Bootstrap
- **Backend:** Node.js, Express.js, TypeScript
- **Database:** PostgreSQL (via Prisma ORM)
- **Authentication:** JWT
- **Deployment:** Render / Vercel
- **Docs:** Swagger / OpenAPI

---

## 📡 API Endpoints Overview

| Method | Endpoint                 | Description                   |
| ------ | ------------------------ | ----------------------------- |
| POST   | `/auth/register`         | Register a new user           |
| POST   | `/auth/login`            | Login and get JWT             |
| GET    | `/users/me`              | Get your profile              |
| PUT    | `/users/me/profile`      | Update your profile           |
| GET    | `/mentors`               | Browse mentors                |
| POST   | `/requests`              | Send mentorship request       |
| GET    | `/requests/sent`         | View mentee sent requests     |
| GET    | `/requests/received`     | View mentor received requests |
| PUT    | `/requests/:id`          | Accept/reject request         |
| POST   | `/sessions`              | Schedule a session            |
| GET    | `/sessions`              | View your sessions            |
| PUT    | `/sessions/:id/feedback` | Submit session feedback       |
| GET    | `/admin/users`           | Admin: view all users         |
| PUT    | `/admin/users/:id/role`  | Admin: change user role       |

Full API reference is available in the [API Docs](https://yourapiurl.com/api/docs).

---

## ⚙️ Local Setup

Follow these steps to run the project locally.

1.  **Clone the repository**
    ```bash
    git clone https://github.com/JPraiseOfficial/mentorship-matching-platform.git
    cd mentorship-matching-platform
    ```
2.  Install dependencies
    ```bash
    npm install
    ```
3.  Set up your environment variables  
    This project uses two .env files — one for the backend and one for the frontend.

    1.  📁 Backend: `server/.env`  
        Create a .env file inside the server folder with these keys:

        ```bash
        DATABASE_URL=postgresql://your_db_user:password@localhost:5432/mentorshipdb
        JWT_SECRET=your_jwt_secret
        PORT=3000
        NODE_ENV=development
        FRONTEND_URL = your_frontend_url.com
        ```

        - `DATABASE_URL` — Your PostgreSQL connection string.
        - `JWT_SECRET` — A secret key for signing JWT tokens.
        - `PORT` — Port for your server to run locally.
        - `NODE_ENV` — Typically development.
        - `FRONTEND_URL` — Your frontend URL for CORS.

    2.  📁 Frontend: `public/.env`  
        Create a .env file inside the public folder with this key:
        ```bash
        VITE_BACKEND_URL=http://localhost:3000
        ```
        - `VITE_BACKEND_URL` — Your backend API base URL.
        - Must be prefixed with `VITE_` so Vite exposes it to the client.

4.  Run Prisma migrations

    ```bash
    npx prisma migrate deploy
    npx prisma generate
    ```

5.  Start the server
    ```bash
    npm run dev
    ```
6.  Visit http://localhost:3000 to access the API  
    Swagger Docs: http://localhost:3000/api/docs

---

## ✨ Contributing

Contributions are welcome!

- Fork the repo
- Create a new branch (git checkout -b feature/your-feature)
- Commit your changes
- Open a pull request

## 📜 License

This project is licensed under the MIT License. See [LICENSE](./LICENSE) for details.

## 📞 Contact

Questions? Feedback? Reach out via jimmypraiseofficial@gmail.com.
