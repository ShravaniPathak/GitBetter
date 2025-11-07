# 🧩 GitBetter

> **Gamified Habit Tracker inspired by GitHub’s Contribution Graph**  
> Build consistency. Visualize progress. GitBetter every day.  

---

## 🚀 Overview

**GitBetter** is a habit-tracking web application designed to help individuals build consistency by visualizing daily progress — just like the GitHub contributions matrix.  
Each habit is represented as a grid of days, where the color intensity of each square reflects the user’s progress over time.

---

## ✨ Features Implemented

- **Visual Grid Dashboard:**  
  Each habit has its own contribution-style grid, with:
  - Squares representing each day.
  - Color intensity indicating completion strength or streak.
  - Tooltips showing habit name and date.
- **Responsive UI:**  
  Designed with modern and minimal aesthetics for seamless desktop and mobile experience.
- **Dynamic Data:**  
  Habits and progress data fetched and rendered dynamically from MongoDB.

---

## 🧠 Tech Stack

**Frontend:** React.js, Tailwind CSS  
**Backend:** Node.js, Express.js  
**Database:** MongoDB  
**Version Control:** Git & GitHub  

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/<your-username>/GitBetter.git
cd GitBetter
```
### 2️⃣ Setup Backend
```bash
cd server
npm install
npm start
```
### 3️⃣ Setup Frontend
```bash
cd client
npm install
npm start
```
### 4️⃣ Environment Variables
Create a .env file inside the server/ directory and include:
```bash
db_url=""
access_token_secret=""
refresh_token_secret=""
```
---
## 💡 Inspiration

Inspired by the psychological satisfaction of seeing your GitHub contributions graph fill up — GitBetter transforms daily habits into visual progress, 
making consistency rewarding and visible.

---
