<h1 align="center">MealMind.ai (API/SERVER)🧠🍽️</h1>

MealMind.ai (API/SERVER) Designed to generate smart, creative recipe ideas using AI and you can also save and share the recipes.

---

# 🔧 (API/SERVER) Setup

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

GOOGLE_CLIENT_ID=           # Google Client Id (for google authentication)
GOOGLE_CLIENT_SECRET=       # Google CLient Secret (for google authentication)
GOOGLE_CALLBACK_URL=        # http://localhost:(PORT)/api/auth/google/callback (Make sure add the same url that you gave on google cloud platform)

GEMINI_API_KEY=             # Gemini AI API key
PEXELS_API_KEY=             # Pexels API key
```

### 3.📡 API Endpoints

## 🔐 User Endpoints:

<span style="color:green">**✅Craeting A New User:**</span>


- **URL**:              `/api/auth/signup`
- **Method**:           `POST`
- **Body**:             `username, name, email, password`
- **Credentials**:      `True`
- **Auth required**:    `No`

<span style="color:green">**🔓Login Existing User:**</span>

- **URL**:              `/api/auth/login`
- **Method**:           `POST`
- **Body**:             `usernameOrEmail, password`
- **Credentials**:      `True`
- **Auth required**:    `No`

<span style="color:green">**🚪Logout User:**</span>

- **URL**:              `/api/auth/logout`
- **Method**:           `POST`
- **Body**:             `Null`
- **Credentials**:      `True`
- **Auth required**:    `(Optional)`

<span style="color:green">**✏️Update Existing User:**</span>

- **URL**:              `/api/auth/updateProfile`
- **Method**:           `PUT`
- **Body**:             `username(Optional), name(Optional),  profile(Optional`
- **Credentials**:      `True`
- **Auth required**:    `Yes`

<span style="color:green">**👥Get All Users:**</span>

- **URL**:              `/api/auth/allUsers`
- **Method**:           `GET`
- **Body**:             `Null`
- **Credentials**:      `True`
- **Auth required**:    `Yes`

<span style="color:green">**👤Get Logged-In User Profile:**</span>

- **URL**:              `/api/auth/getProfile`
- **Method**:           `GET`
- **Body**:             `Null`
- **Credentials**:      `True`
- **Auth required**:    `Yes`

## 🕘 History (Recipes):

<span style="color:green">**📝Create a Recipe (Adds to History):**</span>

- **URL**:              `/api/history/createRescipe`
- **Method**:           `POST`
- **Body**:             `text` (This can be whatever is on your mind.)
- **Credentials**:      `True`
- **Auth required**:    `Yes`

<span style="color:green">**📄Get Logged-In User's Recipe History:**</span>

- **URL**:              `/api/history/getHistory`
- **Method**:           `GET`
- **Body**:             `Null`
- **Credentials**:      `True`
- **Auth required**:    `Yes`

<span style="color:green">**❌Clear All Recipe History:**</span>

- **URL**:              `/api/history/clearHistory`
- **Method**:           `DELETE`
- **Body**:             `Null`
- **Credentials**:      `True`
- **Auth required**:    `Yes`

<span style="color:green">**🗑️Delete Specific Recipe from History:**</span>

- **URL**:              `/api/history/clearSingleHistory/:id` (It Requires Id Of History That You Want To Delete)
- **Method**:           `DELETE`
- **Body**:             `Null`
- **Credentials**:      `True`
- **Auth required**:    `Yes`

## 💾 Saved Recipes:

<span style="color:green">**💾Save Recipe from History ID:**</span>

- **URL**:              `/api/saved/saveRescipe/:id` (It Requires Id Of History That You Want To Saved)
- **Method**:           `POST`
- **Body**:             `Null`
- **Credentials**:      `True`
- **Auth required**:    `Yes`

<span style="color:green">**💾Save Recipe from Share ID:**</span>

- **URL**:              `/api/saved/saveSharedRescipe/:id` (It Requires Id Of Share That You Want To Saved)
- **Method**:           `POST`
- **Body**:             `Null`
- **Credentials**:      `True`
- **Auth required**:    `Yes`

<span style="color:green">**🔓Unsave Recipe by Save ID:**</span>

- **URL**:              `/api/saved/unsaveRescipe/:id` (It Requires Id Of Save That You Want To Unsave)
- **Method**:           `DELETE`
- **Body**:             `Null`
- **Credentials**:      `True`
- **Auth required**:    `Yes`

<span style="color:green">**📋Get Saved Recipes for Logged-In User:**</span>

- **URL**:              `/api/saved/getSavedRecipe`
- **Method**:           `GET`
- **Body**:             `Null`
- **Credentials**:      `True`
- **Auth required**:    `Yes`

## 🔗 Shared Recipes:

<span style="color:green">**📤Share Recipe from History:**</span>

- **URL**:              `/api/shareRecipe/shareHistoryRecipe/:receiverId` (It Requires Id Of User That You Want To Send The Recipe)
- **Method**:           `POST`
- **Body**:             `historyId` (Id Of History(Recipe) That You Want To Send)
- **Credentials**:      `True`
- **Auth required**:    `Yes`

<span style="color:green">**📤Share Recipe from Saved Recipes:**</span>

- **URL**:              `/api/shareRecipe/shareSavedRecipe/:receiverId` (It Requires Id Of User That You Want To Send The Recipe)
- **Method**:           `POST`
- **Body**:             `savedId` (Id Of Saved(Recipe) That You Want To Send)
- **Credentials**:      `True`
- **Auth required**:    `Yes`

<span style="color:green">**📤Share Recipe from Shared Recipes:**</span>

- **URL**:              `/api/shareRecipe/shareSharedRecipe/:receiverId` (It Requires Id Of User That You Want To Send The Recipe)
- **Method**:           `POST`
- **Body**:             `sharedId` (Id Of Shared(Recipe) That You Want To Send)
- **Credentials**:      `True`
- **Auth required**:    `Yes`

<span style="color:green">**📬Get Shared Recipes Received by Logged-In User:**</span>

- **URL**:              `/api/shareRecipe/getSharedRecipe`
- **Method**:           `GET`
- **Body**:             `null`
- **Credentials**:      `True`
- **Auth required**:    `Yes`

<span style="color:green">**📤Get Recipes Sent by Logged-In User:**</span>

- **URL**:              `/api/shareRecipe/getSendedRecipe`
- **Method**:           `GET`
- **Body**:             `null`
- **Credentials**:      `True`
- **Auth required**:    `Yes`

<span style="color:green">**❌Delete a Shared Recipe:**</span>

- **URL**:              `/api/shareRecipe/deleteSharedRecipe/:id` (It Requires Id Of Share That You Want To Delete)
- **Method**:           `DELETE`
- **Body**:             `null`
- **Credentials**:      `True`
- **Auth required**:    `Yes`


### 4. 🧪 Run Server

```bash
# For development
npm run dev

# For production
npm start
```

#### The server should now be running at: `http://localhost:(PORT)`

---

# 📌 Important Notes

- Ensure that `.env` files are properly configured in both the client and server folders.
- All external APIs and services (MongoDB, Gemini, Cloudinary) must be active and authorized.

---

# 🙌 Acknowledgements

#### Special thanks to the APIs and services that made this project possible:

- [Google Gemini](https://deepmind.google/technologies/gemini/)
- [Cloudinary](https://cloudinary.com/)

#### Made with ❤️ by [Hammad Khatri](https://github.com/Hammad005)
