import {Injectable, UnauthorizedException} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import {UserService} from '../../domain/user/user.service';
import {Request} from 'express';

@Injectable()
export class AuthService {

    constructor(private userService: UserService) {
    }

    async logIn(request: Request, session: any) {
        const {username, password} = request.body;
        if (username && password) {
            const user = await this.validateUser(username, password);
            if (!user) {
                throw  new UnauthorizedException();
            } else {
                session.user = user;
                return user;
            }
        } else {
            throw new UnauthorizedException();
        }
    }

    private async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.userService.findOne(username);

        if (user) {
            const match = await bcrypt.compare(pass, user.password);
            if (match) {
                const {password, ...result} = user;
                return result;
            }
        }

        return null;
    }
}
