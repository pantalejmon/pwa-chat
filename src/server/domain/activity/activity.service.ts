import {Injectable} from "@nestjs/common";
import {ActiveUser} from "./activity.model";
import {Cron} from "@nestjs/schedule";
import {WebSocketServer} from "@nestjs/websockets";
import {Server} from "socket.io";

@Injectable()
export class ActivityService {

    private activeUsers: ActiveUser[] = [];

    cleanActiveUsers() {
        this.activeUsers = [];
    }

    userHeartBeat(activeUser: ActiveUser) {
       const active = this.activeUsers.find(au => au.user.username == activeUser.user.username)
        if(!active) {
            this.activeUsers.push(activeUser);
        }
    }
}