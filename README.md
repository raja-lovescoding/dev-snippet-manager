# 🚀 Dev-Snippet Manager

A full-stack web application designed for developers to manage and store code snippets. This project demonstrates **Polyglot Persistence**, using two different database systems for their specific strengths.

## 🛠️ Tech Stack
- **Frontend:** HTML5, CSS3, JavaScript (Vanilla), EJS
- **Backend:** Node.js, Express.js
- **Databases:** - **PostgreSQL:** User Authentication & Session Management
  - **MongoDB Atlas:** Scalable, flexible snippet storage
- **Authentication:** Passport.js (Local Strategy)
- **Security:** Bcrypt.js for password hashing

## ✨ Features
- Secure Login/Signup with PostgreSQL.
- CRUD operations for code snippets in MongoDB.
- Syntax highlighting via Prism.js.
- One-click "Copy to Clipboard" functionality.
- Responsive dashboard design.

## 🏗️ Architecture
The app follows the **MVC (Model-View-Controller)** pattern to ensure a clean separation of concerns between database logic and routing.

## 🚀 How to Run Locally
1. Clone the repo: `git clone <your-repo-link>`
2. Install dependencies: `npm install`
3. Create a `.env` file with your PG and MongoDB credentials.
4. Setup the PostgreSQL table using the provided schema.
5. Run the app: `node app.js`
