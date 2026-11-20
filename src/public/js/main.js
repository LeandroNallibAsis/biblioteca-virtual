document.addEventListener('DOMContentLoaded', () => {
    const linkDashboard = document.getElementById('link-dashboard');
    const linkCatalogo = document.getElementById('link-catalogo');
    const linkPrestamos = document.getElementById('link-prestamos');
    const linkSocios = document.getElementById('link-socios');
    const linkReportes = document.getElementById('link-reportes');
    const headerTitle = document.getElementById('header-title');
    const appContent = document.getElementById('app-content');
    const modalContainer = document.getElementById('modal-container');
    const modalContent = document.getElementById('modal-content');

    let librosActuales = [];
    let sociosActuales = [];
    let prestamosActuales = [];

    // Helper de navegación activa
    function setActiveNav(activeId) {
        ['link-dashboard', 'link-catalogo', 'link-prestamos', 'link-socios', 'link-reportes'].forEach(id => {
            const el = document.getElementById(id);
            if (el) {
                if (id === activeId) el.classList.add('active');
                else el.classList.remove('active');
            }
        });
    }

    // Modal Helpers
    window.cerrarModal = () => {
        if (modalContainer) modalContainer.style.display = 'none';
    };

    if (modalContainer) {
        modalContainer.addEventListener('click', (e) => {
            if (e.target === modalContainer) window.cerrarModal();
        });
    }

    // ==========================================
    // 1. MÓDULO PANEL DE CONTROL / DASHBOARD (HU 3.1)
    // ==========================================
    const cargarDashboard = async () => {
        setActiveNav('link-dashboard');
        appContent.innerHTML = '<h2>Cargando Panel de Control...</h2>';
        try {
            const res = await fetch('/api/dashboard');
            if (!res.ok) throw new Error('Error al consultar métricas del dashboard');
            const data = await res.json();

            const html = `
                <div class="dashboard-header">
                    <h2>📊 Panel de Control (Dashboard)</h2>
                    <p>Resumen panorámico y métricas clave del sistema en tiempo real.</p>
                </div>

                <div class="dashboard-grid">
                    <div class="metric-card books" id="card-libros">
                        <div class="metric-header">
                            <span class="metric-title">Catálogo de Libros</span>
                            <span class="metric-icon">📚</span>
                        </div>
                        <p class="metric-value">${data.total_libros}</p>
                        <p class="metric-desc">Títulos registrados en la biblioteca</p>
                    </div>

                    <div class="metric-card members" id="card-socios">
                        <div class="metric-header">
                            <span class="metric-title">Padrón de Socios</span>
                            <span class="metric-icon">👥</span>
                        </div>
                        <p class="metric-value">${data.total_socios}</p>
                        <p class="metric-desc">Lectores habilitados en el sistema</p>
                    </div>

                    <div class="metric-card loans" id="card-prestamos">
                        <div class="metric-header">
                            <span class="metric-title">Préstamos Activos</span>
                            <span class="metric-icon">🔄</span>
                        </div>
                        <p class="metric-value">${data.prestamos_activos}</p>
                        <p class="metric-desc">Ejemplares actualmente prestados</p>
                    </div>

                    <div class="metric-card alerts" id="card-vencidos">
                        <div class="metric-header">
                            <span class="metric-title">Préstamos Vencidos</span>
                            <span class="metric-icon">⚠️</span>
                        </div>
                        <p class="metric-value">${data.prestamos_vencidos}</p>
                        <p class="metric-desc">${data.prestamos_vencidos > 0 ? '¡Atención! Préstamos con más de 15 días' : 'Sin atrasos registrados'}</p>
                    </div>

                    <div class="metric-card stock" id="card-stock">
                        <div class="metric-header">
                            <span class="metric-title">Inventario Físico (Kardex)</span>
                            <span class="metric-icon">📦</span>
                        </div>
                        <p class="metric-value">${data.stock_disponible} <span style="font-size: 1.1rem; font-weight: normal; color: #7f8c8d;">/ ${data.stock_total}</span></p>
                        <p class="metric-desc">Ejemplares disponibles vs. total</p>
                    </div>
                </div>

                <div class="dashboard-actions">
                    <h3>⚡ Accesos Rápidos</h3>
                    <div class="action-buttons">
                        <button class="btn-action btn-blue" id="dash-btn-catalogo">📖 Ver Catálogo</button>
                        <button class="btn-action btn-green" id="dash-btn-nuevo-prestamo">➕ Registrar Préstamo</button>
                        <button class="btn-action btn-orange" id="dash-btn-prestamos">🔄 Gestionar Préstamos</button>
                        <button class="btn-action btn-dark" id="dash-btn-socios">👥 Padrón de Socios</button>
                        <button class="btn-action btn-purple" id="dash-btn-reportes">⚠️ Reporte de Morosos</button>
                    </div>
                </div>
            `;

            appContent.innerHTML = html;

            document.getElementById('card-libros').addEventListener('click', () => cargarCatalogo());
            document.getElementById('card-socios').addEventListener('click', () => cargarSocios());
            document.getElementById('card-prestamos').addEventListener('click', () => cargarPrestamos());
            document.getElementById('card-vencidos').addEventListener('click', () => cargarReporteMorosos());
            document.getElementById('card-stock').addEventListener('click', () => cargarCatalogo());

            document.getElementById('dash-btn-catalogo').addEventListener('click', () => cargarCatalogo());
            document.getElementById('dash-btn-nuevo-prestamo').addEventListener('click', () => mostrarFormularioPrestamo());
            document.getElementById('dash-btn-prestamos').addEventListener('click', () => cargarPrestamos());
            document.getElementById('dash-btn-socios').addEventListener('click', () => cargarSocios());
            document.getElementById('dash-btn-reportes').addEventListener('click', () => cargarReporteMorosos());

        } catch (error) {
            console.error('Error al cargar dashboard:', error);
            appContent.innerHTML = `
                <h2>Error al cargar el Panel de Control</h2>
                <p style="color: red;">${error.message}</p>
                <button onclick="location.reload()" style="padding: 8px 16px; cursor: pointer;">Reintentar</button>
            `;
        }
    };

    // ==========================================
    // 2. MÓDULO CATÁLOGO Y KARDEX (HU 1.1 - HU 1.4, HU 3.5)
    // ==========================================
    const crearFilaLibro = (l) => `
        <tr>
            <td style="padding: 8px;"><strong>${l.titulo}</strong></td>
            <td style="padding: 8px;">${l.autor}</td>
            <td style="padding: 8px;">${l.genero || '-'}</td>
            <td style="padding: 8px;">${l.isbn}</td>
            <td style="padding: 8px; font-weight: bold; color: ${l.stock_disponible > 0 ? '#27ae60' : '#c0392b'};">
                ${l.stock_disponible} / ${l.stock_total}
            </td>
            <td style="padding: 8px; white-space: nowrap;">
                <button onclick="verKardexLibro(${l.id})" title="Ver movimientos y Kardex" style="cursor: pointer; background: #8e44ad; color: white; border: none; border-radius: 3px; padding: 5px; margin-right: 3px;">📜 Kardex</button>
                <button onclick="mostrarModalBajaDanio(${l.id})" title="Registrar pérdida o daño" style="cursor: pointer; background: #d35400; color: white; border: none; border-radius: 3px; padding: 5px; margin-right: 3px;">⚠️ Daño</button>
                <button onclick="editarLibro(${l.id})" style="cursor: pointer; background: #f39c12; color: white; border: none; border-radius: 3px; padding: 5px; margin-right: 3px;">Editar</button>
                <button onclick="eliminarLibro(${l.id})" style="cursor: pointer; background: #e74c3c; color: white; border: none; border-radius: 3px; padding: 5px;">Eliminar</button>
            </td>
        </tr>
    `;

    const renderizarTabla = (libros) => {
        let html = `
        <div style="display: flex; justify-content: space-between; align-items: center;">
            <h2>Catálogo de Libros (Gestión de Stock y Kardex)</h2>
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
            html += libros.map(crearFilaLibro).join('');
        }
        html += `</tbody></table>`;
        appContent.innerHTML = html;

        document.getElementById('btn-nuevo').addEventListener('click', () => mostrarFormularioLibro());
        
        const inputBusqueda = document.getElementById('input-busqueda');
        inputBusqueda.addEventListener('keyup', (e) => {
            const query = e.target.value.toLowerCase();
            const librosFiltrados = librosActuales.filter(l => 
                l.titulo.toLowerCase().includes(query) || 
                l.autor.toLowerCase().includes(query)
            );
            const tbody = document.querySelector('tbody');
            if (librosFiltrados.length === 0) {
                tbody.innerHTML = `<tr><td colspan="6" style="text-align: center; padding: 10px;">No hay libros que coincidan.</td></tr>`;
            } else {
                tbody.innerHTML = librosFiltrados.map(crearFilaLibro).join('');
            }
        });
    };

    const cargarCatalogo = async () => {
        setActiveNav('link-catalogo');
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
            <form id="form-libro" style="display: flex; flex-direction: column; max-width: 420px; gap: 10px;">
                <label>Título:</label>
                <input type="text" id="titulo" value="${libro.titulo}" required style="padding: 8px;">
                
                <label>Autor:</label>
                <input type="text" id="autor" value="${libro.autor}" required style="padding: 8px;">
                
                <label>Género:</label>
                <input type="text" id="genero" value="${libro.genero || ''}" style="padding: 8px;">
                
                <label>ISBN:</label>
                <input type="text" id="isbn" value="${libro.isbn}" required style="padding: 8px;">
                
                <label>${esEdicion ? 'Stock total:' : 'Stock inicial de ejemplares (número entero >= 0):'}</label>
                <input type="text" id="stock" value="${libro.stock_total}" required style="padding: 8px;" placeholder="Ej: 5">
                
                <div style="display: flex; gap: 10px; margin-top: 10px;">
                    <button type="submit" style="padding: 10px; background: #27ae60; color: white; border: none; cursor: pointer; border-radius: 5px;">
                        ${esEdicion ? 'Guardar Cambios' : 'Registrar Libro e Inicializar Kardex'}
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
                    alert(esEdicion ? 'Libro actualizado con éxito' : 'Libro registrado con éxito en catálogo y Kardex');
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

    window.editarLibro = (id) => mostrarFormularioLibro(id);

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

    // HU 3.5: Ver Kardex y Movimientos por Libro
    window.verKardexLibro = async (id) => {
        try {
            const libro = librosActuales.find(l => l.id === id);
            const res = await fetch(`/api/libros/${id}/movimientos`);
            if (!res.ok) throw new Error('Error al consultar movimientos');
            const data = await res.json();

            let rowsHtml = '';
            if (!data.movimientos || data.movimientos.length === 0) {
                rowsHtml = '<tr><td colspan="5" style="text-align: center; padding: 10px;">No registra movimientos históricos.</td></tr>';
            } else {
                data.movimientos.forEach(m => {
                    let badgeClass = 'badge-in';
                    let signo = '+';
                    if (m.tipo === 'PRESTAMO' || m.tipo === 'BAJA_POR_DANIO') {
                        badgeClass = 'badge-out';
                        signo = '';
                    } else if (m.tipo === 'AJUSTE') {
                        badgeClass = 'badge-warning';
                        signo = m.cantidad > 0 ? '+' : '';
                    }

                    rowsHtml += `
                        <tr>
                            <td style="padding: 8px;">${m.fecha}</td>
                            <td style="padding: 8px;"><span class="${badgeClass}">${m.tipo}</span></td>
                            <td style="padding: 8px; font-weight: bold; text-align: center;">${signo}${m.cantidad}</td>
                            <td style="padding: 8px;">${m.socio_nombre ? '👤 ' + m.socio_nombre : '-'}</td>
                            <td style="padding: 8px;">${m.motivo || '-'}</td>
                        </tr>
                    `;
                });
            }

            modalContent.innerHTML = `
                <div class="modal-header">
                    <h3>📜 Kardex y Libro Mayor de Movimientos</h3>
                    <button class="modal-close" onclick="cerrarModal()">&times;</button>
                </div>
                <p><strong>Libro:</strong> ${libro ? libro.titulo : 'ID ' + id} | <strong>ISBN:</strong> ${libro ? libro.isbn : '-'}</p>
                <div style="background: #f1f5f9; padding: 10px; border-radius: 5px; margin-bottom: 12px; display: flex; justify-content: space-between;">
                    <span><strong>Stock disponible actual:</strong> ${libro ? libro.stock_disponible : '-'}</span>
                    <span><strong>Stock acumulado por Kardex:</strong> <span style="font-weight: bold; color: #2980b9;">${data.stock_calculado_kardex}</span></span>
                </div>
                <table border="1" width="100%" style="border-collapse: collapse; text-align: left; font-size: 0.9rem;">
                    <thead>
                        <tr style="background-color: #eee;">
                            <th style="padding: 8px;">Fecha</th>
                            <th style="padding: 8px;">Tipo</th>
                            <th style="padding: 8px;">Cant.</th>
                            <th style="padding: 8px;">Lector / Socio</th>
                            <th style="padding: 8px;">Detalle / Motivo</th>
                        </tr>
                    </thead>
                    <tbody>${rowsHtml}</tbody>
                </table>
                <div style="margin-top: 15px; text-align: right;">
                    <button onclick="cerrarModal()" style="padding: 8px 16px; background: #2c3e50; color: white; border: none; border-radius: 4px; cursor: pointer;">Cerrar</button>
                </div>
            `;
            modalContainer.style.display = 'flex';
        } catch (err) {
            alert('Error al abrir Kardex: ' + err.message);
        }
    };

    // Modal para registrar baja por daño o pérdida
    window.mostrarModalBajaDanio = (id) => {
        const libro = librosActuales.find(l => l.id === id);
        modalContent.innerHTML = `
            <div class="modal-header">
                <h3>⚠️ Registrar Baja de Ejemplar por Daño o Pérdida</h3>
                <button class="modal-close" onclick="cerrarModal()">&times;</button>
            </div>
            <p><strong>Libro:</strong> ${libro ? libro.titulo : 'ID ' + id} (Stock actual: ${libro ? libro.stock_disponible : 0})</p>
            <form id="form-danio" style="display: flex; flex-direction: column; gap: 10px;">
                <label>Motivo o justificación de la baja (-1 unidad):</label>
                <textarea id="motivo-danio" required rows="3" style="padding: 8px;" placeholder="Ej: Ejemplar extraviado, rotura de encuadernación irreparable..."></textarea>
                
                <div style="display: flex; gap: 10px; margin-top: 10px; justify-content: flex-end;">
                    <button type="button" onclick="cerrarModal()" style="padding: 8px 16px; background: #95a5a6; color: white; border: none; border-radius: 4px; cursor: pointer;">Cancelar</button>
                    <button type="submit" style="padding: 8px 16px; background: #d35400; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: bold;">Confirmar Baja en Kardex</button>
                </div>
            </form>
        `;

        document.getElementById('form-danio').addEventListener('submit', async (e) => {
            e.preventDefault();
            const motivo = document.getElementById('motivo-danio').value;
            try {
                const res = await fetch(`/api/libros/${id}/baja-danio`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ motivo })
                });
                const data = await res.json();
                if (res.ok) {
                    alert('Baja por daño asentada en Kardex con éxito.');
                    cerrarModal();
                    cargarCatalogo();
                } else {
                    alert('Error: ' + data.error);
                }
            } catch (err) {
                alert('Error de red al procesar baja');
            }
        });

        modalContainer.style.display = 'flex';
    };

    // ==========================================
    // 3. MÓDULO SOCIOS Y TRAZABILIDAD DE LECTURA (HU 3.3)
    // ==========================================
    const cargarSocios = async () => {
        setActiveNav('link-socios');
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
            <h2>Padrón de Socios (Lectores)</h2>
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
                    <td style="padding: 8px;"><strong>${s.nombre}</strong></td>
                    <td style="padding: 8px;">${s.telefono || '-'}</td>
                    <td style="padding: 8px;">${s.email || '-'}</td>
                    <td style="padding: 8px; white-space: nowrap;">
                        <button onclick="verHistorialSocio(${s.id})" title="Ver todos los libros pedidos por este socio" style="cursor: pointer; background: #2980b9; color: white; border: none; border-radius: 3px; padding: 5px; margin-right: 3px;">👤 Historial</button>
                        <button onclick="editarSocio(${s.id})" style="cursor: pointer; background: #f39c12; color: white; border: none; border-radius: 3px; padding: 5px; margin-right: 3px;">Editar</button>
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
                <input type="text" id="nombre" value="${socio.nombre}" required style="padding: 8px;">
                
                <label>Teléfono:</label>
                <input type="text" id="telefono" value="${socio.telefono || ''}" style="padding: 8px;">
                
                <label>Email:</label>
                <input type="email" id="email" value="${socio.email || ''}" style="padding: 8px;">
                
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
                nombre: document.getElementById('nombre').value,
                telefono: document.getElementById('telefono').value,
                email: document.getElementById('email').value
            };

            const url = esEdicion ? '/api/socios/' + socioId : '/api/socios';
            const method = esEdicion ? 'PUT' : 'POST';

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
                console.error('Error al guardar socio', error);
                alert('Ocurrió un error de red');
            }
        });
    };

    window.editarSocio = (id) => mostrarFormularioSocio(id);

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

    // Trazabilidad por Socio: Ver historial de lecturas de un socio
    window.verHistorialSocio = async (id) => {
        try {
            const socio = sociosActuales.find(s => s.id === id);
            const res = await fetch(`/api/socios/${id}/historial`);
            if (!res.ok) throw new Error('Error al consultar historial del socio');
            const data = await res.json();

            let rowsHtml = '';
            if (data.length === 0) {
                rowsHtml = '<tr><td colspan="5" style="text-align: center; padding: 10px;">Este socio no registra préstamos en su historial.</td></tr>';
            } else {
                data.forEach(p => {
                    const esActivo = p.estado === 'Activo';
                    const colorEstado = esActivo ? (p.dias_transcurridos > 15 ? '#c0392b' : '#27ae60') : '#7f8c8d';
                    const estadoTexto = esActivo ? (p.dias_transcurridos > 15 ? `⚠️ Activo (Atraso ${p.dias_transcurridos - 15}d)` : 'Activo') : `Devuelto (${p.fecha_devolucion})`;

                    rowsHtml += `
                        <tr>
                            <td style="padding: 8px;"><strong>${p.libro_titulo}</strong></td>
                            <td style="padding: 8px;">${p.libro_autor}</td>
                            <td style="padding: 8px;">${p.fecha_prestamo}</td>
                            <td style="padding: 8px; font-weight: bold; color: ${colorEstado};">${estadoTexto}</td>
                            <td style="padding: 8px; text-align: center;">${p.dias_transcurridos} días</td>
                        </tr>
                    `;
                });
            }

            modalContent.innerHTML = `
                <div class="modal-header">
                    <h3>👤 Ficha de Trazabilidad del Lector</h3>
                    <button class="modal-close" onclick="cerrarModal()">&times;</button>
                </div>
                <p><strong>Socio:</strong> ${socio ? socio.nombre : 'ID ' + id} | <strong>Contacto:</strong> ${socio ? (socio.telefono || socio.email || 'Sin datos') : '-'}</p>
                <table border="1" width="100%" style="border-collapse: collapse; text-align: left; font-size: 0.9rem;">
                    <thead>
                        <tr style="background-color: #eee;">
                            <th style="padding: 8px;">Libro Solicitado</th>
                            <th style="padding: 8px;">Autor</th>
                            <th style="padding: 8px;">Fecha Retiro</th>
                            <th style="padding: 8px;">Estado Actual</th>
                            <th style="padding: 8px; text-align: center;">Tiempo</th>
                        </tr>
                    </thead>
                    <tbody>${rowsHtml}</tbody>
                </table>
                <div style="margin-top: 15px; text-align: right;">
                    <button onclick="cerrarModal()" style="padding: 8px 16px; background: #2c3e50; color: white; border: none; border-radius: 4px; cursor: pointer;">Cerrar</button>
                </div>
            `;
            modalContainer.style.display = 'flex';
        } catch (err) {
            alert('Error al abrir historial: ' + err.message);
        }
    };

    // ==========================================
    // 4. MÓDULO PRÉSTAMOS (HU 2.2, HU 2.3, HU 3.4)
    // ==========================================
    const cargarPrestamos = async () => {
        setActiveNav('link-prestamos');
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
            <h2>Gestión de Préstamos y Devoluciones</h2>
            <button id="btn-nuevo-prestamo" style="padding: 10px; cursor: pointer; background: #2c3e50; color: white; border: none; border-radius: 5px;">+ Nuevo Préstamo</button>
        </div>
        
        <table border="1" width="100%" style="margin-top: 1rem; border-collapse: collapse; text-align: left;">
            <thead>
                <tr style="background-color: #eee;">
                    <th style="padding: 8px;">Libro</th>
                    <th style="padding: 8px;">Socio</th>
                    <th style="padding: 8px;">Fecha Préstamo</th>
                    <th style="padding: 8px;">Estado / Alerta</th>
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
                
                // Alerta HU 3.4 (> 15 días)
                if (esActivo) {
                    const fechaPrestamo = new Date(p.fecha_prestamo);
                    const difTiempo = Math.abs(hoy - fechaPrestamo);
                    const difDias = Math.ceil(difTiempo / (1000 * 60 * 60 * 24)); 
                    
                    if (difDias > 15) {
                        msjEstado = `⚠️ VENCIDO (${difDias - 15} días de atraso)`;
                        colorFondo = '#ffebee';
                        colorEstado = '#c0392b';
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
            const resLibros = await fetch('/api/libros');
            const libros = await resLibros.json();
            
            const resSocios = await fetch('/api/socios');
            const socios = await resSocios.json();

            const librosDisponibles = libros.filter(l => l.stock_disponible > 0);

            let html = `
                <h2>Registrar Nuevo Préstamo</h2>
                <form id="form-prestamo" style="display: flex; flex-direction: column; max-width: 400px; gap: 10px;">
                    <label>Seleccionar Libro:</label>
                    <select id="prestamo-libro" required style="padding: 8px;">
                        <option value="">-- Elegir libro --</option>
                        ${librosDisponibles.map(l => `<option value="${l.id}">${l.titulo} (Disp: ${l.stock_disponible})</option>`).join('')}
                    </select>
                    
                    <label>Seleccionar Socio:</label>
                    <select id="prestamo-socio" required style="padding: 8px;">
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
                        alert('Préstamo registrado con éxito y asentado en Kardex.');
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
                alert('Libro devuelto con éxito. El stock volvió a la biblioteca y se asentó en Kardex.');
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

    // ==========================================
    // 5. MÓDULO REPORTES DE MOROSIDAD (HU 5.1)
    // ==========================================
    const cargarReporteMorosos = async () => {
        setActiveNav('link-reportes');
        appContent.innerHTML = '<h2>Cargando reporte de morosidad...</h2>';
        try {
            const res = await fetch('/api/reportes/morosos');
            if (!res.ok) throw new Error('Error al cargar reporte');
            const data = await res.json();

            let rowsHtml = '';
            if (data.morosos.length === 0) {
                rowsHtml = `
                    <tr>
                        <td colspan="6" style="text-align: center; padding: 20px; color: #27ae60; font-weight: bold;">
                            🎉 ¡Excelente! No existen préstamos vencidos en este momento.
                        </td>
                    </tr>
                `;
            } else {
                data.morosos.forEach(m => {
                    rowsHtml += `
                        <tr style="background-color: #fff5f5;">
                            <td style="padding: 8px;"><strong>${m.socio_nombre}</strong></td>
                            <td style="padding: 8px;">📞 ${m.socio_telefono || '-'} <br> ✉️ ${m.socio_email || '-'}</td>
                            <td style="padding: 8px;">${m.libro_titulo}</td>
                            <td style="padding: 8px;">${m.fecha_prestamo}</td>
                            <td style="padding: 8px; text-align: center; font-weight: bold; color: #c0392b;">
                                ${m.dias_atraso} días
                            </td>
                            <td style="padding: 8px; text-align: center;">
                                <button onclick="devolverLibro(${m.prestamo_id})" style="padding: 5px 10px; background: #27ae60; color: white; border: none; border-radius: 3px; cursor: pointer;">Registrar Devolución</button>
                            </td>
                        </tr>
                    `;
                });
            }

            appContent.innerHTML = `
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <h2>⚠️ Reporte de Socios Morosos y Préstamos Vencidos (> 15 días)</h2>
                    <button onclick="window.print()" style="padding: 8px 14px; background: #34495e; color: white; border: none; border-radius: 4px; cursor: pointer;">🖨️ Imprimir / Exportar</button>
                </div>
                <p>Fecha de emisión: <strong>${data.fecha_reporte}</strong> | Total de préstamos adeudados fuera de término: <strong style="color: #c0392b;">${data.total_morosos}</strong></p>

                <table border="1" width="100%" style="margin-top: 1rem; border-collapse: collapse; text-align: left;">
                    <thead>
                        <tr style="background-color: #eee;">
                            <th style="padding: 8px;">Socio / Lector</th>
                            <th style="padding: 8px;">Datos de Contacto</th>
                            <th style="padding: 8px;">Libro Adeudado</th>
                            <th style="padding: 8px;">Fecha de Préstamo</th>
                            <th style="padding: 8px; text-align: center;">Días de Atraso</th>
                            <th style="padding: 8px; text-align: center;">Acción</th>
                        </tr>
                    </thead>
                    <tbody>${rowsHtml}</tbody>
                </table>
            `;

        } catch (error) {
            console.error(error);
            appContent.innerHTML = `<p style="color: red;">Error al generar reporte: ${error.message}</p>`;
        }
    };

    // ==========================================
    // 6. NAVEGACIÓN PRINCIPAL Y ARRANQUE
    // ==========================================
    if (linkDashboard) {
        linkDashboard.addEventListener('click', (e) => {
            e.preventDefault();
            cargarDashboard();
        });
    }

    if (headerTitle) {
        headerTitle.addEventListener('click', () => {
            cargarDashboard();
        });
    }

    if (linkCatalogo) {
        linkCatalogo.addEventListener('click', (e) => {
            e.preventDefault();
            cargarCatalogo();
        });
    }

    if (linkPrestamos) {
        linkPrestamos.addEventListener('click', (e) => {
            e.preventDefault();
            cargarPrestamos();
        });
    }

    if (linkSocios) {
        linkSocios.addEventListener('click', (e) => {
            e.preventDefault();
            cargarSocios();
        });
    }

    if (linkReportes) {
        linkReportes.addEventListener('click', (e) => {
            e.preventDefault();
            cargarReporteMorosos();
        });
    }

    // Arranque reactivo por defecto en el Dashboard (HU 3.1)
    cargarDashboard();
});
