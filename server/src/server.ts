import Fastify from "fastify";

const app = Fastify();

const port = 3333;

app.listen({ port }, () => console.log(`Server is running on PORT ${ port }`));