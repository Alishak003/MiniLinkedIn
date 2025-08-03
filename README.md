# React + Vite

# 🚀 MiniLinkedIn

**MiniLinkedIn** is a minimalist social platform built with React and Firebase. It allows users to register, create profiles, post content, like and comment on posts—similar to features found on Instagram or LinkedIn.

---

## 🧪 Features

### Mobile Responsive
-this website is mobile responsive

### ✅ Authentication
- Sign up / Login with Email & Password or Google
- Secure Firebase Authentication
- Persistent user sessions & Auth-protected routes

### 👤 User Profiles
- View public user profiles
- Activity section showing user's posts
- Profile name with slug connected with each post

### 📝 Posts
- Create text-based posts
- Posts display author, content, timestamp
- Fetch all posts in descending order of creation

### ❤️ Likes
- Like or unlike any post
- Real-time like count per post
- Like state persists on refresh
- Each post displays total likes and whether the current user has liked it

### 💬 Comments
- Add comments to any post
- reply to comments & Nested replies
- Show comment count and list

---

## 🛠️ Tech Stack

- **React** (Frontend)
- **Firebase**
  - Firestore (database)
  - Auth (email/password)
- **React Router** (page navigation)
- **React Query** (data fetching and cache)
- **CSS** (component styling)
- **Vercel Hosting**

---

## 📁 Firestore Collections

Ensure your Firestore has the following collections:

- `users`  
  - Fields: `uid`, `name`, `bio`,`location`,`email`,`created_at`.
  
- `posts`  
  - Fields: `user_id`, `content`, `created_at`

- `post_likes`  
  - Fields: `postId`, `userId`, `createdAt`

- `comments`  
  - Fields: `post_id`, `user_id`, `content`, `created_at`,`parent_id`

---

## 📦 Installation

```bash
git clone https://github.com/yourusername/minilinkedin.git
cd minilinkedin
npm install
npm run dev

