document.addEventListener('DOMContentLoaded', () => {
    const linkCatalogo = document.getElementById('link-catalogo');
    const linkPrestamos = document.getElementById('link-prestamos');
    const linkSocios = document.getElementById('link-socios');
    const appContent = document.getElementById('app-content');

    // Estado global simple para guardar los libros cargados y poder editarlos
    let librosActuales = [];

    // Función para cargar el catálogo
    const cargarCatalogo = async () => {
        appContent.innerHTML = '<h2>Cargando catálogo...</h2>';
        try {
            const res = await fetch('/api/libros');
            const libros = await res.json();
            librosActuales = libros;
            
            let html = `<h2>Catálogo de Libros</h2>
            <button id="btn-nuevo" style="padding: 10px; cursor: pointer; background: #2c3e50; color: white; border: none; border-radius: 5px;">+ Nuevo Libro</button>
            <table border="1" width="100%" style="margin-top: 1rem; border-collapse: collapse; text-align: left;">
                <thead>
                    <tr style="background-color: #eee;">
                        <th style="padding: 8px;">Título</th>
                        <th style="padding: 8px;">Autor</th>
                        <th style="padding: 8px;">Género</th>
                        <th style="padding: 8px;">ISBN</th>
                        <th style="padding: 8px;">Stock Disp.</th>
                        <th style="padding: 8px;">Acciones</th>
                    </tr>
                </thead>
                <tbody>`;
                
            if (libros.length === 0) {
                html += `<tr><td colspan="6" style="text-align: center; padding: 10px;">No hay libros registrados.</td></tr>`;
            } else {
                libros.forEach(l => {
                    html += `<tr>
                        <td style="padding: 8px;">${l.titulo}</td>
                        <td style="padding: 8px;">${l.autor}</td>
                        <td style="padding: 8px;">${l.genero || '-'}</td>
                        <td style="padding: 8px;">${l.isbn}</td>
                        <td style="padding: 8px;">${l.stock_disponible} / ${l.stock_total}</td>
                        <td style="padding: 8px;">
                            <button onclick="editarLibro(${l.id})" style="cursor: pointer; background: #f39c12; color: white; border: none; border-radius: 3px; padding: 5px;">Editar</button>
                            <button onclick="eliminarLibro(${l.id})" style="cursor: pointer; background: #e74c3c; color: white; border: none; border-radius: 3px; padding: 5px;">Eliminar</button>
                        </td>
                    </tr>`;
                });
            }
            html += `</tbody></table>`;
            appContent.innerHTML = html;

            document.getElementById('btn-nuevo').addEventListener('click', () => mostrarFormularioLibro());
            
        } catch (error) {
            console.error(error);
            appContent.innerHTML = '<p>Error al cargar el catálogo.</p>';
        }
    };

    // Función para mostrar el formulario (sirve para Crear y Editar)
    window.mostrarFormularioLibro = (libroId = null) => {
        let libro = { titulo: '', autor: '', genero: '', isbn: '', stock_total: 1 };
        let esEdicion = false;

        if (libroId) {
            esEdicion = true;
            libro = librosActuales.find(l => l.id === libroId);
        }

        appContent.innerHTML = `
            <h2>${esEdicion ? 'Editar Libro' : 'Registrar Nuevo Libro'}</h2>
            <form id="form-libro" style="display: flex; flex-direction: column; max-width: 400px; gap: 10px;">
                <label>Título:</label>
                <input type="text" id="titulo" value="${libro.titulo}" required>
                
                <label>Autor:</label>
                <input type="text" id="autor" value="${libro.autor}" required>
                
                <label>Género:</label>
                <input type="text" id="genero" value="${libro.genero || ''}">
                
                <label>ISBN:</label>
                <input type="text" id="isbn" value="${libro.isbn}" required>
                
                ${!esEdicion ? `
                <label>Stock inicial (cantidad de copias):</label>
                <input type="number" id="stock" min="1" value="1" required>
                ` : ''}
                
                <div style="display: flex; gap: 10px; margin-top: 10px;">
                    <button type="submit" style="padding: 10px; background: #27ae60; color: white; border: none; cursor: pointer; border-radius: 5px;">
                        ${esEdicion ? 'Guardar Cambios' : 'Registrar Libro'}
                    </button>
                    <button type="button" id="btn-cancelar" style="padding: 10px; background: #c0392b; color: white; border: none; cursor: pointer; border-radius: 5px;">Cancelar</button>
                </div>
            </form>
        `;

        document.getElementById('btn-cancelar').addEventListener('click', cargarCatalogo);

        document.getElementById('form-libro').addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const payload = {
                titulo: document.getElementById('titulo').value,
                autor: document.getElementById('autor').value,
                genero: document.getElementById('genero').value,
                isbn: document.getElementById('isbn').value
            };

            let url = '/api/libros';
            let method = 'POST';

            if (esEdicion) {
                url = '/api/libros/' + libroId;
                method = 'PUT';
            } else {
                payload.stock = document.getElementById('stock').value;
            }

            try {
                const res = await fetch(url, {
                    method: method,
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });

                if (res.ok) {
                    alert(esEdicion ? 'Libro actualizado con éxito' : 'Libro registrado con éxito');
                    cargarCatalogo();
                } else {
                    const data = await res.json();
                    alert('Error: ' + data.error);
                }
            } catch (error) {
                console.error('Error al guardar', error);
                alert('Ocurrió un error de red');
            }
        });
    };

    // Funciones globales para que los botones onclick de la tabla las encuentren
    window.editarLibro = (id) => {
        mostrarFormularioLibro(id);
    };

    window.eliminarLibro = async (id) => {
        if (!confirm('¿Estás seguro de que deseas eliminar este libro del catálogo?')) return;
        
        try {
            const res = await fetch('/api/libros/' + id, { method: 'DELETE' });
            if (res.ok) {
                alert('Libro eliminado');
                cargarCatalogo();
            } else {
                const data = await res.json();
                alert('Error al eliminar: ' + data.error);
            }
        } catch (error) {
            console.error('Error al eliminar', error);
            alert('Ocurrió un error de red');
        }
    };

    // Navegación principal
    linkCatalogo.addEventListener('click', (e) => {
        e.preventDefault();
        cargarCatalogo();
    });

    linkPrestamos.addEventListener('click', (e) => {
        e.preventDefault();
        appContent.innerHTML = '<h2>Gestión de Préstamos</h2><p>Módulo en desarrollo (Sprint 4)...</p>';
    });

    linkSocios.addEventListener('click', (e) => {
        e.preventDefault();
        appContent.innerHTML = '<h2>Gestión de Socios</h2><p>Módulo en desarrollo (Sprint 4)...</p>';
    });
});
