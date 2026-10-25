import postgres from 'postgres';

// Configuração da conexão com o PostgreSQL (usando os dados do docker-compose)
const sql = postgres({
  host: '127.0.0.1',
  port: 5432,
  database: 'devlabdb',
  username: 'devlab',
  password: 'secretpassword',
});

export default sql;