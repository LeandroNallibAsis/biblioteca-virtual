document.addEventListener('DOMContentLoaded', () => {
    const linkCatalogo = document.getElementById('link-catalogo');
    const appContent = document.getElementById('app-content');

    linkCatalogo.addEventListener('click', async (e) => {
        e.preventDefault();
        appContent.innerHTML = '<h2>Cargando catálogo...</h2>';
        
        try {
            const res = await fetch('/api/libros');
            const libros = await res.json();
            
            let html = `<h2>Catálogo de Libros</h2>
            <button id="btn-nuevo">Nuevo Libro</button>
            <table border="1" width="100%" style="margin-top: 1rem; border-collapse: collapse;">
                <thead>
                    <tr>
                        <th>Título</th>
                        <th>Autor</th>
                        <th>ISBN</th>
                        <th>Stock Disp.</th>
                    </tr>
                </thead>
                <tbody>`;
                
            if (libros.length === 0) {
                html += `<tr><td colspan="4" style="text-align: center;">No hay libros registrados.</td></tr>`;
            } else {
                libros.forEach(l => {
                    html += `<tr>
                        <td>${l.titulo}</td>
                        <td>${l.autor}</td>
                        <td>${l.isbn}</td>
                        <td>${l.stock_disponible} / ${l.stock_total}</td>
                    </tr>`;
                });
            }
            
            html += `</tbody></table>`;
            appContent.innerHTML = html;
            
        } catch (error) {
            console.error(error);
            appContent.innerHTML = '<p>Error al cargar el catálogo.</p>';
        }
    });
});
