import { FastifyRequest, FastifyReply } from 'fastify';

export async function verifyJWT(request: FastifyRequest, reply: FastifyReply) {
  try {
    // Procura o cabeçalho Authorization: Bearer <token> e valida a assinatura
    await request.jwtVerify();
  } catch (err) {
    return reply.status(401).send({ error: 'Não autorizado. Token Bearer inválido ou ausente.' });
  }
}