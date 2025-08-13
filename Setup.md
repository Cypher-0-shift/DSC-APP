# DSC-APP Setup Guide

This guide will help you set up and run the DSC-APP project on your local machine. Even if you are a beginner, following these steps carefully will get the app running.

## 1. Prerequisites

Before starting, make sure you have these installed:

### Node.js and npm

Download from [Node.js](https://nodejs.org/)

After installation, verify by running:

```bash
node -v
npm -v
```

### Git

Download from [Git](https://git-scm.com/)

Verify installation:

```bash
git --version
```

## 2. Clone the Repository

Open your terminal or VS Code terminal and run:

```bash
git clone https://github.com/Cypher-0-shift/DSC-APP.git
cd DSC-APP
```

This will download the project files to your computer.

## 3. Install Dependencies

Install the required packages for both frontend and backend.

### Backend

```bash
cd dsc-backend
npm install
```

### Frontend

Open a new terminal (or navigate back to project root):

```bash
cd ..
npm install
```

> Note: This will install packages from package.json.

## 4. Run the App

### Backend

```bash
cd dsc-backend
node server.js
```

You should see a message like:

```
Server running on http://localhost:5000
```

Keep this terminal running, as it powers the backend API.

### Frontend

In a separate terminal:

```bash
cd DSC-APP
npm start
```

This will open the app in your default browser at:

```
http://localhost:3000
```

## 5. Folder Structure Overview

* `dsc-backend/` → Contains the Node.js backend server.
* `node_modules/` → Installed dependencies (do not modify manually).
* `public/` → Static frontend assets like images.
* `src/` → Frontend source code (React components, styles, etc.).
* `.gitignore` → Files/folders ignored by Git.
* `package.json` → Project info and dependencies.
* `postcss.config.js` & `tailwind.config.js` → Tailwind CSS configurations.
* `README.md` → Project documentation.

## 6. Notes for Beginners

* Always start backend first (`node server.js`) before running frontend.
* Do not delete the `node_modules` folder; it contains all installed libraries.
* If you get errors about missing packages, run `npm install` again.
* For any code changes, refresh your browser to see updates.

## 7. Troubleshooting

* **Command not found:** Make sure Node.js is installed and added to your PATH.
* **Port conflicts:** If 3000 or 5000 is busy, you may need to change the port in frontend `package.json` or backend `server.js`.
* **Dependencies issues:** Delete `node_modules` and run `npm install` again.

You now have DSC-APP running locally! 🚀
