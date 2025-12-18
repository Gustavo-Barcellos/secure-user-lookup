/**
 * Script para testar o módulo de usuários
 * 
 * Este script demonstra como usar o módulo de usuários para buscar
 * um usuário por email e lidar com os resultados.
 */

const userModule = require('../modules/users');

async function testUserModule() {
  try {
    console.log('Iniciando teste do módulo de usuários...');

    // Email para teste
    const testEmail = 'outroteste@gmail.com';
    console.log(`Buscando usuário com email: ${testEmail}`);

    // Chamada ao módulo de usuários
    const user = await userModule.findUserByEmail(testEmail);

    if (user) {
      console.log('Usuário encontrado:');
      console.log(user);
    } else {
      console.log(`Nenhum usuário encontrado com o email: ${testEmail}`);

      // Você poderia implementar a criação de um usuário de teste aqui
      console.log('Dica: Você pode inserir um usuário manualmente no banco para testar:');
      console.log(`INSERT INTO users (email, username) VALUES ('${testEmail}', 'usuarioteste');`);
    }
  } catch (error) {
    console.error('Erro durante o teste do módulo de usuários:', error.message);
  }
}

// Executa o teste
testUserModule();
