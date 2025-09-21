<div align="center">
  <h1 align="center">Project Manager</h1>
  <p align="center">
    A modern, full-stack project management platform for teams.<br />
    <a href="https://github.com/tsgamage/Project-Manager/issues">Report Bug</a>
    ·
    <a href="https://github.com/tsgamage/Project-Manager/issues">Request Feature</a>
  </p>
</div>

<div align="center">
  <a href="https://github.com/tsgamage/Project-Manager/blob/main/LICENSE">
    <img src="https://img.shields.io/github/license/tsgamage/Project-Manager?style=for-the-badge" alt="License">
  </a>
  <a href="https://github.com/tsgamage/Project-Manager/stargazers">
    <img src="https://img.shields.io/github/stars/tsgamage/Project-Manager?style=for-the-badge" alt="Stargazers">
  </a>
  <a href="https://github.com/tsgamage/Project-Manager/network/members">
    <img src="https://img.shields.io/github/forks/tsgamage/Project-Manager?style=for-the-badge" alt="Forks">
  </a>
  <a href="https://github.com/tsgamage/Project-Manager/issues">
    <img src="https://img.shields.io/github/issues/tsgamage/Project-Manager?style=for-the-badge" alt="Issues">
  </a>
</div>

---

## About The Project

**Project Manager** is a feature-rich, dark-themed project management application built with the MERN stack. It enables teams to efficiently manage projects, tasks, and team members with a modern, responsive UI and robust backend.

---

## Features

- **Authentication**: Secure signup, login, and session management
- **User Profiles**: View and manage user details, account status, and activity
- **Project Management**: 
  - Create, edit, and delete projects
  - Assign team members and tasks to projects
  - Track project progress, deadlines, and completion rates
  - View project statistics and analytics
- **Task Management**:
  - Add, edit, and categorize tasks within projects
  - Mark tasks as complete/incomplete
  - Task progress and completion tracking
- **Team Management**:
  - Add, edit, and remove team members
  - Assign members to projects and tasks
  - Organize members by categories
- **Dashboard**:
  - Overview of productivity, upcoming deadlines, and recent projects
  - Quick actions for common tasks
- **Responsive UI**: Modern interface with Tailwind CSS and Lucide icons
- **Notifications**: Toast notifications for actions and errors
- **Email Verification**: Email-based account verification and password reset
- **Settings**: Update profile and change password
- **Dark Mode**: Consistent dark-themed design

---

## Tech Stack

| Technology                                                                                                                     | Description                               |
| ------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------- |
| ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)                            | Frontend UI Library                       |
| ![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-764ABC?style=for-the-badge&logo=redux&logoColor=white)             | State Management                          |
| ![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)                                | Frontend Build Tool                       |
| ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)         | Utility-first CSS Framework               |
| ![Lucide React](https://img.shields.io/badge/Lucide-000?style=for-the-badge&logo=lucide&logoColor=white)                       | Icon Library                              |
| ![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)                       | Backend Runtime                           |
| ![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)                       | Backend Framework                         |
| ![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)                       | Database                                  |
| ![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white)                    | MongoDB ODM                               |
| ![Nodemailer](https://img.shields.io/badge/Nodemailer-009688?style=for-the-badge&logo=gmail&logoColor=white)                   | Email Sending                             |
| ![React Hot Toast](https://img.shields.io/badge/React_Hot_Toast-FFB300?style=for-the-badge&logo=react&logoColor=white)         | Toast Notifications                       |

---

## Getting Started

### Prerequisites

- Node.js (v18.x or later)
- npm
- MongoDB (local or cloud)

### Installation

1. **Clone the repository**
    ```sh
    git clone https://github.com/tsgamage/Project-Manager.git
    cd Project-Manager
    ```

2. **Install dependencies**
    ```sh
    cd backend
    npm install
    cd ../frontend
    npm install
    ```

3. **Set up environment variables**

   - Copy `.env.example` to `.env` in both `backend/` and `frontend/` and update values as needed.

4. **Run the development servers**

    - **Backend**:
      ```sh
      cd backend
      npm run dev
      ```
    - **Frontend**:
      ```sh
      cd frontend
      npm run dev
      ```
    - Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Environment Variables

See .env files in both backend and frontend for required variables, such as:
- Root
  - `MONGODB_URI` — MongoDB connection string
  - `PORT` — Server port
  - `JWT_SECRET` — Secret string for JWT
  - `CLIENT_URL` — Frontend URL for CORS - http://localhost:5173
  - `JWT_EXPIRES_IN`=1d
  - `COOKIE_EXPIRES_IN`=604800000 # 7 days in milliseconds
  - `EMAIL_VERIFICATION_CODE_EXPIRES_IN`=900000  # 15 minutes in milliseconds
  - `FORGOT_PASSWORD_CODE_EXPIRES_IN`=900000  # 15 minutes in milliseconds
- Frontend
  - `VITE_BACKEND_URL`= Backend URL for API requests - http://localhost:3000
---

## Scripts

- `npm run dev` — Start development server
- `npm run build` — Build for production
- `npm start` — Start production server
- `npm run lint` — Run ESLint

---

## Roadmap

Planned and upcoming features:

- [ ] Migrate data fetching to **TanStack Query**
- [ ] Add project activity logs and audit trails
- [ ] Real-time notifications (WebSocket)
- [ ] Improved mobile experience
- [ ] More granular permissions and roles

See [open issues](https://github.com/tsgamage/Project-Manager/issues) for more.

---

## Contributing

Contributions are welcome! Please fork the repo and submit a pull request, or open an issue for suggestions and bug reports.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch ([git push origin feature/AmazingFeature](http://_vscodecontentref_/6))
5. Open a Pull Request

---

## License

Distributed under the MIT License. See `LICENSE` for details.

---

## Contact

@tsgamage - dev.tsgamage@gmail.com

Project Link: https://github.com/tsgamage/Project-Manager
