const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./database');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// --- API Endpoints ---

// Obtener todos los libros
app.get('/api/libros', (req, res) => {
    db.all("SELECT * FROM libros", [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

// Agregar un libro
app.post('/api/libros', (req, res) => {
    const { titulo, autor, genero, isbn, stock } = req.body;
    db.run(
        `INSERT INTO libros (titulo, autor, genero, isbn, stock_total, stock_disponible) VALUES (?, ?, ?, ?, ?, ?)`,
        [titulo, autor, genero, isbn, stock, stock],
        function (err) {
            if (err) {
                res.status(400).json({ error: err.message });
                return;
            }
            res.json({ id: this.lastID, mensaje: 'Libro agregado con éxito' });
        }
    );
});

// Editar un libro
app.put('/api/libros/:id', (req, res) => {
    const { id } = req.params;
    const { titulo, autor, genero, isbn, stock_total } = req.body;
    
    // Primero, obtener el stock actual para calcular la diferencia
    db.get("SELECT stock_total, stock_disponible FROM libros WHERE id = ?", [id], (err, row) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        if (!row) {
            res.status(404).json({ error: "Libro no encontrado" });
            return;
        }
        
        let nuevoStockTotal = parseInt(stock_total);
        if (isNaN(nuevoStockTotal) || nuevoStockTotal < 1) {
            res.status(400).json({ error: "El stock total debe ser mayor a 0." });
            return;
        }

        // Calculamos cuántos libros están prestados
        let prestados = row.stock_total - row.stock_disponible;
        let nuevoStockDisponible = nuevoStockTotal - prestados;

        if (nuevoStockDisponible < 0) {
            res.status(400).json({ error: "No puedes reducir el stock por debajo de la cantidad de libros prestados (" + prestados + ")." });
            return;
        }

        db.run(
            `UPDATE libros SET titulo = ?, autor = ?, genero = ?, isbn = ?, stock_total = ?, stock_disponible = ? WHERE id = ?`,
            [titulo, autor, genero, isbn, nuevoStockTotal, nuevoStockDisponible, id],
            function (err) {
                if (err) {
                    res.status(400).json({ error: err.message });
                    return;
                }
                res.json({ mensaje: 'Libro y stock actualizados con éxito' });
            }
        );
    });
});

// Eliminar un libro
app.delete('/api/libros/:id', (req, res) => {
    const { id } = req.params;
    
    // HU 1.4: Solo se puede eliminar si no tiene ejemplares prestados
    // Comprobamos si el stock_disponible es igual al stock_total
    db.get("SELECT stock_total, stock_disponible FROM libros WHERE id = ?", [id], (err, row) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        if (!row) {
            res.status(404).json({ error: "Libro no encontrado" });
            return;
        }
        if (row.stock_total !== row.stock_disponible) {
            res.status(400).json({ error: "No se puede eliminar el libro porque hay ejemplares prestados." });
            return;
        }
        
        db.run(`DELETE FROM libros WHERE id = ?`, [id], function (err) {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            res.json({ mensaje: 'Libro eliminado con éxito' });
        });
    });
});

// --- API Endpoints Socios ---

// Obtener todos los socios
app.get('/api/socios', (req, res) => {
    db.all("SELECT * FROM socios", [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

// Agregar un socio
app.post('/api/socios', (req, res) => {
    const { nombre, telefono, email } = req.body;
    db.run(
        `INSERT INTO socios (nombre, telefono, email) VALUES (?, ?, ?)`,
        [nombre, telefono, email],
        function (err) {
            if (err) {
                res.status(400).json({ error: err.message });
                return;
            }
            res.json({ id: this.lastID, mensaje: 'Socio registrado con éxito' });
        }
    );
});

// Editar un socio
app.put('/api/socios/:id', (req, res) => {
    const { id } = req.params;
    const { nombre, telefono, email } = req.body;
    db.run(
        `UPDATE socios SET nombre = ?, telefono = ?, email = ? WHERE id = ?`,
        [nombre, telefono, email, id],
        function (err) {
            if (err) {
                res.status(400).json({ error: err.message });
                return;
            }
            res.json({ mensaje: 'Socio actualizado con éxito' });
        }
    );
});

// Eliminar un socio
app.delete('/api/socios/:id', (req, res) => {
    const { id } = req.params;
    
    // Validar si tiene préstamos activos antes de eliminar
    db.get("SELECT COUNT(*) as count FROM prestamos WHERE socio_id = ? AND estado = 'Activo'", [id], (err, row) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        if (row.count > 0) {
            res.status(400).json({ error: "No se puede eliminar el socio porque tiene préstamos activos." });
            return;
        }
        
        db.run(`DELETE FROM socios WHERE id = ?`, [id], function (err) {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            res.json({ mensaje: 'Socio eliminado con éxito' });
        });
    });
});

// --- API Endpoints Préstamos ---

// Obtener todos los préstamos (con datos de libro y socio)
app.get('/api/prestamos', (req, res) => {
    const query = `
        SELECT p.id, p.fecha_prestamo, p.fecha_devolucion, p.estado,
               l.titulo as libro_titulo, s.nombre as socio_nombre
        FROM prestamos p
        JOIN libros l ON p.libro_id = l.id
        JOIN socios s ON p.socio_id = s.id
        ORDER BY p.id DESC
    `;
    db.all(query, [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

// Registrar un préstamo
app.post('/api/prestamos', (req, res) => {
    const { libro_id, socio_id } = req.body;
    
    // Verificar que el libro tenga stock disponible
    db.get("SELECT stock_disponible FROM libros WHERE id = ?", [libro_id], (err, row) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        if (!row) {
            res.status(404).json({ error: "Libro no encontrado" });
            return;
        }
        if (row.stock_disponible < 1) {
            res.status(400).json({ error: "No hay stock disponible para prestar este libro." });
            return;
        }

        // Restar 1 al stock y crear el préstamo
        db.serialize(() => {
            db.run("BEGIN TRANSACTION");
            
            db.run("UPDATE libros SET stock_disponible = stock_disponible - 1 WHERE id = ?", [libro_id]);
            
            db.run(
                "INSERT INTO prestamos (libro_id, socio_id) VALUES (?, ?)", 
                [libro_id, socio_id],
                function(err) {
                    if (err) {
                        db.run("ROLLBACK");
                        res.status(500).json({ error: err.message });
                        return;
                    }
                    db.run("COMMIT");
                    res.json({ id: this.lastID, mensaje: "Préstamo registrado exitosamente" });
                }
            );
        });
    });
});

// Registrar devolución
app.put('/api/prestamos/:id/devolucion', (req, res) => {
    const { id } = req.params;

    db.get("SELECT libro_id, estado FROM prestamos WHERE id = ?", [id], (err, row) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        if (!row) {
            res.status(404).json({ error: "Préstamo no encontrado" });
            return;
        }
        if (row.estado !== 'Activo') {
            res.status(400).json({ error: "Este préstamo ya fue devuelto." });
            return;
        }

        // Marcar como devuelto y sumar 1 al stock
        db.serialize(() => {
            db.run("BEGIN TRANSACTION");
            
            db.run("UPDATE libros SET stock_disponible = stock_disponible + 1 WHERE id = ?", [row.libro_id]);
            
            db.run(
                "UPDATE prestamos SET estado = 'Devuelto', fecha_devolucion = CURRENT_DATE WHERE id = ?", 
                [id],
                function(err) {
                    if (err) {
                        db.run("ROLLBACK");
                        res.status(500).json({ error: err.message });
                        return;
                    }
                    db.run("COMMIT");
                    res.json({ mensaje: "Devolución registrada exitosamente" });
                }
            );
        });
    });
});

// Levantar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
