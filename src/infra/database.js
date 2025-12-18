const { Pool } = require('pg');
require('dotenv').config();

// Configuração da conexão com o banco de dados
const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Função para executar queries SQL
async function query(text, params) {
  const start = Date.now();

  try {
    const result = await pool.query(text, params);

    // Log para desenvolvimento - ajuda a identificar queries lentas
    const duration = Date.now() - start;
    console.log(`Executed query: ${text}`);
    console.log(`Duration: ${duration}ms, Rows: ${result.rowCount}`);

    return result;
  } catch (error) {
    console.error('Database query error:', error.message);
    // Repassar o erro para ser tratado pelo chamador
    throw error;
  }
}

// Função para testar a conexão com o banco
async function testConnection() {
  try {
    const result = await query('SELECT NOW()');
    console.log('Database connection successful:', result.rows[0]);
    return true;
  } catch (error) {
    console.error('Database connection failed:', error.message);
    return false;
  }
}

// Função para encerrar a conexão (útil para testes e encerramento da aplicação)
function close() {
  return pool.end();
}

module.exports = {
  query,
  testConnection,
  close,
};
