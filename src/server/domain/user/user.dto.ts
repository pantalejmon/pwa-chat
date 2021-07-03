import {User} from "./user.entity";

export class UserDto {
    email: string;
    nickname: string;

    constructor(value: User = new User()) {
        this.email = value.email;
        this.nickname = value.nickname;
    }
}