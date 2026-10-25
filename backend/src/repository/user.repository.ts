import sql from "../config/db.js";

export interface User {
    id?: string;
    name: string;
    email: string;
    password: string;
    created_at?: Date;
}

export type UserWithoutPassword = Omit<User, "password">;
export class UserRepository {
    async init(): Promise<void> {
        await sql`
      CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
    }
    async findByEmail(email: string): Promise<User | undefined> {
    const [user] = await sql<User[]>`
      SELECT * FROM users WHERE email = ${email};
    `;
    return user;
  }

  // Regista um novo utilizador
  async create({ name, email, password }: User): Promise<UserWithoutPassword> {
    const [newUser] = await sql<UserWithoutPassword[]>`
      INSERT INTO users (name, email, password)
      VALUES (${name}, ${email}, ${password})
      RETURNING id, name, email, created_at;
    `;
    return newUser;
  }

  // Lista todos os utilizadores (sem expor a palavra-passe)
  async returnAllUsersFn(): Promise<UserWithoutPassword[]> {
    const users = await sql<UserWithoutPassword[]>`
      SELECT id, name, email, created_at FROM users;
    `;
    return users;
  }
}
