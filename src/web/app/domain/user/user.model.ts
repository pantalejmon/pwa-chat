export class UserDto {
  email: string;
  username: string;

  constructor(value: UserDto = new UserDto()) {
    this.email = value.email;
    this.username = value.username;
  }
}

export class UserForm {
  email: string;
  username: string;
  password: string;

  constructor(value: UserForm = new UserForm()) {
    this.email = value.email;
    this.username = value.username;
    this.password = value.password;
  }
}
