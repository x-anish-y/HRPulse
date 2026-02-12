# 🚀 HRPULSE  
### Next-Generation Human Resource Management System (HRMS)

**HRPULSE** is a production-ready, full-stack Human Resource Management System designed to digitize and streamline modern HR workflows — including employee onboarding, attendance tracking, leave management, and payroll administration.

Built with secure role-based architecture, clean backend design, and premium UI/UX principles, HRPULSE delivers enterprise-grade functionality suitable for real-world deployment.

---

## 👨‍💼 Team Details

**Team Leader**  
- Jayaditya Saloi  

**Team Members**  
- Aneesh Sawant  
- Anish Sasmal  
- Saish Raut  

---

## 📌 Project Overview

HRPULSE is architected as a role-segmented HR platform with:

- Strict access control (Admin vs Employee)
- Secure authentication & authorization
- Structured payroll logic
- Clean separation of business logic and UI
- Database-level security enforcement

The system reflects real HR operational flows rather than a conceptual demo.

---

## ✨ Key Capabilities

- 🔐 JWT-based authentication & role enforcement  
- 👥 Privilege-based UI rendering  
- ⏱️ Real-time attendance tracking (Check-in / Check-out)  
- 🗓️ Leave management with approval workflow  
- 💰 Structured salary computation engine  
- 🔑 Temporary credentials for onboarding  
- 🔄 Mandatory password reset on first login  
- 🗄️ Supabase PostgreSQL with Row Level Security  
- 🎨 Premium, responsive, enterprise-grade UI  

---

## 🧠 Technology Stack

### Frontend
- React (Functional Components + Hooks)
- React Router
- Tailwind CSS / Styled Components
- Responsive desktop-first layout
- Micro-interactions & smooth transitions

### Backend
- Node.js
- Express-style REST APIs
- JWT authentication middleware
- Role-based authorization logic
- Modular controller architecture

### Database
- Supabase (PostgreSQL)
- Relational schema design
- Row Level Security (RLS)
- Foreign key constraints & indexing

---

## 👥 Role-Based System Architecture

### 🔑 Admin / HR

- Create and manage employee accounts  
- Generate temporary login credentials  
- Monitor organization-wide attendance  
- Approve / reject leave requests  
- Configure salary structures  
- Access payroll summaries  
- Full system privileges  

<br>

![HRPULSE Admin Architecture](public/Screenshot%202026-02-12%20233110.png)

---

### 👤 Employee

- Login via temporary credentials  
- Forced password change at first login  
- Check-in / Check-out attendance  
- Apply for leave  
- View salary (read-only mode)  
- Access only personal data  

<br>

![HRPULSE Employee Architecture](public/Screenshot%202026-02-12%20233227.png)

---

## 🔐 Authentication & Security Architecture

- JWT-based session management  
- Secure password hashing  
- Server-side role enforcement  
- Protected admin-only routes  
- Supabase Row Level Security (RLS)  
- Controlled API access patterns  

Security is enforced at both application and database levels.

---

## 🧾 Core Functional Modules

### 📊 Dashboard

**Admin View**
- Employee directory
- Live attendance indicators
- Pending leave approvals

**Employee View**
- Attendance summary
- Leave balance overview
- Quick action shortcuts

---

### ⏱️ Attendance Module

- Single-click check-in / check-out  
- Prevention of invalid state transitions  
- Monthly attendance logs  
- Direct integration with payroll computation  

---

### 🗓️ Leave Management

- Leave categories: Paid, Sick, Unpaid  
- Leave application with optional attachments  
- Approval / rejection workflow  
- Automated leave balance updates  

---

### 💰 Salary & Payroll Engine

- Fixed monthly or yearly compensation  
- Automated salary component breakdown:
  - Basic Pay  
  - HRA  
  - Provident Fund  
  - Tax  
  - Allowances  

- Read-only employee salary access  
- Payroll summary generation  
- Attendance-linked payroll logic  

---

## 🗄️ Database Schema (Core Tables)

- `companies`  
- `users`  
- `roles`  
- `employees`  
- `attendance`  
- `leave_requests`  
- `leave_types`  
- `salary_structures`  
- `salary_components`  
- `payroll`  

The schema enforces relational integrity through foreign keys, constraints, and indexed queries.

---

## 📈 System Design Principles

- Clean separation of concerns  
- Modular API structure  
- Role-based UI rendering  
- Database-level access enforcement  
- Enterprise-ready scalability  

---

## 🎯 Learning & Engineering Outcomes

This project demonstrates:

- Secure full-stack authentication workflows  
- Role-based access control implementation  
- Relational database modeling  
- Payroll logic design  
- Real-world HR system architecture  
- Production-style API development  

---

## 🌟 Vision

HRPULSE aims to serve as a scalable digital backbone for modern HR operations — combining operational efficiency, security, and intuitive user experience into one unified platform.

---

## 📜 License

This project is developed for academic and portfolio purposes and can be extended for enterprise deployment.
