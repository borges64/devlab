import app from "./app.js";
import { UserRepository } from "./repository/user.repository.js";

async function start() {
    try {
        const userRepository = new UserRepository();
        await userRepository.init();
        
        await app.listen({ port: 3000, host: '127.0.0.1' });
        console.log('🚀 Servidor TypeScript rodando em http://127.0.0.1:3000');
    } catch(error) {
        app.log.error(error);
        process.exit(1)
    }
}

start();