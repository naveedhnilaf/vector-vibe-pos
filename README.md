# Vector Vibe POS System

A full-stack Point of Sale (POS) terminal application built for the Vector Vibe intern assignment.

## Tech Stack

**Frontend:** Next.js, React, Tailwind CSS, React Icons  
**Backend:** Node.js, Express.js  
**Database:** MongoDB (Mongoose)

## Project Structure

## Prerequisites

- Node.js v18+
- MongoDB Atlas account
- npm

## Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/YOUR_USERNAME/vector-vibe-pos.git
cd vector-vibe-pos
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` folder:
```env
MONGO_URI=your_mongodb_connection_string_here
PORT=5000
```

Start the backend server:
```bash
npm start
```
Backend runs on: `http://localhost:5000`

### 3. Frontend Setup
Open a new terminal:
```bash
cd frontend
npm install
npm run dev
```
Frontend runs on: `http://localhost:3000`

## Usage

1. Open `http://localhost:3000` in your browser
2. Login with any credentials (stored in localStorage)
3. Browse products in the central grid
4. Click **+ Add** to add products to the cart
5. Use **+/-** buttons to adjust quantity
6. Click the **trash icon** to remove an item
7. Click **Continue** to submit the transaction to the backend
8. Click **+ Add Product** to add a new product via the modal form

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/products | Retrieve all products |
| POST | /api/products | Add a new product |
| GET | /api/transactions | Retrieve all transactions |
| POST | /api/transactions | Save a new transaction |
| POST | /api/auth/login | User login |

## Features

- Product browsing grid with search (by name, category, description)
- Real-time cart management (add, remove, adjust quantity)
- Live financial calculations (Sub-Total, Tax 12%, Discount 10%, Total Payment)
- Add new products via modal form connected to backend
- Transactions saved to MongoDB on checkout
- Glassmorphism dark UI design
- Collapsible sidebar navigation
- Responsive navbar with cart count badge
