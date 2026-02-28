# LABAS - E-Commerce Platform

LABAS is a full-stack e-commerce web application built using the MERN stack (MongoDB, Express.js, React, Node.js). It provides users with a complete shopping experience, including product browsing, cart management, wishlist functionality, secure authentication, and an admin panel for inventory and order management.

## Tech Stack

- **Frontend:** React (Vite), Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB, Mongoose
- **Authentication:** JSON Web Tokens (JWT)
- **Email Services:** Nodemailer

## Folder Structure

The project is divided into two main directories: frontend and backend.

```text
mern/
├── backend/                # Node.js and Express backend server
│   ├── config/             # Database connection configuration
│   ├── controllers/        # Request handling logic for routes
│   ├── middleware/         # Custom middleware (authentication, error handling)
│   ├── models/             # Mongoose database models
│   ├── routes/             # API route definitions
│   ├── utils/              # Helper functions (email sending, token generation)
│   ├── server.js           # Entry point for the backend server
│   └── package.json        # Backend dependencies and scripts
│
└── frontend/               # React frontend application
    ├── public/             # Static assets (images, icons)
    ├── src/                # React source code
    │   ├── assets/         # Images and other assets used in components
    │   ├── components/     # Reusable React components
    │   ├── pages/          # React components representing whole pages
    │   ├── context/        # React Context API for global state management
    │   ├── App.jsx         # Main application component and routing
    │   └── main.jsx        # Entry point for the React application
    ├── tailwind.config.js  # Tailwind CSS configuration
    ├── vite.config.js      # Vite configuration
    └── package.json        # Frontend dependencies and scripts
```

## Prerequisites

Before running this project, ensure you have the following installed on your machine:

- Node.js
- MongoDB (running locally or a MongoDB Atlas URI)

## Setup Instructions

Follow these steps to set up and run the project locally.

### 1. Clone the repository

Begin by cloning the project to your local machine:

```bash
git clone <repository-url>
cd <repository-directory>
```

### 2. Backend Setup

Open a terminal and navigate to the backend directory:

```bash
cd backend
```

Install the required dependencies:

```bash
npm install
```

Create a `.env` file in the `backend` directory and add the following environment variables. Replace the values with your actual configuration:

```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/labas
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=7d
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_email_app_password
FROM_EMAIL=your_email@gmail.com
FROM_NAME="LABAS"
CLIENT_URL=http://localhost:5173
```

Start the backend server:

```bash
npm run dev
```

The backend server should now be running on port 5000.

### 3. Frontend Setup

Open a new terminal window and navigate to the frontend directory:

```bash
cd frontend
```

Install the required dependencies:

```bash
npm install
```

Start the frontend development server:

```bash
npm run dev
```

The frontend application should now be accessible in your browser at `http://localhost:5173`.

## Features

- **User Authentication:** Secure login, registration, and password recovery functionality.
- **Product Catalog:** Browse different categories of products.
- **Shopping Cart:** Add, remove, and update quantities of items before checkout.
- **Wishlist:** Save favorite products for later viewing.
- **Admin Dashboard:** Dedicated interface for managing products, users, and tracking orders.
- **Responsive Design:** Fully functional and visually appealing on both desktop and mobile devices.
