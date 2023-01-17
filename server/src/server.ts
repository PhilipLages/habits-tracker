import Fastify from "fastify";

const app = Fastify();

const port = 3333;

app.get('/', () => {
  return `Server running on port ${ port }`
});

app.listen({ port });