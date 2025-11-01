# 💰 Finance Manager

A **Node.js + Express + MongoDB** backend project to manage financial data.  
This project follows the **MVC (Model–View–Controller)** architecture for scalability and clear separation of concerns.

---

## 📁 Project Structure

**Finance Manager/**

### Backend(Node + ExpressJS)

- **config/** – Database configuration (MongoDB connection)
- **controllers/** – Business logic for handling API requests
- **models/** – Mongoose schemas and models
- **middlewares/** – M iddleware functions (auth, validation, etc.)
- **routes/** – API endpoint definitions
- **utils/** – Helper and utility functions

**Root Files:**

- **.env** – Environment variables (e.g., PORT, DB URL)
- **server.js** – Main entry point for the server
- **package.json** – Project configuration and dependencies
- **package-lock.json** – Auto-generated dependency lock file

### Frontend (React + Redux)

- **public/** – Static files (index.html, favicon, etc.)
- **src/**
  - **components/** – Reusable UI components
  - **pages/** – React pages/views
  - **redux/** – Redux store, slices, and actions
  - **utils/** – Helper functions (API calls, formatting, etc.)
  - **App.js** – Main component
  - **index.js** – React entry point
  - **App.css** – Global styles

---

## ⚙️ Backend Setup Steps

### 1. Initialize the Project

- Create a new folder for your project.
- Run `npm init -y` to create a `package.json` file.
- This file manages project metadata and dependencies.

---

### 2. Install Dependencies

Install the required packages for building the backend:

Install **nodemon** as a development dependency for automatic server restarts:

---

### 3. Configure Environment Variables

Create a `.env` file in the project root and define environment variables such as:

- `PORT` — The port on which the server runs
- `MONGO_URL` — The MongoDB connection string

This ensures sensitive data is not hard-coded into your source files.

---

### 4. Database Connection

A configuration file inside the **config/** folder handles the connection to MongoDB using **Mongoose**.  
The connection setup ensures the database is ready before handling any API requests.

---

### 5. Server Setup

The `server.js` file:

- Initializes an Express application
- Loads environment variables
- Connects to MongoDB
- Registers middlewares
- Mounts route files
- Starts the server on the defined port

---

### 6. Model and Controller Design

- **Models** define how data is structured in MongoDB using schemas.
- **Controllers** contain the core logic for API operations like create, read, update, and delete (CRUD).

This separation makes the codebase modular, reusable, and easier to maintain.

---

### 7. Routes Setup

Each route file connects HTTP endpoints (like `/api/users`) with their corresponding controller functions.  
This keeps the routing logic clean and organized.

---

### 8. Middleware and Utilities

- **Middlewares** handle reusable logic such as authentication, validation, or error handling.
- **Utils** contains helper functions or reusable logic shared across modules.

---

## ⚙️ Frontend Setup Steps

### 1. Create React App

From your **root directory**, create the frontend using:

```bash
npx create-react-app client
```

This generates a new React app inside a folder named `client/`.

Then navigate into it:

```bash
cd client
```

- Add the Bootstrap CDN in client/public/index.html above the `<title>` tag:

`<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" />`

---

### 2. Install Required Packages

Install the necessary frontend dependencies:

```bash
npm i axios react-router-dom redux react-redux
```

- **axios** → For making API requests
- **react-router-dom** → For routing between pages
- **redux** → For managing global app state
- **react-redux** → To connect Redux with React

---

### 3. Set Up Routing

In `src/index.js`, wrap your `<App />` component inside `<BrowserRouter>`.

```javascript
import { BrowserRouter } from "react-router-dom";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
```

---

### 4. Configure Routes in `App.js`

Import `Routes` and `Route` from `react-router-dom` and define routes in App.js.

---

### 5. Create Folder Structure

Inside `src/`, create:

```
src/
│
├── components/
│   └── layout/
│       ├── Header.js
│       ├── Footer.js
│       └── Layout.js
│
└── pages/
    └── HomePage.js
    └── Login.js
    └── Register.js
```

---

### 6. Build Layout Components

#### `Layout.js`

Acts as a wrapper for consistent structure across pages.  
Use `{children}` as a prop to render dynamic content.

---

### 7. Create HomePage.js, Login.js & Register.js

In `src/pages/HomePage.js`:

```javascript
import Layout from "../components/layout/Layout";

const HomePage = () => (
  <Layout>
    <h1>Welcome to Finance Manager</h1>
  </Layout>
);

export default HomePage;
```

---

### 8. Use Links for Navigation

When adding navigation, use the `Link` component from `react-router-dom`.

```javascript
import { Link } from "react-router-dom";

<Link to="/">Home</Link>;
```

> ⚠️ Using `<a>` tags reloads the page — `Link` ensures smooth single-page routing.

---

### 8. Concurrently setup

```bash

npm i concurrently # to use same port to run both backend and frontend
```

-- Add script to root package.json:
"scripts": {
"client": "npm start --prefix client",
"server": "nodemon server.js",
"dev": "concurrently \"npm run server\" \"npm run client\""
}
-- In client/package.json add:
"proxy": "http://localhost:8080/api/v1"

### 10. Register Page Tips

-- Import axios and useNavigate in Register.js
-- Use Ant Design’s message component inside try/catch for notifications.

---

## 🧭 Data Flow: Register Feature (React → Node → MongoDB)

Here’s how data moves when a user registers:

1️⃣ **React (Frontend)**

- User fills out the Register form.
- On submit, `axios.post("/users/register", values)` sends data to the backend.

2️⃣ **Express (Server)**

- `server.js` routes it to `/api/v1/users`  
  → handled by `userRoute.js`.

3️⃣ **Router (userRoute.js)**

- Defines `POST /register` → calls `registerController`.

4️⃣ **Controller (registerController.js)**

- Creates a new user using the Mongoose model.
- `new User(req.body).save()` stores data in MongoDB.

5️⃣ **MongoDB**

- The document is saved inside the `users` collection.

### Protected Routes

-- update App.js with below code and wrap 'ProtectedRoutes' component around HomePage.js
export function ProtectedRoutes(props) {
const user = localStorage.getItem("Data");
return user ? props.children : <Login />;
}

## Update Login & register.js with:

useEffect(() => {
const user = localStorage.getItem("Data");
if (user) {
navigate("/");
}
}, [navigate]);

## 🧩 Tools and Libraries Used

| Package      | Purpose                                              |
| ------------ | ---------------------------------------------------- |
| **express**  | Web framework for handling routes and middleware     |
| **mongoose** | ODM (Object Data Modeling) library for MongoDB       |
| **dotenv**   | Loads environment variables from `.env` file         |
| **morgan**   | HTTP request logger middleware                       |
| **cors**     | Enables cross-origin resource sharing                |
| **colors**   | Adds colored console logs for better debugging       |
| **nodemon**  | Automatically restarts the server during development |

---

## ⚡ Development Commands

| Command                                            | Description                                  |
| -------------------------------------------------- | -------------------------------------------- |
| `npm init -y`                                      | Initialize project and create `package.json` |
| `npm i express mongoose dotenv morgan cors colors` | Install main dependencies                    |
| `npm i -D nodemon`                                 | Install development dependencies             |
| `npm run dev`                                      | Start the server with nodemon                |
| `npm start`                                        | Start the server normally                    |

---

## 🗄️ Database

The application uses **MongoDB** as its database.  
You can use:

- **MongoDB Compass** for a local GUI
- **MongoDB Atlas** for a cloud-hosted database

The database connection string is stored in the `.env` file and loaded during server initialization.

---

## 🚀 Future Enhancements

- Create **request validation** middleware
- Integrate **transaction tracking and analytics**

---

## 🧠 Key Concepts Learned

- Setting up a backend server with Node.js and Express
- Connecting to MongoDB using Mongoose
- Understanding the MVC structure
- Using environment variables securely
- Writing modular and maintainable code

---

## 🧑‍💻 Author

**Finance Manager API** — built for learning and exploring Node.js backend fundamentals.
