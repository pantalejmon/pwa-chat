import {Injectable} from "@angular/core";
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "./user.entity";
import {Repository} from "typeorm";
import {HttpException, HttpStatus} from "@nestjs/common";
import {hash} from "bcrypt";

@Injectable()
export class UserService {

    constructor(@InjectRepository(User) private userRepository: Repository<User>) {
    }

    async findOne(user: string): Promise<User | undefined> {
        return await this.userRepository
            .findOne({
                where: [
                    {email: user},
                    {username: user},
                ]
            });
    }

    async register(user: User) {
        const userToAdd = User.createUserFromRegistration(user);

        if (user.id || !userToAdd.isFormDataValid()) {
            throw new HttpException({
                status: HttpStatus.NOT_ACCEPTABLE,
                error: 'Niepoprawne dane rejestracyjne',
            }, HttpStatus.NOT_ACCEPTABLE);
        }

        if (!await this.isEmailFree(userToAdd.email) || !await this.isUsernameFree(userToAdd.username)) {
            throw new HttpException({
                status: HttpStatus.CONFLICT,
                error: 'Duplicated username or email',
            }, HttpStatus.CONFLICT);
        }

        return await this.prepareAndSaveUser(userToAdd);
    }

    async isEmailFree(email: string) {
        const userWithThatEmail = await this.userRepository.findOne(
            {where: {email}}
        );

        return !userWithThatEmail;
    }

    async isUsernameFree(username: string) {
        const userWithThatUsername = await this.userRepository.findOne(
            {where: {username}}
        );

        return !userWithThatUsername;
    }

    private async prepareAndSaveUser(userToAdd: User) {
        userToAdd.password = await hash(userToAdd.password, 10);
        return (await this.userRepository.save(userToAdd))
            .toDto()
    }
}