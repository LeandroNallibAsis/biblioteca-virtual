const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'biblioteca.db');

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error al conectar con la base de datos:', err.message);
    } else {
        console.log('Conectado a la base de datos SQLite.');
        inicializarBaseDeDatos();
    }
});

function inicializarBaseDeDatos() {
    // Tabla de Libros
    db.run(`CREATE TABLE IF NOT EXISTS libros (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        titulo TEXT NOT NULL,
        autor TEXT NOT NULL,
        genero TEXT,
        isbn TEXT UNIQUE NOT NULL,
        stock_total INTEGER DEFAULT 0,
        stock_disponible INTEGER DEFAULT 0
    )`);

    // Tabla de Socios/Lectores
    db.run(`CREATE TABLE IF NOT EXISTS socios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT NOT NULL,
        telefono TEXT,
        email TEXT UNIQUE
    )`);

    // Tabla de Préstamos
    db.run(`CREATE TABLE IF NOT EXISTS prestamos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        libro_id INTEGER NOT NULL,
        socio_id INTEGER NOT NULL,
        fecha_prestamo DATE DEFAULT CURRENT_DATE,
        fecha_devolucion DATE,
        estado TEXT DEFAULT 'Activo',
        FOREIGN KEY(libro_id) REFERENCES libros(id),
        FOREIGN KEY(socio_id) REFERENCES socios(id)
    )`);
}

module.exports = db;
