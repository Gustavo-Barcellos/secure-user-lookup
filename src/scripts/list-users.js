// src/scripts/list-users.js
const db = require('../infra/database');

async function listAllUsers() {
  try {
    console.log('Listando todos os usuários cadastrados:');

    const result = await db.query('SELECT id, email, username FROM users ORDER BY id');

    if (result.rows.length === 0) {
      console.log('Nenhum usuário cadastrado no banco de dados.');
      return;
    }

    console.log('Total de usuários:', result.rows.length);
    console.log('-----------------------------------');

    // Exibe cada usuário em formato tabular
    result.rows.forEach(user => {
      console.log(`ID: ${user.id}`);
      console.log(`Email: ${user.email}`);
      console.log(`Username: ${user.username}`);
      console.log('-----------------------------------');
    });
  } catch (error) {
    console.error('Erro ao listar usuários:', error.message);
  } finally {
    // Fecha a conexão com o banco
    await db.close();
  }
}

// Executa a função
listAllUsers();
