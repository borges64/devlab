import { FastifyInstance } from 'fastify';
import { createUserController, getUsersController } from '../controllers/user.controller.js';
import { loginController } from '../controllers/login.controller.js';
import { verifyJWT } from '../middlewares/auth.js';

export async function userRoutes(fastify: FastifyInstance) {
  fastify.post('/users', createUserController);
  fastify.get('/all-users', { onRequest: [verifyJWT]}, getUsersController);
  fastify.post('/login', loginController);
}