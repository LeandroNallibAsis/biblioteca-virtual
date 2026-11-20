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

// --- Helper de Validaciones Estrictas (HU 4.1) ---
// Evita conversiones permisivas de parseInt (ej: rechaza estrictamente "2abc", decimales o negativos)
function esEnteroNoNegativo(val) {
    if (val === undefined || val === null) return false;
    const str = String(val).trim();
    if (!/^\d+$/.test(str)) return false;
    const num = Number(str);
    return Number.isSafeInteger(num) && num >= 0;
}

function esEnteroPositivo(val) {
    if (val === undefined || val === null) return false;
    const str = String(val).trim();
    if (!/^\d+$/.test(str)) return false;
    const num = Number(str);
    return Number.isSafeInteger(num) && num > 0;
}

function esIdValido(val) {
    return esEnteroPositivo(val);
}

// --- Helper de Transacciones Concurrencia y Control de Errores ---
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

// --- API Endpoints ---

// Obtener métricas para el Panel de Control / Dashboard (HU 3.1)
app.get('/api/dashboard', (req, res) => {
    const query = `
        SELECT 
            (SELECT COUNT(*) FROM libros) AS total_libros,
            (SELECT COUNT(*) FROM socios) AS total_socios,
            (SELECT COUNT(*) FROM prestamos WHERE estado = 'Activo') AS prestamos_activos,
            (SELECT COUNT(*) FROM prestamos WHERE estado = 'Activo' AND (julianday('now') - julianday(fecha_prestamo)) > 15) AS prestamos_vencidos,
            (SELECT IFNULL(SUM(stock_total), 0) FROM libros) AS stock_total,
            (SELECT IFNULL(SUM(stock_disponible), 0) FROM libros) AS stock_disponible
    `;
    db.get(query, [], (err, stats) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(stats);
    });
});

// Obtener todos los libros
app.get('/api/libros', (req, res) => {
    db.all("SELECT * FROM libros ORDER BY id DESC", [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

// Agregar un libro (con registro inicial en Kardex / movimientos)
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

    // Validación estricta (HU 4.1): rechaza "2abc", decimales o negativos
    if (!esEnteroNoNegativo(stock)) {
        return res.status(400).json({ 
            error: "El stock debe ser un número entero mayor o igual a 0. No se admiten caracteres alfanuméricos ni decimales." 
        });
    }

    const stockNum = parseInt(String(stock).trim(), 10);

    runInTransaction((tx) => {
        db.run(
            `INSERT INTO libros (titulo, autor, genero, isbn, stock_total, stock_disponible) VALUES (?, ?, ?, ?, ?, ?)`,
            [titulo.trim(), autor.trim(), genero ? genero.trim() : '', isbn.trim(), stockNum, stockNum],
            function (errInsert) {
                if (errInsert) {
                    return tx.rollback({ status: 400, error: errInsert.message });
                }

                const nuevoLibroId = this.lastID;

                // Registrar en Kardex de movimientos (Event Sourcing de Stock)
                if (stockNum > 0) {
                    db.run(
                        `INSERT INTO movimientos_stock (libro_id, tipo, cantidad, motivo) VALUES (?, 'INGRESO_INICIAL', ?, 'Alta de catálogo e inventario inicial')`,
                        [nuevoLibroId, stockNum],
                        function (errMov) {
                            if (errMov) {
                                return tx.rollback({ status: 500, error: errMov.message });
                            }
                            tx.commit({ id: nuevoLibroId, mensaje: 'Libro agregado y registrado en Kardex con éxito' });
                        }
                    );
                } else {
                    tx.commit({ id: nuevoLibroId, mensaje: 'Libro agregado con éxito (stock inicial en 0)' });
                }
            }
        );
    })
    .then((data) => res.json(data))
    .catch((err) => res.status(err.status || 500).json({ error: err.error || "Error al agregar el libro" }));
});

// Editar un libro
app.put('/api/libros/:id', (req, res) => {
    const { id } = req.params;
    const { titulo, autor, genero, isbn, stock_total } = req.body;

    if (!esIdValido(id)) {
        return res.status(400).json({ error: "Identificador de libro inválido (debe ser numérico)." });
    }

    if (!titulo || typeof titulo !== 'string' || !titulo.trim()) {
        return res.status(400).json({ error: "El título del libro es obligatorio y no puede estar vacío." });
    }
    if (!autor || typeof autor !== 'string' || !autor.trim()) {
        return res.status(400).json({ error: "El autor del libro es obligatorio y no puede estar vacío." });
    }
    if (!isbn || typeof isbn !== 'string' || !isbn.trim()) {
        return res.status(400).json({ error: "El código ISBN es obligatorio y no puede estar vacío." });
    }
    
    // Validación estricta (HU 4.1)
    if (!esEnteroPositivo(stock_total)) {
        return res.status(400).json({ 
            error: "El stock total debe ser un número entero mayor a 0. No se admiten caracteres alfanuméricos ni decimales." 
        });
    }

    const nuevoStockTotal = parseInt(String(stock_total).trim(), 10);

    db.get("SELECT stock_total, stock_disponible FROM libros WHERE id = ?", [id], (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!row) {
            return res.status(404).json({ error: "Libro no encontrado" });
        }

        const prestados = row.stock_total - row.stock_disponible;
        const nuevoStockDisponible = nuevoStockTotal - prestados;

        if (nuevoStockDisponible < 0) {
            return res.status(400).json({ 
                error: "No puedes reducir el stock por debajo de la cantidad de libros prestados actualmente (" + prestados + ")." 
            });
        }

        const diferencia = nuevoStockTotal - row.stock_total;

        runInTransaction((tx) => {
            db.run(
                `UPDATE libros SET titulo = ?, autor = ?, genero = ?, isbn = ?, stock_total = ?, stock_disponible = ? WHERE id = ?`,
                [titulo.trim(), autor.trim(), genero ? genero.trim() : '', isbn.trim(), nuevoStockTotal, nuevoStockDisponible, id],
                function (errUpdate) {
                    if (errUpdate) {
                        return tx.rollback({ status: 400, error: errUpdate.message });
                    }

                    // Si hubo ajuste de stock físico, registrar movimiento Kardex
                    if (diferencia !== 0) {
                        db.run(
                            `INSERT INTO movimientos_stock (libro_id, tipo, cantidad, motivo) VALUES (?, 'AJUSTE', ?, ?)`,
                            [id, diferencia, `Ajuste manual de stock de ${row.stock_total} a ${nuevoStockTotal}`],
                            function (errMov) {
                                if (errMov) return tx.rollback({ status: 500, error: errMov.message });
                                tx.commit({ mensaje: 'Libro, stock y Kardex actualizados con éxito' });
                            }
                        );
                    } else {
                        tx.commit({ mensaje: 'Libro actualizado con éxito' });
                    }
                }
            );
        })
        .then((data) => res.json(data))
        .catch((err) => res.status(err.status || 500).json({ error: err.error || "Error al actualizar libro" }));
    });
});

// Eliminar un libro (HU 1.4 - Bloqueo explícito con preservación de auditoría)
app.delete('/api/libros/:id', (req, res) => {
    const { id } = req.params;

    if (!esIdValido(id)) {
        return res.status(400).json({ error: "Identificador de libro inválido." });
    }
    
    db.get("SELECT id, titulo FROM libros WHERE id = ?", [id], (err, libro) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!libro) return res.status(404).json({ error: "Libro no encontrado." });

        db.get(
            `SELECT 
                COUNT(CASE WHEN estado = 'Activo' THEN 1 END) AS activos,
                COUNT(*) AS total_historial
             FROM prestamos 
             WHERE libro_id = ?`,
            [id],
            (errPrestamos, conteo) => {
                if (errPrestamos) return res.status(500).json({ error: errPrestamos.message });

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

// Registrar daño o pérdida de un ejemplar (Kardex / Movimiento de baja por daño)
app.post('/api/libros/:id/baja-danio', (req, res) => {
    const { id } = req.params;
    const { motivo, socio_id } = req.body;

    if (!esIdValido(id)) {
        return res.status(400).json({ error: "Identificador de libro inválido." });
    }

    const detalleMotivo = (motivo && typeof motivo === 'string' && motivo.trim()) 
        ? motivo.trim() 
        : "Baja física por deterioro, daño o extravío";

    runInTransaction((tx) => {
        db.get("SELECT stock_disponible, stock_total FROM libros WHERE id = ?", [id], (errGet, libro) => {
            if (errGet) return tx.rollback({ status: 500, error: errGet.message });
            if (!libro) return tx.rollback({ status: 404, error: "Libro no encontrado." });
            if (libro.stock_disponible < 1) {
                return tx.rollback({ status: 400, error: "No hay ejemplares disponibles en stock para dar de baja por daño." });
            }

            db.run(
                "UPDATE libros SET stock_total = stock_total - 1, stock_disponible = stock_disponible - 1 WHERE id = ? AND stock_disponible > 0",
                [id],
                function (errUp) {
                    if (errUp) return tx.rollback({ status: 500, error: errUp.message });
                    if (this.changes === 0) return tx.rollback({ status: 400, error: "No hay stock disponible para dar de baja." });

                    db.run(
                        "INSERT INTO movimientos_stock (libro_id, socio_id, tipo, cantidad, motivo) VALUES (?, ?, 'BAJA_POR_DANIO', -1, ?)",
                        [id, socio_id && esIdValido(socio_id) ? socio_id : null, detalleMotivo],
                        function (errMov) {
                            if (errMov) return tx.rollback({ status: 500, error: errMov.message });
                            tx.commit({ mensaje: "Baja por daño/pérdida registrada en Kardex correctamente (-1 ejemplar)." });
                        }
                    );
                }
            );
        });
    })
    .then((data) => res.json(data))
    .catch((err) => res.status(err.status || 500).json({ error: err.error || "Error al procesar la baja" }));
});

// Obtener Kardex / Historial de movimientos de un libro (HU 3.5)
app.get('/api/libros/:id/movimientos', (req, res) => {
    const { id } = req.params;

    if (!esIdValido(id)) {
        return res.status(400).json({ error: "Identificador de libro inválido." });
    }

    const query = `
        SELECT m.id, m.tipo, m.cantidad, m.motivo, m.fecha,
               s.nombre AS socio_nombre
        FROM movimientos_stock m
        LEFT JOIN socios s ON m.socio_id = s.id
        WHERE m.libro_id = ?
        ORDER BY m.id DESC
    `;

    db.all(query, [id], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        
        // Calcular el balance acumulado de stock
        let balance = 0;
        rows.forEach(r => balance += r.cantidad);

        res.json({
            movimientos: rows,
            stock_calculado_kardex: balance
        });
    });
});

// --- API Endpoints Socios ---

// Obtener todos los socios
app.get('/api/socios', (req, res) => {
    db.all("SELECT * FROM socios ORDER BY id DESC", [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
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
            if (err) return res.status(400).json({ error: err.message });
            res.json({ id: this.lastID, mensaje: 'Socio registrado con éxito' });
        }
    );
});

// Editar un socio
app.put('/api/socios/:id', (req, res) => {
    const { id } = req.params;
    const { nombre, telefono, email } = req.body;

    if (!esIdValido(id)) {
        return res.status(400).json({ error: "Identificador de socio inválido." });
    }

    if (!nombre || typeof nombre !== 'string' || !nombre.trim()) {
        return res.status(400).json({ error: "El nombre del socio es obligatorio y no puede estar vacío." });
    }

    db.run(
        `UPDATE socios SET nombre = ?, telefono = ?, email = ? WHERE id = ?`,
        [nombre.trim(), telefono ? telefono.trim() : '', email ? email.trim() : null, id],
        function (err) {
            if (err) return res.status(400).json({ error: err.message });
            res.json({ mensaje: 'Socio actualizado con éxito' });
        }
    );
});

// Eliminar un socio (HU 3.3 - Bloqueo explícito con preservación de auditoría)
app.delete('/api/socios/:id', (req, res) => {
    const { id } = req.params;

    if (!esIdValido(id)) {
        return res.status(400).json({ error: "Identificador de socio inválido." });
    }
    
    db.get("SELECT id, nombre FROM socios WHERE id = ?", [id], (err, socio) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!socio) return res.status(404).json({ error: "Socio no encontrado." });

        db.get(
            `SELECT 
                COUNT(CASE WHEN estado = 'Activo' THEN 1 END) AS activos,
                COUNT(*) AS total_historial
             FROM prestamos 
             WHERE socio_id = ?`,
            [id],
            (errPrestamos, conteo) => {
                if (errPrestamos) return res.status(500).json({ error: errPrestamos.message });

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

// Obtener historial completo de préstamos de un socio (Trazabilidad de Socio)
app.get('/api/socios/:id/historial', (req, res) => {
    const { id } = req.params;

    if (!esIdValido(id)) {
        return res.status(400).json({ error: "Identificador de socio inválido." });
    }

    const query = `
        SELECT p.id AS prestamo_id, p.fecha_prestamo, p.fecha_devolucion, p.estado,
               l.id AS libro_id, l.titulo AS libro_titulo, l.autor AS libro_autor, l.isbn,
               CAST(julianday('now') - julianday(p.fecha_prestamo) AS INTEGER) AS dias_transcurridos
        FROM prestamos p
        JOIN libros l ON p.libro_id = l.id
        WHERE p.socio_id = ?
        ORDER BY p.id DESC
    `;

    db.all(query, [id], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// --- API Endpoints Préstamos ---

// Obtener todos los préstamos
app.get('/api/prestamos', (req, res) => {
    const query = `
        SELECT p.id, p.fecha_prestamo, p.fecha_devolucion, p.estado,
               l.titulo as libro_titulo, s.nombre as socio_nombre,
               CAST(julianday('now') - julianday(p.fecha_prestamo) AS INTEGER) AS dias_transcurridos
        FROM prestamos p
        JOIN libros l ON p.libro_id = l.id
        JOIN socios s ON p.socio_id = s.id
        ORDER BY p.id DESC
    `;
    db.all(query, [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// Registrar un préstamo (HU 2.2 + Kardex)
app.post('/api/prestamos', (req, res) => {
    const { libro_id, socio_id } = req.body;

    if (!esIdValido(libro_id) || !esIdValido(socio_id)) {
        return res.status(400).json({ error: "Debe seleccionar un libro y un socio válidos." });
    }

    const idLibro = parseInt(String(libro_id).trim(), 10);
    const idSocio = parseInt(String(socio_id).trim(), 10);

    db.get("SELECT id, nombre FROM socios WHERE id = ?", [idSocio], (errSocio, socio) => {
        if (errSocio) return res.status(500).json({ error: errSocio.message });
        if (!socio) return res.status(404).json({ error: "El socio seleccionado no existe en el sistema." });

        runInTransaction((tx) => {
            // Descontar stock únicamente si stock_disponible > 0 (atómico)
            db.run(
                "UPDATE libros SET stock_disponible = stock_disponible - 1 WHERE id = ? AND stock_disponible > 0",
                [idLibro],
                function (errUpdate) {
                    if (errUpdate) return tx.rollback({ status: 500, error: errUpdate.message });
                    if (this.changes === 0) {
                        return tx.rollback({ status: 400, error: "No hay stock disponible para prestar este libro." });
                    }

                    // Insertar préstamo
                    db.run(
                        "INSERT INTO prestamos (libro_id, socio_id, fecha_prestamo, estado) VALUES (?, ?, CURRENT_DATE, 'Activo')",
                        [idLibro, idSocio],
                        function (errInsert) {
                            if (errInsert) return tx.rollback({ status: 500, error: errInsert.message });
                            
                            const nuevoPrestamoId = this.lastID;

                            // Registrar movimiento Kardex
                            db.run(
                                "INSERT INTO movimientos_stock (libro_id, socio_id, prestamo_id, tipo, cantidad, motivo) VALUES (?, ?, ?, 'PRESTAMO', -1, ?)",
                                [idLibro, idSocio, nuevoPrestamoId, `Préstamo asignado al socio ${socio.nombre}`],
                                function (errMov) {
                                    if (errMov) return tx.rollback({ status: 500, error: errMov.message });
                                    tx.commit({ id: nuevoPrestamoId, mensaje: "Préstamo registrado exitosamente y asentado en Kardex" });
                                }
                            );
                        }
                    );
                }
            );
        })
        .then((data) => res.json(data))
        .catch((err) => res.status(err.status || 500).json({ error: err.error || "Error al procesar el préstamo" }));
    });
});

// Registrar devolución (HU 2.3 + Kardex)
app.put('/api/prestamos/:id/devolucion', (req, res) => {
    const { id } = req.params;

    if (!esIdValido(id)) {
        return res.status(400).json({ error: "ID de préstamo inválido." });
    }

    const idPrestamo = parseInt(String(id).trim(), 10);

    runInTransaction((tx) => {
        db.get("SELECT p.id, p.libro_id, p.socio_id, p.estado, s.nombre as socio_nombre FROM prestamos p JOIN socios s ON p.socio_id = s.id WHERE p.id = ?", [idPrestamo], (errGet, prestamo) => {
            if (errGet) return tx.rollback({ status: 500, error: errGet.message });
            if (!prestamo) return tx.rollback({ status: 404, error: "Préstamo no encontrado." });
            if (prestamo.estado !== 'Activo') {
                return tx.rollback({ status: 400, error: "Este préstamo ya fue devuelto." });
            }

            db.run(
                "UPDATE prestamos SET estado = 'Devuelto', fecha_devolucion = CURRENT_DATE WHERE id = ? AND estado = 'Activo'",
                [idPrestamo],
                function (errUpdatePrestamo) {
                    if (errUpdatePrestamo) return tx.rollback({ status: 500, error: errUpdatePrestamo.message });
                    if (this.changes === 0) {
                        return tx.rollback({ status: 400, error: "Este préstamo ya fue devuelto por otra operación concurrente." });
                    }

                    db.run(
                        "UPDATE libros SET stock_disponible = stock_disponible + 1 WHERE id = ?",
                        [prestamo.libro_id],
                        function (errUpdateLibro) {
                            if (errUpdateLibro) return tx.rollback({ status: 500, error: errUpdateLibro.message });

                            // Registrar movimiento Kardex
                            db.run(
                                "INSERT INTO movimientos_stock (libro_id, socio_id, prestamo_id, tipo, cantidad, motivo) VALUES (?, ?, ?, 'DEVOLUCION', 1, ?)",
                                [prestamo.libro_id, prestamo.socio_id, idPrestamo, `Devolución de ejemplar por socio ${prestamo.socio_nombre}`],
                                function (errMov) {
                                    if (errMov) return tx.rollback({ status: 500, error: errMov.message });
                                    tx.commit({ mensaje: "Devolución registrada exitosamente y reintegrada al Kardex" });
                                }
                            );
                        }
                    );
                }
            );
        });
    })
    .then((data) => res.json(data))
    .catch((err) => res.status(err.status || 500).json({ error: err.error || "Error al procesar la devolución" }));
});

// --- API Endpoints Reportes (HU 5.1) ---

// Reporte de préstamos vencidos y socios morosos (> 15 días)
app.get('/api/reportes/morosos', (req, res) => {
    const query = `
        SELECT p.id AS prestamo_id, p.fecha_prestamo,
               CAST(julianday('now') - julianday(p.fecha_prestamo) AS INTEGER) AS dias_transcurridos,
               (CAST(julianday('now') - julianday(p.fecha_prestamo) AS INTEGER) - 15) AS dias_atraso,
               l.id AS libro_id, l.titulo AS libro_titulo, l.isbn,
               s.id AS socio_id, s.nombre AS socio_nombre, s.telefono AS socio_telefono, s.email AS socio_email
        FROM prestamos p
        JOIN libros l ON p.libro_id = l.id
        JOIN socios s ON p.socio_id = s.id
        WHERE p.estado = 'Activo' AND (julianday('now') - julianday(p.fecha_prestamo)) > 15
        ORDER BY dias_transcurridos DESC
    `;
    db.all(query, [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({
            total_morosos: rows.length,
            fecha_reporte: new Date().toISOString().split('T')[0],
            morosos: rows
        });
    });
});

// Levantar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
