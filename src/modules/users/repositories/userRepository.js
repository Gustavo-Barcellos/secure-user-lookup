/**
 * Repositório para operações relacionadas a usuários no banco de dados.
 * Encapsula toda a lógica de acesso a dados da entidade User.
 */

const db = require('../../../infra/database');

class UserRepository {
  /**
   * Busca um usuário pelo seu endereço de email
   * 
   * @param {string} email - O email do usuário a ser buscado
   * @returns {Promise<Object|null>} O usuário encontrado ou null se não existir
   * @throws {Error} Se ocorrer um erro durante a consulta
   */
  async findByEmail(email) {
    try {
      // Definição da query com placeholder para evitar SQL injection
      // Adicionamos a condição para filtrar usuários removidos
      const query = {
        text: 'SELECT id, email, username FROM users WHERE email = $1 AND (deleted IS NULL OR deleted = FALSE)',
        values: [email]
      };

      const result = await db.query(query.text, query.values);

      // Se não encontrou nenhum usuário, retorna null
      if (result.rows.length === 0) {
        return null;
      }

      // Retorna o primeiro usuário encontrado
      return result.rows[0];
    } catch (error) {
      // Tratamento de erro específico para esta operação
      console.error(`Erro ao buscar usuário por email: ${error.message}`);

      // Relança o erro com contexto adicional para facilitar o debugging
      throw new Error(`Falha ao buscar usuário por email: ${error.message}`);
    }
  }
}

// Exportamos uma instância já criada para facilitar o uso
module.exports = new UserRepository();
