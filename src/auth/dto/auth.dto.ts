import { IsEmail, IsString } from 'class-validator';

export class AuthDto {
	@IsEmail(undefined, { message: 'Логин не является email!' })
	login: string;

	@IsString()
	password: string;
}
