const fastify = require("fastify")({
    logger: true
})

fastify.get("/", async (request, reply) => {
    return {
        application: "DevLab API",
        message: "API online!",
        nameApp: "Laboratorio de Testes"
    }
})
fastify.get("/health", async (req, reply) => {
    return {
        status: "ok",
        timestamp: Date.now(),
        uptime: process.uptime()
    };
});

module.exports = fastify;