import {Injectable} from "@angular/core";
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "./user.entity";
import {Repository} from "typeorm";

@Injectable()
export class UserService {

    constructor(@InjectRepository(User) private userRepository: Repository<User>) {
    }

    async findOne(user: string): Promise<User | undefined> {
        return await this.userRepository
            .findOne({
                where: [
                    {email: user},
                    {nickname: user},
                ]
            });
    }
}