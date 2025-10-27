# 🧑‍💻 Random User Info React App

## 📘 Overview

A simple **React + TypeScript** application that fetches and displays a **random user's full name and email** using the [Random User API](https://randomuser.me/api).  
It demonstrates clean architecture, reusable hooks, and component-based design with proper testing.

---

## ✨ Features

- 🔄 Fetch random user data asynchronously using **Axios**
- 🧠 Data persistence using **localStorage**
- ⚡ Instant refresh button to get a new user
- 🎨 Responsive UI built with **Material UI (MUI)**
- 🧩 Reusable components and hooks
- 🧪 Unit and integration tests with **Vitest** and **React Testing Library**

---

## 🧰 Tech Stack

| Category    | Technology                     |
| ----------- | ------------------------------ |
| Framework   | React 18 + TypeScript          |
| HTTP Client | Axios                          |
| UI Library  | Material UI (MUI)              |
| Build Tool  | Vite                           |
| Testing     | Vitest + React Testing Library |

---

## ⚙️ Project Structure

src/
├── api/
│ └── fetchUserApi.ts # API call using Axios
├── components/
│ └── UserCard.tsx # Reusable card to display user info
├── hooks/
│ └── useUser.ts # Custom hook to manage user fetching logic
├── App.tsx # Main component
├── main.tsx # App entry point
└── **tests**/
└── App.test.tsx # Test cases for components and hooks

## ⚙️ Setup Dependencies

npm install
npm run dev
npm run build
npm run test

✅ App.test.tsx

Ensures the loading state (Skeleton) is displayed while fetching data.
Renders the user’s name and email after API success.
Mocks the fetchUserApi call using Vitest mocks.
Verifies Refresh button triggers new API calls and updates the UI.
Tests localStorage persistence logic.

## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository

```bash
git clone git@github.com:developerrahul27/Random-Use--Detail.git
cd random-user-app
```
