# Task Manager - Test de Recrutement

Application web fullstack de gestion de tâches ("Task Manager") développée dans le cadre d'un test technique.

## 🚀 Stack Technique
* **Frontend Web** : React, Vite, TypeScript (TSX), Tailwind CSS
* **Backend API** : Java Spring Boot, Spring Data JPA, Spring Security (JWT), MySQL
* **Conteneurisation** : Docker & Docker Compose
* **CI/CD** : GitHub Actions

---

## 📂 Architecture du Projet
```text
task-manager-monorepo/
├── backend/          # API REST Spring Boot (Java 21)
├── frontend/         # Interface utilisateur React + Vite
└── docker-compose.yml # Orchestration locale (MySQL + Services)

🛠️ Instructions d'installation et d'exécution (Local)
1. Prérequis
Java JDK 21

Node.js (v18+)

Docker & Docker Compose

2. Lancer la base de données (MySQL)

À la racine du projet, lance le conteneur MySQL via Docker Compose :

docker-compose up -d

3. Lancer le Backend (Spring Boot)Va dans le dossier backend et lance l'application :Bashcd backend

mvn spring-boot:run

L'API démarre sur le port 8080.4. Lancer le Frontend (React)Dans un autre terminal, va dans le dossier frontend :Bashcd frontend

npm install

npm run dev

L'application web s'ouvre sur http://localhost:5173.

📌 Endpoints de l'API (Backend)
POST /api/auth/register : Inscription d'un utilisateur  
 POST /api/auth/login : Connexion et génération du token JWT[cite: 2]
GET /api/tasks : Liste des tâches de l'utilisateur connecté[cite: 2]
POST /api/tasks : Création d'une nouvelle tâche[cite: 2]
PUT /api/tasks/{id} : Modification d'une tâche[cite: 2]
DELETE /api/tasks/{id} : Suppression d'une tâche[cite: 2]
 
 lien deploiyer sur vercel frontend 
 https://task-manager-frontend-eight-psi-78.vercel.app/
 