<h1 align="center">MealMind.ai 🧠🍽️</h1>

![Demo App](/client/public/banner.png)

MealMind.ai is a full-stack AI-powered meal inspiration web app designed to generate smart, creative recipe ideas using AI and image APIs and you can also save, share and download the recipes. This repository contains both the server and client code.

---

## 📁 Project Structure

```bash
MealMind.ai/
├── server/  # Node.js + Express backend
└── client/  # Vite + React frontend
```

---

# 📄 Clone the Repository

```bash
git clone https://github.com/Hammad005/MealMind.ai.git
```

---

# 🔧 Server Setup (/server)

### 1. 📦 Install Dependencies

```bash
cd server
npm install
```

### 2. ⚙️ Environment Variables

##### Create a `.env` file in the `server` directory and add the following variables:

```env
PORT=                       # Port number (e.g., 5000)

MONGO_URI=                  # Your MongoDB connection string
CLIENT_URL=                 # Your frontend URL (e.g., http://localhost:5173)
JWT_SECRET=                 # Secret key for JWT authentication

CLOUDINARY_CLOUD_NAME=      # Cloudinary cloud name
CLOUDINARY_API_KEY=         # Cloudinary API key
CLOUDINARY_API_SECRET=      # Cloudinary API secret

GEMINI_API_KEY=             # Gemini AI API key
PEXELS_API_KEY=             # Pexels API key
```

### 3. 📡 Run Server

```bash
# For development
npm run dev

# For production
npm start
```

#### The server should now be running at: `http://localhost:(PORT)`

---

# 💻 Client Setup (/client)

### 1. 📦 Install Dependencies

```bash
cd client
npm install
```

### 2. ⚙️ Environment Variables

##### Create a `.env` file in the `client` directory and add the following variables:

```env
VITE_API_URL=                    # Your backend API base URL (e.g., http://localhost:5000)
VITE_CLOUDINARY_CLOUD_NAME=      # Cloudinary cloud name
```

### 3. 🧪 Run Client

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

#### The client will be available at: `http://localhost:5173` (default Vite port)

---

# 🛠️ Tech Stack

- **Frontend**: React, Vite, TailwindCSS, Shadcn
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **APIs Used**: Gemini AI, Pexels API, Cloudinary

---

# 📌 Important Notes

- Ensure that `.env` files are properly configured in both the client and server folders.
- All external APIs and services (MongoDB, Gemini, Cloudinary, Pexels) must be active and authorized.
- The application will not function correctly without valid API credentials.

---

# 🙌 Acknowledgements

#### Special thanks to the APIs and services that made this project possible:

- [Google Gemini](https://deepmind.google/technologies/gemini/)
- [Pexels](https://www.pexels.com/)
- [Cloudinary](https://cloudinary.com/)

#### Made with ❤️ by [Hammad Khatri](https://github.com/Hammad005)
