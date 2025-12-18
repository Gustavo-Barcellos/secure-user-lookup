/**
 * Script para popular o banco de dados com usuários de teste
 * 
 * Este script insere usuários fictícios no banco para facilitar os testes.
 * Em um ambiente profissional, scripts de seed como este são essenciais para
 * garantir que todos os desenvolvedores tenham dados consistentes para testes.
 */

const db = require('../infra/database');

async function ensureTableStructure() {
    try {
      console.log('🔧 Verificando e atualizando estrutura da tabela users...');
  
      // Verificar se a coluna deleted já existe
      const columnCheck = await db.query(`
        SELECT column_name 
        FROM information_schema.columns 
        WHERE table_name = 'users' AND column_name = 'deleted'
      `);
  
      // Se a coluna não existir, adicioná-la
      if (columnCheck.rows.length === 0) {
        await db.query(`
          ALTER TABLE users 
          ADD COLUMN deleted BOOLEAN DEFAULT FALSE
        `);
        console.log('✅ Coluna "deleted" adicionada com sucesso');
      } else {
        console.log('✅ Coluna "deleted" já existe');
      }
    } catch (error) {
      console.error('❌ Erro ao verificar/atualizar estrutura da tabela:', error.message);
      throw error; // Propagar o erro para tratamento adequado
    }
  }
  

  

// Array de usuários de teste
const testUsers = [
  { email: 'joao@exemplo.com', username: 'joaosilva' },
  { email: 'maria@exemplo.com', username: 'mariasousa' },
  { email: 'carlos@exemplo.com', username: 'carlosferreira' },
  { email: 'ana@exemplo.com', username: 'analuiza' },
  { email: 'inexistente@exemplo.com', username: 'usuarioapagado', deleted: true }
];

async function seedTestUsers() {
  try {
    console.log('🌱 Iniciando população do banco com usuários de teste...');

    // Primeiro, verificamos se a tabela users existe
    try {
      await db.query(`
        CREATE TABLE IF NOT EXISTS users (
          id SERIAL PRIMARY KEY,
          email VARCHAR(255) UNIQUE NOT NULL,
          username VARCHAR(100) NOT NULL,
          deleted BOOLEAN DEFAULT FALSE
        )
      `);
      console.log('✅ Tabela users verificada/criada com sucesso');
    } catch (error) {
      console.error('❌ Erro ao verificar/criar tabela users:', error.message);
      return;
    }

    await ensureTableStructure();
    // Inserir cada usuário, ignorando se já existir (usando ON CONFLICT)
    for (const user of testUsers) {
      try {
        const result = await db.query(`
          INSERT INTO users (email, username, deleted)
          VALUES ($1, $2, $3)
          ON CONFLICT (email) 
          DO UPDATE SET username = $2, deleted = $3
          RETURNING id, email, username, deleted
        `, [user.email, user.username, user.deleted || false]);

        console.log(`✅ Usuário inserido/atualizado: ${result.rows[0].email}`);
      } catch (error) {
        console.error(`❌ Erro ao inserir usuário ${user.email}:`, error.message);
      }
    }

    // Exibir todos os usuários no banco após a inserção
    const allUsers = await db.query('SELECT id, email, username, deleted FROM users ORDER BY id');
    console.log('\n📋 Usuários no banco de dados:');
    console.table(allUsers.rows);

    console.log('\n🎉 População de dados concluída!');
  } catch (error) {
    console.error('❌ Erro durante a população de dados:', error.message);
  } finally {
    await db.close();
  }
}


// Executar o script
seedTestUsers();
