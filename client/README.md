<h1 align="center">MealMind.ai 🧠🍽️ (Client)</h1>

MealMind.ai (Client-site) AI-powered meal inspiration web app designed to generate smart, creative recipe ideas using AI and you can also save, share and download the recipes.

---

# 💻 Client Setup

### 1. 📦 Install Dependencies

```bash
cd client
npm install
```

### 2. ⚙️ Environment Variables

##### Create a `.env` file in the `client` directory and add the following variables:

```env
VITE_API_URL=                    # Your backend API base URL (e.g., http://localhost:5000)
VITE_GOOGLE_CLIENT_ID=           # Google Client Id (for google authentication)
VITE_GOOGLE_CLIENT_SECRET=       # Google CLient Secret (for google authentication)
VITE_GOOGLE_CALLBACK_URL=        # http://localhost:(PORT)/api/auth/google/callback (Make sure add the same url that you gave on google cloud platform)
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
- [Cloudinary](https://cloudinary.com/)

#### Made with ❤️ by [Hammad Khatri](https://github.com/Hammad005)
