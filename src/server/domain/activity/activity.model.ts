import {User} from "../user/user.entity";
import {Socket} from "socket.io";

export class ActiveUser {
    user: User = null;
    client: Socket = null;
    lastActivity: number = 0

    constructor(user: User, client: Socket) {
        this.user = user;
        this.client = client;
    }
}