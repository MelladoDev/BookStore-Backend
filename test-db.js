import pool from './src/DataBase/config.js';

(async () => {
    try {
        const res = await pool.query('SELECT NOW()');
        console.log('✅ Conexión exitosa a PostgreSQL:', res.rows[0]);
    } catch (error) {
        console.error('❌ Error al conectar a la base de datos:', error);
    } finally {
        pool.end();
    }
})();
