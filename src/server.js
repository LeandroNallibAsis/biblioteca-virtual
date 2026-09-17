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

// Levantar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
