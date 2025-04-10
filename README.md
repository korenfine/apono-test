# 🛡️ Citizen Access Control System

A full-stack web application built with **React** (frontend), **NestJS** (backend), and **MongoDB** (database). This system allows validating access permissions between citizens and places based on hierarchical roles and logs all access attempts.

---

## 🚀 Features

- 🎛️ **Form Interface**: Select citizens and places from dropdowns, and check if access is allowed.
- ✅ **Validation Feedback**: Receive instant success or failure messages after submitting the form.
- 📄 **Access Logs**: View a detailed table of all access attempts including citizen, role, place, result, and timestamp.
- 🏗️ **Role Hierarchy Logic**: Access is validated through direct and sub-role matches.
- 📦 **MongoDB Integration**: All data is stored and retrieved via MongoDB.

---

## 📂 Project Structure

This is an **NX Monorepo** with the following structure:

```
apps/
  client/      -> React frontend
  server/      -> NestJS backend
commands/      -> JS command Script 
libs/
  dto/         -> Shared TypeScript types (used by both client and server)
migrations/     
models/        
```

---

## ⚙️ Setup Instructions

### 1. 📥 Install Dependencies

```bash
npm install
```

---

### 2. 🧩 Run Data Migration

This loads initial data like citizens, roles, and places into the database.

```bash
npm run migration
```

---

### 3. 💻 Start the Client (React)

```bash
npm run client
```

Runs on `http://localhost:4200`

---

### 4. 🧠 Start the Server (NestJS)

```bash
npm run server
```

Runs on `http://localhost:3000`

---

## 🧠 Technical Overview

### 📁 Data Models

- **Citizen**
  - `name`: string
  - `roles`: Role[]
- **Role**
  - `name`: string
  - `subRoles`: string[]
- **Place**
  - `name`: string
  - `rolesAllowed`: Role[]
- **AccessLog**
  - `citizen`: string
  - `role`: string
  - `place`: string
  - `result`: 'allowed' | 'denied'
  - `timestamp`: Date

---

### 🔄 Flow

1. **Form Submission**:
   - User selects a citizen and place.
   - App sends request to backend to validate access.
   - Backend checks if any of the citizen's roles (or subRoles) match the place's `rolesAllowed`.

2. **Validation Result**:
   - Access is either approved or denied.
   - Result is shown to the user.
   - Log entry is recorded in the database.

---

## 📦 Environment Variables

Make sure to configure MongoDB in your `.env` (or environment) setup:

```
MONGO_URI=mongodb://localhost:27017/apono
```

---

## 🛠️ Tools & Libraries

- **Frontend**: React, MUI, Axios
- **Backend**: NestJS, Mongoose
- **Database**: MongoDB
- **Tooling**: NX, TypeScript, Zod (for server-side validation)

---

## 🧠 Author

Made with 💻 by Naor Kraif
