# PLAN DE GESTIÓN DE PROYECTO
**Nombre del Proyecto:** Biblioteca Virtual  
**Versión:** 1.0  

## TABLA DE CONTENIDOS
1. [Introducción](#1-introducción)
2. [Descripción General](#2-descripción-general)
3. [Equipo de Proyecto](#3-equipo-de-proyecto)
4. [Cronograma de Proyecto](#4-cronograma-de-proyecto)
5. [Presupuesto del Proyecto](#5-presupuesto-del-proyecto)
6. [Registro de Riesgos](#6-registro-de-riesgos)
7. [Control de Cambios](#7-control-de-cambios)
8. [Comunicaciones Interpersonales en el Proyecto](#8-comunicaciones-interpersonales-en-el-proyecto)
9. [Plan de Pruebas y Aceptación](#9-plan-de-pruebas-y-aceptación)
10. [Gestión de Subcontratistas](#10-gestión-de-subcontratistas)
11. [Logística](#11-logística)
12. [Anexo I - Contratos](#12-anexo-i---contratos)
13. [Anexo II – Minutas de reunión](#13-anexo-ii--minutas-de-reunión)
14. [Anexo III – Documentos de Control de Cambios](#14-anexo-iii--documentos-de-control-de-cambios)
15. [Anexo IV – Otros Documentos](#15-anexo-iv--otros-documentos)

---

## 1. Introducción
El Plan de Gestión de Proyecto es el documento central de planificación. Este documento sirve como referencia para decisiones gerenciales y acuerdos a lo largo del desarrollo del sistema web de Biblioteca Virtual, garantizando el cumplimiento del período de 6 semanas de acompañamiento para la evaluación en calidad de libre de la materia Prácticas Profesionalizantes II.

## 2. Descripción General
### 2.1. Necesidades de Negocio del Cliente
Se requiere un sistema web funcional para gestionar una Biblioteca Virtual, que permita mantener un catálogo de libros, llevar el control de stock de ejemplares y registrar a quién se le prestó cada ejemplar, asegurando una lógica infalible y sin dependencias complejas.

### 2.2. Entorno
El proyecto se desarrolla en un contexto académico (Prácticas Profesionalizantes II). El seguimiento se realiza mediante encuentros semanales los lunes a las 20:00 horas. El proyecto utilizará las tecnologías trabajadas en la cursada y aplicará buenas prácticas de desarrollo, con versionado en GitHub.

### 2.3. Descripción de Producto o Servicio
Aplicación web de Biblioteca Virtual.
- **Requisitos:** 
  - Catálogo de libros (Alta, Baja, Modificación, Listado).
  - Control de stock (Cantidad disponible, cantidad prestada).
  - Registro de préstamos (Historial de a quién se le prestó cada ejemplar).
- **Entregable:** Repositorio en GitHub con el código fuente estructurado, sistema funcional y documentación del proyecto.

### 2.4. Objetivos de Proyecto
- **Alcance / Calidad:** Desarrollar un sistema funcional con código limpio, buenas prácticas, control de versiones adecuado y documentación completa.
- **Tiempos:** Completar el desarrollo en un plazo de 6 semanas, presentando avances progresivos cada semana.
- **Costos:** Al ser un proyecto académico, no implica costos de desarrollo monetarios, sino inversión de horas de estudio y programación.

### 2.5. Entregables de Proyecto
1. Repositorio en GitHub inicializado con estructura del proyecto.
2. Documento PMI (Plan de Gestión del Proyecto).
3. Historias de Usuario documentadas.
4. Avance funcional del Catálogo de Libros.
5. Avance funcional del Control de Stock y Préstamos.
6. Presentación final del sistema.

### 2.6. Suposiciones
- Se dispone de las herramientas de desarrollo adecuadas (IDE, base de datos local, etc.).
- Las tecnologías exigidas por la cátedra son de conocimiento previo.
- Se realizarán encuentros de seguimiento todos los lunes a las 20:00 hs.

### 2.7. Restricciones
- Tiempo de desarrollo limitado a 6 semanas.
- El repositorio debe evidenciar commits periódicos y uso de ramas (no subir todo al final).
- Debe presentarse la documentación de acuerdo a la estructura del PMI.

### 2.8. Involucrados en el Proyecto
- **Desarrollador / Alumno:** Asis.
- **Docente / Evaluador:** Docente a cargo de Prácticas Profesionalizantes II.

### 2.9. Requerimientos Detallados Técnicos y de Gestión
- Implementación de tecnologías trabajadas en la cursada.
- Estructura organizada del código.
- Cumplimiento de buenas prácticas de desarrollo.
- Registro de commits periódicos, uso de ramas (branches) y mensajes claros.

## 3. Equipo de Proyecto
### 3.1. Organigrama de Proyecto (OBS)
- **Desarrollador / Gerente de Proyecto:** Asis. (Responsable de todo el ciclo de vida del software, desde diseño hasta implementación y pruebas).

### 3.2. Proveedores y Subcontratistas
- N/A (Desarrollo propio).

### 3.3. Matriz de Asignación de Responsabilidades
- **Asis:** Responsable absoluto de Planificación, Desarrollo, Pruebas y Despliegue.

## 4. Cronograma de Proyecto
### 4.1. Gráfico Gantt
*(El seguimiento se dividirá en 6 semanas)*
- **Semana 1:** Planificación, armado del PMI, Historias de Usuario, inicialización del repositorio GitHub, estructura base del proyecto.
- **Semana 2:** Desarrollo del Módulo de Catálogo de Libros (CRUD).
- **Semana 3:** Desarrollo del Módulo de Control de Stock.
- **Semana 4:** Desarrollo del Módulo de Préstamos (registro de a quién se le prestó).
- **Semana 5:** Integración, pruebas y corrección de errores.
- **Semana 6:** Preparación para defensa oral, revisión final del código y repositorio.

### 4.2. Hitos
- Hito 1: Repositorio y documentación inicial aprobados.
- Hito 2: Módulo de Catálogo funcional.
- Hito 3: Módulo de Préstamos funcional.
- Hito 4: Proyecto listo para presentación final.

## 5. Presupuesto del Proyecto
### 5.1. Línea de Base
Proyecto de índole académica (costo $0, salvo recursos propios computacionales e internet).

## 6. Registro de Riesgos
- **Riesgo 1:** Trabarse con dependencias complejas. *Mitigación:* Usar lógica infalible y arquitectura simple sin librerías innecesarias.
- **Riesgo 2:** Atraso en las entregas semanales. *Mitigación:* Planificar tareas pequeñas para asegurar commits diarios/semanales.
- **Riesgo 3:** Olvido de registrar commits. *Mitigación:* Hacer commits por cada funcionalidad terminada, por mínima que sea.

## 7. Control de Cambios
### 7.1. Comité de Control de Cambios
- Asis (en consulta con el Docente durante los encuentros de los lunes a las 20:00 hs).
### 7.2. Procedimiento de Control de Cambios
- Todo cambio en el alcance debe ser discutido en la reunión semanal y reflejado en el repositorio.

## 8. Comunicaciones Interpersonales en el Proyecto
- **Docente:** Reunión de seguimiento vía plataforma online todos los lunes a las 20:00 horas.
- **Evidencia:** Repositorio en GitHub.

## 9. Plan de Pruebas y Aceptación
- **Pruebas Unitarias/Manuales:** Validación de alta, baja y modificación de libros.
- **Validación de Lógica:** No permitir préstamos si el stock es 0.
- **Aceptación:** Demostración funcional del sistema ante el docente.

## 10. Gestión de Subcontratistas
- N/A.

## 11. Logística
### 11.1. Lugares Físicos de Trabajo
- Domicilio del alumno (desarrollo remoto).
### 11.2. Viajes y traslados
- N/A.

## 12. Anexo I - Contratos
- N/A.

## 13. Anexo II – Minutas de reunión
*(Aquí se registrarán los resúmenes de las reuniones de los lunes a las 20:00 hs)*

## 14. Anexo III – Documentos de Control de Cambios
*(Aquí se registrarán los cambios solicitados por el docente)*

## 15. Anexo IV – Otros Documentos
- Enlace al repositorio de GitHub: `[Pendiente]`
- Historias de Usuario: `historias_de_usuario.md`
