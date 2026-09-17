# Historias de Usuario - Biblioteca Virtual

## √âpica 1: Gesti√≥n de Cat√°logo de Libros
**HU 1.1: Registrar un nuevo libro**
Como administrador de la biblioteca,
quiero poder registrar un nuevo libro indicando t√≠tulo, autor, g√©nero e ISBN,
para mantener el cat√°logo de la biblioteca actualizado.
**Criterios de Aceptaci√≥n:**
- El sistema debe tener un formulario de registro.
- Se debe validar que los campos obligatorios no est√©n vac√≠os.
- El ISBN debe ser √∫nico en el sistema.

**HU 1.2: Ver cat√°logo de libros**
Como usuario/administrador,
quiero poder visualizar la lista de todos los libros registrados,
para saber qu√© libros est√°n disponibles en la biblioteca.
**Criterios de Aceptaci√≥n:**
- Se debe mostrar una tabla/lista con t√≠tulo, autor y stock.

**HU 1.3: Editar informaci√≥n de un libro**
Como administrador de la biblioteca,
quiero poder editar los detalles de un libro existente,
para corregir errores en la carga o actualizar datos.
**Criterios de Aceptaci√≥n:**
- Se deben poder modificar todos los campos excepto el ISBN (o validarlo).

**HU 1.4: Eliminar un libro del cat√°logo**
Como administrador de la biblioteca,
quiero poder eliminar un libro,
para remover ejemplares que ya no pertenecen a la biblioteca.
**Criterios de Aceptaci√≥n:**
- Solo se puede eliminar si el libro no tiene ejemplares prestados actualmente.

## √âpica 2: Control de Stock y Pr√©stamos
**HU 2.1: Registrar stock inicial de un libro**
Como administrador,
quiero poder indicar la cantidad de ejemplares f√≠sicos que poseo de un libro,
para tener un control de disponibilidad.
**Criterios de Aceptaci√≥n:**
- Cada libro debe tener un campo "stock total" y "stock disponible".

**HU 2.2: Registrar un pr√©stamo de libro**
Como administrador,
quiero poder registrar a qu√© persona (nombre, DNI/Contacto) se le presta un libro,
para saber qui√©n tiene cada ejemplar.
**Criterios de Aceptaci√≥n:**
- Debe guardarse la fecha de pr√©stamo, el libro, y los datos de la persona.
- El "stock disponible" del libro debe disminuir en 1.
- No se puede prestar un libro si su "stock disponible" es 0.

**HU 2.3: Registrar la devoluci√≥n de un libro**
Como administrador,
quiero registrar cuando una persona devuelve un libro,
para actualizar el stock y habilitarlo para nuevos pr√©stamos.
**Criterios de Aceptaci√≥n:**
- El sistema debe cambiar el estado del pr√©stamo a "Devuelto".
- El "stock disponible" del libro debe aumentar en 1.
- Se debe guardar la fecha de devoluci√≥n real.

**HU 2.4: Ver historial de pr√©stamos**
Como administrador,
quiero ver el historial de pr√©stamos de un libro en particular o de todos,
para saber a qui√©n se le prest√≥ hist√≥ricamente y qui√©nes son los deudores actuales.
**Criterios de Aceptaci√≥n:**
- Debe existir una vista con la lista de pr√©stamos activos e inactivos.
- Se debe indicar claramente qu√© pr√©stamos a√∫n no han sido devueltos.

## …pica 3: Funcionalidades Adicionales y Mejoras
**HU 3.1: Panel de Control (Dashboard)**
Como administrador,
quiero ver un resumen en la pantalla principal (cantidad de libros, prÈstamos activos),
para tener una vista r·pida del estado de la biblioteca.
**Criterios de AceptaciÛn:**
- La pantalla principal debe mostrar tarjetas con mÈtricas b·sicas.

**HU 3.2: B˙squeda y filtrado de libros**
Como usuario/administrador,
quiero buscar libros por tÌtulo o autor,
para encontrar un ejemplar r·pidamente en un cat·logo grande.
**Criterios de AceptaciÛn:**
- Debe existir una barra de b˙squeda en la vista del cat·logo.
- Los resultados deben actualizarse al buscar.

**HU 3.3: GestiÛn de Socios (Lectores)**
Como administrador,
quiero mantener un registro de las personas que piden libros (nombre, telÈfono, email),
para no tener que tipear sus datos cada vez que les presto un ejemplar.
**Criterios de AceptaciÛn:**
- CRUD b·sico de socios/lectores.
- Al registrar un prÈstamo, se debe poder seleccionar al socio de una lista desplegable.

**HU 3.4: Alertas de PrÈstamos Vencidos**
Como administrador,
quiero ver quÈ prÈstamos tienen m·s de 15 dÌas sin ser devueltos,
para contactar a los lectores y reclamar los libros.
**Criterios de AceptaciÛn:**
- En el historial de prÈstamos, resaltar en rojo aquellos que excedan los 15 dÌas de antig¸edad.

**HU 3.5: Historial de movimientos de un libro**
Como administrador,
quiero seleccionar un libro especÌfico y ver todas las veces que fue prestado y devuelto,
para entender la popularidad y el desgaste del ejemplar.
**Criterios de AceptaciÛn:**
- La vista de detalle de un libro debe mostrar una tabla con el registro histÛrico de sus prÈstamos especÌficos.
