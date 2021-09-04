import {CanActivate, ExecutionContext} from '@nestjs/common';
import {Injectable} from '@angular/core';

@Injectable()
export class WsGuard implements CanActivate {

    async canActivate(context: ExecutionContext): Promise<boolean> {
        return !!context.switchToWs()
            .getClient()
            .handshake
            ?.session
            ?.user;
    }
}
