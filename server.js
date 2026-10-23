const fastify = require("./app")

async function start(){
    try {
        await fastify.listen({ port:3000, host:"127.0.0.1"})
    } catch(error) {
        fastify.log.error(error);
        process.exit(1)
    }
}

start()