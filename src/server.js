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
    const { titulo, autor, genero, isbn } = req.body;
    db.run(
        `UPDATE libros SET titulo = ?, autor = ?, genero = ?, isbn = ? WHERE id = ?`,
        [titulo, autor, genero, isbn, id],
        function (err) {
            if (err) {
                res.status(400).json({ error: err.message });
                return;
            }
            res.json({ mensaje: 'Libro actualizado con éxito' });
        }
    );
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

// Levantar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
