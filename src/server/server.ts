import express, {Express} from "express";
import bodyParser from "body-parser";
import {steamRouter} from "./routes/routes.steamUser";

export const server: Express = express();

server.use(bodyParser.json())
server.use('/steam', steamRouter);
