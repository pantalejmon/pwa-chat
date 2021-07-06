import {UserService} from "./user.service";
import {Body, Controller, Get, Post, Query} from "@nestjs/common";
import {User} from "./user.entity";

@Controller(`user`)
export class UserController {

    constructor(private userService: UserService) {
    }

    @Post()
    async register(@Body() user: User) {
        return await this.userService.register(user);
    }

    @Get('/email')
    async emailInUse(@Query('email') email: string) {
        return await this.userService.isEmailFree(email);
    }

    @Get('/username')
    async nicknameInUse(@Query('username') username: string) {
        return await this.userService.isUsernameFree(username);
    }
}