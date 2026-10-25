import { FastifyRequest, FastifyReply } from "fastify";
import bcrypt from "bcrypt"
import { UserRepository } from "../repository/user.repository.js";


interface CreateUserBody {
    name?: string;
    email?: string;
    password: string;
}

const userRepository = new UserRepository();

export async function createUserController(
  request: FastifyRequest<{ Body: CreateUserBody }>,
  reply: FastifyReply
) {
    const { name, email, password } = request.body;
    if (!name || !email || !password) {
        return reply.status(400).send({ error: "Nome, e-mail e senha são obrigatórios" })
    }
    const userExists = await userRepository.findByEmail(email);
    if(userExists) {
        return reply.status(409).send({ error: "E-mail está em uso"})
    }
    const hashPassword = await bcrypt.hash(password, 10)
    const newUser = userRepository.create({ name, email, password: hashPassword })
    return reply.status(200).send({newUser})
}

export async function getUsersController(request: FastifyRequest, reply: FastifyReply) {
    const users =  await userRepository.returnAllUsersFn();
    return reply.status(200).send({ users })
}