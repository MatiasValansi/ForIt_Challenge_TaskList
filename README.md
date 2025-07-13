
# 📝 TaskList - Proyecto para ForIT


Es una aplicación fullstack para gestionar tareas. Podés crear, ver, editar y eliminar tareas usando una API en Express conectada a Supabase, y un frontend moderno hecho en React con diseño oscuro y Bootstrap.

---
## 🚀 Ejecutar el proyecto

### 1° ejecutar BackEnd

```bash
cd backEnd
npm install
cp .env.example .env
npm run app
```

La API correrá en: `http://localhost:3004/api/tasks`

### 2° ejecutar FrontEnd

```bash
cd frontEnd
npm install
cp .env.example .env
npm run dev
```

La app React se abrirá automáticamente en tu navegador en `http://localhost:5173`.

---

---
# Información acerca del Proyecto y las herramientas utilizadas

## ⚙️ Herramientas utilizadas

### 🔙 BackEnd
- **Node.js** + **Express**
- **Supabase** como base de datos
- **ESLint** (configuración recomendada)
- **Jest** + **Supertest** para pruebas unitarias
- **Biome** como formateador de código
- **Dotenv** para variables de entorno
- **CORS**

### 🔜 FrontEnd
- **React 19**
- **React Router DOM 7**
- **Bootstrap 5** para el diseño
- **ESLint**
- **Biome**
- **Vite** para el entorno de desarrollo

---

## 🧪 Instrucciones para ejecutar localmente

### ✅ Requisitos previos
- Tener instalado **Node.js** y **npm**

---

## 🔧 En caso de no correr en la la maquina virtual de GitHub, Clonar el proyecto

```bash
git clone https://github.com/tuusuario/ForIT-TaskList.git
cd ForIT-TaskList
```

---

## 📁 Variables de entorno

### 📦 BackEnd

Renombrá el .env.example en .env para poder correr el proyecto npm run app:

`env.example .env` 


### 🌐 FrontEnd

Renombrá el .env.example en .env para poder correr el proyecto npm run dev:

`env.example .env` 


---

## 🧪 Pruebas unitarias

En el backend podés correr pruebas unitarias con:

```bash
npm run test
```

Se utilizan Jest y Supertest para testear la API.

---

## 🧹 Linting y formato

### BackEnd

```bash
npm run lint
npm run biome
```

### FrontEnd

```bash
npm run lint
npm run format
```

---

## 👨‍💻 Comentarios finales

- Se respetaron todos los requisitos obligatorios del PDF.
- Se agregaron funcionalidades extra como diseño con Bootstrap, pruebas unitarias y conexión a Supabase.
- El proyecto es fácilmente extensible y está organizado en capas (`controller`, `service`, `repository`, etc.).
