import {NestFactory} from '@nestjs/core';
import {API, AppModule, PORT} from './app.module';
import * as bodyParser from 'body-parser';
import * as session from 'express-session';
import {ValidationPipe} from '@nestjs/common';
import {TypeormStore} from "typeorm-store";
import {getConnection} from "typeorm";
import {Session} from "./infrastructure/session/session.entity";
import {SocketAdapter} from "./infrastructure/websocket/socket.adapter";

async function bootstrap(): Promise<void> {

    // Init nest app
    const app = await NestFactory.create(AppModule, {logger: ['error', 'warn', 'debug', 'verbose', 'log']});

    // Security config
    // app.use(
    //     helmet()
    // );
    app.useGlobalPipes(new ValidationPipe());

    // Endpoint config
    app.use(bodyParser.json({limit: '5mb'}));
    app.use(bodyParser.urlencoded({limit: '5mb', extended: true}));
    app.use(bodyParser.raw({limit: '5mb'}));

    const repository = getConnection().getRepository(Session);

    const sessionInstance = session({
        secret: process.env.SESSION_KEY || 'secret',
        resave: false,
        saveUninitialized: false,
        store: new TypeormStore({repository})
    })
    app.use(sessionInstance);

    // Run app
    app.useWebSocketAdapter(new SocketAdapter(app, sessionInstance));
    app.setGlobalPrefix(API);
    await app.listen(PORT);
}

bootstrap()
    .then(() => console.log(`[INFO] Backend started at port: ${PORT}`));
