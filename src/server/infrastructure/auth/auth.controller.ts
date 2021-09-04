import {Controller, Get, Post, Req, Session, UseGuards} from '@nestjs/common';
import {Request} from 'express';
import {AuthGuard} from './guards/auth.guard';
import {AuthService} from "./auth.service";

@Controller(`auth`)
export class AuthController {

    constructor(private authService: AuthService) {
    }

    @Get()
    @UseGuards(AuthGuard)
    getUserInfo(@Req() req: Request, @Session() session): any {
        return session.user;
    }

    @Post()
    login(@Req() req: Request, @Session() session): any {
        return this.authService.logIn(req, session)
    }

    @Get('/logout')
    @UseGuards(AuthGuard)
    logout(@Req() req: Request, @Session() session): any {
        delete session.user;
    }
}
