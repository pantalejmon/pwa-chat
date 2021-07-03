import {Controller, Get, Post, Req, Session, UseGuards} from '@nestjs/common';
import {Request} from 'express';
import {SessionGuard} from './guards/session.guard';
import {AuthService} from "./auth.service";

@Controller(`auth`)
export class AuthController {

    constructor(private authService: AuthService) {
    }

    @Get()
    @UseGuards(SessionGuard)
    getUserInfo(@Req() req: Request, @Session() session): any {
        return session.user;
    }

    @Post()
    login(@Req() req: Request, @Session() session): any {
        return this.authService.logIn(req, session)
    }

    @Get('/logout')
    @UseGuards(SessionGuard)
    logout(@Req() req: Request, @Session() session): any {
        delete session.user;
    }
}
