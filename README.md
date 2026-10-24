# Biblioteca Virtual - Prácticas Profesionalizantes II

Proyecto final desarrollado para la evaluación en condición de libre del espacio curricular **Prácticas Profesionalizantes II** (Tecnicatura Superior en Desarrollo de Software - ISBH / UPC).

---

## 📖 Descripción del Proyecto
Sistema web para la gestión integral de una biblioteca escolar/institucional, permitiendo el control ágil del catálogo de libros, el padrón de socios (lectores) y el seguimiento en tiempo real de préstamos y devoluciones con recálculo automático de inventario físico.

El proyecto se desarrolla bajo el marco de trabajo **Scrum** (adaptado a modalidad individual), evidenciando planificación evolutiva por Sprints, desarrollo incremental y control de versiones profesional en GitHub.

---

## 🚀 Funcionalidades Principales
* **Catálogo de Libros (CRUD):** Altas, bajas, modificaciones y consultas con ISBN único y control de stock.
* **Búsqueda Dinámica:** Filtrado reactivo en tiempo real por título o autor.
* **Gestión de Socios (CRUD):** Padrón de lectores con validación que impide eliminar socios con préstamos activos.
* **Módulo de Préstamos y Devoluciones:** Asignación transaccional (`BEGIN TRANSACTION` / `COMMIT`) que descuenta e incrementa stock disponible de forma segura.
* **Alertas de Vencimiento:** Resaltado visual en el historial para préstamos con más de 15 días de antigüedad.
* **Integridad y Validaciones Backend:** API REST con validaciones estrictas y claves foráneas SQLite activadas (`PRAGMA foreign_keys = ON;`).

---

## 🛠️ Tecnologías Utilizadas
Arquitectura monolítica limpia con tecnologías aprendidas durante la carrera:
* **Frontend:** HTML5, CSS3 y Vanilla JavaScript moderno.
* **Backend:** Node.js con framework Express.
* **Base de Datos:** SQLite3 (archivo local persistente `biblioteca.db`).
* **Control de Versiones y Gestión:** Git, GitHub Flow / GitFlow (`main`, `develop`, `feature/*`), GitHub Projects (Kanban) y GitHub Wiki.

---

## ⚙️ Instalación y Ejecución Local

### Prerrequisitos
Asegurate de contar con [Node.js](https://nodejs.org/) (versión LTS v18 o superior) y Git instalados en tu sistema.

### Pasos de Instalación
1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/LeandroNallibAsis/biblioteca-virtual.git
   cd biblioteca-virtual
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **(Recomendado) Cargar datos de prueba iniciales:**
   El script de seed crea automáticamente la estructura de tablas si no existen y precarga libros y socios de muestra:
   ```bash
   npm run seed
   ```

4. **Iniciar el servidor:**
   ```bash
   npm start
   ```

5. **Acceder a la aplicación:**
   Abrí tu navegador web en `http://localhost:3000`.

---

## 🌿 Flujo de Trabajo en Git y Gestión de Ramas
El proyecto aplica buenas prácticas de control de versiones:
* `main`: Rama de producción donde residen las versiones consolidadas y demostrables de cada Sprint.
* `develop`: Rama principal de integración para el trabajo continuo.
* `feature/<nombre>`: Ramas específicas para cada Historia de Usuario, las cuales se integran a `develop` mediante Pull Requests.
* **Política de Commits:** Commits atómicos, progresivos y descriptivos, con fecha límite de entrega semanal fijada los **domingos a las 23:59 horas**.

---

## 📂 Documentación Metodológica y Enlaces
* 📄 [Plan de Gestión de Proyecto (PMI)](./PMI.md): Cronograma Gantt de 6 Sprints, Gestión de Costos, Registro de Riesgos y Minutas de Reunión.
* 📋 [Product Backlog e Historias de Usuario](./historias_de_usuario.md): Historias de usuario detalladas, criterios de aceptación y matriz de trazabilidad a futuro.
* 📊 **GitHub Projects:** Tablero Kanban para el seguimiento ágil de Sprints.
* 📚 **GitHub Wiki:** Copia viva de la documentación institucional del proyecto.
* ☁️ [Carpeta Google Drive](https://drive.google.com/drive/folders/1Um9Vl5dBuFflwhE02sFL_Qz-B1nTBtRn?usp=sharing): Documentación de acompañamiento y respaldos en la nube.

---

**Autor:** Leandro Nallib Asis  
**Cátedra:** Prácticas Profesionalizantes II  
**Institución:** Instituto Superior Bernardo Houssay / Universidad Provincial de Córdoba  
