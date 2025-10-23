// backend/server.js
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// Укажи путь к файлу SQLite БД (проверь, что .db-файл существует)
const dbPath = 'C:\\Users\\Скебоб\\Desktop\\shop.db';

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Ошибка подключения к БД:', err.message);
    } else {
        console.log('Подключение к SQLite успешно');
    }
});

// --- Получить всех клиентов ---
app.get('/api/clients', (req, res) => {
    db.all('SELECT * FROM clients', (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

// --- Получить все продукты ---
app.get('/api/products', (req, res) => {
    const query = `
        SELECT p.*, c.name as company_name
        FROM products p
        JOIN company c ON p.company_id = c.id
    `;
    db.all(query, (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

// --- Получить все заказы ---
app.get('/api/orders', (req, res) => {
    const query = `
        SELECT 
            o.id,
            o.items_count,
            o.price,
            cl.name AS client_name,
            cl.address AS client_address,
            pr.name AS product_name,
            pr.price AS product_price,
            cr.name AS courier_name,
            co.name AS company_name
        FROM orders o
        JOIN clients cl ON o.client_id = cl.id
        JOIN products pr ON o.product_id = pr.id
        JOIN couriers cr ON o.courier_id = cr.id
        JOIN company co ON o.company_id = co.id
    `;
    db.all(query, (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

// --- Получить всех курьеров ---
app.get('/api/couriers', (req, res) => {
    db.all('SELECT * FROM couriers', (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

// --- Получить все компании ---
app.get('/api/company', (req, res) => {
    db.all('SELECT * FROM company', (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

app.post('/api/products', (req, res) => {
    const { name, price, item_count, company_id } = req.body;
    const query = `
        INSERT INTO products (name, price, item_count, company_id)
        VALUES (?, ?, ?, ?)
    `;
    db.run(query, [name, price, item_count, company_id], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ id: this.lastID, name, price, item_count, company_id });
    });
});

app.put('/api/products/:id', (req, res) => {
    const { id } = req.params;
    const { name, price, item_count, company_id } = req.body;
    const query = `
        UPDATE products
        SET name = ?, price = ?, item_count = ?, company_id = ?
        WHERE id = ?
    `;
    db.run(query, [name, price, item_count, company_id, id], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ updated: this.changes });
    });
});

app.delete('/api/products/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM products WHERE id = ?';
    db.run(query, [id], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ deleted: this.changes });
    });
});


const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});
