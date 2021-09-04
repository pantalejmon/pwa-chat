import {
    ConnectedSocket,
    MessageBody,
    OnGatewayConnection,
    OnGatewayDisconnect,
    OnGatewayInit,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer
} from "@nestjs/websockets";
import {ActivityService} from "./activity.service";
import {Cron} from "@nestjs/schedule";
import {Server, Socket} from "socket.io";
import {UseGuards} from "@nestjs/common";
import {AuthGuard} from "../../infrastructure/auth/guards/auth.guard";
import {WsGuard} from "../../infrastructure/auth/guards/ws.guard";

@WebSocketGateway()
export class ActivityGateway implements OnGatewayConnection, OnGatewayDisconnect {

    @WebSocketServer() server: Server;

    constructor(activityService: ActivityService) {
    }

    @UseGuards(WsGuard)
    @SubscribeMessage('ping')
    handleActivePing(@MessageBody() data: string,
                     @ConnectedSocket() client: Socket) {
        client.send('test', data)
    }

    @Cron('* * * * * *')
    serverHeartBeat(){
        this.server.emit('ping', 'ping')
    }

    handleConnection(client: Socket, ...args: any[]): any {
        const username = client.handshake['session']?.user?.username;

        if(!username){
           // client.disconnect(true);
        }
    }

    handleDisconnect(client: any): any {
    }
}