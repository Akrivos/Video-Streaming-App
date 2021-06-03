import { IsNumber, IsString, MinLength, MaxLength, IsOptional, IsEnum, IsBase64 } from "class-validator";


export enum userOrAdmin {
    user = 'user',
    admin = 'admin'
}

export class UsersDTO {
    @IsNumber()
    id: number;
    @IsString()
    username: string;
    @IsString()
    password: string;
    @IsString()
    salt: string;
    @IsString()
    type: string;
}

export class SignUpUsersDTO {
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    username: string;

    @IsString()
    @MinLength(4)
    @MaxLength(20)
    password: string;

    @IsString()
    type: string;

}

export class SignInUsersDTO {
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    username: string;

    @IsString()
    @MinLength(4)
    @MaxLength(20)
    password: string;
}

export class UserRateMovieDTO {
    @IsNumber()
    userID: number;
    @IsNumber()
    movieID: number;
    @IsNumber()
    rating: number;
}

export class FindAUserDTO {
    @IsString()
    username: string;
}



