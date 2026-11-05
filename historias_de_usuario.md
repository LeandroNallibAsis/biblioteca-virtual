# Historias de Usuario - Biblioteca Virtual

Este documento contiene el Product Backlog del proyecto **Biblioteca Virtual**, estructurado bajo el marco de trabajo **Scrum**, con sus respectivas épicas, historias de usuario (HU), criterios de aceptación, la **matriz de trazabilidad integral** y la **matriz de evidencias de pruebas** requerida por la cátedra para el cierre del Sprint 4.

---

## 📋 Matriz de Trazabilidad de Historias de Usuario (Product Backlog)

La siguiente tabla refleja la evolución progresiva del desarrollo y la trazabilidad integral de los incrementos:

| ID | Épica | Historia de Usuario | Sprint Asignado | Rama / Feature | Estado | Criterio de Aceptación Clave |
|---|---|---|---|---|---|---|
| **HU 1.1** | Épica 1 | Registrar nuevo libro | Sprint 2 | `main` (inicial) | ✅ Completada | Formulario funcional, ISBN único, validación de vacíos. |
| **HU 1.2** | Épica 1 | Ver catálogo de libros | Sprint 2 | `main` (inicial) | ✅ Completada | Tabla con listado dinámico desde SQLite. |
| **HU 1.3** | Épica 1 | Editar información de libro | Sprint 3 | `feature/editar-eliminar` | ✅ Completada | Modal/formulario de edición con actualización en base de datos. |
| **HU 1.4** | Épica 1 | Eliminar libro del catálogo | Sprint 4 (Refinada) | `feature/bloqueo-bajas-historial` | ✅ Completada | Bloqueo explícito si posee préstamos activos o historial devuelto (auditoría). |
| **HU 2.1** | Épica 2 | Registrar stock inicial | Sprint 3 | `feature/stock-busqueda` | ✅ Completada | Campos `stock_total` y `stock_disponible` consistentes. |
| **HU 2.2** | Épica 2 | Registrar préstamo | Sprint 4 | `feature/afianzar-transacciones-concurrencia` | ✅ Completada | Transacción atómica (`BEGIN IMMEDIATE`/`COMMIT`) que evita stock negativo. |
| **HU 2.3** | Épica 2 | Registrar devolución | Sprint 4 | `feature/afianzar-transacciones-concurrencia` | ✅ Completada | Transacción atómica que previene devoluciones duplicadas concurrentes. |
| **HU 2.4** | Épica 2 | Ver historial de préstamos | Sprint 4 | `feature/prestamos` | ✅ Completada | Listado de préstamos activos e históricos con estado. |
| **HU 3.1** | Épica 3 | Panel de Control (Dashboard) | Sprint 5 (Replanificada) | `feature/dashboard` | 🔄 Replanificada | Métricas clave. Replanificada formalmente a Sprint 5 para priorizar transacciones. |
| **HU 3.2** | Épica 3 | Búsqueda y filtrado de libros | Sprint 3 | `feature/stock-busqueda` | ✅ Completada | Filtrado reactivo en tiempo real por título o autor. |
| **HU 3.3** | Épica 3 | Gestión de Socios (CRUD) | Sprint 4 (Refinada) | `feature/bloqueo-bajas-historial` | ✅ Completada | ABM de socios; bloqueo explícito de baja ante préstamos activos o historial. |
| **HU 3.4** | Épica 3 | Alertas de préstamos vencidos | Sprint 4 | `feature/hu3.4-alertas-vencidos` | ✅ Completada | Resaltado visual en rojo para préstamos con más de 15 días (> 15 días). |
| **HU 3.5** | Épica 3 | Historial de movimientos por libro | Sprint 5 | `feature/hu3.5-historial-libro` | 🔮 Futura (Sprint 5) | Vista modal con el historial completo de préstamos de un libro. |
| **HU 4.1** | Épica 4 | Validaciones estrictas en Backend | Sprint 5 | `feature/hu4.1-validaciones-api` | 🔮 Futura (Sprint 5) | Validación estricta de tipos numéricos (no "2abc") y formatos unificados. |
| **HU 4.2** | Épica 4 | Integridad referencial en SQLite | Sprint 5 | `feature/hu4.2-foreign-keys` | 🔮 Futura (Sprint 5) | Manejo exhaustivo de operaciones que afecten registros relacionados. |
| **HU 5.1** | Épica 5 | Reporte de préstamos y morosidad | Sprint 5 | `feature/hu5.1-reportes` | 🔮 Futura (Sprint 5) | Exportación/resumen de socios con devoluciones pendientes. |
| **HU 6.1** | Épica 6 | Despliegue y entrega final | Sprint 6 | `develop` -> `main` (Release v1.0) | 🔮 Futura (Sprint 6) | Congelamiento de código, Wiki completa y defensa presencial. |

---

## 📖 Historias de Usuario Detalladas

### Épica 1: Gestión de Catálogo de Libros

#### HU 1.1: Registrar un nuevo libro
**Como** administrador de la biblioteca,  
**quiero** poder registrar un nuevo libro indicando título, autor, género e ISBN,  
**para** mantener el catálogo de la biblioteca actualizado.  
**Criterios de Aceptación:**
- El sistema debe tener un formulario de registro claro e intuitivo.
- Se debe validar que los campos obligatorios (título, autor, ISBN) no estén vacíos.
- El ISBN debe ser único en el sistema (validado a nivel frontend y backend).
- Al guardar, el libro debe persistir en la tabla `libros` de SQLite.

#### HU 1.2: Ver catálogo de libros
**Como** usuario/administrador,  
**quiero** poder visualizar la lista de todos los libros registrados,  
**para** saber qué libros están disponibles en la biblioteca.  
**Criterios de Aceptación:**
- Se debe mostrar una tabla/lista con título, autor, género, ISBN y stock.
- Debe mostrar el stock disponible en relación al stock total (ej: 4 / 5).
- Si no hay libros, se debe mostrar un mensaje amigable indicando la situación.

#### HU 1.3: Editar información de un libro
**Como** administrador de la biblioteca,  
**quiero** poder editar los detalles de un libro existente,  
**para** corregir errores en la carga o actualizar datos del ejemplar.  
**Criterios de Aceptación:**
- Se deben poder modificar título, autor, género, ISBN y stock total.
- No se puede reducir el stock total por debajo de la cantidad de ejemplares actualmente prestados.
- Los cambios se deben reflejar inmediatamente en la vista y en la base de datos.

#### HU 1.4: Eliminar un libro del catálogo (Refinada en Sprint 4)
**Como** administrador de la biblioteca,  
**quiero** poder eliminar un libro que no posea compromisos ni registros históricos vinculados,  
**para** mantener el catálogo depurado sin comprometer la auditoría ni la integridad de la base de datos.  
**Criterios de Aceptación:**
- Si el libro tiene ejemplares en préstamo activo, el sistema debe bloquear la eliminación con HTTP 400 y mensaje explicativo: *"No se puede eliminar el libro porque tiene ejemplares con préstamos activos en curso."*
- Si el libro tuvo préstamos que ya fueron devueltos (historial cerrado), el sistema debe bloquear la eliminación con HTTP 400 y mensaje claro de auditoría: *"No se puede eliminar el libro porque posee un historial de préstamos registrado en el sistema. El registro se conserva para fines de auditoría e integridad de datos."*
- Solo se permite la eliminación física si el libro no posee ningún registro en la tabla `prestamos`.
- Ante cualquier intento no autorizado, la base de datos no debe arrojar errores 500 no controlados.

---

### Épica 2: Control de Stock y Préstamos

#### HU 2.1: Registrar stock inicial de un libro
**Como** administrador,  
**quiero** poder indicar la cantidad de ejemplares físicos que poseo de un libro al darlo de alta,  
**para** tener un control riguroso de disponibilidad física.  
**Criterios de Aceptación:**
- Cada libro debe tener un campo `stock_total` y un campo `stock_disponible`.
- Al crear el libro, `stock_disponible` se inicializa con el mismo valor que `stock_total`.
- El valor debe ser un entero estrictamente mayor a 0.

#### HU 2.2: Registrar un préstamo de libro (Afianzada en Sprint 4)
**Como** administrador,  
**quiero** registrar a qué socio se le presta un libro bajo una transacción segura,  
**para** garantizar que no se presten ejemplares sin stock ni se generen inconsistencias bajo concurrencia.  
**Criterios de Aceptación:**
- Debe guardarse la fecha de préstamo, el ID del libro y el ID del socio.
- La operación debe ejecutarse dentro de una transacción atómica (`BEGIN IMMEDIATE` / `COMMIT` / `ROLLBACK`).
- El descuento de stock (`stock_disponible = stock_disponible - 1`) debe condicionarse a `stock_disponible > 0`.
- Si dos solicitudes simultáneas intentan prestar el último ejemplar, una se confirma y la otra se rechaza con HTTP 400, garantizando que el stock nunca sea negativo.
- Se debe verificar el resultado de cada sentencia y controlar errores en la confirmación (`COMMIT`).

#### HU 2.3: Registrar la devolución de un libro (Afianzada en Sprint 4)
**Como** administrador,  
**quiero** registrar cuando un socio devuelve un libro prestado bajo control transaccional,  
**para** actualizar el stock de forma atómica e impedir devoluciones duplicadas.  
**Criterios de Aceptación:**
- La operación debe ejecutarse bajo transacción atómica (`BEGIN IMMEDIATE` / `COMMIT` / `ROLLBACK`).
- La actualización del préstamo a estado "Devuelto" debe condicionarse a `estado = 'Activo'`.
- Si se reciben solicitudes simultáneas sobre el mismo préstamo, solo la primera actualiza el estado e incrementa el stock; las subsecuentes se rechazan con HTTP 400 sin duplicar stock.
- Se debe registrar automáticamente la fecha de devolución real (`CURRENT_DATE`).

#### HU 2.4: Ver historial de préstamos
**Como** administrador,  
**quiero** ver el historial general de préstamos realizados,  
**para** conocer los movimientos históricos y distinguir quiénes tienen préstamos vigentes.  
**Criterios de Aceptación:**
- La vista debe presentar fecha de préstamo, título del libro, nombre del socio y estado.
- Se debe indicar claramente qué préstamos continúan en estado "Activo" y cuáles fueron "Devueltos".
- El orden debe ser descendente, mostrando primero los préstamos más recientes.

---

### Épica 3: Funcionalidades Adicionales y Mejoras

#### HU 3.1: Panel de Control / Dashboard (Replanificada para Sprint 5)
**Como** administrador,  
**quiero** ver un panel de resumen en la pantalla principal con métricas clave,  
**para** tener una visión panorámica instantánea de la biblioteca al ingresar al sistema.  
> 📌 **Nota de Replanificación de Cátedra (05/11/2026):**  
> Conforme a las recomendaciones docentes para el cierre del Sprint 4, esta historia fue **reprogramada formalmente para el Sprint 5**, priorizando en el Sprint 4 la consolidación de la integridad transaccional, el control de concurrencia y las políticas de preservación de historial en las bajas.
**Criterios de Aceptación:**
- Tarjetas con indicadores: Total de libros registrados, Total de préstamos activos, Total de socios.
- Carga reactiva de los datos al ingresar al sistema.

#### HU 3.2: Búsqueda y filtrado de libros
**Como** usuario/administrador,  
**quiero** buscar libros por título o autor en tiempo real,  
**para** encontrar rápidamente un ejemplar en un catálogo extenso.  
**Criterios de Aceptación:**
- Barra de búsqueda sobre la tabla del catálogo.
- La tabla debe filtrar los resultados a medida que el usuario escribe (evento `keyup`/`input`).
- Si no hay coincidencias, mostrar mensaje "No hay libros que coincidan".

#### HU 3.3: Gestión de Socios (Refinada en Sprint 4)
**Como** administrador,  
**quiero** mantener un padrón de socios con control de bajas seguro,  
**para** centralizar la información de los lectores y proteger la integridad histórica de los préstamos.  
**Criterios de Aceptación:**
- ABM completo de socios (crear, listar, editar y eliminar).
- Si el socio tiene préstamos activos, la baja se bloquea con HTTP 400: *"No se puede eliminar el socio porque tiene préstamos activos en curso."*
- Si el socio posee préstamos históricos ya devueltos, la baja se bloquea con HTTP 400: *"No se puede eliminar el socio porque posee un historial de préstamos registrado en el sistema. El registro se conserva para fines de auditoría e integridad de datos."*
- Solo se permite la eliminación física si el socio no registra historial en la tabla `prestamos`.

#### HU 3.4: Alertas de Préstamos Vencidos (> 15 días)
**Como** administrador,  
**quiero** identificar visualmente aquellos préstamos activos que superen los 15 días de antigüedad,  
**para** gestionar el reclamo oportuno de los ejemplares adeudados.  
**Criterios de Aceptación:**
- En la tabla de préstamos, resaltar con fondo/etiqueta roja las filas cuya fecha de préstamo exceda estrictamente los 15 días respecto a la fecha actual y sigan en estado "Activo".
- Un préstamo con 15 días exactos se visualiza en estado normal/regular.
- Un préstamo con 16 días o más activa la alerta visual destacada en rojo.

#### HU 3.5: Historial de movimientos específico por libro (Sprint 5)
**Como** administrador,  
**quiero** seleccionar un libro puntual y visualizar el registro histórico de todas las veces que fue prestado,  
**para** evaluar la demanda del título y el desgaste de sus copias.  
**Criterios de Aceptación:**
- Botón "Historial" en cada fila del catálogo de libros.
- Ventana modal que liste: fecha de préstamo, fecha de devolución, nombre del lector y estado.

---

### Épica 4: Integridad de Datos y Validaciones de Seguridad (Sprint 5)

#### HU 4.1: Validaciones estrictas en la API Backend
**Como** evaluador/desarrollador,  
**quiero** que todas las solicitudes a la API REST sean validadas exhaustivamente del lado del servidor,  
**para** garantizar la consistencia de los datos ante peticiones directas maliciosas o erróneas.  
**Criterios de Aceptación:**
- Rechazar con HTTP 400 peticiones con tipos inconsistentes (ej. rechazar cadenas con caracteres alfanuméricos como `"2abc"` en campos numéricos).
- Unificar los criterios de validación entre formularios, API y especificación de historias de usuario.
- Rechazar valores negativos o vacíos.

#### HU 4.2: Integridad referencial y claves foráneas en SQLite
**Como** administrador de la base de datos,  
**quiero** que SQLite verifique estrictamente las restricciones de clave foránea (`FOREIGN KEY`),  
**para** evitar inconsistencias referenciales entre préstamos, libros y socios.  
**Criterios de Aceptación:**
- La conexión a la base de datos debe ejecutar `PRAGMA foreign_keys = ON;` al inicializarse.
- El script de carga inicial (`seed.js`) debe verificar y crear el esquema de tablas si no existen antes de poblar datos.
- Manejo explícito de excepciones referenciales impidiendo errores internos no controlados.

---

### Épica 5: Reportes y Experiencia de Usuario (Sprint 5)

#### HU 5.1: Reporte de préstamos vencidos y socios morosos
**Como** administrador,  
**quiero** una vista filtrada de socios con préstamos vencidos,  
**para** facilitar el seguimiento de ejemplares no devueltos en tiempo y forma.  
**Criterios de Aceptación:**
- Vista o pestaña con el listado de socios que registran préstamos con más de 15 días de atraso.
- Visualización de sus datos de contacto (teléfono y email).

---

### Épica 6: Cierre, Documentación y Defensa (Sprint 6)

#### HU 6.1: Congelamiento de versión final y Wiki institucional
**Como** evaluador docente,  
**quiero** disponer del repositorio consolidado con su rama `develop` integrada en `main`, Wiki con PMI completo y guía de instalación probada,  
**para** llevar a cabo la evaluación final y defensa oral del proyecto en condición de libre.  
**Criterios de Aceptación:**
- Repositorio limpio con ramas `main` y `develop` respetando GitFlow.
- Documentación completa en GitHub Wiki y enlaces directos.
- Ejecución local libre de fallas mediante `npm install`, `npm run seed` y `npm start`.

---

## 🧪 Matriz de Evidencias de Pruebas (Sprint 4 - Cierre Oficial)

En cumplimiento de los requerimientos de cierre solicitados por el equipo docente, se presenta la tabla de casos de prueba ejecutados y sus resultados verificados:

| ID Caso | Escenario de Prueba | Procedimiento / Entrada | Comportamiento Esperado | Resultado Obtenido | Estado | Evidencia Técnica |
|:---:|:---|:---|:---|:---|:---:|:---|
| **TC-01** | **Préstamo exitoso** | `POST /api/prestamos` con `libro_id: 5` y `socio_id: 1` con stock > 0. | El préstamo se crea en estado 'Activo' y el `stock_disponible` disminuye en 1 bajo transacción. | HTTP 200 `{ id: N, mensaje: 'Préstamo registrado exitosamente' }`. Stock pasa de 5 a 4. | ✅ **Superado** | [server.js](file:///D:/proyectos/proyectro%20escuela/src/server.js#L296) |
| **TC-02** | **Falta de stock** | `POST /api/prestamos` sobre libro con `stock_disponible = 0`. | Transacción abortada (Rollback), respuesta HTTP 400 y stock inmutable (no negativo). | HTTP 400 `{ error: 'No hay stock disponible para prestar este libro.' }`. Stock permanece en 0. | ✅ **Superado** | Test concurrencia en [server.js](file:///D:/proyectos/proyectro%20escuela/src/server.js#L324) |
| **TC-03** | **Devolución exitosa** | `PUT /api/prestamos/:id/devolucion` sobre préstamo activo. | Estado pasa a 'Devuelto', `fecha_devolucion = CURRENT_DATE` y stock aumenta en 1. | HTTP 200 `{ mensaje: 'Devolución registrada exitosamente' }`. Stock se restablece a su valor original. | ✅ **Superado** | [server.js](file:///D:/proyectos/proyectro%20escuela/src/server.js#L358) |
| **TC-04** | **Doble devolución simultánea** | Dos solicitudes `PUT` concurrentes sobre el mismo `prestamo_id`. | La primera solicitud actualiza el estado y suma stock; la segunda se rechaza sin duplicar stock. | Petición 1: HTTP 200. Petición 2: HTTP 400 `{ error: 'Este préstamo ya fue devuelto.' }`. Stock final consistente (+1 total). | ✅ **Superado** | Transacción condicionada con `runInTransaction` |
| **TC-05** | **Baja con préstamos activos** | `DELETE /api/libros/:id` o `/api/socios/:id` con préstamos activos en curso. | Bloqueo explícito de la operación, sin errores 500 de base de datos. | HTTP 400 `{ error: 'No se puede eliminar el libro/socio porque tiene préstamos activos en curso.' }`. | ✅ **Superado** | [server.js](file:///D:/proyectos/proyectro%20escuela/src/server.js#L140) |
| **TC-06** | **Baja con historial previo (devueltos)** | `DELETE /api/libros/:id` o `/api/socios/:id` que tuvieron préstamos ya devueltos. | Bloqueo explícito de eliminación para preservar trazabilidad, auditoría e integridad referencial. | HTTP 400 `{ error: 'No se puede eliminar el libro/socio porque posee un historial de préstamos registrado en el sistema. El registro se conserva para fines de auditoría e integridad de datos.' }`. | ✅ **Superado** | [server.js](file:///D:/proyectos/proyectro%20escuela/src/server.js#L146) |
| **TC-07** | **Alerta vencimiento: 15 días** | Préstamo activo con 15 días de antigüedad (`CURRENT_DATE - 15`). | Préstamo dentro del plazo reglamentario; visualización en formato estándar. | Fila renderizada con estilo estándar en tabla (no activa alerta roja). | ✅ **Superado** | Verificado en frontend [main.js](file:///D:/proyectos/proyectro%20escuela/src/public/js/main.js#L370) |
| **TC-08** | **Alerta vencimiento: 16 días o más** | Préstamo activo con 16 o más días de antigüedad (`CURRENT_DATE - 16`). | Préstamo fuera de término; alerta visual activada destacando la fila en color rojo. | Fila resaltada con fondo y borde rojo de advertencia (`#e74c3c`), indicando morosidad (HU 3.4). | ✅ **Superado** | Verificado en frontend [main.js](file:///D:/proyectos/proyectro%20escuela/src/public/js/main.js#L370) |
