# 🚀 Django + React Employee Management System

A full-stack CRUD application built using:

* 🔹 Django REST Framework (Backend API)
* 🔹 React.js (Frontend)
* 🔹 Axios (API communication)
* 🔹 SQLite (Default Django DB)

---

## 📌 Features

✅ Create Employee
✅ View Employee List
✅ Update Employee
✅ Delete Employee
✅ REST API Integration
✅ CORS Enabled
✅ Clean Component-Based React Structure

---

# 🏗️ Project Structure

```
employee-project/
│
├── Backend/               # Django Project
│   ├── app/
|   ├── API_Task/
│   └── manage.py
│
├── employee-frontend/     # React App
│   ├── src/
│   │   ├── components/
│   │   │   ├── EmployeeList.jsx
│   │   │   ├── EmployeeForm.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   └── App.jsx
│
└── README.md
```

---

# ⚙️ Backend Setup (Django)

## 1️⃣ Create Virtual Environment

```bash
python -m venv venv
```

Activate:

**Windows**

```bash
venv\Scripts\activate
```

**Mac/Linux**

```bash
source venv/bin/activate
```

---

## 2️⃣ Install Dependencies

```bash
pip install django djangorestframework django-cors-headers
```

---

## 3️⃣ Add to `settings.py`

```python
INSTALLED_APPS = [
    ...
    'rest_framework',
    'corsheaders',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    ...
]

CORS_ALLOW_ALL_ORIGINS = True
```

---

## 4️⃣ Run Migrations

```bash
python manage.py makemigrations
python manage.py migrate
```

---

## 5️⃣ Run Server

```bash
python manage.py runserver
```

Backend running at:

```
http://127.0.0.1:8000/api/employees/
```

---

# 💻 Frontend Setup (React - Vite)

## 1️⃣ Create React App

```bash
npm create vite@latest employee-frontend
cd employee-frontend
npm install
```

Choose:

* Framework → React
* Variant → JavaScript

---

## 2️⃣ Install Axios - Axios helps call your Django API.

```bash
npm install axios
```

---

## 3️⃣ Start React App

```bash
npm run dev
```

Frontend runs at:

```
http://localhost:5173
```

---

# 🔗 API Endpoints

| Method | Endpoint             | Description         |
| ------ | -------------------- | ------------------- |
| GET    | /api/employees/      | List Employees      |
| GET    | /api/employees/{id}/ | Get Single Employee |
| POST   | /api/employees/      | Create Employee     |
| PUT    | /api/employees/{id}/ | Update Employee     |
| DELETE | /api/employees/{id}/ | Delete Employee     |

---

# 🧪 Sample API Payload

### Create Employee

```json
{
    "employee_id": "102",
    "fullName": "Lara",
    "salary": "8000",
    "department_id": "10"
}
```

---

# 🔄 Data Flow

React (Axios)
⬇
Django REST API
⬇
Database
⬇
JSON Response
⬇
React UI Update

---

# 🛠️ Technologies Used

* Python 3.x
* Django 6.x
* Django REST Framework
* React 18+
* Vite
* Axios
* SQLite

---

# 🚀 Future Improvements

* JWT Authentication
* Pagination
* Search & Filter
* Form Validation
* Bootstrap / Tailwind UI
* Deployment (Render + Vercel)
* Docker Setup
* PostgreSQL Integration

