# 🎓 CloudSRMS - Cloud-Based Student Result Management System

[![Zero Dependencies](https://img.shields.io/badge/Dependencies-0%20(Pure%20Native)-success.svg)](#)
[![GitHub Ready](https://img.shields.io/badge/GitHub-100%25%20Push%20Ready-blue.svg)](#)
[![Web Standards](https://img.shields.io/badge/Standards-HTML5%20%7C%20CSS3%20%7C%20ES6-purple.svg)](#)
[![Architecture](https://img.shields.io/badge/Architecture-Ultra--Clean%20Root-orange.svg)](#)

> A modern, responsive, and ultra-fast **Cloud-Based Student Result Management System** designed for colleges, universities, and schools. Built with zero heavy dependencies and an ultra-lean architecture so you can push to GitHub in seconds with **zero upload errors or file limits**.

---

## 🌟 Key Features

### 🔍 1. Student Result Portal
- **Instant Result Retrieval**: Search results by Enrollment/Roll Number and Semester.
- **Official Academic Marksheet**: Clean, professional transcript format displaying Course Codes, Course Titles, Credits, Max Marks, Marks Scored, Letter Grades, and Grade Points.
- **Automated SGPA / CGPA Calculation**: Standard UGC/AICTE 10-point academic grading scale (`O`, `A+`, `A`, `B+`, `B`, `C`, `F`).
- **Interactive Performance Analytics**: Real-time visual graphs (Subject Mastery Bar Chart & Skill Competency Radar).
- **Print & PDF Download**: Dedicated `@media print` styling generates an official certificate-grade marksheet without buttons or clutter.
- **Online Cloud Verification**: Generates tamper-evident cloud verification hashes.

### ⚡ 2. Faculty & Examination Controller Dashboard
- **Real-Time KPIs**: Total evaluated students, institutional pass rate, average batch SGPA, and department distribution.
- **Publish & Edit Results**: Dynamic modal form with auto-calculated marks, credits, and grades.
- **Bulk CSV Import & Export**: One-click export of student records to CSV or import hundreds of student scores in seconds.
- **Department & Semester Filters**: Quickly filter between Computer Science, AI & ML, Electronics, and Mechanical Engineering.
- **Visual Analytics**: Institutional grade distribution bar charts and pass vs. arrear pie charts.

### ☁️ 3. Dual-Mode Cloud Architecture
- **Mode A (Zero Backend / GitHub Pages)**: Runs directly from `index.html` using local browser cloud persistence (`localStorage`).
- **Mode B (Full-Stack Cloud REST API)**: Run with built-in native Node.js (`node server.js`) with zero npm packages needed!

---

## 📁 Project Structure (Ultra-Lean & Clean)

This repository is intentionally structured with **maximum 6 root files and 0 subfolders**, eliminating large `node_modules` folders so you can clone and push to GitHub effortlessly:

```text
Cloud-Based Student Result Management System/
│
├── index.html        # Main web application & responsive UI
├── style.css         # Glassmorphic dark/light design & print styles
├── app.js            # Core grading engine, charts, and cloud sync
├── server.js         # Zero-dependency Node.js REST API web server
├── README.md         # Comprehensive documentation & setup guide
└── .gitignore        # Clean git ignore configuration
```

---

## 🚀 How to Run Locally

You have **two simple ways** to run this project:

### Option 1: Instant Browser Launch (No Terminal Needed)
1. Navigate to this folder.
2. Double-click `index.html` to open it in Chrome, Edge, Safari, or Firefox.
3. Everything works immediately!

### Option 2: Run with Cloud REST API Server
If you want to run the full-stack Node server:
```bash
node server.js
```
Open your browser and navigate to:
```text
http://localhost:5000
```

---

## 🧪 Quick Test Demo Credentials

Try these sample roll numbers in the Student Portal:

| Roll Number | Candidate Name | Department | Result Status |
| :--- | :--- | :--- | :--- |
| `CS2024-001` | Aarav Sharma | Computer Science & Engg | **First Class with Distinction (SGPA 9.15)** |
| `CS2024-002` | Priya Patel | Computer Science & Engg | **First Class (SGPA 8.15)** |
| `AI2024-015` | Siddharth Verma | Artificial Intelligence & ML | **Outstanding (SGPA 9.60)** |
| `EC2024-042` | Ananya Rao | Electronics & Communication | **Pass Class (SGPA 6.85)** |
| `ME2024-019` | Rohan Mehta | Mechanical Engineering | **Reappear / Arrear (Grade F in 1 subject)** |

---

## 📤 How to Push to GitHub (Step-by-Step)

Because this repository contains **0 large folders**, your git push will succeed in seconds!

Run the following commands in PowerShell or Terminal inside this folder:

```bash
# 1. Initialize git
git init

# 2. Add all 6 files
git add .

# 3. Commit the changes
git commit -m "Initial commit: Cloud-Based Student Result Management System"

# 4. Set default branch to main
git branch -M main

# 5. Link your GitHub repository (replace with your repo URL)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY_NAME.git

# 6. Push to GitHub!
git push -u origin main
```

---

## 🌐 Free 1-Click Hosting (GitHub Pages)

You can host this project on the web for free using **GitHub Pages**:
1. Go to your repository on GitHub.
2. Click **Settings** > **Pages**.
3. Under **Branch**, select `main` and `/ (root)`.
4. Click **Save**.
5. Your system is live at `https://YOUR_USERNAME.github.io/YOUR_REPOSITORY_NAME/`!

---

## 📝 License
This project is open-source and free to use for academic, institutional, and portfolio purposes.
