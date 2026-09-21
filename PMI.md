# PLAN DE GESTIÓN DE PROYECTO
**Nombre del Proyecto:** Biblioteca Virtual  
**Versión:** 1.0  

## TABLA DE CONTENIDOS
1. [Introducción](#1-introducción)
2. [Descripción General](#2-descripción-general)
   - 2.1. [Necesidades de Negocio del Cliente](#21-necesidades-de-negocio-del-cliente)
   - 2.2. [Entorno](#22-entorno)
   - 2.3. [Descripción de Producto o Servicio](#23-descripción-de-producto-o-servicio)
   - 2.4. [Objetivos de Proyecto](#24-objetivos-de-proyecto)
   - 2.5. [Entregables de Proyecto](#25-entregables-de-proyecto)
   - 2.6. [Suposiciones](#26-suposiciones)
   - 2.7. [Restricciones](#27-restricciones)
   - 2.8. [Involucrados en el Proyecto](#28-involucrados-en-el-proyecto)
   - 2.9. [Requerimientos Detallados Técnicos y de Gestión](#29-requerimientos-detallados-técnicos-y-de-gestión)
3. [Equipo de Proyecto](#3-equipo-de-proyecto)
   - 3.1. [Organigrama de Proyecto (OBS)](#31-organigrama-de-proyecto-obs)
   - 3.2. [Proveedores y Subcontratistas](#32-proveedores-y-subcontratistas)
   - 3.3. [Matriz de Asignación de Responsabilidades](#33-matriz-de-asignación-de-responsabilidades)
4. [Cronograma de Proyecto](#4-cronograma-de-proyecto)
   - 4.1. [Gráfico Gantt](#41-gráfico-gantt)
   - 4.2. [Hitos](#42-hitos)
5. [Presupuesto del Proyecto](#5-presupuesto-del-proyecto)
   - 5.1. [Línea de Base](#51-línea-de-base)
6. [Registro de Riesgos](#6-registro-de-riesgos)
7. [Control de Cambios](#7-control-de-cambios)
   - 7.1. [Comité de Control de Cambios](#71-comité-de-control-de-cambios)
   - 7.2. [Procedimiento de Control de Cambios](#72-procedimiento-de-control-de-cambios)
8. [Comunicaciones Interpersonales en el Proyecto](#8-comunicaciones-interpersonales-en-el-proyecto)
9. [Plan de Pruebas y Aceptación](#9-plan-de-pruebas-y-aceptación)
10. [Gestión de Subcontratistas](#10-gestión-de-subcontratistas)
11. [Logística](#11-logística)
   - 11.1. [Lugares Físicos de Trabajo](#111-lugares-físicos-de-trabajo)
   - 11.2. [Viajes y traslados](#112-viajes-y-traslados)
12. [Anexo I - Contratos](#12-anexo-i---contratos)
13. [Anexo II – Minutas de reunión](#13-anexo-ii--minutas-de-reunión)
14. [Anexo III – Documentos de Control de Cambios](#14-anexo-iii--documentos-de-control-de-cambios)
15. [Anexo IV – Otros Documentos](#15-anexo-iv--otros-documentos)

---

## 1. Introducción
El Plan de Gestión de Proyecto es el documento central de planificación. Su propósito es presentar todos los componentes de planificación y referenciar otros documentos relacionados. Este documento sirve como referencia para decisiones gerenciales y acuerdos a lo largo del desarrollo del sistema web de Biblioteca Virtual, garantizando el cumplimiento del período de 6 semanas de acompañamiento para la evaluación en calidad de libre de la materia Prácticas Profesionalizantes II.

## 2. Descripción General
### 2.1. Necesidades de Negocio del Cliente
Se requiere un sistema web funcional para gestionar una Biblioteca Virtual, que permita mantener un catálogo de libros, llevar el control de stock de ejemplares y registrar a quién se le prestó cada ejemplar, asegurando una lógica simple, consistente y validada mediante pruebas, y sin dependencias técnicas complejas que dificulten el avance.

### 2.2. Entorno
El proyecto se desarrolla en un contexto académico (Prácticas Profesionalizantes II). El seguimiento se realiza mediante encuentros semanales los días lunes a las 20:00 horas. El proyecto utilizará las tecnologías trabajadas en la cursada y aplicará buenas prácticas de desarrollo, respaldado mediante control de versiones en GitHub.

### 2.3. Descripción de Producto o Servicio
El producto es una aplicación web de Biblioteca Virtual.
- **Requisitos principales:** 
  - Catálogo de libros (Alta, Baja, Modificación, Listado).
  - Control de stock (Cantidad disponible, cantidad total).
  - Registro de préstamos (Historial de a quién se le prestó cada ejemplar).
- **Entregable final:** Repositorio en GitHub con el código fuente estructurado, sistema funcional desplegado en el entorno local y la documentación completa del proyecto.

### 2.4. Objetivos de Proyecto
- **Alcance / Calidad:** Desarrollar un sistema completamente funcional que evidencie un código estructurado y limpio, cumplimiento de buenas prácticas de desarrollo, control de versiones adecuado y documentación exhaustiva.
- **Tiempos:** Completar el desarrollo integral del sistema en un plazo estricto de 6 semanas, presentando avances progresivos y demostrables cada semana.
- **Costos:** Mantener el costo monetario incremental en $0, dado su carácter académico, utilizando recursos computacionales e infraestructura preexistentes.

### 2.5. Entregables de Proyecto
| ID | Entregable | Responsable | Fecha de entrega | Fecha de vencimiento | Criterio de aceptación |
| -- | ---------- | ----------- | ---------------- | -------------------- | ---------------------- |
| ENT-01 | Repositorio GitHub y Documentación Base (PMI, Historias de Usuario) | Asis | Semana 1 | Semana 1 | Repositorio creado, commits iniciales registrados, archivos Markdown accesibles y legibles. |
| ENT-02 | Módulo de Catálogo de Libros (CRUD) | Asis | Semana 2 | Semana 2 | Sistema permite crear, leer, actualizar y eliminar libros en la base de datos sin errores técnicos. |
| ENT-03 | Módulo de Control de Stock | Asis | Semana 3 | Semana 3 | El sistema actualiza el stock automáticamente y refleja la cantidad disponible real. |
| ENT-04 | Módulo de Préstamos | Asis | Semana 4 | Semana 4 | Se registra a quién se le presta, la fecha, y se impide realizar préstamos sin stock disponible. |
| ENT-05 | Sistema Integrado y Probado | Asis | Semana 5 | Semana 5 | Todos los módulos interactúan correctamente y se superan las pruebas funcionales. |
| ENT-06 | Presentación Final del Proyecto | Asis | Semana 6 | Semana 6 | Demostración funcional del sistema ante el docente, defensa técnica y revisión de repositorio aprobada. |

### 2.6. Suposiciones
- Se dispone de las herramientas de desarrollo y del hardware adecuado (IDE, base de datos local SQLite, Node.js).
- Las tecnologías requeridas por la cátedra son de conocimiento previo por parte del desarrollador.
- Se realizarán encuentros de seguimiento ininterrumpidos con el docente todos los lunes a las 20:00 hs.

### 2.7. Restricciones
- Tiempo de desarrollo estricto limitado a 6 semanas.
- El avance no puede presentarse como un producto final aislado, debe evidenciarse mediante un historial progresivo y coherente de commits y uso de ramas en GitHub.
- La documentación debe respetar fielmente la estructura del modelo PMI brindado por la cátedra.

### 2.8. Involucrados en el Proyecto
- **Desarrollador / Alumno:** Asis.
- **Docente / Evaluador:** Docente a cargo de Prácticas Profesionalizantes II.

### 2.9. Requerimientos Detallados Técnicos y de Gestión

| ID | Requerimiento | Tipo | Prioridad | Criterio de aceptación |
| -- | ------------- | ---- | --------- | ---------------------- |
| REQ-01 | Implementación de tecnologías trabajadas en la cursada (Node.js, SQLite, HTML/CSS/JS) | Técnico | Alta | El código fuente utiliza exclusivamente las tecnologías acordadas, sin dependencias o frameworks no autorizados. |
| REQ-02 | Estructura organizada del código y buenas prácticas | Técnico | Alta | Código modularizado, indentado, con nomenclatura clara para variables y funciones. |
| REQ-03 | Uso adecuado de herramientas profesionales (GitHub) | Gestión | Alta | Repositorio con historial de commits progresivo, descriptivo, no acumulado al final, y uso de ramas. |
| REQ-04 | Gestión del Catálogo de Libros (CRUD) | Funcional | Alta | Interfaz y backend permiten altas, bajas y modificaciones de los libros registrados. |
| REQ-05 | Control de Stock de Libros | Funcional | Alta | Todo libro debe poseer un contador de stock total y disponible, que se restrinja a números mayores o iguales a cero. |
| REQ-06 | Gestión y validación de Préstamos | Funcional | Alta | El sistema registra el prestatario y rechaza la operación si el stock disponible del ejemplar es igual a cero. |

## 3. Equipo de Proyecto
### 3.1. Organigrama de Proyecto (OBS)
- **Desarrollador y Gerente de Proyecto:** Asis. (Único responsable de todo el ciclo de vida del software, comprendiendo planificación, diseño, desarrollo, pruebas, despliegue y documentación).
- **Docente:** Cumple el rol de evaluador, cliente simulado y auditor del proceso.

### 3.2. Proveedores y Subcontratistas
- **No aplica.** El proyecto se desarrolla íntegramente por el alumno, utilizando recursos de software de código abierto y hardware propio. No se contempla contratación de terceros.

### 3.3. Matriz de Asignación de Responsabilidades
Al existir un único desarrollador, las responsabilidades de ejecución y consulta se concentran, mientras que la aprobación recae total o parcialmente en la evaluación del docente.

| Actividad / Paquete de Trabajo | Asis (Alumno) | Docente (Evaluador) |
| ------------------------------ | ------------- | ------------------- |
| Planificación y Documentación (PMI) | R, A | A, I |
| Desarrollo de Módulos (Catálogo, Stock, Préstamo) | R, A | I |
| Realización de Pruebas | R, A | I |
| Presentación Final y Defensa | R | A, I |

*(Referencias: R = Responsable, A = Aprobador, C = Consultado, I = Informado)*

## 4. Cronograma de Proyecto
### 4.1. Gráfico Gantt
Planificación basada en semanas académicas relativas.

| ID | Actividad | Inicio | Fin | Duración | Dependencia | Responsable |
| -- | --------- | ------ | --- | -------- | ----------- | ----------- |
| ACT-01 | Planificación, armado de PMI e Historias de Usuario | Semana 1 | Semana 1 | 1 Semana | Ninguna | Asis |
| ACT-02 | Inicialización del repositorio y base de datos | Semana 1 | Semana 1 | 1 Semana | Ninguna | Asis |
| ACT-03 | Desarrollo del Módulo de Catálogo de Libros | Semana 2 | Semana 2 | 1 Semana | ACT-02 | Asis |
| ACT-04 | Desarrollo del Módulo de Control de Stock | Semana 3 | Semana 3 | 1 Semana | ACT-03 | Asis |
| ACT-05 | Desarrollo del Módulo de Préstamos | Semana 4 | Semana 4 | 1 Semana | ACT-03, ACT-04 | Asis |
| ACT-06 | Pruebas de integración, corrección de errores | Semana 5 | Semana 5 | 1 Semana | ACT-05 | Asis |
| ACT-07 | Preparación defensa oral y presentación final | Semana 6 | Semana 6 | 1 Semana | ACT-06 | Asis |

### 4.2. Hitos

| ID | Hito | Fecha/Periodo | Criterio de cumplimiento |
| -- | ---- | ------------- | ------------------------ |
| HIT-01 | Aprobación de Planificación Inicial | Semana 1 | PMI, Historias de usuario y repositorio base revisados por el docente. |
| HIT-02 | Catálogo Funcional | Semana 2 | Las operaciones CRUD de libros funcionan y se almacenan en SQLite. |
| HIT-03 | Sistema de Préstamos y Stock Finalizado | Semana 4 | Se pueden registrar préstamos y devoluciones alterando el stock correctamente. |
| HIT-04 | Proyecto Listo para Defensa Final | Semana 6 | Código depurado, repositorio actualizado y presentación preparada. |

## 5. Presupuesto del Proyecto
### 5.1. Línea de Base
El proyecto es de naturaleza académica. Se utilizan recursos tecnológicos ya disponibles por el alumno (equipo de computación personal, conexión a internet, software libre).
- **No se contemplan contrataciones externas ni proveedores.**
- **El costo monetario incremental del proyecto es $0.**

## 6. Registro de Riesgos

| ID | Riesgo | Probabilidad | Impacto | Nivel (Cualitativo) | Respuesta/Mitigación | Responsable |
| -- | ------ | ------------ | ------- | ------------------- | -------------------- | ----------- |
| RSG-01 | Problemas técnicos con dependencias o librerías complejas | Media | Alto | Moderado | Mantener una arquitectura base sencilla (Node.js/SQLite), sin frameworks innecesarios. Validar cada paso. | Asis |
| RSG-02 | Incumplimiento del cronograma semanal por falta de tiempo | Alta | Alto | Crítico | Fraccionar el desarrollo en tareas muy pequeñas y ejecutar commits constantes a lo largo de la semana. | Asis |
| RSG-03 | Pérdida de historial u olvido de registro de commits | Baja | Alto | Crítico | Adquirir el hábito de realizar un commit al finalizar cualquier funcionalidad o sesión de trabajo, por mínima que sea. | Asis |
| RSG-04 | Errores funcionales al vincular préstamos con el stock | Media | Medio | Moderado | Diseñar pruebas manuales rigurosas enfocadas en casos límite (ej: stock = 0). | Asis |

## 7. Control de Cambios
### 7.1. Comité de Control de Cambios
Al ser un proyecto académico de único desarrollador, el rol del Comité de Control de Cambios se asume en conjunto entre **Asis** y el **Docente**, discutiendo los cambios de alcance durante los encuentros semanales.

### 7.2. Procedimiento de Control de Cambios
Cualquier modificación que afecte las líneas de base del proyecto (alcance original, tiempo de 6 semanas) debe seguir estos pasos:
1. **Identificación y solicitud:** El alumno o el docente detectan una necesidad de cambio durante el avance.
2. **Análisis de impacto:** El alumno evalúa de forma cualitativa cómo afecta el cambio al alcance, los tiempos de entrega restantes y los riesgos del proyecto.
3. **Decisión/aprobación:** En la reunión semanal, el docente aprueba, modifica o rechaza el cambio.
4. **Actualización de la documentación:** Se actualiza el PMI y las Historias de Usuario de ser necesario.
5. **Registro del cambio:** Se incluye la implementación del cambio en un commit claro en el repositorio.
6. **Comunicación:** Se deja asentado en la minuta de la reunión semanal o plataforma académica correspondiente.

## 8. Comunicaciones Interpersonales en el Proyecto

| Comunicación | Emisor | Receptor | Frecuencia | Medio | Evidencia/Registro |
| ------------ | ------ | -------- | ---------- | ----- | ------------------ |
| Reunión de Seguimiento | Alumno / Docente | Docente / Alumno | Semanal (Lunes 20:00 hs) | Plataforma Online (videollamada) | Minutas de reunión (Anexo II) |
| Avance del Proyecto y Código | Alumno | Docente | Permanente (Asíncrono) | Plataforma GitHub | Repositorio de código y commits |

## 9. Plan de Pruebas y Aceptación

| ID | Funcionalidad/Entregable | Prueba | Resultado esperado | Criterio de aceptación | Mecanismo de aceptación |
| -- | ------------------------ | ------ | ------------------ | ---------------------- | ----------------------- |
| PRB-01 | Alta, Baja, Modificación de libros | Creación, edición y eliminación desde la interfaz de un libro de prueba. | El libro aparece, se actualiza o desaparece del catálogo y de la base de datos de manera consistente. | Carga exitosa de un libro. No se permite eliminar si hay préstamos activos. | Revisión manual y demostración ante el docente. |
| PRB-02 | Validación de stock al prestar | Intento de préstamo de un libro cuyo stock disponible es 0. | El sistema arroja una alerta impidiendo el préstamo. El stock no se altera. | Operación rechazada visualmente y a nivel backend. | Revisión manual y demostración ante el docente. |
| PRB-03 | Actualización de stock tras devolución | Registrar la devolución de un ejemplar prestado. | El stock disponible aumenta en 1. El estado del préstamo figura como devuelto. | Los datos se reflejan correctamente en las tablas de stock y préstamos. | Revisión manual y demostración ante el docente. |

## 10. Gestión de Subcontratistas
**No aplica.** El proyecto académico es desarrollado y gestionado íntegramente por el alumno de forma individual, prescindiendo por completo de la contratación de proveedores o subcontratistas.

## 11. Logística
### 11.1. Lugares Físicos de Trabajo
- El desarrollo se realizará de forma remota, utilizando como espacio de trabajo el domicilio del alumno. Las reuniones de seguimiento se efectuarán de forma virtual.
### 11.2. Viajes y traslados
- **No aplica.** Al ser un proyecto remoto, no se contemplan viajes ni traslados de ningún tipo.

## 12. Anexo I - Contratos
**No aplica.** Al ser un proyecto de ámbito académico evaluativo, no existen contratos legales vinculantes.

## 13. Anexo II – Minutas de reunión
**Por definir.** Los resúmenes de las reuniones llevadas a cabo los lunes a las 20:00 hs se registrarán y almacenarán a medida que se ejecuten.

## 14. Anexo III – Documentos de Control de Cambios
**No aplica (por el momento).** No se han procesado cambios que afecten las líneas de base originales. En caso de existir, se registrarán aquí.

## 15. Anexo IV – Otros Documentos
- **Enlace al repositorio de GitHub:** https://github.com/LeandroNallibAsis/biblioteca-virtual.git
- **Historias de Usuario:** Archivo `historias_de_usuario.md` incluido en el repositorio.
