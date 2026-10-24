import Fastify from 'fastify';

const app = Fastify({ logger: true });




app.get("/", async (request, reply) => {
    return {
        application: "DevLab API",
        message: "API online!",
        nameApp: "Laboratorio de Testes"
    }
})
app.get("/health", async (req, reply) => {
    return {
        status: "ok",
        timestamp: Date.now(),
        uptime: process.uptime()
    };
});

export default app;