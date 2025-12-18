const db = require('../infra/database');

async function run() {
  try {
    // Testa a conexão
    const connected = await db.testConnection();

    if (connected) {
      // Se conectou com sucesso, vamos tentar buscar informações da tabela users
      const usersResult = await db.query('SELECT COUNT(*) FROM users');
      console.log(`Total users in database: ${usersResult.rows[0].count}`);
    }

    // Fecha a conexão com o pool
    await db.close();
  } catch (error) {
    console.error('Error in test script:', error.message);
    process.exit(1);
  }
}

run();
