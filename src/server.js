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

    if (!titulo || typeof titulo !== 'string' || !titulo.trim()) {
        return res.status(400).json({ error: "El título del libro es obligatorio y no puede estar vacío." });
    }
    if (!autor || typeof autor !== 'string' || !autor.trim()) {
        return res.status(400).json({ error: "El autor del libro es obligatorio y no puede estar vacío." });
    }
    if (!isbn || typeof isbn !== 'string' || !isbn.trim()) {
        return res.status(400).json({ error: "El código ISBN es obligatorio y no puede estar vacío." });
    }

    const stockNum = parseInt(stock);
    if (isNaN(stockNum) || stockNum < 0) {
        return res.status(400).json({ error: "El stock debe ser un número entero mayor o igual a 0." });
    }

    db.run(
        `INSERT INTO libros (titulo, autor, genero, isbn, stock_total, stock_disponible) VALUES (?, ?, ?, ?, ?, ?)`,
        [titulo.trim(), autor.trim(), genero ? genero.trim() : '', isbn.trim(), stockNum, stockNum],
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

    if (!titulo || typeof titulo !== 'string' || !titulo.trim()) {
        return res.status(400).json({ error: "El título del libro es obligatorio y no puede estar vacío." });
    }
    if (!autor || typeof autor !== 'string' || !autor.trim()) {
        return res.status(400).json({ error: "El autor del libro es obligatorio y no puede estar vacío." });
    }
    if (!isbn || typeof isbn !== 'string' || !isbn.trim()) {
        return res.status(400).json({ error: "El código ISBN es obligatorio y no puede estar vacío." });
    }
    
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
            [titulo.trim(), autor.trim(), genero ? genero.trim() : '', isbn.trim(), nuevoStockTotal, nuevoStockDisponible, id],
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

// Eliminar un libro (HU 1.4)
app.delete('/api/libros/:id', (req, res) => {
    const { id } = req.params;
    
    db.get("SELECT id, titulo FROM libros WHERE id = ?", [id], (err, libro) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!libro) {
            return res.status(404).json({ error: "Libro no encontrado." });
        }

        // Consultar préstamos activos e historial total para control y preservación de auditoría
        db.get(
            `SELECT 
                COUNT(CASE WHEN estado = 'Activo' THEN 1 END) AS activos,
                COUNT(*) AS total_historial
             FROM prestamos 
             WHERE libro_id = ?`,
            [id],
            (errPrestamos, conteo) => {
                if (errPrestamos) {
                    return res.status(500).json({ error: errPrestamos.message });
                }

                if (conteo.activos > 0) {
                    return res.status(400).json({ 
                        error: "No se puede eliminar el libro porque tiene ejemplares con préstamos activos en curso." 
                    });
                }

                if (conteo.total_historial > 0) {
                    return res.status(400).json({ 
                        error: "No se puede eliminar el libro porque posee un historial de préstamos registrado en el sistema. El registro se conserva para fines de auditoría e integridad de datos." 
                    });
                }

                // Si no tiene ningún historial vinculado, se procede a la eliminación física
                db.run(`DELETE FROM libros WHERE id = ?`, [id], function (errDelete) {
                    if (errDelete) {
                        if (errDelete.message && errDelete.message.includes('FOREIGN KEY')) {
                            return res.status(400).json({ error: "No se puede eliminar el libro por restricciones de integridad referencial." });
                        }
                        return res.status(500).json({ error: errDelete.message });
                    }
                    res.json({ mensaje: 'Libro eliminado con éxito' });
                });
            }
        );
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

    if (!nombre || typeof nombre !== 'string' || !nombre.trim()) {
        return res.status(400).json({ error: "El nombre del socio es obligatorio y no puede estar vacío." });
    }

    db.run(
        `INSERT INTO socios (nombre, telefono, email) VALUES (?, ?, ?)`,
        [nombre.trim(), telefono ? telefono.trim() : '', email ? email.trim() : null],
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

    if (!nombre || typeof nombre !== 'string' || !nombre.trim()) {
        return res.status(400).json({ error: "El nombre del socio es obligatorio y no puede estar vacío." });
    }

    db.run(
        `UPDATE socios SET nombre = ?, telefono = ?, email = ? WHERE id = ?`,
        [nombre.trim(), telefono ? telefono.trim() : '', email ? email.trim() : null, id],
        function (err) {
            if (err) {
                res.status(400).json({ error: err.message });
                return;
            }
            res.json({ mensaje: 'Socio actualizado con éxito' });
        }
    );
});

// Eliminar un socio (HU 3.3)
app.delete('/api/socios/:id', (req, res) => {
    const { id } = req.params;
    
    db.get("SELECT id, nombre FROM socios WHERE id = ?", [id], (err, socio) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!socio) {
            return res.status(404).json({ error: "Socio no encontrado." });
        }

        // Consultar préstamos activos e historial total para control y preservación de auditoría
        db.get(
            `SELECT 
                COUNT(CASE WHEN estado = 'Activo' THEN 1 END) AS activos,
                COUNT(*) AS total_historial
             FROM prestamos 
             WHERE socio_id = ?`,
            [id],
            (errPrestamos, conteo) => {
                if (errPrestamos) {
                    return res.status(500).json({ error: errPrestamos.message });
                }

                if (conteo.activos > 0) {
                    return res.status(400).json({ 
                        error: "No se puede eliminar el socio porque tiene préstamos activos en curso." 
                    });
                }

                if (conteo.total_historial > 0) {
                    return res.status(400).json({ 
                        error: "No se puede eliminar el socio porque posee un historial de préstamos registrado en el sistema. El registro se conserva para fines de auditoría e integridad de datos." 
                    });
                }

                // Si no tiene préstamos registrados, procedemos al borrado físico
                db.run(`DELETE FROM socios WHERE id = ?`, [id], function (errDelete) {
                    if (errDelete) {
                        if (errDelete.message && errDelete.message.includes('FOREIGN KEY')) {
                            return res.status(400).json({ error: "No se puede eliminar el socio por restricciones de integridad referencial." });
                        }
                        return res.status(500).json({ error: errDelete.message });
                    }
                    res.json({ mensaje: 'Socio eliminado con éxito' });
                });
            }
        );
    });
});

// --- Helper de Transacciones Concurrencia y Control de Errores ---
// Asegura que las transacciones en SQLite no se intercalen concurrentemente sobre la misma conexión
let txQueue = Promise.resolve();

function runInTransaction(callback) {
    return new Promise((resolve, reject) => {
        txQueue = txQueue.then(() => {
            return new Promise((resTx, rejTx) => {
                db.run("BEGIN IMMEDIATE", (errBegin) => {
                    if (errBegin) {
                        return rejTx({ status: 500, error: "Error al iniciar transacción: " + errBegin.message });
                    }
                    callback({
                        commit: (result) => {
                            db.run("COMMIT", (errCommit) => {
                                if (errCommit) {
                                    db.run("ROLLBACK", () => {
                                        rejTx({ status: 500, error: "Error al confirmar transacción: " + errCommit.message });
                                    });
                                } else {
                                    resTx(result);
                                }
                            });
                        },
                        rollback: (errReason) => {
                            db.run("ROLLBACK", () => {
                                rejTx(errReason);
                            });
                        }
                    });
                });
            });
        }).then(resolve).catch(reject);
    });
}

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

// Registrar un préstamo (HU 2.2) - Transacción robusta con control de concurrencia
app.post('/api/prestamos', (req, res) => {
    const { libro_id, socio_id } = req.body;

    const idLibro = parseInt(libro_id);
    const idSocio = parseInt(socio_id);

    if (isNaN(idLibro) || isNaN(idSocio) || idLibro <= 0 || idSocio <= 0) {
        return res.status(400).json({ error: "Debe seleccionar un libro y un socio válidos." });
    }

    // 1. Verificar existencia del socio antes de operar
    db.get("SELECT id, nombre FROM socios WHERE id = ?", [idSocio], (errSocio, socio) => {
        if (errSocio) {
            return res.status(500).json({ error: errSocio.message });
        }
        if (!socio) {
            return res.status(404).json({ error: "El socio seleccionado no existe en el sistema." });
        }

        // 2. Ejecutar transacción protegida contra carreras y stock negativo
        runInTransaction((tx) => {
            // Descontar stock únicamente si stock_disponible > 0 (atómico)
            db.run(
                "UPDATE libros SET stock_disponible = stock_disponible - 1 WHERE id = ? AND stock_disponible > 0",
                [idLibro],
                function (errUpdate) {
                    if (errUpdate) {
                        return tx.rollback({ status: 500, error: errUpdate.message });
                    }

                    // Si no hubo cambios, no había stock disponible o el libro no existe
                    if (this.changes === 0) {
                        return tx.rollback({ status: 400, error: "No hay stock disponible para prestar este libro." });
                    }

                    // Insertar registro del préstamo
                    db.run(
                        "INSERT INTO prestamos (libro_id, socio_id, fecha_prestamo, estado) VALUES (?, ?, CURRENT_DATE, 'Activo')",
                        [idLibro, idSocio],
                        function (errInsert) {
                            if (errInsert) {
                                return tx.rollback({ status: 500, error: errInsert.message });
                            }
                            tx.commit({ id: this.lastID, mensaje: "Préstamo registrado exitosamente" });
                        }
                    );
                }
            );
        })
        .then((data) => res.json(data))
        .catch((err) => res.status(err.status || 500).json({ error: err.error || "Error al procesar el préstamo" }));
    });
});

// Registrar devolución (HU 2.3) - Transacción robusta con prevención de devoluciones duplicadas
app.put('/api/prestamos/:id/devolucion', (req, res) => {
    const idPrestamo = parseInt(req.params.id);

    if (isNaN(idPrestamo) || idPrestamo <= 0) {
        return res.status(400).json({ error: "ID de préstamo inválido." });
    }

    runInTransaction((tx) => {
        // 1. Obtener datos del préstamo para conocer el libro asociado
        db.get("SELECT id, libro_id, estado FROM prestamos WHERE id = ?", [idPrestamo], (errGet, prestamo) => {
            if (errGet) {
                return tx.rollback({ status: 500, error: errGet.message });
            }
            if (!prestamo) {
                return tx.rollback({ status: 404, error: "Préstamo no encontrado." });
            }
            if (prestamo.estado !== 'Activo') {
                return tx.rollback({ status: 400, error: "Este préstamo ya fue devuelto." });
            }

            // 2. Actualizar estado del préstamo de forma atómica condicionada (evita dobles devoluciones simultáneas)
            db.run(
                "UPDATE prestamos SET estado = 'Devuelto', fecha_devolucion = CURRENT_DATE WHERE id = ? AND estado = 'Activo'",
                [idPrestamo],
                function (errUpdatePrestamo) {
                    if (errUpdatePrestamo) {
                        return tx.rollback({ status: 500, error: errUpdatePrestamo.message });
                    }

                    // Si no afectó filas, otra petición concurrente ya lo devolvió
                    if (this.changes === 0) {
                        return tx.rollback({ status: 400, error: "Este préstamo ya fue devuelto por otra operación concurrente." });
                    }

                    // 3. Incrementar el stock disponible del libro correspondiente
                    db.run(
                        "UPDATE libros SET stock_disponible = stock_disponible + 1 WHERE id = ?",
                        [prestamo.libro_id],
                        function (errUpdateLibro) {
                            if (errUpdateLibro) {
                                return tx.rollback({ status: 500, error: errUpdateLibro.message });
                            }
                            tx.commit({ mensaje: "Devolución registrada exitosamente" });
                        }
                    );
                }
            );
        });
    })
    .then((data) => res.json(data))
    .catch((err) => res.status(err.status || 500).json({ error: err.error || "Error al procesar la devolución" }));
});

// Levantar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
