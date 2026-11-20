# PLAN DE GESTIÓN DE PROYECTO
**Nombre del Proyecto:** Biblioteca Virtual  
**Espacio Curricular:** Prácticas Profesionalizantes II (Tecnicatura Superior en Desarrollo de Software - ISBH / UPC)  
**Modalidad:** Acreditación en condición de libre bajo metodología Scrum  
**Versión:** 3.0 (Cierre y Versión Final de Entrega)  
**Fecha de Actualización:** 20 de noviembre de 2026  

---

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
   - 3.3. [Matriz de Asignación de Responsabilidades (RACI)](#33-matriz-de-asignación-de-responsabilidades-raci)
4. [Cronograma de Proyecto](#4-cronograma-de-proyecto)
   - 4.1. [Gráfico Gantt y Planificación de Sprints](#41-gráfico-gantt-y-planificación-de-sprints)
   - 4.2. [Hitos del Proyecto](#42-hitos-del-proyecto)
5. [Presupuesto del Proyecto (Gestión de Costos)](#5-presupuesto-del-proyecto-gestión-de-costos)
   - 5.1. [Estructura de Desglose de Costos](#51-estructura-de-desglose-de-costos)
   - 5.2. [Distribución de Esfuerzo (90 Horas / 6 Sprints)](#52-distribución-de-esfuerzo-90-horas--6-sprints)
   - 5.3. [Línea de Base de Costos (Presupuesto Total)](#53-línea-de-base-de-costos-presupuesto-total)
   - 5.4. [Control y Monitoreo del Presupuesto](#54-control-y-monitoreo-del-presupuesto)
6. [Registro y Gestión de Riesgos](#6-registro-y-gestión-de-riesgos)
   - 6.1. [Matriz de Evaluación Cualitativa y Cuantitativa](#61-matriz-de-evaluación-cualitativa-y-cuantitativa)
   - 6.2. [Planes de Mitigación y Contingencia](#62-planes-de-mitigación-y-contingencia)
7. [Control de Cambios](#7-control-de-cambios)
   - 7.1. [Comité de Control de Cambios](#71-comité-de-control-de-cambios)
   - 7.2. [Procedimiento de Control de Cambios](#72-procedimiento-de-control-de-cambios)
8. [Comunicaciones Interpersonales en el Proyecto](#8-comunicaciones-interpersonales-en-el-proyecto)
9. [Plan de Pruebas y Aceptación](#9-plan-de-pruebas-y-aceptación)
10. [Gestión de Subcontratistas](#10-gestión-de-subcontratistas)
11. [Logística y Entorno de Ejecución](#11-logística-y-entorno-de-ejecución)
12. [Anexo I - Contratos](#12-anexo-i---contratos)
13. [Anexo II – Minutas de Reunión y Comunicaciones](#13-anexo-ii--minutas-de-reunión-y-comunicaciones)
14. [Anexo III – Documentos de Control de Cambios](#14-anexo-iii--documentos-de-control-de-cambios)
15. [Anexo IV – Otros Documentos y Enlaces](#15-anexo-iv--otros-documentos-y-enlaces)

---

## 1. Introducción
El presente Plan de Gestión de Proyecto (PMI) constituye el documento formal de planificación, seguimiento y control para el desarrollo del sistema web **Biblioteca Virtual**. Este instrumento formaliza las líneas de base de alcance, cronograma y costos acordadas en el marco del Plan de Acción y Acompañamiento del espacio curricular **Prácticas Profesionalizantes II** (Tecnicatura Superior en Desarrollo de Software - ISBH / UPC), asegurando el cumplimiento de un ciclo riguroso de 6 semanas bajo la metodología ágil **Scrum** adaptada a desarrollo individual.

---

## 2. Descripción General

### 2.1. Necesidades de Negocio del Cliente
Se requiere un sistema web integral y confiable para gestionar una Biblioteca, permitiendo:
- Administrar el catálogo de libros (altas, bajas, modificaciones y consultas).
- Mantener un control automatizado y consistente del stock físico (total y disponible) mediante un sistema de **Kardex / Movimientos inmutables** (Event Sourcing de stock).
- Registrar préstamos y devoluciones asociando ejemplares con socios (lectores), garantizando la integridad transaccional, la prevención de pérdidas y la trazabilidad de lectura por socio.
- Monitorear préstamos vencidos (> 15 días) y emitir reportes de socios morosos.

### 2.2. Entorno
El proyecto se desarrolla en el ámbito académico de la Tecnicatura Superior en Desarrollo de Software (ISBH / UPC). Las pautas de trabajo y seguimiento se rigen bajo los siguientes acuerdos:
- **Instancias de seguimiento presencial:** Encuentros pautados los días **viernes a las 15:40 horas** en la sede institucional, donde se presentan los incrementos funcionales y se evalúa el avance frente a los docentes evaluadores.
- **Corte semanal de entregas en repositorio:** Se establece de manera fija el límite de commits y cierre de actividades semanales los días **domingo a las 23:59 horas**, asegurando un historial auditable previo a cada revisión.
- **Entorno tecnológico:** Node.js, Express, SQLite3, HTML5, CSS3 y JavaScript moderno, bajo control de versiones en GitHub utilizando ramas (`main`, `develop`, `feature/*`), GitHub Projects (Kanban) y GitHub Wiki.

### 2.3. Descripción de Producto o Servicio
Aplicación web monolítica ligera de gestión bibliotecaria que comprende:
- **Panel de Control (Dashboard):** Métricas en tiempo real de catálogo, socios, préstamos activos/vencidos e inventario físico con accesos directos.
- **Catálogo y Kardex de Stock:** Listado reactivo, alta, edición, eliminación condicionada y libro mayor de movimientos (`+ingreso`, `-préstamo`, `+devolución`, `-daño`).
- **Padrón de Socios y Trazabilidad:** Gestión de lectores con ficha histórica de libros solicitados en toda su trayectoria.
- **Gestión de Préstamos Transaccionales:** Transacciones atómicas seguras bajo `BEGIN IMMEDIATE` / `COMMIT` / `ROLLBACK` con control de concurrencia.
- **Reporte de Morosidad:** Vista especializada de socios con préstamos adeudados fuera de término (> 15 días) con datos de contacto e impresión.

### 2.4. Objetivos de Proyecto
- **Alcance / Calidad:** Construir un sistema funcional y robusto, con cobertura de validaciones tanto en frontend como en API backend, integridad referencial en SQLite (`PRAGMA foreign_keys = ON;`) y código modularizado.
- **Tiempos:** Completar el proyecto a lo largo del período estipulado de 6 Sprints semanales/quincenales (del 8 de septiembre al 27 de noviembre de 2026), cumpliendo con cada fecha de hito.
- **Costos:** Gestionar el presupuesto del proyecto proyectando un costo económico formal de **$885.500 ARS** (absorbido mediante horas de dedicación académica y recursos propios del estudiante).

### 2.5. Entregables de Proyecto
| ID | Entregable | Responsable | Fecha Límite | Estado | Criterio de Aceptación |
| :--- | :--- | :--- | :---: | :---: | :--- |
| **ENT-01** | Plan de Gestión (PMI) e Historias de Usuario | Asis | 18/09/2026 (Sprint 1) | ✅ Aprobado | Repositorio creado, PMI inicial, Product Backlog en Markdown y aprobación docente. |
| **ENT-02** | Planificación de Sprint 1 y Repositorio Base | Asis | 02/10/2026 (Sprint 2) | ✅ Aprobado | HU priorizadas, estructura de carpetas, servidor Express básico y SQLite configurado. |
| **ENT-03** | Primer Incremento: Catálogo y Stock Inicial | Asis | 16/10/2026 (Sprint 3) | ✅ Aprobado | CRUD completo de libros, validación de stock disponible, commits periódicos y ramas. |
| **ENT-04** | Segundo Incremento: Préstamos, Socios y Alertas | Asis | 30/10/2026 (Sprint 4) | ✅ Aprobado | Módulos de Socios y Préstamos transaccionales funcionales, alertas de libros vencidos y evidencias. |
| **ENT-05** | Integración, Kardex, Backend Estricto y Reportes | Asis | 13/11/2026 (Sprint 5) | ✅ Aprobado | Dashboard, Kardex dinámico (+/-), validaciones estrictas (evita '2abc') y reporte de morosos. |
| **ENT-06** | Cierre, Consolidación Release v1.0 y Defensa | Asis | 27/11/2026 (Sprint 6) | ✅ Aprobado | Rama `develop` mergeada en `main`, tag v1.0.0, documentación y defensa preparada. |

### 2.6. Suposiciones
- Disponibilidad del entorno de desarrollo personal (PC, Node.js v18+, SQLite, Git) y acceso a conectividad para sincronización remota en GitHub.
- Disponibilidad en sede institucional de equipo informático con Node.js y navegador web para las demostraciones presenciales los viernes a las 15:40 hs (o autorización para operar con equipo portátil propio).
- Las retroalimentaciones docentes recibidas en cada encuentro se incorporan como requerimientos y mejoras en el Sprint inmediato posterior.

### 2.7. Restricciones
- Cumplimiento estricto del cronograma de 6 Sprints finalizando el 27 de noviembre de 2026.
- Obligatoriedad de registrar la trazabilidad del trabajo con commits atómicos antes de los **domingos a las 23:59 horas**.
- Flujo de trabajo obligatorio en GitHub con ramas (`main` para producción, `develop` para integración y `feature/*` para cada HU), acompañamiento visual mediante GitHub Projects (Kanban) y documentación viva en GitHub Wiki.
- Prohibición de frameworks de servidor complejos no abordados en la carrera (mantener arquitectura pura en Node.js + Express).

### 2.8. Involucrados en el Proyecto
- **Desarrollador / Alumno:** Leandro Nallib Asis.
- **Docente Evaluadora Principal:** Prof. Mónica Yamil Alvarado (`monicayamilalvarado.sedecmonte@upc.edu.ar`).
- **Docente Acompañante Técnico:** Christian Di Guardi (`christiandiguardia.sedecmonte@upc.edu.ar`).
- **Docente Evaluador / Coordinación:** Fernando Juárez (`fernandojavierjuarez.sedecmonte@upc.edu.ar` / GitHub: `fyalva`).

### 2.9. Requerimientos Detallados Técnicos y de Gestión
| ID | Requerimiento | Tipo | Prioridad | Criterio de Aceptación |
| :--- | :--- | :--- | :---: | :--- |
| **REQ-01** | Stack Tecnológico de Cátedra | Técnico | Alta | Uso exclusivo de Node.js, Express, SQLite3, HTML5, CSS3 y JavaScript puro. |
| **REQ-02** | Arquitectura y Código Limpio | Técnico | Alta | Separación modular: `server.js` (rutas y controladores), `database.js` (conexión), `public/` (frontend). |
| **REQ-03** | Trazabilidad y Buenas Prácticas Git | Gestión | Alta | Uso de rama `develop`, ramas por feature, Pull Requests descriptivos y commits dominicales antes de las 23:59 hs. |
| **REQ-04** | Catálogo de Libros y Bloqueo Seguro | Funcional | Alta | Crear, listar, editar y eliminar libros; bloqueo explícito si posee préstamos activos o historial devuelto (auditoría). |
| **REQ-05** | Kardex y Stock Dinámico por Movimientos | Funcional | Alta | Registro inmutable de ingresos, préstamos, devoluciones y daños en `movimientos_stock`. Stock calculado dinámicamente. |
| **REQ-06** | Validaciones Estrictas Backend | Seguridad | Alta | Rechazo estricto con HTTP 400 de cadenas como `"2abc"`, números negativos o decimales en campos numéricos. |
| **REQ-07** | Activación de Claves Foráneas | Técnico | Alta | Ejecución de `PRAGMA foreign_keys = ON;` al conectar la base de datos para impedir inconsistencias. |
| **REQ-08** | Documentación en GitHub Projects y Wiki | Gestión | Alta | Tablero Kanban activo con historias de usuario y Wiki con el contenido completo del PMI. |

---

## 3. Equipo de Proyecto

### 3.1. Organigrama de Proyecto (OBS)
- **Desarrollador Full-Stack & Scrum Master:** Leandro Nallib Asis (planificación, codificación, pruebas, despliegue y documentación).
- **Comité Evaluador (Cátedra PPII):**
  - Mónica Yamil Alvarado (Evaluadora Titular).
  - Christian Di Guardi (Asesor Técnico Complementario).
  - Fernando Juárez (Evaluador y Coordinador).

### 3.2. Proveedores y Subcontratistas
No aplica. Proyecto individual con software de código abierto y hardware propio.

### 3.3. Matriz de Asignación de Responsabilidades (RACI)
| Paquete de Trabajo / Entregable | Leandro Asis (Alumno) | Prof. Yamil Alvarado | Prof. Christian Di Guardi | Prof. Fernando Juárez |
| :--- | :---: | :---: | :---: | :---: |
| Plan de Gestión (PMI) y Cronograma | **R / A** | **A** | **C** | **I** |
| Definición y Trazabilidad de HU | **R / A** | **A** | **C** | **I** |
| Desarrollo Backend (API REST, BD y Kardex) | **R** | **I** | **C** | **I** |
| Desarrollo Frontend (UI, Dashboard y Modales) | **R** | **I** | **C** | **I** |
| Pruebas de Integración y Validaciones | **R** | **A** | **C** | **I** |
| Gestión de GitHub (Projects, Wiki, Develop, Main) | **R** | **A** | **C** | **A** |
| Demostración Presencial y Defensa Oral | **R** | **A** | **A** | **A** |

*(Referencias: **R** = Responsable de ejecución, **A** = Aprobador final, **C** = Consultado, **I** = Informado).*

---

## 4. Cronograma de Proyecto

### 4.1. Gráfico Gantt y Planificación de Sprints
La planificación se distribuye en 6 Sprints sincronizados acordados en el Plan de Acción oficial, con fecha de cierre y corte de commits los días domingo a las 23:59 hs:

```mermaid
gantt
    title Cronograma de Sprints - Biblioteca Virtual (PPII)
    dateFormat  YYYY-MM-DD
    section Sprint 1
    Inicio y Definición del Proyecto (Product Backlog) :done, s1, 2026-09-08, 2026-09-18
    section Sprint 2
    Planificación Sprint 1, Historias de Usuario y Repo Base :done, s2, 2026-09-19, 2026-10-02
    section Sprint 3
    Incremento 1: Catálogo Libros y Control Stock Inicial :done, s3, 2026-10-03, 2026-10-16
    section Sprint 4
    Incremento 2: Socios, Préstamos Transaccionales y Alertas :done, s4, 2026-10-17, 2026-10-30
    section Sprint 5
    Kardex, Stock Dinámico, Validaciones API y Reportes :done, s5, 2026-10-31, 2026-11-13
    section Sprint 6
    Cierre, Consolidación Release v1.0, Wiki y Defensa Final :done, s6, 2026-11-14, 2026-11-27
```

| ID | Actividad / Sprint | Fecha Inicio | Fecha Fin | Entregable Clave | Dependencia | Estado |
| :--- | :--- | :---: | :---: | :--- | :---: | :---: |
| **ACT-01** | **Sprint 1:** Inicio y Definición del Proyecto | 08/09/2026 | 18/09/2026 | Product Backlog inicial, alcance, repositorio GitHub creado. | - | ✅ Aprobado |
| **ACT-02** | **Sprint 2:** Planificación e Historias de Usuario | 19/09/2026 | 02/10/2026 | Historias de usuario detalladas, criterios de aceptación, servidor base. | ACT-01 | ✅ Aprobado |
| **ACT-03** | **Sprint 3:** Desarrollo del Primer Incremento | 03/10/2026 | 16/10/2026 | CRUD Catálogo Libros, Búsqueda, Stock inicial, commits periódicos. | ACT-02 | ✅ Aprobado |
| **ACT-04** | **Sprint 4:** Socios, Préstamos y Alertas | 17/10/2026 | 30/10/2026 | CRUD Socios, Préstamos atómicos, Alertas morosidad, Evidencias. | ACT-03 | ✅ Aprobado |
| **ACT-05** | **Sprint 5:** Kardex, Validaciones Estrictas y Reportes | 31/10/2026 | 13/11/2026 | Dashboard, Kardex dinámico (+/-), bloqueo de '2abc' y reporte morosos. | ACT-04 | ✅ Aprobado |
| **ACT-06** | **Sprint 6:** Consolidación Release v1.0 y Defensa | 14/11/2026 | 27/11/2026 | Merge `develop` -> `main`, tag v1.0.0, Wiki y preparación de defensa. | ACT-05 | ✅ Completado |

### 4.2. Hitos del Proyecto
| ID | Hito Principal | Fecha Límite | Criterio de Cumplimiento | Estado |
| :--- | :--- | :---: | :--- | :---: |
| **HIT-01** | Definición y Aprobación de Alcance | 18/09/2026 | Repositorio activo, PMI base y Product Backlog aprobados por cátedra. | ✅ Cumplido |
| **HIT-02** | Planificación de Sprints y Backlog | 02/10/2026 | Historias de usuario formalizadas con criterios de aceptación en Markdown. | ✅ Cumplido |
| **HIT-03** | Primer Incremento Funcional Demostrado | 16/10/2026 | Módulo de Catálogo funcional presentado en encuentro presencial. | ✅ Cumplido |
| **HIT-04** | Segundo Incremento: Préstamos y Socios | 30/10/2026 | Flujo de préstamos y devoluciones validado con control de concurrencia. | ✅ Cumplido |
| **HIT-05** | Integridad, Kardex y Reportes | 13/11/2026 | Kardex dinámico, rechazo estricto de '2abc' y reporte de morosos verificados. | ✅ Cumplido |
| **HIT-06** | Consolidación Final y Defensa Oral | 27/11/2026 | Release v1.0.0 en rama `main`, Wiki completa y proyecto listo para defensa. | ✅ Cumplido |

---

## 5. Presupuesto del Proyecto (Gestión de Costos)

Siguiendo los lineamientos del estándar PMI y los requisitos de la cátedra de Prácticas Profesionalizantes II, se presenta el presupuesto formal del proyecto. La **Línea de Base de Costos** monetiza el esfuerzo profesional, los recursos computacionales y los servicios consumidos para simular un contexto productivo real.

### 5.1. Estructura de Desglose de Costos

#### A. Mano de Obra Directa (Recursos Humanos)
- **Perfil profesional:** Desarrollador Full-Stack Junior / Scrum Master (Leandro Asis).
- **Tarifa horaria de referencia (mercado IT junior):** $8.000 ARS / hora.
- **Dedicación total:** 6 Sprints x 15 horas = **90 horas de desarrollo**.
- **Subtotal Mano de Obra:** 90 hs x $8.000 = **$720.000 ARS**.

#### B. Costos Directos de Infraestructura y Equipamiento
- **Amortización de Hardware:** Equipo de cómputo personal asignado al desarrollo durante 6 semanas = **$50.000 ARS**.
- **Servicios Conectividad e Internet:** Proveedor de banda ancha (proporcional al uso del proyecto) = **$25.000 ARS**.
- **Consumo Energético:** Electricidad asociada a la estación de trabajo = **$10.000 ARS**.
- **Subtotal Infraestructura:** **$85.000 ARS**.

#### C. Costos de Software y Herramientas
- **Node.js, Express, SQLite3:** Licencias Open Source / MIT = **$0 ARS**.
- **Git y GitHub:** Plan gratuito académico para repositorios, Projects y Wiki = **$0 ARS**.
- **Visual Studio Code:** Licencia gratuita = **$0 ARS**.
- **Subtotal Software:** **$0 ARS**.

#### D. Reserva de Contingencia
- Se asigna un **10%** sobre el costo directo operativo para absorber desvíos de tiempo o requerimientos adicionales derivados de retroalimentaciones docentes:
- **Reserva de Contingencia:** 10% de ($720.000 + $85.000) = **$80.500 ARS**.

### 5.2. Distribución de Esfuerzo (90 Horas / 6 Sprints)
En respuesta a las observaciones de la cátedra, se detalla la correspondencia exacta entre las semanas de cursada, los Sprints y las 90 horas presupuestadas:

| Sprint / Semana | Período de Ejecución | Foco del Sprint | Horas Planificadas | Costo Asociado (ARS) |
| :---: | :---: | :--- | :---: | :---: |
| **Sprint 1 (Semana 1)** | 08/09/2026 - 18/09/2026 | Inicio, Product Backlog, PMI y Repo Base | 15 hs | $120.000 |
| **Sprint 2 (Semana 2)** | 19/09/2026 - 02/10/2026 | Arquitectura Express, SQLite y CRUD Libros Base | 15 hs | $120.000 |
| **Sprint 3 (Semana 3)** | 03/10/2026 - 16/10/2026 | Incremento 1: Catálogo, Stock Inicial y Búsqueda | 15 hs | $120.000 |
| **Sprint 4 (Semana 4)** | 17/10/2026 - 30/10/2026 | Incremento 2: Socios, Préstamos y Alertas | 15 hs | $120.000 |
| **Sprint 5 (Semana 5)** | 31/10/2026 - 13/11/2026 | Dashboard, Kardex Dinámico, Backend y Reporte | 15 hs | $120.000 |
| **Sprint 6 (Semana 6)** | 14/11/2026 - 27/11/2026 | Release v1.0, Merge `main`, Wiki y Defensa Oral | 15 hs | $120.000 |
| **TOTALES** | **6 Semanas de Ejecución** | **Ciclo Completo de Prácticas Profesionalizantes** | **90 hs** | **$720.000** |

### 5.3. Línea de Base de Costos (Presupuesto Total)
| Rubro | Concepto | Base de Cálculo | Monto Estimado (ARS) |
| :--- | :--- | :--- | :---: |
| 1.0 | Recursos Humanos | 90 horas hombre de desarrollo y gestión Scrum (15 hs/semana) | $720.000 |
| 2.0 | Infraestructura | Amortización de PC, internet y energía eléctrica durante 6 semanas | $85.000 |
| 3.0 | Software y Plataformas | Licencias de código abierto y GitHub Free | $0 |
| 4.0 | Reserva de Contingencia | 10% para imprevistos de alcance, ajustes técnicos y re-trabajo | $80.500 |
| **TOTAL** | **Presupuesto Total del Proyecto** | **Línea Base de Costos (BAC)** | **$885.500 ARS** |

### 5.4. Control y Monitoreo del Presupuesto
El control del costo se efectúa midiendo las horas efectivas insumidas en cada Sprint frente a las horas presupuestadas (15 horas por semana), asegurando que el esfuerzo se mantenga dentro de los límites planificados y no se incurra en desvíos temporales que eleven el costo de oportunidad.

---

## 6. Registro y Gestión de Riesgos

### 6.1. Matriz de Evaluación Cualitativa y Cuantitativa
- **Probabilidad:** Baja (1), Media (2), Alta (3).
- **Impacto:** Bajo (1), Medio (2), Alto (3).
- **Nivel de Severidad:** Leve (1-2), Moderado (3-4), Crítico (6-9).

| ID | Riesgo Identificado | Prob. | Imp. | Severidad | Disparador (Trigger) |
| :--- | :--- | :---: | :---: | :---: | :--- |
| **RSG-01** | Incompatibilidad del entorno Node.js/SQLite en PC del laboratorio durante la demostración presencial. | Media (2) | Alto (3) | **Crítico (6)** | PC del laboratorio sin dependencias o permisos bloqueados. |
| **RSG-02** | Incumplimiento del horario límite de commits semanales fijado por la cátedra (domingos 23:59 hs). | Media (2) | Alto (3) | **Crítico (6)** | Falta de commits registrados el domingo a la medianoche. |
| **RSG-03** | Inconsistencia de integridad referencial en SQLite por falta de activación forzada de foreign keys. | Media (2) | Medio (2) | **Moderado (4)** | Creación de préstamos con socios inexistentes o eliminación de libros vinculados. |
| **RSG-04** | Error de ejecución en script de inicialización (`seed.js`) al ser probado desde cero por los evaluadores. | Media (2) | Alto (3) | **Crítico (6)** | Mensaje `no such table: libros` al ejecutar `npm run seed` en repo recién clonado. |
| **RSG-05** | Fallas de codificación de caracteres en GitHub (tildes rotas en archivos Markdown). | Baja (1) | Bajo (1) | **Leve (1)** | Visualización de caracteres extraños en títulos o descripciones. |
| **RSG-06** | Condiciones de carrera (race conditions) en préstamos o devoluciones simultáneas de stock. | Media (2) | Alto (3) | **Crítico (6)** | Stock negativo o devoluciones duplicadas ante peticiones concurrentes. |

### 6.2. Planes de Mitigación y Contingencia
| ID | Estrategia de Respuesta | Plan de Mitigación (Preventivo) | Plan de Contingencia (Correctivo) |
| :--- | :--- | :--- | :--- |
| **RSG-01** | Mitigar / Transferir | Notificar con antelación a la docente. Llevar equipo portátil propio con la aplicación levantada. | Disponer de un pendrive con Node.js portable, código descargado y base de datos con seed lista. |
| **RSG-02** | Mitigar | Fijar como rutina de trabajo el congelamiento y push de commits los domingos a las 20:00 hs (4 hs de margen). | Generar el commit local fechado y documentar el incidente en la minuta de la semana. |
| **RSG-03** | Evitar | Incluir `PRAGMA foreign_keys = ON;` al conectar la base de datos y validar existencia en API. | Validar del lado del servidor existencia previa y aplicar bloqueos explícitos con HTTP 400. |
| **RSG-04** | Evitar | Asegurar que `src/seed.js` verifique y cree la estructura de tablas de forma síncrona antes de insertar datos. | Actualizar el README indicando la secuencia exacta de comandos de arranque. |
| **RSG-05** | Mitigar | Forzar codificación UTF-8 pura en el editor para todos los archivos `.md`, `.js`, `.html` y `.css`. | Reemplazar caracteres dañados y re-commitear con mensaje de saneamiento de codificación. |
| **RSG-06** | Evitar | Encapsular operaciones en transacciones atómicas `runInTransaction` (`BEGIN IMMEDIATE` / `COMMIT`) con `WHERE stock_disponible > 0`. | Revertir con `ROLLBACK` y retornar HTTP 400 impidiendo stock inconsistente. |

---

## 7. Control de Cambios

### 7.1. Comité de Control de Cambios
El Comité de Control de Cambios está conformado por:
- **Leandro Nallib Asis** (Desarrollador / Solicitante).
- **Prof. Mónica Yamil Alvarado** (Docente Titular / Evaluadora).
- **Prof. Christian Di Guardi** (Asesor Técnico).
- **Prof. Fernando Juárez** (Coordinación).

### 7.2. Procedimiento de Control de Cambios
1. **Identificación:** Se detecta una solicitud de cambio a partir de una retroalimentación docente presencial o por correo.
2. **Registro:** Se documenta el cambio propuesto en el Anexo III (Control de Cambios) y se actualiza el Product Backlog.
3. **Análisis de Impacto:** Se evalúa la incidencia sobre el cronograma, la arquitectura de código y la línea base de costos.
4. **Aprobación:** La docente a cargo aprueba formalmente la inclusión del cambio en el siguiente Sprint.
5. **Implementación y Trazabilidad:** Se crea una rama `feature/nombre-del-cambio`, se realizan los commits correspondientes y se vincula el Pull Request a la historia de usuario en el tablero Kanban.

---

## 8. Comunicaciones Interpersonales en el Proyecto

| Canal / Evento | Emisor | Receptor | Frecuencia | Medio | Registro / Evidencia |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Encuentro Presencial de Seguimiento** | Estudiante / Docente | Docentes / Estudiante | Semanal / Quincenal (**Viernes 15:40 hs**) | Presencial en Sede ISBH | Minutas de Reunión (Anexo II) y planilla de seguimiento. |
| **Cierre Semanal de Entregas** | Estudiante | Cátedra evaluadora | Semanal (**Domingos 23:59 hs**) | Repositorio GitHub | Historial de commits en rama `develop` / `main`. |
| **Gestión Ágil de Tareas** | Estudiante | Cátedra / Interesados | Continuo | GitHub Projects (Kanban) | Tarjetas de Historias de Usuario en Todo / In Progress / Done. |
| **Consultas y Novedades Formales** | Estudiante / Docentes | Docentes / Estudiante | Asíncrono según necesidad | Correo Electrónico Institucional | Hilos de correo archivados como minutas complementarias. |

---

## 9. Plan de Pruebas y Aceptación

| ID | Módulo / Funcionalidad | Caso de Prueba | Resultado Esperado | Criterio de Aceptación |
| :--- | :--- | :--- | :--- | :--- |
| **PRB-01** | Catálogo de Libros (CRUD) | Alta de libro con ISBN repetido o título vacío. | Rechazo con HTTP 400 en API. | No se insertan registros incompletos ni ISBNs duplicados. |
| **PRB-02** | Control de Stock al Prestar | Intento de préstamo de un ejemplar cuyo `stock_disponible` es 0. | Bloqueo con HTTP 400 sin generar stock negativo. | El stock permanece inmutable en 0. |
| **PRB-03** | Devolución de Ejemplar | Devolución de un préstamo activo de un libro. | Pasa a 'Devuelto', registra fecha y stock aumenta en 1. | Stock y estado actualizados de forma atómica en SQLite. |
| **PRB-04** | Eliminación de Libro / Socio | Intento de eliminación de entidad con préstamos activos o historial devuelto. | Se impide el borrado con alerta de auditoría. | Se preserva la integridad del historial de préstamos. |
| **PRB-05** | Alertas de Vencimiento | Visualización de préstamos activos con más de 15 días. | Resaltado en color rojo indicando morosidad. | Cumplimiento del criterio visual de HU 3.4. |
| **PRB-06** | Kardex y Stock Dinámico | Alta inicial (+8), préstamo (-1), devolución (+1), daño (-1). | Stock dinámico acumulado igual a 7 unidades. | Cumplimiento estricto del cálculo dinámico por movimientos. |
| **PRB-07** | Validación Estricta Backend | Envío de stock `"2abc"` al endpoint `POST /api/libros`. | Servidor rechaza con HTTP 400 sin parsear a 2. | Validación regex `/^\d+$/` estricta (HU 4.1). |

---

## 10. Gestión de Subcontratistas
No aplica al tratarse de un proyecto académico individual.

---

## 11. Logística y Entorno de Ejecución
- **Lugar de desarrollo habitual:** Estación de trabajo particular del alumno con acceso a herramientas de desarrollo.
- **Entorno de presentación presencial:** Laboratorio de informática del ISBH o computadora portátil del alumno.
- **Requerimientos de software necesarios para demostración:**
  - Node.js versión LTS (v18 o superior).
  - Git para sincronización de repositorio.
  - Navegador web compatible (Google Chrome, Firefox o Microsoft Edge).
  - Terminal de comandos con permisos de ejecución de Node.js.

---

## 12. Anexo I - Contratos
No aplica por tratarse de un proyecto de evaluación académica.

---

## 13. Anexo II – Minutas de Reunión y Comunicaciones

### Minuta 1: Sprint 1 - Inicio y Definición
- **Fecha:** 18 de septiembre de 2026.
- **Participantes:** Leandro Nallib Asis, Mónica Yamil Alvarado.
- **Temas tratados:** Presentación de la idea del sistema de Biblioteca Virtual, fundamentación bajo metodología Scrum individual, aprobación del alcance inicial y creación del repositorio oficial en GitHub.

### Minuta 2: Sprint 2 - Planificación y Product Backlog
- **Fecha:** 02 de octubre de 2026.
- **Participantes:** Leandro Nallib Asis, Mónica Yamil Alvarado.
- **Temas tratados:** Revisión de las Historias de Usuario, definición de criterios de aceptación y acuerdos sobre el diseño de la base de datos en SQLite. Se acuerda iniciar el desarrollo del módulo de catálogo de libros.

### Minuta 3: Sprint 3 - Seguimiento Presencial del Primer Incremento
- **Fecha:** 16 de octubre de 2026 (Encuentro presencial).
- **Participantes:** Leandro Nallib Asis, Mónica Yamil Alvarado, Christian Di Guardi, Fernando Juárez.
- **Logros reconocidos:** Repositorio creado, documentación base elaborada, organización lograda y utilización inicial de ramas.
- **Compromisos adoptados:** Actualizar horarios a viernes 15:40 hs y domingos 23:59 hs, alinear Gantt, desarrollar costos y riesgos, implementar rama `develop` y GitHub Projects/Wiki.

### Minuta Complementaria: Reporte Técnico de Asesoría
- **Fecha:** 17 de octubre de 2026 (Comunicación por correo).
- **Emisor:** Prof. Christian Di Guardi.
- **Aportes técnicos adoptados:** Corrección de `seed.js` para crear tablas si no existen, validaciones backend HTTP 400, activación de `PRAGMA foreign_keys = ON;` y codificación UTF-8 pura.

### Minuta 4: Sprint 4 - Cierre Asincrónico y Devolución de Cátedra
- **Fecha:** 05 de noviembre de 2026 (Comunicación oficial vía correo electrónico).
- **Participantes:** Equipo docente evaluador de PPII, Leandro Nallib Asis.
- **Logros validados:** Módulos de socios, préstamos y devoluciones verificados en `develop`. Carga inicial desde base nueva comprobada.
- **Ajustes de cierre implementados:** Bloqueo explícito de bajas con historial de préstamos devueltos para auditoría, blindaje transaccional atómico contra concurrencia y doble devolución, replanificación formal de HU 3.1 al Sprint 5 y matriz de evidencias de prueba.

### Minuta 5: Sprint 5 - Incremento Técnico, Kardex y Reporte de Morosidad
- **Fecha:** 18 de noviembre de 2026 (Reunión / Devolución técnica docente).
- **Participantes:** Leandro Nallib Asis, Equipo docente evaluador.
- **Requerimientos abordados e implementados:**
  1. **Sistema de Movimientos y Kardex (Event Sourcing de Stock):** Creación de la tabla `movimientos_stock` para auditar cada variación (+ingreso, -préstamo, +devolución, -daño) y calcular el stock dinámicamente en base a movimientos.
  2. **Trazabilidad bidireccional:** Visualización del Kardex por libro (HU 3.5) y de la ficha histórica de lectura por socio.
  3. **Validaciones estrictas de Backend (HU 4.1):** Rechazo estricto con HTTP 400 de strings como `"2abc"` y tipos alfanuméricos en stock.
  4. **Reporte de Morosos (HU 5.1):** Pantalla dedicada con listado de socios adeudando préstamos con más de 15 días, datos de contacto e impresión.
  5. **Panel de Control (HU 3.1):** Dashboard en pantalla principal con 5 tarjetas métricas y accesos rápidos.

### Minuta 6: Sprint 6 - Cierre de Proyecto, Consolidación Release v1.0 y Defensa
- **Fecha:** 20 de noviembre de 2026.
- **Participantes:** Leandro Nallib Asis (Desarrollador / Scrum Master).
- **Acciones finales ejecutadas:**
  1. Integración definitiva de la rama `develop` en la rama `main` bajo flujo GitFlow.
  2. Generación del release de entrega final **Release v1.0.0**.
  3. Sincronización completa de la documentación técnica y metodológica en `PMI.md`, `historias_de_usuario.md` y `README.md`.
  4. Verificación integral de despliegue local limpio mediante `npm install`, `npm run seed` y `npm start`.
  5. Preparación del guion de defensa oral y carpetas de evidencia para la mesa examinadora presencial.

---

## 14. Anexo III – Documentos de Control de Cambios
- **Solicitud CC-01 (17/10/2026):** Adecuación del cronograma a Sprints oficiales, formalización de presupuesto y mitigación de riesgos presenciales. Estado: **Aprobado e Implementado**.
- **Solicitud CC-02 (17/10/2026):** Adopción de rama `develop` y flujo GitFlow estándar con corte los domingos a las 23:59 hs. Estado: **Aprobado e Implementado**.
- **Solicitud CC-03 (05/11/2026):** Replanificación de HU 3.1 (Dashboard) para Sprint 5, blindaje transaccional de concurrencia y bloqueo explícito con preservación de auditoría en bajas de libros y socios. Estado: **Aprobado e Implementado**.
- **Solicitud CC-04 (18/11/2026):** Implementación del sistema de Kardex / Movimientos inmutables de stock (Event Sourcing), cálculo dinámico de inventario, trazabilidad de lectores, validaciones estrictas anti-"2abc" y reporte especializado de morosidad. Estado: **Aprobado e Implementado**.

---

## 15. Anexo IV – Otros Documentos y Enlaces
- **Repositorio de GitHub:** [https://github.com/LeandroNallibAsis/biblioteca-virtual.git](https://github.com/LeandroNallibAsis/biblioteca-virtual.git)
- **Product Backlog y Trazabilidad:** Archivo `historias_de_usuario.md` en la raíz del repositorio.
- **Documentación en la Nube:** [Carpeta Google Drive Oficial](https://drive.google.com/drive/folders/1Um9Vl5dBuFflwhE02sFL_Qz-B1nTBtRn?usp=sharing)
- **Tablero Ágil (Kanban):** [GitHub Projects - Tablero Scrum del Proyecto](https://github.com/users/LeandroNallibAsis/projects/1)
- **Wiki del Proyecto:** [GitHub Wiki - Documentación Oficial PMI](https://github.com/LeandroNallibAsis/biblioteca-virtual/wiki)
