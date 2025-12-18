# Secure User Lookup

Um sistema seguro para consulta de usuários por e-mail, desenvolvido com Node.js e PostgreSQL.

## Visão Geral

Secure User Lookup permite consultar informações de usuários de forma segura através do e-mail, implementando:

- Conexão segura com banco de dados
- Parametrização de queries para prevenir SQL Injection
- Estrutura modular e testável
- Tratamento adequado de erros

## Requisitos

- Node.js (v14 ou superior)
- Docker e Docker Compose
- npm ou yarn

## Como Usar

O projeto oferece diferentes formas de consultar usuários:

- Via linha de comando: `npm run test:user:manual exemplo@email.com`
- Via script automatizado: `npm run test:user:auto`
- Implementação em código próprio através do módulo de usuários

## Decisões Técnicas

- **Arquitetura Modular**: Componentes com responsabilidades bem definidas
- **Padrão Repository**: Separação entre lógica de negócio e acesso a dados
- **Pool de Conexões**: Melhor gerenciamento de recursos do banco de dados
- **Soft Delete**: Exclusão lógica para preservação de histórico

## Resolução de Problemas Comuns

- Para erros de conexão: Verifique o Docker e as credenciais
- Para erros de consulta: Verifique a existência da tabela e dos dados

## Licença

Este projeto está licenciado sob a MIT License.
