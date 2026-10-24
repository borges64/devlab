import sql from "../config/db.js";

export class UserRepository {
    async init() {
        await sql`
        CREATE TABLE IF NOT EXISTS users(
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL, 
            password VARCHAR(255) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        `;
    }
    async create({ name, email, password }) {
        const [user] = await sql`INSERT INTO users (name, email, password)
      VALUES (${name}, ${email}, ${password})
      RETURNING id, name, email, created_at;`
        return user;
    }

    async findByEmail(email) {
        const [user] = await sql`SELECT * FROM users WHERE email = ${email}`
        return user;
    }

    async returnAllUsersFn() {
        const [allUsers] = await sql`SELECT * FROM users`;
        return allUsers;
    }

}