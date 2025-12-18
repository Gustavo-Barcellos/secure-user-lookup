/**
 * Módulo de usuários
 * 
 * Este módulo centraliza todas as funcionalidades relacionadas a usuários
 * no sistema, expondo apenas o que é necessário para outros módulos.
 */

const userRepository = require('./repositories/userRepository');

module.exports = {
  // Exportamos apenas o que queremos que seja acessível externamente
  findUserByEmail: userRepository.findByEmail.bind(userRepository)
};
