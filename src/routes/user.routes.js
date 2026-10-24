import { createdUserController, returnAllUsers } from "../controllers/user.controller.js";

export async function userRoutes(fastify) {
    fastify.post("/users", createdUserController)

    fastify.get("/all-users", returnAllUsers)
}