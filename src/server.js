import app from './app.js';
import { userRoutes } from './routes/user.routes.js';
import { UserRepository } from './repositories/user.repositories.js';

async function start() {
    try {
        // 1. Inicializa a tabela no PostgreSQL caso ela não exista
        const userRepository = new UserRepository();
        await userRepository.init();

        // 2. Registra as rotas de usuário no Fastify
        await app.register(userRoutes);

        // 3. Sobe o servidor na porta 3000
        await app.listen({ port: 3000, host: '127.0.0.1' });
        console.log('🚀 Servidor rodando em http://127.0.0.1:3000');
    } catch (error) {
        app.log.error(error);
        process.exit(1);
    }
}

start();