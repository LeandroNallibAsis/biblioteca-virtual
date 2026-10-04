document.addEventListener('DOMContentLoaded', () => {
    const linkCatalogo = document.getElementById('link-catalogo');
    const linkPrestamos = document.getElementById('link-prestamos');
    const linkSocios = document.getElementById('link-socios');
    const appContent = document.getElementById('app-content');

    let librosActuales = [];

    // Función para renderizar la tabla a partir de un arreglo de libros
    const renderizarTabla = (libros) => {
        let html = `
        <div style="display: flex; justify-content: space-between; align-items: center;">
            <h2>Catálogo de Libros</h2>
            <button id="btn-nuevo" style="padding: 10px; cursor: pointer; background: #2c3e50; color: white; border: none; border-radius: 5px;">+ Nuevo Libro</button>
        </div>
        
        <div style="margin-top: 1rem;">
            <input type="text" id="input-busqueda" placeholder="Buscar por título o autor..." style="width: 100%; padding: 8px; border-radius: 4px; border: 1px solid #ccc;">
        </div>

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
            html += `<tr><td colspan="6" style="text-align: center; padding: 10px;">No hay libros que coincidan.</td></tr>`;
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
        
        // Evento de búsqueda
        const inputBusqueda = document.getElementById('input-busqueda');
        inputBusqueda.addEventListener('keyup', (e) => {
            const query = e.target.value.toLowerCase();
            const librosFiltrados = librosActuales.filter(l => 
                l.titulo.toLowerCase().includes(query) || 
                l.autor.toLowerCase().includes(query)
            );
            // Volvemos a renderizar solo el tbody para no perder el foco del input
            const tbody = document.querySelector('tbody');
            if (librosFiltrados.length === 0) {
                tbody.innerHTML = `<tr><td colspan="6" style="text-align: center; padding: 10px;">No hay libros que coincidan.</td></tr>`;
            } else {
                let tbodyHtml = '';
                librosFiltrados.forEach(l => {
                    tbodyHtml += `<tr>
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
                tbody.innerHTML = tbodyHtml;
            }
        });
    };

    const cargarCatalogo = async () => {
        appContent.innerHTML = '<h2>Cargando catálogo...</h2>';
        try {
            const res = await fetch('/api/libros');
            librosActuales = await res.json();
            renderizarTabla(librosActuales);
        } catch (error) {
            console.error(error);
            appContent.innerHTML = '<p>Error al cargar el catálogo.</p>';
        }
    };

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
                
                <label>${esEdicion ? 'Stock total (sumar o restar copias):' : 'Stock inicial (cantidad de copias):'}</label>
                <input type="number" id="stock" min="1" value="${libro.stock_total}" required>
                
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
                payload.stock_total = document.getElementById('stock').value;
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

    let sociosActuales = [];

    // --- MÓDULO SOCIOS ---
    const cargarSocios = async () => {
        appContent.innerHTML = '<h2>Cargando socios...</h2>';
        try {
            const res = await fetch('/api/socios');
            sociosActuales = await res.json();
            renderizarTablaSocios();
        } catch (error) {
            console.error(error);
            appContent.innerHTML = '<p>Error al cargar los socios.</p>';
        }
    };

    const renderizarTablaSocios = () => {
        let html = `
        <div style="display: flex; justify-content: space-between; align-items: center;">
            <h2>Gestión de Socios</h2>
            <button id="btn-nuevo-socio" style="padding: 10px; cursor: pointer; background: #2c3e50; color: white; border: none; border-radius: 5px;">+ Nuevo Socio</button>
        </div>
        
        <table border="1" width="100%" style="margin-top: 1rem; border-collapse: collapse; text-align: left;">
            <thead>
                <tr style="background-color: #eee;">
                    <th style="padding: 8px;">Nombre Completo</th>
                    <th style="padding: 8px;">Teléfono</th>
                    <th style="padding: 8px;">Email</th>
                    <th style="padding: 8px;">Acciones</th>
                </tr>
            </thead>
            <tbody>`;
            
        if (sociosActuales.length === 0) {
            html += `<tr><td colspan="4" style="text-align: center; padding: 10px;">No hay socios registrados.</td></tr>`;
        } else {
            sociosActuales.forEach(s => {
                html += `<tr>
                    <td style="padding: 8px;">${s.nombre}</td>
                    <td style="padding: 8px;">${s.telefono || '-'}</td>
                    <td style="padding: 8px;">${s.email || '-'}</td>
                    <td style="padding: 8px;">
                        <button onclick="editarSocio(${s.id})" style="cursor: pointer; background: #f39c12; color: white; border: none; border-radius: 3px; padding: 5px;">Editar</button>
                        <button onclick="eliminarSocio(${s.id})" style="cursor: pointer; background: #e74c3c; color: white; border: none; border-radius: 3px; padding: 5px;">Eliminar</button>
                    </td>
                </tr>`;
            });
        }
        html += `</tbody></table>`;
        appContent.innerHTML = html;

        document.getElementById('btn-nuevo-socio').addEventListener('click', () => mostrarFormularioSocio());
    };

    window.mostrarFormularioSocio = (socioId = null) => {
        let socio = { nombre: '', telefono: '', email: '' };
        let esEdicion = false;

        if (socioId) {
            esEdicion = true;
            socio = sociosActuales.find(s => s.id === socioId);
        }

        appContent.innerHTML = `
            <h2>${esEdicion ? 'Editar Socio' : 'Registrar Nuevo Socio'}</h2>
            <form id="form-socio" style="display: flex; flex-direction: column; max-width: 400px; gap: 10px;">
                <label>Nombre Completo:</label>
                <input type="text" id="socio-nombre" value="${socio.nombre}" required>
                
                <label>Teléfono:</label>
                <input type="text" id="socio-telefono" value="${socio.telefono || ''}">
                
                <label>Email:</label>
                <input type="email" id="socio-email" value="${socio.email || ''}">
                
                <div style="display: flex; gap: 10px; margin-top: 10px;">
                    <button type="submit" style="padding: 10px; background: #27ae60; color: white; border: none; cursor: pointer; border-radius: 5px;">
                        ${esEdicion ? 'Guardar Cambios' : 'Registrar Socio'}
                    </button>
                    <button type="button" id="btn-cancelar-socio" style="padding: 10px; background: #c0392b; color: white; border: none; cursor: pointer; border-radius: 5px;">Cancelar</button>
                </div>
            </form>
        `;

        document.getElementById('btn-cancelar-socio').addEventListener('click', cargarSocios);

        document.getElementById('form-socio').addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const payload = {
                nombre: document.getElementById('socio-nombre').value,
                telefono: document.getElementById('socio-telefono').value,
                email: document.getElementById('socio-email').value
            };

            let url = '/api/socios';
            let method = 'POST';

            if (esEdicion) {
                url = '/api/socios/' + socioId;
                method = 'PUT';
            }

            try {
                const res = await fetch(url, {
                    method: method,
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });

                if (res.ok) {
                    alert(esEdicion ? 'Socio actualizado con éxito' : 'Socio registrado con éxito');
                    cargarSocios();
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

    window.editarSocio = (id) => {
        mostrarFormularioSocio(id);
    };

    window.eliminarSocio = async (id) => {
        if (!confirm('¿Estás seguro de que deseas eliminar este socio?')) return;
        
        try {
            const res = await fetch('/api/socios/' + id, { method: 'DELETE' });
            if (res.ok) {
                alert('Socio eliminado');
                cargarSocios();
            } else {
                const data = await res.json();
                alert('Error al eliminar: ' + data.error);
            }
        } catch (error) {
            console.error('Error al eliminar', error);
            alert('Ocurrió un error de red');
        }
    };

    // --- MÓDULO PRÉSTAMOS ---
    let prestamosActuales = [];

    const cargarPrestamos = async () => {
        appContent.innerHTML = '<h2>Cargando préstamos...</h2>';
        try {
            const res = await fetch('/api/prestamos');
            prestamosActuales = await res.json();
            renderizarTablaPrestamos();
        } catch (error) {
            console.error(error);
            appContent.innerHTML = '<p>Error al cargar los préstamos.</p>';
        }
    };

    const renderizarTablaPrestamos = () => {
        let html = `
        <div style="display: flex; justify-content: space-between; align-items: center;">
            <h2>Gestión de Préstamos</h2>
            <button id="btn-nuevo-prestamo" style="padding: 10px; cursor: pointer; background: #2c3e50; color: white; border: none; border-radius: 5px;">+ Nuevo Préstamo</button>
        </div>
        
        <table border="1" width="100%" style="margin-top: 1rem; border-collapse: collapse; text-align: left;">
            <thead>
                <tr style="background-color: #eee;">
                    <th style="padding: 8px;">Libro</th>
                    <th style="padding: 8px;">Socio</th>
                    <th style="padding: 8px;">Fecha Préstamo</th>
                    <th style="padding: 8px;">Estado</th>
                    <th style="padding: 8px;">Acciones</th>
                </tr>
            </thead>
            <tbody>`;
            
        if (prestamosActuales.length === 0) {
            html += `<tr><td colspan="5" style="text-align: center; padding: 10px;">No hay préstamos registrados.</td></tr>`;
        } else {
            const hoy = new Date();
            
            prestamosActuales.forEach(p => {
                let esActivo = p.estado === 'Activo';
                let msjEstado = p.estado;
                let colorFondo = esActivo ? '#fff' : '#f9f9f9';
                let colorTexto = esActivo ? '#000' : '#7f8c8d';
                let colorEstado = esActivo ? '#27ae60' : '#7f8c8d';
                
                // Lógica HU 3.4: Verificar si está vencido (> 15 días)
                if (esActivo) {
                    const fechaPrestamo = new Date(p.fecha_prestamo);
                    const difTiempo = Math.abs(hoy - fechaPrestamo);
                    const difDias = Math.ceil(difTiempo / (1000 * 60 * 60 * 24)); 
                    
                    if (difDias > 15) {
                        msjEstado = `⚠️ VENCIDO (Hace ${difDias - 15} días)`;
                        colorFondo = '#ffebee'; // Fondo rojito claro
                        colorEstado = '#c0392b'; // Texto rojo fuerte
                    }
                }

                html += `<tr style="background-color: ${colorFondo}; color: ${colorTexto};">
                    <td style="padding: 8px;">${p.libro_titulo}</td>
                    <td style="padding: 8px;">${p.socio_nombre}</td>
                    <td style="padding: 8px;">${p.fecha_prestamo}</td>
                    <td style="padding: 8px; font-weight: bold; color: ${colorEstado};">${msjEstado}</td>
                    <td style="padding: 8px;">
                        ${esActivo ? `<button onclick="devolverLibro(${p.id})" style="cursor: pointer; background: #3498db; color: white; border: none; border-radius: 3px; padding: 5px;">Devolver</button>` : 'Devuelto: ' + p.fecha_devolucion}
                    </td>
                </tr>`;
            });
        }
        html += `</tbody></table>`;
        appContent.innerHTML = html;

        document.getElementById('btn-nuevo-prestamo').addEventListener('click', mostrarFormularioPrestamo);
    };

    const mostrarFormularioPrestamo = async () => {
        appContent.innerHTML = '<h2>Cargando formulario...</h2>';
        
        try {
            // Traemos libros y socios para llenar los combos
            const resLibros = await fetch('/api/libros');
            const libros = await resLibros.json();
            
            const resSocios = await fetch('/api/socios');
            const socios = await resSocios.json();

            // Filtramos solo los libros que tienen stock disponible
            const librosDisponibles = libros.filter(l => l.stock_disponible > 0);

            let html = `
                <h2>Registrar Nuevo Préstamo</h2>
                <form id="form-prestamo" style="display: flex; flex-direction: column; max-width: 400px; gap: 10px;">
                    <label>Seleccionar Libro:</label>
                    <select id="prestamo-libro" required style="padding: 5px;">
                        <option value="">-- Elegir libro --</option>
                        ${librosDisponibles.map(l => `<option value="${l.id}">${l.titulo} (Disp: ${l.stock_disponible})</option>`).join('')}
                    </select>
                    
                    <label>Seleccionar Socio:</label>
                    <select id="prestamo-socio" required style="padding: 5px;">
                        <option value="">-- Elegir socio --</option>
                        ${socios.map(s => `<option value="${s.id}">${s.nombre}</option>`).join('')}
                    </select>
                    
                    <div style="display: flex; gap: 10px; margin-top: 10px;">
                        <button type="submit" style="padding: 10px; background: #27ae60; color: white; border: none; cursor: pointer; border-radius: 5px;">Registrar Préstamo</button>
                        <button type="button" id="btn-cancelar-prestamo" style="padding: 10px; background: #c0392b; color: white; border: none; cursor: pointer; border-radius: 5px;">Cancelar</button>
                    </div>
                </form>
            `;

            appContent.innerHTML = html;

            if (librosDisponibles.length === 0) {
                alert("Atención: No hay libros con stock disponible para prestar actualmente.");
            }

            document.getElementById('btn-cancelar-prestamo').addEventListener('click', cargarPrestamos);

            document.getElementById('form-prestamo').addEventListener('submit', async (e) => {
                e.preventDefault();
                
                const payload = {
                    libro_id: document.getElementById('prestamo-libro').value,
                    socio_id: document.getElementById('prestamo-socio').value
                };

                try {
                    const res = await fetch('/api/prestamos', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(payload)
                    });

                    if (res.ok) {
                        alert('Préstamo registrado con éxito. Se descontó 1 unidad del stock.');
                        cargarPrestamos();
                    } else {
                        const data = await res.json();
                        alert('Error: ' + data.error);
                    }
                } catch (error) {
                    console.error('Error al guardar', error);
                    alert('Ocurrió un error de red');
                }
            });

        } catch (error) {
            console.error(error);
            appContent.innerHTML = '<p>Error al cargar los datos para el formulario.</p>';
        }
    };

    window.devolverLibro = async (id) => {
        if (!confirm('¿Confirmas que el socio devolvió este libro en buen estado?')) return;
        
        try {
            const res = await fetch('/api/prestamos/' + id + '/devolucion', { method: 'PUT' });
            if (res.ok) {
                alert('Libro devuelto con éxito. El stock volvió a la biblioteca.');
                cargarPrestamos();
            } else {
                const data = await res.json();
                alert('Error al devolver: ' + data.error);
            }
        } catch (error) {
            console.error('Error al devolver', error);
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
        cargarPrestamos();
    });

    linkSocios.addEventListener('click', (e) => {
        e.preventDefault();
        cargarSocios();
    });
});
