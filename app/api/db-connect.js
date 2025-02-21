import mysql from 'mysql2/promise';

export const handler = async (event) => {
    let connection;

    try {
        // Connect to the MySQL database using environment variables
        connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            port: process.env.DB_PORT || 3306,
        });

        // Execute a sample query
        const [rows] = await connection.execute('SELECT * FROM your_table LIMIT 10');

        // Return the results
        return {
            statusCode: 200,
            body: JSON.stringify(rows),
        };
    } catch (error) {
        console.error('Database connection error:', error);

        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Database connection failed' }),
        };
    } finally {
        if (connection) {
            await connection.end();
        }
    }
};