import {NestFactory} from '@nestjs/core';
import {API, AppModule} from './app.module';
import * as bodyParser from 'body-parser';
import * as session from 'express-session';
import {ValidationPipe} from '@nestjs/common';
import {WsAdapter} from "@nestjs/platform-ws";
import {TypeormStore} from "typeorm-store";
import {getConnection} from "typeorm";
import {Session} from "./infrastructure/session/session.entity";

async function bootstrap(): Promise<void> {

    // Init nest app
    const app = await NestFactory.create(AppModule, {logger: ['error', 'warn', 'debug', 'verbose', 'log']});

    // Security config
    // app.use(
    //     helmet()
    // );
    app.useGlobalPipes(new ValidationPipe());
    app.useWebSocketAdapter(new WsAdapter(app));

    // Endpoint config
    app.use(bodyParser.json({limit: '5mb'}));
    app.use(bodyParser.urlencoded({limit: '5mb', extended: true}));
    app.use(bodyParser.raw({limit: '5mb'}));
    app.setGlobalPrefix(API);

    const repository = getConnection().getRepository(Session);
    app.use(session({
        secret: process.env.SESSION_KEY || 'secret',
        resave: false,
        saveUninitialized: false,
        store: new TypeormStore({repository})
    }));

    // Run app
    await app.listen(process.env.PORT || 8080);
}

bootstrap()
    .then(() => console.log('[INFO] Backend started'));
