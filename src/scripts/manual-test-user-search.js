/**
 * Script para testes manuais do módulo de usuários
 * 
 * Este script permite testar a funcionalidade de busca de usuários por e-mail
 * de forma interativa, recebendo o e-mail como argumento da linha de comando.
 */

const userModule = require('../modules/users');
const db = require('../infra/database');

// Captura o e-mail passado como argumento
const email = process.argv[2];

// Função principal de teste
async function testUserSearch() {
  try {
    // Validação básica do input
    if (!email) {
      console.error('Por favor, forneça um e-mail para busca.');
      console.log('Uso: npm run test:user:manual seu@email.com');
      process.exit(1);
    }

    console.log(`🔍 Buscando usuário com e-mail: ${email}`);
    console.log('----------------------------------------');

    // Chamada ao módulo de usuários
    const startTime = Date.now();
    const user = await userModule.findUserByEmail(email);
    const duration = Date.now() - startTime;

    console.log(`⏱️  Busca concluída em ${duration}ms`);
    console.log('----------------------------------------');

    if (user) {
      console.log('✅ USUÁRIO ENCONTRADO:');
      console.log(JSON.stringify(user, null, 2));
    } else {
      console.log('❌ USUÁRIO NÃO ENCONTRADO');
      console.log(`Nenhum registro encontrado para o e-mail: ${email}`);
    }

  } catch (error) {
    console.error('❌ ERRO DURANTE A BUSCA:', error.message);
    console.error('Stack trace:', error.stack);
  } finally {
    // Importante: fechar a conexão com o banco de dados
    await db.close();
  }
}

// Executa o teste
testUserSearch();
