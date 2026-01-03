# 🚀 HRPULSE – Next‑Gen Human Resource Management System

**HRPULSE** is a modern, full‑stack Human Resource Management System (HRMS) designed to streamline employee onboarding, attendance tracking, leave management, and salary administration through a secure, role‑based platform.

Built with a focus on real‑world HR workflows, clean architecture, and premium UI/UX, HR PULSE delivers a production‑grade experience suitable for enterprise use cases.

## 👨‍💼 Team Details
**Team Leader:**  
- Jayaditya Saloi  

**Team Members:**  
- Aneesh Sawant  
- Anish Sasmal  
- Saish Raut  

---

## ✨ Key Highlights

- 🔐 Secure authentication with role‑based access (Admin vs Employee)
- 👥 Clear separation of privileges and UI flows
- ⏱️ Real‑time attendance tracking (check‑in / check‑out)
- 🗓️ Leave & time‑off management with approval workflow
- 💰 Salary structure with auto‑calculated components
- 🔑 Temporary credentials for new employees
- 🔄 Forced password change on first login
- 🎨 Modern, premium UI — impressive even before login
- 🗄️ Supabase‑powered PostgreSQL database
- 🚀 Fully functional end‑to‑end system (not a mockup)

---

## 🧠 Tech Stack

### Frontend
- React (functional components + hooks)
- React Router
- Modern CSS (Tailwind / Styled Components)
- Responsive, desktop‑first design
- Smooth animations and micro‑interactions

### Backend
- Node.js
- Express‑style REST APIs
- JWT‑based authentication
- Role‑based authorization middleware

### Database
- Supabase (PostgreSQL)
- Managed relational database
- Row Level Security (RLS)
- Foreign keys, indexes, and constraints

---

## 👥 User Roles

### 🔑 Admin / HR
- Create and manage employee accounts
- Generate temporary credentials for new employees
- View all employees and their attendance
- Approve / reject leave requests
- Configure salary structures
- View payroll data
- Full system access

### 👤 Employee
- Cannot self‑register
- Login using temporary credentials
- Forced to change password on first login
- Check‑in / check‑out attendance
- Apply for leave
- View salary in read‑only mode
- Access only personal data

---

## 🔐 Authentication & Security

- JWT‑based authentication
- Secure password hashing
- Forced password change on first login
- Server‑side role enforcement
- Protected admin‑only routes
- Supabase Row Level Security (RLS) for data protection

---

## 🧾 Core Features

### 📊 Dashboard
- **Admin**: employee grid, attendance status, pending approvals
- **Employee**: attendance status, leave balance, quick actions

### ⏱️ Attendance
- One‑click check‑in / check‑out
- Prevents invalid actions (double check‑in, invalid check‑out)
- Monthly attendance view
- Attendance feeds payroll logic

### 🗓️ Time Off / Leave
- Paid, Sick, and Unpaid leave types
- Employee leave application with attachments
- Admin approval / rejection workflow
- Automatic leave balance updates

### 💰 Salary & Payroll
- Fixed wage (monthly / yearly)
- Auto‑calculated components:
  - Basic
  - HRA
  - Provident Fund
  - Tax
  - Allowances
- Employee view is strictly read‑only
- Payroll summary generation

---

## 🗄️ Database Schema (Core Tables)

- companies  
- users  
- roles  
- employees  
- attendance  
- leave_requests  
- leave_types  
- salary_structures  
- salary_components  
- payroll  
