import {Module} from '@nestjs/common';
import {UserService} from "./domain/user/user.service";
import {AuthService} from "./infrastructure/auth/auth.service";
import {join} from "path";
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "./domain/user/user.entity";
import {ServeStaticModule} from "@nestjs/serve-static";
import {AuthController} from "./infrastructure/auth/auth.controller";
import {UserController} from "./domain/user/user.controller";
import {Session} from "./infrastructure/session/session.entity";
import {ActivityService} from "./domain/activity/activity.service";
import {ActivityGateway} from "./domain/activity/activity.gateway";
import {ScheduleModule} from "@nestjs/schedule";

export const API = process.env.API_URL || `api`;
export const SOCKET = process.env.API_URL || `socket`;

export const PORT: number = parseInt(process.env.PORT) || 8080;

@Module({
    imports: [
        TypeOrmModule.forRoot(),
        TypeOrmModule.forFeature([
            User,
            Session
        ]),
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, `web`),
            exclude: [`/${API}*`],
        }),
        ScheduleModule.forRoot(),
    ],
    controllers: [
        UserController,
        AuthController
    ],
    providers: [
        UserService,
        AuthService,
        ActivityService,
        ActivityGateway
    ],
})
export class AppModule {
}
