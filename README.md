# Electro Admin

A modern, scalable React-based administration panel for the Electro E-commerce platform.

The application is built to consume the Symfony 8 + API Platform backend and provides a clean, reusable architecture for managing all e-commerce resources such as Categories, Brands, Products, Orders, Customers, Coupons, and more.

---

# Tech Stack

## Frontend

* React 19
* Vite
* React Router v7
* Material UI (MUI)
* Axios
* TanStack Query
* React Hook Form
* Zod
* Notistack

## Backend

* Symfony 8
* API Platform
* JWT Authentication
* MySQL

---

# Features

* JWT Authentication
* Protected Routes
* Responsive Admin Layout
* Responsive Sidebar
* Dashboard
* Reusable CRUD Framework
* Material UI DataGrid
* Generic Dialogs
* Form Validation
* API Platform (Hydra) Integration
* Role-based Authorization
* Dark/Light Theme (planned)
* Dashboard Analytics (planned)

---

# Project Structure

```text
src/
│
├── app/
│   ├── layouts/
│   ├── providers/
│   ├── routes/
│   └── theme/
│
├── api/
│   ├── axios.js
│   ├── BaseService.js
│   ├── endpoints.js
│   ├── queryClient.js
│   └── queryKeys.js
│
├── shared/
│   ├── components/
│   ├── hooks/
│   ├── utils/
│   ├── constants/
│   └── validators/
│
├── features/
│   ├── auth/
│   ├── dashboard/
│   ├── categories/
│   ├── brands/
│   ├── products/
│   ├── orders/
│   ├── customers/
│   └── settings/
│
├── assets/
├── styles/
├── App.jsx
└── main.jsx
```

---

# Architecture

The application follows a **Feature-Based Architecture**.

Each feature is completely isolated and contains its own:

* Pages
* Components
* Services
* Hooks
* Validation Schemas

Example:

```text
features/
└── categories/
    ├── pages/
    ├── components/
    ├── services/
    ├── hooks/
    └── schemas/
```

Shared components are located in:

```text
shared/
```

These components are reused across all modules.

---

# Shared Components

The application provides reusable UI components including:

* DataTable
* PageHeader
* CrudDialog
* ConfirmDialog
* LoadingOverlay
* Form Controls
* Search Toolbar

These components are shared by every CRUD module.

---

# API Layer

A generic `BaseService` provides common CRUD operations.

Example:

```javascript
const categoryService = new BaseService('/categories');
```

Available methods:

* list()
* get(id)
* create(data)
* update(id, data)
* delete(id)

Every entity service extends or uses the same implementation.

---

# State Management

Server state is managed using **TanStack Query**.

Benefits include:

* Automatic caching
* Background refetching
* Query invalidation
* Optimistic updates
* Pagination support
* Retry mechanism

---

# Authentication

Authentication uses JWT issued by the Symfony backend.

Login Flow:

```text
Login
    ↓
POST /api/login_check
    ↓
Store JWT
    ↓
GET /api/profile
    ↓
Dashboard
```

Unauthorized requests automatically redirect users to the login page.

---

# Routing

Public Routes

```text
/login
```

Protected Routes

```text
/
/categories
/brands
/products
/orders
/customers
/settings
```

---

# Dashboard

The dashboard consumes the backend endpoint:

```http
GET /api/admin/dashboard
```

Displays:

* Products
* Categories
* Orders
* Customers
* Revenue

Future enhancements:

* Charts
* Recent Orders
* Top Selling Products
* Sales Reports

---

# CRUD Framework

Every module follows the same pattern.

```text
List
↓
Search
↓
Create
↓
Edit
↓
Delete
```

The CRUD framework is built using reusable components to minimize duplicate code.

---

# Validation

Forms use:

* React Hook Form
* Zod

Validation schemas are maintained per feature.

Example:

```text
features/categories/schemas/categorySchema.js
```

---

# Folder Conventions

Feature-specific code belongs inside the feature directory.

Shared code belongs inside the `shared` directory.

Business logic belongs inside services.

Network requests should never be made directly inside components.

---

# Environment Variables

Create a `.env` file:

```env
VITE_API_URL=/api
```

During development, Vite proxies API requests to the Symfony backend.

---

# Development

Install dependencies:

```bash
npm install
```

Start development server:

```bash
npm run dev
```

Build production assets:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

---

# Coding Guidelines

* Use functional components.
* Keep components small and reusable.
* Place feature-specific logic inside the corresponding feature module.
* Avoid duplicate code.
* Prefer composition over inheritance.
* Keep business logic inside services and hooks.
* Use shared components whenever possible.

---

# Roadmap

## Phase 1

* Authentication
* Responsive Layout
* Dashboard

## Phase 2

* Reusable CRUD Framework

## Phase 3

* Categories

## Phase 4

* Brands

## Phase 5

* Products

## Phase 6

* Product Images

## Phase 7

* Orders

## Phase 8

* Customers

## Phase 9

* Coupons

## Phase 10

* Reports

## Phase 11

* Settings

---

# License

This project is part of the Electro E-commerce Platform and is intended for internal development and administration purposes.
