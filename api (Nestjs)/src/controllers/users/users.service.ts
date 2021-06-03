import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "src/entities/User";
import { UsersDTO, SignUpUsersDTO, SignInUsersDTO, FindAUserDTO } from "./users.dto";
import * as bcrypt from 'bcrypt';
import { JwtPayload } from "./jwt-payload.interface";

@Injectable()
export class UsersService {
    constructor(
        private jwtService: JwtService
    ) { }

    async validateUserPassword(usrnm: string, pass: string): Promise<User> {
        const findUser = await User.findOne({ username: usrnm });
        //const valPass = await findUser.validatePassword(pass);
        if (!findUser) {
            return null;
        } else {
            const valPass = await findUser.validatePassword(pass);
            if (findUser.password === valPass) {
                return findUser;
            } else {
                return null;
            }
        }


    }

    async getAllUsers(): Promise<UsersDTO[]> {
        return await User.find();
    }

    async findAUser(body: FindAUserDTO): Promise<UsersDTO> {
        const findUser = await User.findOne(body);
        if (findUser) {
            return findUser;
        } else {
            return null;
        }
    }


    async signUp(body: SignUpUsersDTO) {
        const salt = await bcrypt.genSalt();
        const bcryptPassword = await bcrypt.hash(body.password, salt);
        const findUsername = await User.findOne({ username: body.username });
        if (!findUsername) {
            const insert = await User.insert({ username: body.username, password: bcryptPassword, salt: salt, type: body.type });
            return insert;
        } else {
            return { message: 'The username already exists.' }
        }
    }

    async signIn(body: SignInUsersDTO): Promise<{ accessToken: string, username: string, id: number, token: string, msg: string }> {
        const usrnm = await this.validateUserPassword(body.username, body.password);
        if (!usrnm) {
            return { accessToken: null, username: null, id: null, token: null, msg: 'Invalid Credentials!' };
            //throw new UnauthorizedException('Invalid Credentials!')
        } else {
            const payload: JwtPayload = { username: usrnm.username };
            const accessToken = 'Bearer ' + this.jwtService.sign(payload);
            const token = this.jwtService.sign(payload);
            const id = usrnm.id;
            const username = usrnm.username;
            return { accessToken, username, id, token, msg: 'Success' };
        }
    }

    async deleteUser(userID: number) {
        const chosenUser = await User.findOne({ id: userID })

        return await User.delete(userID)
    }

    //async refresh(token:string){
    //
    //}
}