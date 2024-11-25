import Database from 'better-sqlite3';

const db = new Database('products.db');

db.exec(`
  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    code TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    stock INTEGER NOT NULL DEFAULT 0
  )
`);

export const getProducts = (limit = 10) => {
  return db.prepare('SELECT * FROM products LIMIT ?').all(limit);
};

export const searchProducts = (search: string) => {
  return db.prepare(
    'SELECT * FROM products WHERE code LIKE ? OR name LIKE ?'
  ).all(`%${search}%`, `%${search}%`);
};

export const updateStock = (code: string, stock: number) => {
  return db.prepare(
    'UPDATE products SET stock = ? WHERE code = ?'
  ).run(stock, code);
};

export const addProduct = (code: string, name: string, stock: number) => {
  return db.prepare(
    'INSERT INTO products (code, name, stock) VALUES (?, ?, ?)'
  ).run(code, name, stock);
};

export const getProductByCode = (code: string) => {
  return db.prepare('SELECT * FROM products WHERE code = ?').get(code);
};