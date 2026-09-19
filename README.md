# Task Manager

Full-stack task management application developed as part of a technical recruitment assessment.

## Backend

The backend is built with:

- Java 21
- Spring Boot
- Spring Security
- Spring Data JPA
- MySQL
- JWT Authentication
- Maven

## Current Features

- User entity
- Task entity
- User/Task relationship
- MySQL database integration
- User registration
- User login
- Password hashing with BCrypt
- JWT authentication

## Database Design

The application uses two main entities:

### User

- id
- name
- email
- password
- createdAt
- updatedAt

### Task

- id
- title
- description
- status
- createdAt
- updatedAt
- user_id

A user can own multiple tasks, while each task belongs to exactly one user.

## Authentication

Authentication is stateless and uses JSON Web Tokens (JWT).

Passwords are never stored in plain text. BCrypt is used to hash user passwords before persistence.

## API Endpoints

### Authentication

```http
POST /api/auth/register
POST /api/auth/login
GET /api/tasks
POST /api/tasks
PUT /api/tasks/{id}
DELETE /api/tasks/{id}

```md
- Secure task CRUD
- Task ownership protection
- Task filtering by status
- Task search# task-manager-monorepo
