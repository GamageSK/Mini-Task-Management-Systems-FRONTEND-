# 🗂️ Mini Task Management System – FRONTEND

## 📘 Overview
This project is a **Mini Task Management System** built with:
- **Frontend:** Razor Pages using **ASP.NET MVC**
- **Backend:** **ASP.NET Core MVC** with **Entity Framework (EF Core)**
- **Database:** **Microsoft SQL Server (MSSQL)**

---

## ⚙️ Setup Instructions

### 1. Run the Backend API
Before starting the frontend project:
- Run the **Backend API** project first.
- Restore and attach the **database backup file (.bak)** to your **MSSQL Server**.
- Update the **connection string** in the backend project's `appsettings.json` file to match your SQL Server instance.

Example:
```json
"ConnectionStrings": {
  "DefaultConnection": "Server=YOUR_SERVER_NAME;Database=MiniTaskDB;Trusted_Connection=True;TrustServerCertificate=True;"
}
```

---

### 2. Configure the Frontend
- Open the **Frontend** project in Visual Studio.
- Ensure the **API base URL** in your JavaScript or Razor views matches your backend’s running URL (e.g., `https://localhost:7020/api/...`).
- Run the project.

---

## 🔐 Login Details

| Field         | Value         |
|----------------|---------------|
| **Mobile No**  | `0769644032`  |
| **Password**   | `123456`      |

---

## 🧩 Features
✅ User Login   
✅ Dashboard with Task Overview  
✅ Add / Edit / Delete Tasks  
✅ Task Search & Status Filter  
✅ Task Validation & Alerts  
✅ SweetAlert Integration for Notifications  
✅ Responsive Layout with Bootstrap 5  

---

## 🛠️ Technologies Used

| Layer | Technology |
|--------|-------------|
| Frontend | Razor View Engine (ASP.NET MVC) |
| Backend | ASP.NET Core MVC (with EF Core) |
| Database | Microsoft SQL Server |
| Libraries | Bootstrap 5, jQuery, SweetAlert |

---

## 🧑‍💻 Developed By
**Sanjula Kusal Gamage**
