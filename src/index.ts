import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { Auth } from "./resolvers/auth";
import { Messages } from "./resolvers/message";
import { createConnection } from "typeorm";
import { User, Login, dataUpdate } from "./entities/user";
import { Message } from "./entities/Message";
import http from "http";
import cors from "cors";
const main = async () => {
  const conn = await createConnection({
    type: "postgres",
    database: "login-register",
    entities: [User, Login, dataUpdate, Message],
    synchronize: true,
    username: "postgres",
    password: "",
    port: 5432,
  });
    const apolloServer = new ApolloServer({
      schema: await buildSchema({
        resolvers: [Auth, Messages],
        validate: false,
      }),
      subscriptions: {
        path: "/subscriptions",
        onConnect: () => {
          console.log("Client connected for subscriptions");
        },
        onDisconnect: () => {
          console.log("Client disconnected from subscriptions");
        },
      },
      // plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
    });
  await apolloServer.start();
  const app = express();
  const httpServer = http.createServer(app);
  app.use(cors({ origin: "http://localhost:3000", credentials: true }));
  apolloServer.applyMiddleware({
    app,
    cors: false,
  });
  app.get("/", (_req, res) => res.send("Hello World!"));
   apolloServer.installSubscriptionHandlers(httpServer);
  const PORT = process.env.PORT || 3000;
  httpServer.listen(PORT);
};
main().catch((err) => {
  console.error(err);
});
