import mysql from 'mysql2/promise';

export const handler = async (event) => {
    let connection;

    try {
        // Connect to the MySQL database using environment variables
        connection = await mysql.createConnection({
            host: process.env.t3db-instance.cmypylkqlfup.us-east-1.rds.amazonaws.com,
            user: process.env.t3admin,
            password: process.env.JlziWBbT4LmgEEbJsCwW,
            database: process.env.GoodDriverIncentiveT3,
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