# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
# task-manager-frontend
# 🚀 Task Manager - Test de Recrutement Fullstack

Application web de gestion de tâches complète développée dans le cadre d'un test technique. Le projet comprend un backend robuste en Java Spring Boot, une interface moderne en React avec Tailwind CSS, et gère l'authentification sécurisée par JWT.

---

## 🛠️ Stack Technique

* **Frontend** : React, Vite, Tailwind CSS, Axios
* **Backend** : Java Spring Boot, Spring Data JPA, Spring Security (JWT)
* **Base de données** : MySQL
* **DevOps (En cours / Bonus)** : Docker, GitHub Actions, Google Cloud Platform (GCP)

---

## 📋 Fonctionnalités

* **Authentification sécurisée** : Inscription et Connexion avec génération de jeton JWT.
* **Gestion des tâches (CRUD)** : Ajout, modification, suppression et affichage dynamique des tâches.
* **Statuts de tâches** : Gestion des états (`TODO`, `IN_PROGRESS`, `DONE`).
* **Interface responsive** : Design épuré en mode dark blue avec option d'affichage/masquage du mot de passe.
