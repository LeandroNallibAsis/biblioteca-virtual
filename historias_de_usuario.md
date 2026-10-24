# Historias de Usuario - Biblioteca Virtual

Este documento contiene el Product Backlog del proyecto **Biblioteca Virtual**, estructurado bajo el marco de trabajo **Scrum**, con sus respectivas épicas, historias de usuario (HU), criterios de aceptación y la **matriz de trazabilidad a futuro** que vincula cada historia con sus Sprints, ramas de Git y entregables.

---

## 📋 Matriz de Trazabilidad de Historias de Usuario (Product Backlog)

La siguiente tabla refleja la evolución progresiva del desarrollo y la trazabilidad integral de los incrementos:

| ID | Épica | Historia de Usuario | Sprint Asignado | Rama / Feature | Estado | Criterio de Aceptación Clave |
|---|---|---|---|---|---|---|
| **HU 1.1** | Épica 1 | Registrar nuevo libro | Sprint 2 | `main` (inicial) | ✅ Completada | Formulario funcional, ISBN único, validación de vacíos. |
| **HU 1.2** | Épica 1 | Ver catálogo de libros | Sprint 2 | `main` (inicial) | ✅ Completada | Tabla con listado dinámico desde SQLite. |
| **HU 1.3** | Épica 1 | Editar información de libro | Sprint 3 | `feature/editar-eliminar` | ✅ Completada | Modal/formulario de edición con actualización en base de datos. |
| **HU 1.4** | Épica 1 | Eliminar libro del catálogo | Sprint 3 | `feature/editar-eliminar` | ✅ Completada | Bloqueo si posee ejemplares prestados actualmente. |
| **HU 2.1** | Épica 2 | Registrar stock inicial | Sprint 3 | `feature/stock-busqueda` | ✅ Completada | Campos `stock_total` y `stock_disponible` consistentes. |
| **HU 2.2** | Épica 2 | Registrar préstamo | Sprint 4 | `feature/prestamos` | ✅ Completada | Descuenta 1 al stock disponible bajo transacción segura. |
| **HU 2.3** | Épica 2 | Registrar devolución | Sprint 4 | `feature/prestamos` | ✅ Completada | Incrementa 1 al stock disponible y registra fecha de devolución. |
| **HU 2.4** | Épica 2 | Ver historial de préstamos | Sprint 4 | `feature/prestamos` | ✅ Completada | Listado de préstamos activos e históricos con estado. |
| **HU 3.1** | Épica 3 | Panel de Control (Dashboard) | Sprint 4 | `feature/dashboard` | ⏳ Planificada | Tarjetas de métricas: total libros, préstamos activos, socios. |
| **HU 3.2** | Épica 3 | Búsqueda y filtrado de libros | Sprint 3 | `feature/stock-busqueda` | ✅ Completada | Filtrado reactivo en tiempo real por título o autor. |
| **HU 3.3** | Épica 3 | Gestión de Socios (CRUD) | Sprint 4 | `feature/crud-socios` | ✅ Completada | ABM de socios; validación que impide borrar si tiene préstamos. |
| **HU 3.4** | Épica 3 | Alertas de préstamos vencidos | Sprint 4 | `feature/hu3.4-alertas-vencidos` | ✅ Completada | Resaltado visual en rojo para préstamos con más de 15 días. |
| **HU 3.5** | Épica 3 | Historial de movimientos por libro | Sprint 5 | `feature/hu3.5-historial-libro` | 🔮 Futura (Sprint 5) | Vista modal con el historial completo de préstamos de un libro. |
| **HU 4.1** | Épica 4 | Validaciones estrictas en Backend | Sprint 5 | `feature/hu4.1-validaciones-api` | 🔮 Futura (Sprint 5) | Rechazo HTTP 400 ante títulos vacíos, stock negativo o socios inválidos. |
| **HU 4.2** | Épica 4 | Integridad referencial en SQLite | Sprint 5 | `feature/hu4.2-foreign-keys` | 🔮 Futura (Sprint 5) | Activación forzosa de claves foráneas (`PRAGMA foreign_keys = ON`). |
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

#### HU 1.4: Eliminar un libro del catálogo
**Como** administrador de la biblioteca,  
**quiero** poder eliminar un libro,  
**para** remover ejemplares que ya no pertenecen a la biblioteca.  
**Criterios de Aceptación:**
- Solo se puede eliminar si el libro no tiene ningún ejemplar prestado en estado "Activo".
- Si tiene préstamos activos, el sistema debe denegar la operación con un mensaje explicativo.
- Si no tiene préstamos activos, se remueve el registro tras confirmación del usuario.

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

#### HU 2.2: Registrar un préstamo de libro
**Como** administrador,  
**quiero** poder registrar a qué socio se le presta un libro,  
**para** saber exactamente quién tiene cada ejemplar y evitar pérdidas.  
**Criterios de Aceptación:**
- Debe guardarse la fecha de préstamo, el ID del libro y el ID del socio.
- La operación debe ejecutarse dentro de una transacción en la base de datos (`BEGIN TRANSACTION`).
- El `stock_disponible` del libro debe disminuir en 1 unidad.
- El sistema debe impedir el préstamo si el `stock_disponible` es 0 o si el socio no existe.

#### HU 2.3: Registrar la devolución de un libro
**Como** administrador,  
**quiero** registrar cuando un socio devuelve un libro prestado,  
**para** actualizar el stock y habilitar el ejemplar para nuevos lectores.  
**Criterios de Aceptación:**
- El sistema debe cambiar el estado del préstamo de "Activo" a "Devuelto".
- El `stock_disponible` del libro debe aumentar en 1 unidad.
- Se debe registrar automáticamente la fecha de devolución real (`CURRENT_DATE`).
- Se debe impedir marcar como devuelto un préstamo que ya se encuentra devuelto.

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

#### HU 3.1: Panel de Control (Dashboard)
**Como** administrador,  
**quiero** ver un panel de resumen en la pantalla principal con métricas clave,  
**para** tener una visión panorámica instantánea de la biblioteca al ingresar al sistema.  
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

#### HU 3.3: Gestión de Socios (Lectores)
**Como** administrador,  
**quiero** mantener un padrón de socios (nombre, teléfono, correo electrónico),  
**para** centralizar la información de los lectores y seleccionarlos fácilmente al registrar préstamos.  
**Criterios de Aceptación:**
- ABM completo de socios (crear, listar, editar y eliminar).
- Validación de préstamos activos: no permitir eliminar un socio si tiene libros pendientes de devolución.
- Al registrar un préstamo, los socios deben cargarse dinámicamente en una lista desplegable (`<select>`).

#### HU 3.4: Alertas de Préstamos Vencidos
**Como** administrador,  
**quiero** identificar visualmente aquellos préstamos activos que superen los 15 días de antigüedad,  
**para** gestionar el reclamo oportuno de los ejemplares adeudados.  
**Criterios de Aceptación:**
- En la tabla de préstamos, resaltar con fondo/etiqueta roja las filas cuya fecha de préstamo exceda 15 días respecto a la fecha actual y sigan en estado "Activo".
- Mostrar la leyenda "Vencido" o badge de alerta.

#### HU 3.5: Historial de movimientos específico por libro (A Futuro - Sprint 5)
**Como** administrador,  
**quiero** seleccionar un libro puntual y visualizar el registro histórico de todas las veces que fue prestado,  
**para** evaluar la demanda del título y el desgaste de sus copias.  
**Criterios de Aceptación:**
- Botón "Historial" en cada fila del catálogo de libros.
- Ventana modal que liste: fecha de préstamo, fecha de devolución, nombre del lector y estado.

---

### Épica 4: Integridad de Datos y Validaciones de Seguridad (A Futuro - Sprint 5)

#### HU 4.1: Validaciones estrictas en la API Backend
**Como** evaluador/desarrollador,  
**quiero** que todas las solicitudes a la API REST sean validadas exhaustivamente del lado del servidor,  
**para** garantizar la consistencia de los datos ante peticiones directas maliciosas o erróneas.  
**Criterios de Aceptación:**
- Rechazar con HTTP 400 peticiones de creación o edición de libros con campos vacíos o cadenas de solo espacios.
- Rechazar con HTTP 400 valores de stock menores a 0.
- Rechazar con HTTP 400 intentos de préstamo a socios inexistentes o de libros sin stock disponible antes de iniciar la transacción.

#### HU 4.2: Integridad referencial y claves foráneas en SQLite
**Como** administrador de la base de datos,  
**quiero** que SQLite verifique estrictamente las restricciones de clave foránea (`FOREIGN KEY`),  
**para** evitar inconsistencias referenciales entre préstamos, libros y socios.  
**Criterios de Aceptación:**
- La conexión a la base de datos debe ejecutar `PRAGMA foreign_keys = ON;` al inicializarse.
- El script de carga inicial (`seed.js`) debe verificar y crear el esquema de tablas si no existen antes de poblar datos.

---

### Épica 5: Reportes y Experiencia de Usuario (A Futuro - Sprint 5)

#### HU 5.1: Reporte y filtrado de socios morosos
**Como** administrador,  
**quiero** una vista filtrada de socios con préstamos vencidos,  
**para** facilitar el seguimiento de ejemplares no devueltos en tiempo y forma.  
**Criterios de Aceptación:**
- Vista o pestaña con el listado de socios que registran préstamos con más de 15 días de atraso.
- Visualización de sus datos de contacto (teléfono y email).

---

### Épica 6: Cierre, Documentación y Defensa (A Futuro - Sprint 6)

#### HU 6.1: Congelamiento de versión final y Wiki institucional
**Como** evaluador docente,  
**quiero** disponer del repositorio consolidado con su rama `develop` integrada en `main`, Wiki con PMI completo y guía de instalación probada,  
**para** llevar a cabo la evaluación final y defensa oral del proyecto en condición de libre.  
**Criterios de Aceptación:**
- Repositorio limpio con ramas `main` y `develop` respetando GitFlow.
- Documentación completa en GitHub Wiki y enlaces directos.
- Ejecución local libre de fallas mediante `npm install`, `npm run seed` y `npm start`.
