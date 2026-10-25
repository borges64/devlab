import Fastify from 'fastify';
import fastifyJwt from '@fastify/jwt';
import cors from "@fastify/cors"
import { userRoutes } from './routes/user.routes.js';


const app = Fastify({
  logger: true
});
app.register(cors, { origin: true })
app.register(fastifyJwt, { secret: "apisecret_devlab"})
app.register(userRoutes)

export default app;