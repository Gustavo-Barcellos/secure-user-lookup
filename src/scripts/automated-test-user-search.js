/**
 * Script para testes automatizados do módulo de usuários
 * 
 * Este script executa testes automatizados para verificar se a função
 * de busca por e-mail está funcionando corretamente em diferentes cenários.
 */

const userModule = require('../modules/users');
const db = require('../infra/database');

// Casos de teste
const testCases = [
  { 
    description: 'Busca por e-mail existente', 
    email: 'joao@exemplo.com',
    expectedResult: true
  },
  { 
    description: 'Busca por e-mail inexistente', 
    email: 'naoexiste@exemplo.com',
    expectedResult: false
  },
  { 
    description: 'Busca por e-mail de usuário marcado como removido', 
    email: 'inexistente@exemplo.com',
    expectedResult: false // Assumindo que usuários removidos não devem ser retornados
  }
];

async function runAutomatedTests() {
  console.log('🧪 Iniciando testes automatizados do módulo de usuários');
  console.log('=====================================================');

  let passedTests = 0;
  let failedTests = 0;

  try {
    for (const [index, test] of testCases.entries()) {
      console.log(`\n📌 Teste ${index + 1}: ${test.description}`);
      console.log(`📧 E-mail: ${test.email}`);

      try {
        // Executar a busca
        const user = await userModule.findUserByEmail(test.email);
        const userFound = !!user;

        // Verificar se o resultado corresponde ao esperado
        if (userFound === test.expectedResult) {
          console.log('✅ PASSOU: O resultado corresponde ao esperado');
          if (userFound) {
            console.log('📄 Dados do usuário:', JSON.stringify(user, null, 2));
          }
          passedTests++;
        } else {
          console.log('❌ FALHOU: O resultado não corresponde ao esperado');
          console.log(`   Esperado: ${test.expectedResult ? 'Usuário encontrado' : 'Usuário não encontrado'}`);
          console.log(`   Obtido: ${userFound ? 'Usuário encontrado' : 'Usuário não encontrado'}`);
          failedTests++;
        }
      } catch (error) {
        console.log('❌ FALHOU: Erro durante a execução do teste');
        console.log(`   Erro: ${error.message}`);
        failedTests++;
      }

      console.log('-----------------------------------------------------');
    }

    // Resumo dos testes
    console.log('\n📊 RESUMO DOS TESTES');
    console.log(`✅ Testes passados: ${passedTests}`);
    console.log(`❌ Testes falhos: ${failedTests}`);
    console.log(`🔢 Total de testes: ${testCases.length}`);

    if (failedTests === 0) {
      console.log('\n🎉 TODOS OS TESTES PASSARAM!');
    } else {
      console.log('\n⚠️ ALGUNS TESTES FALHARAM. Verifique os detalhes acima.');
    }

  } catch (error) {
    console.error('\n❌ ERRO FATAL durante os testes:', error.message);
  } finally {
    await db.close();
  }
}

// Executar os testes
runAutomatedTests();
