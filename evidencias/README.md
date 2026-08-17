# Índice de evidencias

Este documento registra evidencia técnica verificada. Todas las capturas fueron tomadas contra la aplicación corriendo en local (backend en `http://localhost:5000`, frontend en `http://localhost:5173`) el 2026-08-16.

| N.º | Archivo | Requisito demostrado | Procedimiento | Resultado | Estado | Fecha | Entorno |
|---|---|---|---|---|---|---|---|
| 1 | 01-login-exitoso.jpg | Login correcto | Login con manu@test.com / 123456 | Sesión activa, token guardado, listado de usuarios cargado | COMPLETA | 2026-08-16 | Local |
| 2 | 02-login-invalido.jpg | Login inválido | Login con admin@demo.com (no registrado) | Mensaje "Login inválido" | COMPLETA | 2026-08-16 | Local |
| 3 | 03-listado-usuarios.jpg | Listado de usuarios | GET /api/users con token válido | Tabla con 7 usuarios | COMPLETA | 2026-08-16 | Local |
| 4 | 04-busqueda-nombre.jpg | Búsqueda por nombre | search=Bruno | 1 resultado (Bruno Lopez) | COMPLETA | 2026-08-16 | Local |
| 5 | 05-busqueda-email.jpg | Búsqueda por email | search=carla@test.com | 1 resultado (Carla Diaz) | COMPLETA | 2026-08-16 | Local |
| 6 | 06-filtro-rol.jpg | Filtro por rol | role=admin | 2 resultados (Franco, Manuel) | COMPLETA | 2026-08-16 | Local |
| 7 | 07-busqueda-filtro-combinados.jpg | Combinación de búsqueda y rol | search=Franco + role=admin | 1 resultado (Franco Suarez) | COMPLETA | 2026-08-16 | Local |
| 8 | 08-paginacion-pagina-1.jpg | Primera página | limit=5, page=1 | 5 usuarios, "Página 1/2 · Total 7" | COMPLETA | 2026-08-16 | Local |
| 9 | 09-paginacion-pagina-2.jpg | Página siguiente | Click en "Siguiente" | 2 usuarios restantes, "Página 2/2" | COMPLETA | 2026-08-16 | Local |
| 10 | 10-cambio-limite.jpg | Cambio de límite | limit 10 -> 5 | Recalcula totalPages (2) | COMPLETA | 2026-08-16 | Local |
| 11 | 11-sin-resultados.jpg | Sin resultados | search=zzzznoexiste | "No hay resultados", total 0 | COMPLETA | 2026-08-16 | Local |
| 12 | 12-token-faltante.jpg | Token faltante | GET /api/users sin header Authorization | HTTP 401 "Token faltante o inválido" | COMPLETA | 2026-08-16 | Local |
| 13 | 13-token-invalido.jpg | JWT inválido | GET /api/users con Bearer token_invalido_123 | HTTP 401 "Token inválido" | COMPLETA | 2026-08-16 | Local |
| 14 | 14-token-valido.jpg | Token válido | GET /api/users con JWT real | HTTP 200 con datos paginados | COMPLETA | 2026-08-16 | Local |
| 15 | 15-wordpress-posts.jpg | Publicaciones WordPress | WP_API_URL=https://wptavern.com (sitio WordPress público real) | 10 posts reales listados en el panel | COMPLETA | 2026-08-16 | Local (fuente WP externa real) |
| 16 | 16-wordpress-error.jpg | Error WordPress | WP_API_URL apuntando a dominio inexistente | HTTP 502 "No se pudieron cargar las publicaciones de WordPress" (ENOTFOUND) | COMPLETA | 2026-08-16 | Local |
| 17 | 17-backend-ejecutandose.jpg | Backend en ejecución | GET /api/health | `{"status":"ok"}` | COMPLETA | 2026-08-16 | Local |
| 18 | 18-frontend-ejecutandose.jpg | Frontend en ejecución | Carga de http://localhost:5173 | UI renderizada correctamente | COMPLETA | 2026-08-16 | Local |
| 19 | 19-build-produccion.jpg | Build de producción | `npm run build` + `vite preview` | Build exitoso (dist/), UI funcional servida desde el build | COMPLETA | 2026-08-16 | Local |
| 20 | 20-pruebas-automatizadas.jpg | Pruebas automatizadas | `npm test` (backend, `node --test`) | 4/4 tests pasan (registro/login, filtros+paginación, 401 sin token, 401 token inválido) | PENDIENTE DE CAPTURA | 2026-08-16 | Local |

## Estado de verificación técnica

- Backend: APROBADA por pruebas reales (curl + `node --test`, 4/4 tests OK)
- Frontend: APROBADA — build de producción funcional y validado en navegador
- Búsqueda, filtros y paginación: APROBADA, validada end-to-end en backend y frontend
- Autenticación JWT: APROBADA (token faltante/inválido/válido verificados con HTTP 401/401/200 reales)
- WordPress headless: APROBADA — se verificó tanto el caso de éxito (posts reales de un sitio WordPress público) como el caso de error (dominio inexistente, HTTP 502)

## Pendiente

- **Item 20**: la captura de la salida de `npm test` debe tomarse manualmente desde la terminal (fuera del alcance de la automatización de navegador usada para el resto de las evidencias). Comando a ejecutar desde `backend/`:
  ```
  npm test
  ```
  Se espera ver: `tests 4`, `pass 4`, `fail 0`.
- **Despliegue en Vercel**: no realizado en esta sesión. Backend y frontend fueron validados solo en entorno local.
- Antes de subir el proyecto, restaurar `WP_API_URL` a un valor real propio si se cuenta con un WordPress headless propio (actualmente apunta a un sitio WordPress público de terceros solo a fines de demostración).

> Entrega lista en cuanto a funcionalidad y evidencia visual local. Falta la captura manual del ítem 20 y el despliegue en Vercel para considerar el proyecto completamente cerrado.
