# Historias de Usuario - Biblioteca Virtual

Este documento contiene el Product Backlog del proyecto **Biblioteca Virtual**, estructurado bajo el marco de trabajo **Scrum**, con sus respectivas épicas, historias de usuario (HU), criterios de aceptación, la **matriz de trazabilidad integral** y las **matrices de evidencias de pruebas** requeridas por la cátedra para el cierre de los Sprints 4, 5 y 6.

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
| **HU 3.1** | Épica 3 | Panel de Control (Dashboard) | Sprint 5 | `feature/dashboard` | ✅ Completada | Métricas en tiempo real (libros, socios, préstamos activos/vencidos y stock). |
| **HU 3.2** | Épica 3 | Búsqueda y filtrado de libros | Sprint 3 | `feature/stock-busqueda` | ✅ Completada | Filtrado reactivo en tiempo real por título o autor. |
| **HU 3.3** | Épica 3 | Gestión de Socios (CRUD) | Sprint 4 (Refinada) | `feature/bloqueo-bajas-historial` | ✅ Completada | ABM de socios; bloqueo explícito de baja ante préstamos activos o historial. |
| **HU 3.4** | Épica 3 | Alertas de préstamos vencidos | Sprint 4 | `feature/hu3.4-alertas-vencidos` | ✅ Completada | Resaltado visual en rojo para préstamos con más de 15 días (> 15 días). |
| **HU 3.5** | Épica 3 | Historial de movimientos y Kardex | Sprint 5 | `feature/kardex-movimientos-trazabilidad` | ✅ Completada | Kardex / Ledger de stock con cálculo dinámico (+/-) y trazabilidad bidireccional libro-socio. |
| **HU 4.1** | Épica 4 | Validaciones estrictas en Backend | Sprint 5 | `feature/kardex-movimientos-trazabilidad` | ✅ Completada | Validación estricta que rechaza "2abc" en stock y tipos no enteros con HTTP 400. |
| **HU 4.2** | Épica 4 | Integridad referencial en SQLite | Sprint 5 | `feature/kardex-movimientos-trazabilidad` | ✅ Completada | Claves foráneas activas y tabla `movimientos_stock` vinculada a libros, socios y préstamos. |
| **HU 5.1** | Épica 5 | Reporte de morosidad y vencidos | Sprint 5 | `feature/kardex-movimientos-trazabilidad` | ✅ Completada | Vista de socios morosos (> 15 días) con datos de contacto, días de atraso e impresión. |
| **HU 6.1** | Épica 6 | Despliegue y entrega final | Sprint 6 | `develop` -> `main` (Release v1.0) | ✅ Completada | Congelamiento de código en `main`, Wiki completa y preparado para defensa presencial. |

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

#### HU 3.1: Panel de Control / Dashboard (Sprint 5)
**Como** administrador,  
**quiero** ver un panel de resumen en la pantalla principal con métricas clave y accesos directos,  
**para** tener una visión panorámica instantánea de la biblioteca al ingresar al sistema.  
**Criterios de Aceptación:**
- [x] Tarjetas con indicadores métricos en tiempo real: Total de libros registrados, Total de socios, Préstamos activos, Préstamos vencidos (> 15 días) e Inventario físico (disponible vs. total).
- [x] Carga reactiva e inmediata de los datos al iniciar la aplicación en el navegador.
- [x] Botones de accesos rápidos para navegar hacia Catálogo, Socios, Préstamos, Registro de nuevo préstamo y Reporte de morosos.
- [x] Endpoint dedicado en backend (`GET /api/dashboard`) con cálculo optimizado en SQLite.

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

#### HU 3.5: Historial de Movimientos, Kardex y Trazabilidad (Sprint 5)
**Como** administrador y docente evaluador,  
**quiero** un sistema de movimientos inmutables (Kardex / Event Sourcing de stock) que registre cada entrada y salida (+ingreso inicial, -préstamo, +devolución, -baja por daño) y permita auditar la trazabilidad de libros y lectores,  
**para** calcular el stock dinámicamente en base a los movimientos y saber exactamente qué socio solicitó cada ejemplar a lo largo del tiempo.  
**Criterios de Aceptación:**
- [x] Tabla `movimientos_stock` en base de datos que registra cada variación con fecha, tipo, cantidad (+/-), socio vinculado y motivo.
- [x] Botón **"📜 Kardex"** en cada libro del catálogo que abre una ventana modal con el libro mayor de movimientos y el balance calculado de stock (`SUM(cantidad)`).
- [x] Botón **"⚠️ Daño"** en cada libro para asentar formalmente pérdidas o roturas físicas (-1 unidad) en el Kardex.
- [x] Botón **"👤 Historial"** en cada socio del padrón para conocer la ficha de trazabilidad del lector (todos los libros pedidos en su historia, fechas y estados).

---

### Épica 4: Integridad de Datos y Validaciones de Seguridad (Sprint 5)

#### HU 4.1: Validaciones estrictas en la API Backend
**Como** evaluador/desarrollador,  
**quiero** que todas las solicitudes a la API REST sean validadas exhaustivamente del lado del servidor rechazando tipos inconsistentes,  
**para** garantizar la consistencia de los datos ante peticiones directas maliciosas o erróneas.  
**Criterios de Aceptación:**
- [x] Rechazar con HTTP 400 cadenas con caracteres alfanuméricos como `"2abc"` en campos numéricos de stock.
- [x] Unificar los criterios de validación estricta mediante expresiones regulares (`/^\d+$/`) para enteros no negativos.
- [x] Rechazar identificadores de parámetros no numéricos en URLs.

#### HU 4.2: Integridad referencial y claves foráneas en SQLite
**Como** administrador de la base de datos,  
**quiero** que SQLite verifique estrictamente las restricciones de clave foránea (`FOREIGN KEY`),  
**para** evitar inconsistencias referenciales entre préstamos, libros, socios y movimientos de stock.  
**Criterios de Aceptación:**
- [x] La conexión a la base de datos ejecuta `PRAGMA foreign_keys = ON;` al inicializarse.
- [x] El script de carga inicial (`seed.js`) verifica y crea el esquema completo antes de poblar datos.
- [x] La tabla `movimientos_stock` vincula claves foráneas hacia `libros`, `socios` y `prestamos`.

---

### Épica 5: Reportes y Experiencia de Usuario (Sprint 5)

#### HU 5.1: Reporte de préstamos vencidos y socios morosos
**Como** administrador de la biblioteca,  
**quiero** una pantalla de reporte dedicada que liste todos los préstamos vencidos con más de 15 días,  
**para** facilitar la gestión de cobranza y reclamo de ejemplares a lectores con morosidad.  
**Criterios de Aceptación:**
- [x] Pestaña de navegación **"Reportes"** en la barra superior.
- [x] Listado tabular que muestra: nombre del socio, datos de contacto (teléfono y email), libro adeudado, fecha de retiro y días de atraso.
- [x] Botón para registrar devolución rápida y botón para imprimir o exportar el reporte.

---

### Épica 6: Cierre, Documentación y Defensa (Sprint 6)

#### HU 6.1: Congelamiento de versión final y Wiki institucional
**Como** evaluador docente y estudiante,  
**quiero** disponer del repositorio consolidado con su rama `develop` integrada en `main` (Release v1.0.0), Wiki con PMI completo y guía de instalación probada,  
**para** llevar a cabo la evaluación final y defensa oral del proyecto en condición de libre.  
**Criterios de Aceptación:**
- [x] Repositorio limpio con rama `develop` mergeada en `main` bajo GitFlow.
- [x] Tag de versión `v1.0.0` generado para la entrega final.
- [x] Documentación completa en `PMI.md`, `historias_de_usuario.md` y `README.md`.
- [x] Ejecución local libre de fallas mediante `npm install`, `npm run seed` y `npm start`.

---

## 🧪 Matrices de Evidencias de Pruebas

### Sprint 4: Evidencias de Cierre
| ID Caso | Escenario de Prueba | Procedimiento / Entrada | Comportamiento Esperado | Resultado Obtenido | Estado |
|:---:|:---|:---|:---|:---|:---:|
| **TC-01** | Préstamo exitoso | `POST /api/prestamos` con stock > 0. | Préstamo 'Activo' y stock disminuye en 1. | HTTP 200 `{ mensaje: 'Préstamo registrado exitosamente' }`. | ✅ Superado |
| **TC-02** | Falta de stock | `POST /api/prestamos` sobre libro con stock = 0. | Rollback, HTTP 400 y stock no negativo. | HTTP 400 `{ error: 'No hay stock disponible...' }`. | ✅ Superado |
| **TC-03** | Devolución exitosa | `PUT /api/prestamos/:id/devolucion`. | Estado 'Devuelto', fecha actual y stock aumenta 1. | HTTP 200 `{ mensaje: 'Devolución registrada exitosamente' }`. | ✅ Superado |
| **TC-04** | Doble devolución simultánea | 2 peticiones concurrentes sobre mismo préstamo. | Primera confirma (+1 stock); segunda se rechaza sin duplicar stock. | Petición 1: HTTP 200. Petición 2: HTTP 400. Stock final consistente (+1 total). | ✅ Superado |
| **TC-05** | Baja con préstamos activos | `DELETE /api/libros/:id` o `/api/socios/:id` con préstamos activos. | Bloqueo explícito de la operación. | HTTP 400 `{ error: 'No se puede eliminar... préstamos activos...' }`. | ✅ Superado |
| **TC-06** | Baja con historial previo | `DELETE /api/libros/:id` o `/api/socios/:id` con préstamos devueltos. | Bloqueo explícito para preservar auditoría de claves foráneas. | HTTP 400 `{ error: 'No se puede eliminar... historial de préstamos...' }`. | ✅ Superado |
| **TC-07** | Alerta vencimiento: 15 días | Préstamo activo con 15 días de antigüedad. | Plazo regular; formato estándar. | Fila en estilo estándar en tabla. | ✅ Superado |
| **TC-08** | Alerta vencimiento: 16+ días | Préstamo activo con 16 o más días de antigüedad. | Alerta visual en color rojo. | Fila resaltada con fondo y borde rojo (`#e74c3c`). | ✅ Superado |

### Sprint 5 y 6: Evidencias de Incremento Técnico y Reportes
| ID Caso | Escenario de Prueba | Procedimiento / Entrada | Comportamiento Esperado | Resultado Obtenido | Estado |
|:---:|:---|:---|:---|:---|:---:|
| **TC-09** | Validación estricta '2abc' | `POST /api/libros` con `stock: "2abc"`. | Servidor rechaza con HTTP 400 sin convertir a 2. | HTTP 400 `{ error: 'El stock debe ser un número entero... No se admiten caracteres alfanuméricos ni decimales.' }`. | ✅ Superado |
| **TC-10** | Alta en Kardex de stock | `POST /api/libros` con `stock: "8"`. | Se crea libro y se asienta fila `INGRESO_INICIAL` (+8) en `movimientos_stock`. | HTTP 200 `{ mensaje: 'Libro agregado y registrado en Kardex con éxito' }`. | ✅ Superado |
| **TC-11** | Kardex por libro (HU 3.5) | `GET /api/libros/:id/movimientos`. | Retorna auditoría completa de movimientos y balance calculado. | HTTP 200 con historial de ingresos, préstamos, devoluciones y stock acumulado. | ✅ Superado |
| **TC-12** | Baja por daño / pérdida | `POST /api/libros/:id/baja-danio`. | Descuenta 1 unidad de stock y registra `BAJA_POR_DANIO` (-1) en Kardex. | HTTP 200 `{ mensaje: 'Baja por daño/pérdida registrada en Kardex correctamente (-1 ejemplar).' }`. | ✅ Superado |
| **TC-13** | Trazabilidad del Lector | `GET /api/socios/:id/historial`. | Retorna todos los libros leídos por ese socio, fechas y estados. | HTTP 200 con listado completo y días transcurridos. | ✅ Superado |
| **TC-14** | Reporte de Morosos (HU 5.1) | `GET /api/reportes/morosos`. | Retorna préstamos activos > 15 días con teléfono, email y días de atraso. | HTTP 200 con total de morosos y datos de contacto para reclamo. | ✅ Superado |
| **TC-15** | Integración GitFlow Release | Merge `develop` -> `main` (Release v1.0.0). | Consolidación limpia de todo el código probado y listo para producción. | Rama `main` actualizada con todo el sistema funcional y testeado. | ✅ Superado |
