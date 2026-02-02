🧠 Young Gadget — Premium Tech E-Commerce Platform

🔗 Live Demo: https://young-gadget.netlify.app/

📦 Repository: https://github.com/younghustler252/Young-Gadget-Hub-commercial-store

📌 Overview

Young Gadget is a full-stack, production-ready e-commerce application built for selling premium gadgets and tech accessories.

The platform delivers a modern shopping experience powered by a responsive React frontend and a secure Node.js backend, featuring authentication, cart management, and admin-level product control.

The goal of this project was to build a scalable, cleanly structured commercial store using industry-standard technologies and best practices.

🚀 Core Features
🛍️ Customer Features

Browse premium gadgets (phones, laptops, accessories)

Product detail view with pricing and descriptions

Add to cart functionality

Real-time cart updates

Secure user registration and login

JWT-based authentication

Checkout flow

Order tracking

🧑‍💻 Admin Features

Admin dashboard

Create, update, and delete products

Manage users

View and manage orders

📱 UI/UX

Fully responsive (mobile-first approach)

Smooth transitions and modern layout

Clean, minimal Tailwind-based design

Optimized performance with Vite

🖥️ Tech Stack
Frontend

React (Vite)

Tailwind CSS

React Router

Axios

Backend

Node.js

Express.js

MongoDB

Mongoose

JWT Authentication

RESTful API Architecture

🏗️ Project Architecture
young-gadget/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── utils/
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── services/
│   │   └── App.jsx
│   └── index.html
│
└── README.md


The backend follows a modular MVC-style structure to maintain scalability and separation of concerns.

⚙️ Installation & Setup
1️⃣ Clone the Repository
git clone https://github.com/your-username/young-gadget.git
cd young-gadget

2️⃣ Backend Setup
cd backend
npm install


Create a .env file inside the backend folder:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key


Start the backend server:

npm run dev

3️⃣ Frontend Setup
cd frontend
npm install
npm run dev

🔐 Environment Variables
Variable	Description
PORT	Backend server port
MONGO_URI	MongoDB connection string
JWT_SECRET	Secret key for authentication
🌍 Deployment

Frontend: Deployed on Netlify

Backend: (Add your backend deployment platform if deployed, e.g., Render, Railway, VPS)

📈 Future Improvements

Payment gateway integration (Stripe / Paystack)

Product reviews & ratings

Wishlist functionality

Advanced filtering & search

Role-based access control expansion

Performance optimization & caching

🎯 What This Project Demonstrates

Full-stack development capability

RESTful API design

Authentication & authorization implementation

State management in React

Clean project architecture

Responsive UI engineering

Commercial product thinking

👨‍💻 Author

Young Tech
Web Developer & Cybersecurity Enthusiast

