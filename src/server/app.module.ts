import {HttpModule, Module} from '@nestjs/common';
import {UserService} from "./domain/user/user.service";
import {AuthService} from "./infrastructure/auth/auth.service";
import {join} from "path";
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "./domain/user/user.entity";
import {ServeStaticModule} from "@nestjs/serve-static";
import {AuthController} from "./infrastructure/auth/auth.controller";
import {UserController} from "./domain/user/user.controller";

export const API = process.env.API_URL || `api`;


@Module({
    imports: [
        TypeOrmModule.forRoot(),
        TypeOrmModule.forFeature([
            User
        ]),
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, `web`),
            exclude: [`/${API}*`],
        }),
        HttpModule,
    ],
    controllers: [
        UserController,
        AuthController
    ],
    providers: [
        UserService,
        AuthService
    ],
})
export class AppModule {
}
