import { UserRepository } from "../repositories/user.repositories.js";

const userRepository = new UserRepository();

export async function createdUserController(request, reply) {
    const {name, email, password} = request.body;
    if (!name || !email || !password) {
        return reply.status(400).send({ error: "Nome, e-mail e senha são obrigatorios para a criação de um novo usuário!"})
    }
    const userExists = await userRepository.findByEmail(email);
    if(userExists) return reply.status(409).send({ error: "E-mail em uso!" })
    const newUser = await userRepository.create({ name, email, password })
    return reply.status(201).send(newUser)

    }


export async function returnAllUsers() {
    const allUsers = await userRepository.returnAllUsersFn();
    return allUsers;
}