document.addEventListener('DOMContentLoaded', () => {
    const linkCatalogo = document.getElementById('link-catalogo');
    const linkPrestamos = document.getElementById('link-prestamos');
    const linkSocios = document.getElementById('link-socios');
    const appContent = document.getElementById('app-content');

    // Función para cargar el catálogo
    const cargarCatalogo = async () => {
        appContent.innerHTML = '<h2>Cargando catálogo...</h2>';
        try {
            const res = await fetch('/api/libros');
            const libros = await res.json();
            
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
                    </tr>
                </thead>
                <tbody>`;
                
            if (libros.length === 0) {
                html += `<tr><td colspan="5" style="text-align: center; padding: 10px;">No hay libros registrados.</td></tr>`;
            } else {
                libros.forEach(l => {
                    html += `<tr>
                        <td style="padding: 8px;">${l.titulo}</td>
                        <td style="padding: 8px;">${l.autor}</td>
                        <td style="padding: 8px;">${l.genero || '-'}</td>
                        <td style="padding: 8px;">${l.isbn}</td>
                        <td style="padding: 8px;">${l.stock_disponible} / ${l.stock_total}</td>
                    </tr>`;
                });
            }
            html += `</tbody></table>`;
            appContent.innerHTML = html;

            // Evento para el botón "Nuevo Libro"
            document.getElementById('btn-nuevo').addEventListener('click', mostrarFormularioLibro);
            
        } catch (error) {
            console.error(error);
            appContent.innerHTML = '<p>Error al cargar el catálogo.</p>';
        }
    };

    // Función para mostrar el formulario de agregar libro
    const mostrarFormularioLibro = () => {
        appContent.innerHTML = `
            <h2>Registrar Nuevo Libro</h2>
            <form id="form-libro" style="display: flex; flex-direction: column; max-width: 400px; gap: 10px;">
                <label>Título:</label>
                <input type="text" id="titulo" required>
                
                <label>Autor:</label>
                <input type="text" id="autor" required>
                
                <label>Género:</label>
                <input type="text" id="genero">
                
                <label>ISBN:</label>
                <input type="text" id="isbn" required>
                
                <label>Stock inicial (cantidad de copias):</label>
                <input type="number" id="stock" min="1" value="1" required>
                
                <div style="display: flex; gap: 10px; margin-top: 10px;">
                    <button type="submit" style="padding: 10px; background: #27ae60; color: white; border: none; cursor: pointer; border-radius: 5px;">Guardar Libro</button>
                    <button type="button" id="btn-cancelar" style="padding: 10px; background: #c0392b; color: white; border: none; cursor: pointer; border-radius: 5px;">Cancelar</button>
                </div>
            </form>
        `;

        // Volver al catálogo al cancelar
        document.getElementById('btn-cancelar').addEventListener('click', cargarCatalogo);

        // Guardar libro
        document.getElementById('form-libro').addEventListener('submit', async (e) => {
            e.preventDefault();
            const nuevoLibro = {
                titulo: document.getElementById('titulo').value,
                autor: document.getElementById('autor').value,
                genero: document.getElementById('genero').value,
                isbn: document.getElementById('isbn').value,
                stock: document.getElementById('stock').value
            };

            try {
                const res = await fetch('/api/libros', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(nuevoLibro)
                });

                if (res.ok) {
                    alert('Libro registrado con éxito');
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

    // Navegación principal
    linkCatalogo.addEventListener('click', (e) => {
        e.preventDefault();
        cargarCatalogo();
    });

    linkPrestamos.addEventListener('click', (e) => {
        e.preventDefault();
        appContent.innerHTML = '<h2>Gestión de Préstamos</h2><p>Módulo en desarrollo (semana 4)...</p>';
    });

    linkSocios.addEventListener('click', (e) => {
        e.preventDefault();
        appContent.innerHTML = '<h2>Gestión de Socios</h2><p>Módulo en desarrollo...</p>';
    });
});
