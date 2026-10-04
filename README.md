# Biblioteca Virtual - Prácticas Profesionalizantes II

Proyecto final desarrollado para la evaluación en condición de libre del espacio curricular **Prácticas Profesionalizantes II** (Tecnicatura Superior en Desarrollo de Software - ISBH / UPC).

## 📖 Descripción del Proyecto
Sistema de gestión para una biblioteca que permite el control eficiente del catálogo de libros, el registro de socios (lectores) y el seguimiento en tiempo real de los préstamos y devoluciones de ejemplares.

El proyecto fue construido bajo la **Metodología Ágil Scrum** (adaptada para desarrollo individual), demostrando una planificación progresiva, desarrollo incremental y uso de control de versiones.

## 🚀 Funcionalidades Principales
*   **Catálogo de Libros (CRUD):** Alta, baja, modificación y listado de obras.
*   **Búsqueda Dinámica:** Filtrado en tiempo real por título o autor.
*   **Gestión de Socios (CRUD):** Registro de lectores con validación de préstamos activos antes de permitir eliminaciones.
*   **Sistema de Préstamos:** Vinculación de Socios con Libros.
*   **Control de Inventario:** Recálculo matemático automático del stock disponible al realizar préstamos o devoluciones.

## 🛠️ Tecnologías Utilizadas
El sistema implementa una arquitectura monolítica con tecnologías aprendidas durante la cursada, garantizando un código limpio y libre de dependencias complejas:

*   **Frontend (Vista):** HTML5, CSS3 y Vanilla JavaScript (puro).
*   **Backend (API REST):** Node.js utilizando el framework Express.
*   **Base de Datos (Persistencia):** SQLite (archivo local `biblioteca.db`).

## ⚙️ Instalación y Ejecución Local

Para correr el proyecto en tu computadora, asegurate de tener [Node.js](https://nodejs.org/) instalado.

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/LeandroNallibAsis/biblioteca-virtual.git
   cd biblioteca-virtual
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **(Opcional) Cargar datos de prueba:**
   Si querés cargar libros y socios de ejemplo automáticamente, ejecutá:
   ```bash
   npm run seed
   ```

4. **Iniciar el servidor:**
   ```bash
   npm start
   ```

5. **Abrir la aplicación:**
   Ingresá a `http://localhost:3000` en tu navegador web.

## 📂 Documentación y Proceso (Scrum)
Todo el proceso metodológico que respalda la construcción de este software se encuentra documentado en los siguientes archivos de la raíz del proyecto:
*   [PMI.md](./PMI.md): Plan de Gestión del Proyecto (Riesgos, Gantt, Matriz RACI).
*   [historias_de_usuario.md](./historias_de_usuario.md): Product Backlog con Criterios de Aceptación detallados.

**Autor:** Leandro Nallib Asis  
**Institución:** Instituto Superior Bernardo Houssay / Universidad Provincial de Córdoba
