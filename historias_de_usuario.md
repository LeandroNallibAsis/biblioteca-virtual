# Historias de Usuario - Biblioteca Virtual

## Épica 1: Gestión de Catálogo de Libros
**HU 1.1: Registrar un nuevo libro**
Como administrador de la biblioteca,
quiero poder registrar un nuevo libro indicando título, autor, género e ISBN,
para mantener el catálogo de la biblioteca actualizado.
**Criterios de Aceptación:**
- El sistema debe tener un formulario de registro.
- Se debe validar que los campos obligatorios no estén vacíos.
- El ISBN debe ser único en el sistema.

**HU 1.2: Ver catálogo de libros**
Como usuario/administrador,
quiero poder visualizar la lista de todos los libros registrados,
para saber qué libros están disponibles en la biblioteca.
**Criterios de Aceptación:**
- Se debe mostrar una tabla/lista con título, autor y stock.

**HU 1.3: Editar información de un libro**
Como administrador de la biblioteca,
quiero poder editar los detalles de un libro existente,
para corregir errores en la carga o actualizar datos.
**Criterios de Aceptación:**
- Se deben poder modificar todos los campos excepto el ISBN (o validarlo).

**HU 1.4: Eliminar un libro del catálogo**
Como administrador de la biblioteca,
quiero poder eliminar un libro,
para remover ejemplares que ya no pertenecen a la biblioteca.
**Criterios de Aceptación:**
- Solo se puede eliminar si el libro no tiene ejemplares prestados actualmente.

## Épica 2: Control de Stock y Préstamos
**HU 2.1: Registrar stock inicial de un libro**
Como administrador,
quiero poder indicar la cantidad de ejemplares físicos que poseo de un libro,
para tener un control de disponibilidad.
**Criterios de Aceptación:**
- Cada libro debe tener un campo "stock total" y "stock disponible".

**HU 2.2: Registrar un préstamo de libro**
Como administrador,
quiero poder registrar a qué persona (nombre, DNI/Contacto) se le presta un libro,
para saber quién tiene cada ejemplar.
**Criterios de Aceptación:**
- Debe guardarse la fecha de préstamo, el libro, y los datos de la persona.
- El "stock disponible" del libro debe disminuir en 1.
- No se puede prestar un libro si su "stock disponible" es 0.

**HU 2.3: Registrar la devolución de un libro**
Como administrador,
quiero registrar cuando una persona devuelve un libro,
para actualizar el stock y habilitarlo para nuevos préstamos.
**Criterios de Aceptación:**
- El sistema debe cambiar el estado del préstamo a "Devuelto".
- El "stock disponible" del libro debe aumentar en 1.
- Se debe guardar la fecha de devolución real.

**HU 2.4: Ver historial de préstamos**
Como administrador,
quiero ver el historial de préstamos de un libro en particular o de todos,
para saber a quién se le prestó históricamente y quiénes son los deudores actuales.
**Criterios de Aceptación:**
- Debe existir una vista con la lista de préstamos activos e inactivos.
- Se debe indicar claramente qué préstamos aún no han sido devueltos.
