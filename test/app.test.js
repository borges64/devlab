import { describe, it, expect, afterAll } from "vitest"
// const { describe, it, expect, afterAll } = require("vitest")
const fastify = require("../src/app")

describe("DevLab API", () => {
    afterAll(async () => {
        await fastify.close();
    })
    it ("GET / Deve retornar HTTP 200", async () => {
        const response = await fastify.inject({
            method: "GET",
            url:"/"
        })
        expect(response.statusCode).toBe(200);
    })
    it("GET / Deve retornar os dados esperados", async() => {
        const response = await fastify.inject({ method: "GET", url: "/" })
        expect(response.json()).toEqual({
            application: "DevLab API",
            message: "API online!",
            nameApp: "Laboratorio de Testes"
        })
    })
})
