# 🚀 Job Search & Discovery API

A robust, production-ready RESTful API for a job board platform. This service allows companies to register, manage job postings (with a credit system), and enables developers/clients to search and filter jobs using an optimized query engine.

### 🛠️ Tech Stack

<p align="left">
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" />
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" />
  <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" />
  <img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white" />
  <img src="https://img.shields.io/badge/Joi-Validation-blue?style=for-the-badge" />
</p>

---

### ✨ Key Features

- **Authentication System**: Secure JWT-based registration and login, with password hashing (bcrypt).
- **Atomic Operations**: Job creation and credit management are handled atomically to prevent race conditions.
- **Advanced Search Engine**:
  - Full-text search with customized weight scoring.
  - Multi-criteria filtering (location, industry, job type, etc.).
  - Sorting and pagination.
- **Robust Security**: Defends against NoSQL Injection (mongo-sanitize), mass-assignment attacks (Joi stripUnknown), and includes essential security headers (Helmet).
- **Smart Validation**: DRY validation schemas utilizing Joi's `.fork()` for scalable code.

---

### 📚 Project Documentation

For a deep dive into the **System Architecture**, **Request Lifecycle**, **Database ERD**, and **Key Design Decisions**, please check the full documentation:

👉 **[View Full Documentation (PDF)](./docs/Job-Search-API.pdf)**

---

### 🚀 Getting Started

**1. Clone the repository**
```bash
git clone https://github.com/your-username/job-search-api.git
cd job-search-api
