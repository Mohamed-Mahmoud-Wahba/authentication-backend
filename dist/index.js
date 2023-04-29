"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
const type_graphql_1 = require("type-graphql");
const auth_1 = require("./resolvers/auth");
const message_1 = require("./resolvers/message");
const typeorm_1 = require("typeorm");
const user_1 = require("./entities/user");
const Message_1 = require("./entities/Message");
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const conn = yield (0, typeorm_1.createConnection)({
        type: "postgres",
        database: "login-register",
        entities: [user_1.User, user_1.Login, user_1.dataUpdate, Message_1.Message],
        synchronize: true,
        username: "postgres",
        password: "",
        port: 5432,
    });
    const apolloServer = new apollo_server_express_1.ApolloServer({
        schema: yield (0, type_graphql_1.buildSchema)({
            resolvers: [auth_1.Auth, message_1.Messages],
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
    });
    yield apolloServer.start();
    const app = (0, express_1.default)();
    const httpServer = http_1.default.createServer(app);
    app.use((0, cors_1.default)({ origin: "http://localhost:3000", credentials: true }));
    apolloServer.applyMiddleware({
        app,
        cors: false,
    });
    app.get("/", (_req, res) => res.send("Hello World!"));
    apolloServer.installSubscriptionHandlers(httpServer);
    const PORT = process.env.PORT || 3000;
    httpServer.listen(PORT);
});
main().catch((err) => {
    console.error(err);
});
//# sourceMappingURL=index.js.map