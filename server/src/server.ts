import Fastify from "fastify";
import cors from '@fastify/cors';
import { appRoutes } from "./routes";

const app = Fastify();

app.register(cors);
app.register(appRoutes);

const port = 3333;

app.listen({ port }, () => console.log(`Server is running on PORT ${ port }`));