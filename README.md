# 📝 Notes Taking Web App  
### Frontend Developer Intern Assignment — by *Nikhil Kumar Prajapati*  

---

## 🚀 Overview  
This project is a **full-stack Notes Taking Application** built using the **MERN stack (MongoDB, Express.js, React, Node.js)**.  
It includes **user authentication**, a **responsive dashboard**, and **CRUD functionality** for managing notes.  

The app is designed with scalability, modularity, and clean UI/UX in mind.  

---

## 🎯 Features  

### 🔐 **Authentication**
- User registration and login using **JWT-based authentication**  
- **Password hashing** using bcrypt  
- Protected routes and token validation  
- Logout functionality  

### 🧠 **Dashboard**
- View, create, update, and delete notes  
- Search and filter notes easily  
- Clean and responsive interface built with **Tailwind CSS**  
- Profile section where users can view and edit their details  

### ⚙️ **Backend**
- RESTful APIs using **Node.js + Express.js**  
- MongoDB for database  
- Validation and error handling middleware  
- CORS and security best practices  

---

## 🛠️ Tech Stack  

| Layer | Technology |
|-------|-------------|
| Frontend | React (Vite) + Tailwind CSS + Axios |
| Backend | Node.js + Express.js |
| Database | MongoDB (Mongoose) |
| Authentication | JWT + bcrypt |
| Deployment | Vercel (Frontend), Render (Backend) |

---

## 🌐 Live Demo  

- **Frontend:** [https://pret-ai-assignment.vercel.app/](https://pret-ai-assignment.vercel.app/)  
- **Backend:** [https://pretaiassignment.onrender.com](https://pretaiassignment.onrender.com)  

---

## 🧩 API Endpoints

### 🔐 Auth Routes

| Method | Endpoint       | Description              |
|--------|----------------|--------------------------|
| POST   | `/auth/signup` | Register new user        |
| POST   | `/auth/login`  | Login user & return JWT  |
| GET    | `/auth/logout` | Logout user              |

### 🗒️ Notes Routes

| Method | Endpoint     | Description          |
|--------|---------------|----------------------|
| GET    | `/notes`      | Get all notes for a user |
| POST   | `/notes`      | Create a new note     |
| PUT    | `/notes/:id`  | Update a note         |
| DELETE | `/notes/:id`  | Delete a note         |


## 🏗️ Note on Scaling Frontend–Backend Integration for Production

This project is currently deployed with a focus on functionality and clean integration between the frontend and backend.  
In a production environment, the following steps could be taken to make it more scalable and secure:

### 🔒 Security & Reliability
- Use **HTTPS** and secure cookies for authentication.  
- Store all **environment variables** safely in server configs or CI/CD secrets.  
- Implement **error handling** and input validation on both client and server sides.

### ⚙️ Performance Improvements
- Optimize frontend build using `npm run build` (minifies and compresses code).  
- Add lazy loading and caching for faster page loads.  
- Deploy frontend and backend on reliable cloud platforms (e.g., Vercel + Render).

### 🚀 Future Scalability Plans
- Use a managed database like **MongoDB Atlas** for performance and backups.  
- Add **logging and monitoring** tools later (e.g., for performance insights).  
- Move to **microservice-based architecture** if traffic or features increase.

---

