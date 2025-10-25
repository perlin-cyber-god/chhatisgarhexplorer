# Chhattisgarh Tourism Explorer

This is a full-stack web application designed to showcase the beauty and culture of Chhattisgarh, featuring AI-powered tools and dynamic content from a MongoDB database.

## How to Run This Project

This project consists of two main parts: a **backend server** (Node.js/Express) and a **frontend application** (React/Vite). You need to run both simultaneously in two separate terminals.

### Step 0: One-Time Setup

You only need to do this **once** for the entire project.

1.  **Install Frontend Dependencies:**
    - Open a terminal in the main `chhatisgarhexplorer` root folder.
    - Run the command:
      ```bash
      npm install
      ```

2.  **Install Backend Dependencies:**
    - Navigate into the `backend` folder:
      ```bash
      cd backend
      ```
    - Run the command:
      ```bash
      npm install
      ```
    - Go back to the root folder:
      ```bash
      cd ..
      ```

---

### Step 1: Start the Backend Server

This server connects to your MongoDB database and provides data to the frontend.

1.  **Navigate to the Backend:**
    - In your terminal, from the root `chhatisgarhexplorer` folder, go into the backend directory:
      ```bash
      cd backend
      ```
2.  **Start the Server:**
    - Run the following command:
      ```bash
      node server.js
      ```
3.  **Check for Success:**
    - You should see the message: `Backend server listening at http://localhost:3001`
    - **Leave this terminal window open.**

---

### Step 2: Start the Frontend Application

This starts the Vite development server, which serves your website.

1.  **Open a New Terminal:**
    - Open a second, separate terminal window.
2.  **Navigate to the Root Folder:**
    - Make sure you are in the main `chhatisgarhexplorer` root folder.
3.  **Start the Frontend Server:**
    - Run the following command:
      ```bash
      npm run dev
      ```
4.  **Open the Website:**
    - The terminal will display a local URL, usually `http://localhost:5173`.
    - Hold `Ctrl` (or `Cmd` on Mac) and click the link to open your running application in your browser.

Your website is now running! The "Hidden Gems" section will fetch data live from your running backend.