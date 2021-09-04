import {IoAdapter} from "@nestjs/platform-socket.io";
import {NestExpressApplication} from "@nestjs/platform-express";
import {Server} from "socket.io";
import * as sharedsession from 'express-socket.io-session';


export class SocketAdapter extends IoAdapter {
    private app: any
    private session: any;

    constructor(app: any, session: any) {
        super(app)
        this.app = app;
        this.session = session;
    }

    createIOServer(port: number, options?: any): any {
        //options.allowRequest = this.allowRequest;
        const server: Server = super.createIOServer(port, options);
        server.use(sharedsession(this.session, {
            autoSave: true
        }))

        return server;
    }

    async allowRequest(request, allowFunction) {

        console.log(request.session);
        if (request.session?.user) {
            return allowFunction(null, true);
        } else {
            return allowFunction("FORBIDDEN", false);
        }
    }

}