# Full Stack Project

Proyecto full stack con Node.js, Express, MongoDB, React + Vite, autenticación JWT y WordPress Headless.

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

La configuración base en [vercel.json](vercel.json) es un punto de partida para platform deployment. Antes de desplegar, revisar variables de entorno y compatibilidad final con el entorno real.
