const sqlite3 = require('sqlite3').verbose();
const csv = require('csv-parser');
const fs = require('fs');

const db = new sqlite3.Database('./database.db');

function initializeDatabase() {
    return new Promise((resolve, reject) => {
        // Primeiro, dropar a tabela se ela existir
        db.run(`DROP TABLE IF EXISTS houses`, (err) => {
            if (err) {
                reject(err);
                return;
            }

            // Criar tabela com todas as colunas do seu CSV
            db.run(`CREATE TABLE houses (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                price INTEGER,
                area INTEGER,
                bedrooms INTEGER,
                bathrooms INTEGER,
                stories INTEGER,
                mainroad TEXT,
                guestroom TEXT,
                basement TEXT,
                hotwaterheating TEXT,
                airconditioning TEXT,
                parking INTEGER,
                prefarea TEXT,
                furnishingstatus TEXT
            )`, (err) => {
                if (err) {
                    reject(err);
                    return;
                }

                // Carregar dados do CSV
                fs.createReadStream('./data/housing.csv')
                    .pipe(csv())
                    .on('data', (row) => {
                        const sql = `INSERT INTO houses (
                            price, area, bedrooms, bathrooms, stories,
                            mainroad, guestroom, basement, hotwaterheating,
                            airconditioning, parking, prefarea, furnishingstatus
                        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
                        
                        const values = [
                            row.price, row.area, row.bedrooms, row.bathrooms,
                            row.stories, row.mainroad, row.guestroom,
                            row.basement, row.hotwaterheating, row.airconditioning,
                            row.parking, row.prefarea, row.furnishingstatus
                        ];

                        db.run(sql, values, (err) => {
                            if (err) {
                                console.error('Erro ao inserir:', err);
                                console.error('Valores:', values);
                            }
                        });
                    })
                    .on('end', () => {
                        console.log('CSV carregado com sucesso');
                        resolve();
                    });
            });
        });
    });
}

function getAllHouses() {
    return new Promise((resolve, reject) => {
        db.all("SELECT * FROM houses", [], (err, rows) => {
            if (err) {
                reject(err);
            }
            resolve(rows);
        });
    });
}

module.exports = {
    initializeDatabase,
    getAllHouses
};