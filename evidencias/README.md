# Índice de evidencias

Este documento registra evidencia técnica verificada y deja claro qué elementos quedan pendientes de captura visual real.

| N.º | Archivo | Requisito demostrado | Procedimiento | Resultado | Estado | Fecha | Entorno |
|---|---|---|---|---|---|---|---|
| 1 | 01-login-exitoso.png | Login correcto | Ejecutar frontend y autenticarse | Pendiente de captura | INCOMPLETA | 2026-08-15 | Local |
| 2 | 02-login-invalido.png | Login inválido | Intentar credenciales incorrectas | Pendiente de captura | INCOMPLETA | 2026-08-15 | Local |
| 3 | 03-listado-usuarios.png | Listado de usuarios | Solicitar /api/users con token válido | Pendiente de captura | INCOMPLETA | 2026-08-15 | Local |
| 4 | 04-busqueda-nombre.png | Búsqueda por nombre | Filtrar usuarios por nombre | Pendiente de captura | INCOMPLETA | 2026-08-15 | Local |
| 5 | 05-busqueda-email.png | Búsqueda por email | Filtrar por email | Pendiente de captura | INCOMPLETA | 2026-08-15 | Local |
| 6 | 06-filtro-rol.png | Filtro por rol | Seleccionar rol | Pendiente de captura | INCOMPLETA | 2026-08-15 | Local |
| 7 | 07-busqueda-filtro-combinados.png | Combinación de búsqueda y rol | Aplicar ambos filtros | Pendiente de captura | INCOMPLETA | 2026-08-15 | Local |
| 8 | 08-paginacion-pagina-1.png | Primera página | page=1 | Pendiente de captura | INCOMPLETA | 2026-08-15 | Local |
| 9 | 09-paginacion-pagina-2.png | Página siguiente | page=2 | Pendiente de captura | INCOMPLETA | 2026-08-15 | Local |
| 10 | 10-cambio-limite.png | Cambio de límite | limit distinto | Pendiente de captura | INCOMPLETA | 2026-08-15 | Local |
| 11 | 11-sin-resultados.png | Sin resultados | Buscar valor inexistente | Pendiente de captura | INCOMPLETA | 2026-08-15 | Local |
| 12 | 12-token-faltante.png | Token faltante | Pedido sin JWT | Verificado por respuesta 401 | INCOMPLETA | 2026-08-15 | Local |
| 13 | 13-token-invalido.png | JWT inválido | Pedido con JWT incorrecto | Verificado por respuesta 401 | INCOMPLETA | 2026-08-15 | Local |
| 14 | 14-token-valido.png | Token válido | Pedido con JWT válido | Verificado por respuesta 200 | INCOMPLETA | 2026-08-15 | Local |
| 15 | 15-wordpress-posts.png | Publicaciones WordPress | Consultar la API pública | Verificado por respuesta de ejemplo | INCOMPLETA | 2026-08-15 | Local |
| 16 | 16-wordpress-error.png | Error WordPress | Simular servicio caído | Pendiente de captura | INCOMPLETA | 2026-08-15 | Local |
| 17 | 17-backend-ejecutandose.png | Backend en ejecución | Iniciar backend | Verificado por arranque local | INCOMPLETA | 2026-08-15 | Local |
| 18 | 18-frontend-ejecutandose.png | Frontend en ejecución | Iniciar frontend | Verificado por carga HTTP | INCOMPLETA | 2026-08-15 | Local |
| 19 | 19-build-produccion.png | Build de producción | Ejecutar build | Verificado por Vite | INCOMPLETA | 2026-08-15 | Local |
| 20 | 20-pruebas-automatizadas.png | Pruebas automatizadas | Ejecutar tests | Verificado por salida node test | INCOMPLETA | 2026-08-15 | Local |

## Estado de verificación técnica

- Backend: APROBADA por pruebas reales
- Frontend build: APROBADA por compilación exitosa
- WordPress: parcial / no concluyente para entorno real
- Evidencias visuales: INCOMPLETA porque faltan capturas reales

> No se declara la entrega como lista para subir, porque la evidencia visual y la validación real del CMS no están cerradas.
