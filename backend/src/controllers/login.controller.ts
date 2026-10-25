import { FastifyRequest, FastifyReply } from 'fastify';
import bcrypt from 'bcrypt';
import { UserRepository } from '../repository/user.repository.js';

interface LoginBody {
  email?: string;
  password?: string;
}

const userRepository = new UserRepository();

export async function loginController(
  request: FastifyRequest<{ Body: LoginBody }>,
  reply: FastifyReply
) {
  const { email, password } = request.body;

  if (!email || !password) {
    return reply.status(400).send({ error: 'E-mail e palavra-passe são obrigatórios.' });
  }

  const user = await userRepository.findByEmail(email);
  if (!user) {
    return reply.status(401).send({ error: 'E-mail ou palavra-passe incorretos.' });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return reply.status(401).send({ error: 'E-mail ou palavra-passe incorretos.' });
  }

  const token = await reply.jwtSign(
    { name: user.name, email: user.email },
    { sign: { sub: user.id, expiresIn: "2h" }}
  )

  const { password: _, ...userWithoutPassword } = user;

  return reply.status(200).send({
    message: 'Login efetuado com sucesso!',
    token,
    user: userWithoutPassword,
  });
}