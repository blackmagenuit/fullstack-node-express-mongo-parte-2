# Full Stack Project — Node.js, Express, MongoDB & React

![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb&logoColor=white)
![React](https://img.shields.io/badge/React-Vite-61DAFB?logo=react&logoColor=black)
![JWT](https://img.shields.io/badge/Auth-JWT-black?logo=jsonwebtokens&logoColor=white)
![Deploy](https://img.shields.io/badge/Deploy-Vercel-000000?logo=vercel&logoColor=white)

Proyecto full stack con Node.js, Express, MongoDB, React + Vite, autenticación JWT y consumo de WordPress Headless (API pública).

**🔗 Demo:** [Frontend](https://frontend-chi-nine-a199b69xho.vercel.app) · [Backend API](https://backend-six-eta-88.vercel.app/api/health)

## Índice

- [Estructura](#estructura)
- [Requisitos](#requisitos)
- [Variables de entorno](#variables-de-entorno)
- [Inicio rápido](#inicio-rápido)
- [Funcionalidad principal](#funcionalidad-principal)
- [Seguridad](#seguridad)
- [Despliegue](#despliegue)

## Estructura

- backend/: API REST con Express, Mongoose y autenticación JWT
- frontend/: aplicación React con Vite
- evidencias/: registro documental y capturas
- vercel.json: configuración base para despliegue

## Requisitos

- Node.js 18+
- npm 9+
- MongoDB local o URI remota accesible

## Variables de entorno

Copiar los ejemplos y completar valores reales antes de ejecutar:

- backend/.env.example -> backend/.env
- frontend/.env.example -> frontend/.env

Valores esperados:
- PORT
- JWT_SECRET
- MONGO_URI
- WP_API_URL
- CLIENT_URL
- VITE_API_URL
- VITE_WORDPRESS_URL

## Inicio rápido

1. Backend:
   - cd backend
   - copy .env.example .env (o renombrar en Windows)
   - npm install
   - npm run dev
2. Frontend:
   - cd frontend
   - copy .env.example .env
   - npm install
   - npm run dev
3. Validar:
   - Backend: http://localhost:5000/api/health
   - Frontend: http://localhost:5173

## Funcionalidad principal

- Registro y login con JWT
- Usuarios protegidos por middleware JWT
- Búsqueda por nombre o email
- Filtro por rol
- Paginación con metadatos
- WordPress public API consumption
- Build de producción con Vite

## Seguridad

- No subir .env ni tokens reales
- No incluir contraseñas ni secrets en el repositorio
- JWT se guarda en el cliente de forma local para pruebas de entorno
- HTML de WordPress se sanitiza antes de renderizar
- Evitar URLs localhost en producción

## Despliegue

Desplegado en Vercel como dos proyectos separados (backend y frontend), con MongoDB Atlas como base de datos:

- Backend: https://backend-six-eta-88.vercel.app
- Frontend: https://frontend-chi-nine-a199b69xho.vercel.app

Cada carpeta (`backend/`, `frontend/`) tiene su propio `vercel.json`. El `vercel.json` de la raíz queda como referencia de un enfoque alternativo (monorepo en un solo proyecto) que no se usó en esta entrega. Detalle completo de la configuración y evidencias en [evidencias/README.md](evidencias/README.md).
