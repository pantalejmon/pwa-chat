import {Module} from '@nestjs/common';

export const API = process.env.API_URL || `api`;


@Module({
    imports: [],
    controllers: [],
    providers: [],
})
export class AppModule {
}
