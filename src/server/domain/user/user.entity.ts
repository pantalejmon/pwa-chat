import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {UserDto} from "./user.dto";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 50,
        unique: true
    })
    email: string;

    @Column({
        length: 100,
        unique: true
    })
    nickname: string;

    @Column({
        length: 100
    })
    password: string;

    constructor(value: any = {}) {
        Object.assign(this, value);
    }

    static createUserFromRegistration(userToCreate: User): User {
        const user = new User();
        user.email = userToCreate.email;
        user.nickname = userToCreate.nickname;
        user.password = userToCreate.password;

        return user;
    }

    toDto() {
        return new UserDto(this);
    }

    isFormDataValid() {
        const EMAIL_REGEX: RegExp = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)])/;
        const PASSWORD_REGEX: RegExp = /^(?=.{6,}$)/;
        return !!this.email
            && EMAIL_REGEX.test(this.email)
            && !!this.password
            && !!this.nickname
            && PASSWORD_REGEX.test(this.password);
    }
}