import mysql from 'mysql2/promise';

export default async function handler(req, res) {
    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME,
            port: process.env.DB_PORT,
        });

        const [rows] = await connection.execute('SELECT * FROM your_table LIMIT 10');
        res.status(200).json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Database connection failed' });
    }
}