const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'biblioteca.db');
const db = new sqlite3.Database(dbPath);

const libros = [
    { titulo: 'Cien Años de Soledad', autor: 'Gabriel García Márquez', genero: 'Realismo Mágico', isbn: '978-0307474728', stock: 5 },
    { titulo: 'El Señor de los Anillos', autor: 'J.R.R. Tolkien', genero: 'Fantasía', isbn: '978-8445071793', stock: 3 },
    { titulo: '1984', autor: 'George Orwell', genero: 'Ciencia Ficción', isbn: '978-0451524935', stock: 7 },
    { titulo: 'Rayuela', autor: 'Julio Cortázar', genero: 'Novela', isbn: '978-8420471832', stock: 2 },
    { titulo: 'Ficciones', autor: 'Jorge Luis Borges', genero: 'Cuentos', isbn: '978-0307950928', stock: 4 }
];

const socios = [
    { nombre: 'Juan Pérez', telefono: '1122334455', email: 'juan.perez@email.com' },
    { nombre: 'María Gómez', telefono: '1199887766', email: 'maria.gomez@email.com' },
    { nombre: 'Carlos López', telefono: '1155443322', email: 'carlos.lopez@email.com' },
    { nombre: 'Ana Martínez', telefono: '1166778899', email: 'ana.martinez@email.com' },
    { nombre: 'Laura Fernández', telefono: '1133221100', email: 'laura.fernandez@email.com' }
];

db.serialize(() => {
    // Insertar libros
    const stmtLibros = db.prepare("INSERT OR IGNORE INTO libros (titulo, autor, genero, isbn, stock_total, stock_disponible) VALUES (?, ?, ?, ?, ?, ?)");
    libros.forEach(l => {
        stmtLibros.run(l.titulo, l.autor, l.genero, l.isbn, l.stock, l.stock);
    });
    stmtLibros.finalize();

    // Insertar socios
    const stmtSocios = db.prepare("INSERT OR IGNORE INTO socios (nombre, telefono, email) VALUES (?, ?, ?)");
    socios.forEach(s => {
        stmtSocios.run(s.nombre, s.telefono, s.email);
    });
    stmtSocios.finalize();
});

db.close(() => {
    console.log("Datos de prueba (5 libros y 5 socios) cargados exitosamente.");
});
