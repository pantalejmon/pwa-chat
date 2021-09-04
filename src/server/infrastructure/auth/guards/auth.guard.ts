import {CanActivate, ExecutionContext} from '@nestjs/common';
import {Injectable} from '@angular/core';

@Injectable()
export class AuthGuard implements CanActivate {

    async canActivate(context: ExecutionContext): Promise<boolean> {

        return !!context.switchToHttp()
            .getRequest()
            ?.session
            ?.user;
    }
}
