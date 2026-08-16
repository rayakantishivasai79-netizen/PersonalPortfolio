# Shiva Sai Rayakanti — Personal Portfolio

A professional full-stack portfolio website, built with:

- HTML5, CSS3, JavaScript (frontend)
- Node.js, Express.js (backend)
- MongoDB, Mongoose (database)

It showcases education, technical skills, projects, internship, certifications,
soft skills, languages, and contact information — all sourced from the actual
resume content, with no invented experience or achievements.

---

## 1. Features

- Responsive, single-page portfolio (desktop, tablet, mobile)
- Sticky navigation with active-section highlighting and a mobile hamburger menu
- Hero section with a code-editor-style typing animation
- Education timeline, skills badges, certifications grid
- **Projects section pulled live from MongoDB** via a REST API (`GET /api/projects`)
- **Contact form** that validates on the client and server, then saves messages to
  MongoDB (`POST /api/messages`)
- Scroll-reveal animations, scroll-to-top button, `prefers-reduced-motion` support
- Resume download button

---

## 2. Technology Stack

| Layer      | Technology                  |
|------------|------------------------------|
| Frontend   | HTML5, CSS3, vanilla JavaScript |
| Backend    | Node.js, Express.js          |
| Database   | MongoDB, Mongoose            |

> Note: Node.js, Express, MongoDB, and Mongoose are the technologies used to
> *build* this website. They are **not** listed in the "Technical Skills"
> section of the site itself, since that section only reflects the skills
> from the actual resume (Python, Java, DSA, HTML, CSS, JavaScript, MySQL,
> VS Code, GitHub).

---

## 3. Folder Structure

```
PersonalPortfolio/
│
├── frontend/
│   ├── index.html
│   ├── style.css
│   ├── script.js
│   └── assets/
│       └── PLACE_RESUME_HERE.txt   (replace with your real resume.pdf)
│
├── backend/
│   ├── server.js
│   ├── seed.js
│   ├── config/
│   │   └── db.js
│   ├── models/
│   │   ├── Project.js
│   │   └── Message.js
│   ├── routes/
│   │   ├── projectRoutes.js
│   │   └── messageRoutes.js
│   └── controllers/
│       ├── projectController.js
│       └── messageController.js
│
├── .env.example
├── package.json
├── README.md
└── .gitignore
```

---

## 4. Requirements

- **Node.js** (v18 or newer recommended) — includes npm
- **MongoDB** (running locally, or a free MongoDB Atlas cloud cluster)
- A code editor (VS Code recommended)

### Installing Node.js on Windows

1. Go to https://nodejs.org
2. Download the **LTS** version for Windows
3. Run the installer (accept all defaults)
4. Verify it worked — open **PowerShell** or **Command Prompt** and run:
   ```
   node --version
   npm --version
   ```
   Both should print a version number.

### Installing MongoDB on Windows

**Option A — Install MongoDB locally**
1. Go to https://www.mongodb.com/try/download/community
2. Download **MongoDB Community Server** for Windows
3. Run the installer, choosing "Complete" setup and **"Install MongoDB as a Service"** (this makes MongoDB start automatically)
4. Once installed, MongoDB runs in the background at `mongodb://localhost:27017`

**Option B — Use MongoDB Atlas (cloud, no local install)**
1. Go to https://www.mongodb.com/cloud/atlas and create a free account
2. Create a free (M0) cluster
3. Under "Database Access," create a database user with a username/password
4. Under "Network Access," allow your current IP address
5. Click "Connect" → "Drivers" and copy the connection string, e.g.:
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/portfolio
   ```
6. Use this as your `MONGO_URI` in the next step

---

## 5. Setup

### Step 1 — Extract the project
Unzip `ShivaSai-Professional-Portfolio.zip` to a folder on your computer, e.g. `C:\Projects\PersonalPortfolio`.

### Step 2 — Open the folder in a terminal
In File Explorer, open the `PersonalPortfolio` folder, then either:
- Right-click inside the folder and choose "Open in Terminal" / "Open PowerShell window here", **or**
- Open PowerShell/Command Prompt and run:
  ```
  cd C:\Projects\PersonalPortfolio
  ```

### Step 3 — Create your `.env` file
Copy `.env.example` to a new file named `.env` in the same folder:
```
copy .env.example .env
```
Open `.env` and set your MongoDB connection string:
```
MONGO_URI=mongodb://localhost:27017/portfolio
PORT=5000
```
(If using MongoDB Atlas, paste your Atlas connection string instead of the local one.)

### Step 4 — Install dependencies
```
npm install
```
This downloads Express, Mongoose, dotenv, cors, and nodemon into a `node_modules`
folder and generates `package-lock.json`. This step requires an internet
connection and was **not run inside this delivery** (the environment that
built this project has no internet access) — running it locally is required
before the server will start.

### Step 5 — Add your resume PDF
Place your actual resume PDF at:
```
frontend/assets/resume.pdf
```
(There's a placeholder note file at that location — delete it once your real
resume.pdf is in place.)

### Step 6 — Add your LinkedIn and GitHub links
Open `frontend/script.js` and fill in your real URLs near the top of the file:
```javascript
const PROFILE_LINKS = {
  linkedin: 'https://www.linkedin.com/in/your-handle',
  github: 'https://github.com/your-username',
};
```
These weren't included in the source instructions, so they currently show as
inactive placeholder links until you fill them in.

---

## 6. Running the Project

### Start the server (serves both frontend and backend together)
```
npm start
```
or, for auto-restart during development:
```
npm run dev
```

You should see:
```
MongoDB connected: localhost
Seeded database with initial project data.
Server running at http://localhost:5000
```

### URLs
- **Website:** http://localhost:5000
- **Backend API base:** http://localhost:5000/api
  - `GET  /api/health` → `{ "status": "OK" }`
  - `GET  /api/projects`
  - `POST /api/projects`
  - `POST /api/messages`

---

## 7. How to Add a Project

The Projects section is populated from MongoDB, not hard-coded HTML. To add
a new project, send a POST request — for example using PowerShell:

```powershell
Invoke-RestMethod -Uri "http://localhost:5000/api/projects" -Method Post -ContentType "application/json" -Body '{
  "title": "Your Project Name",
  "description": "What it does.",
  "technologies": ["Tech1", "Tech2"],
  "features": ["Feature one", "Feature two"],
  "github": "https://github.com/your-username/repo",
  "liveDemo": ""
}'
```

Or with any REST client (Postman, Thunder Client in VS Code, etc.) — same
URL, method `POST`, body as JSON. Refresh the website afterward to see it.

---

## 8. How to Test the Contact Form

1. Start the server (`npm start`) and open http://localhost:5000
2. Scroll to the **Contact** section
3. Try submitting the form empty — you should see inline red error messages
4. Try an invalid email like `test` — you should see a validation error
5. Fill in a valid name, email, and message, then click **Send Message**
6. You should see a green success message and the form should clear
7. To confirm the message was saved, check your MongoDB `messages` collection
   (e.g. with **MongoDB Compass**, or `mongosh` and running
   `use portfolio` then `db.messages.find()`)

---

## 9. Troubleshooting

| Problem | Likely Cause | Fix |
|---|---|---|
| `MongoDB connection error` on startup | MongoDB isn't running, or `MONGO_URI` is wrong | Make sure MongoDB service is running, or double-check your Atlas connection string in `.env` |
| `Cannot find module 'express'` | Dependencies not installed | Run `npm install` in the project root |
| Port 5000 already in use | Another program is using that port | Change `PORT` in `.env` to something else, e.g. `5050` |
| Projects section shows an error message | Backend not running, or MongoDB not connected | Confirm the terminal shows "Server running..." with no MongoDB errors |
| Resume button does nothing / 404 | `resume.pdf` not added yet | Add it at `frontend/assets/resume.pdf` |
| LinkedIn/GitHub links do nothing | Placeholder URLs not filled in | Edit `PROFILE_LINKS` in `frontend/script.js` |

---

## 10. Pushing to GitHub

1. Install Git for Windows: https://git-scm.com/download/win
2. In the project folder, run:
   ```
   git init
   git add .
   git commit -m "Initial commit: personal portfolio"
   ```
3. Create a new empty repository on GitHub (no README/license, since you
   already have files)
4. Connect and push:
   ```
   git remote add origin https://github.com/your-username/your-repo-name.git
   git branch -M main
   git push -u origin main
   ```

`.gitignore` is already configured to exclude `node_modules/`, `.env`, and log
files, so your secrets and dependencies won't be pushed.

---

## 11. Deployment (Later)

When you're ready to put this online:

- **Frontend:** Since it's served by the same Express app, you can deploy the
  whole project together on a Node-friendly host.
- **Backend + Frontend together:** Render, Railway, or a similar Node hosting
  platform. Set the `MONGO_URI` and `PORT` environment variables in the
  host's dashboard (don't commit `.env`).
- **Database:** MongoDB Atlas (already covered in section 4) works well for
  a deployed backend.

This isn't required to run the project locally — it's here for later.

---

## 12. What Was Verified Before Delivery

Since this project was assembled in an environment without internet access
or a local MongoDB instance, here's exactly what was and wasn't tested:

- ✅ All backend JavaScript files pass Node's syntax checker (`node --check`)
- ✅ HTML structure verified for balanced/valid tags
- ✅ CSS verified for balanced braces/parentheses
- ✅ Frontend rendered and screenshot-tested in a real browser at desktop
  (1440px) and mobile (390px) widths — navigation, hamburger menu, scroll
  animations, and section layout all confirmed visually
- ✅ Contact form client-side validation tested interactively (empty fields
  and invalid email both correctly blocked with error messages)
- ❌ `npm install` was **not** run (no internet access in the build
  environment) — run it yourself as the first setup step
- ❌ Live MongoDB connection and the `/api/projects` / `/api/messages`
  endpoints were **not** tested against a real database — the code was
  reviewed for correctness, but you should verify this yourself following
  section 8 above
