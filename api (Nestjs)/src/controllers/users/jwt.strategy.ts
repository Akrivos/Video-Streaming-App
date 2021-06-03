import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { User } from 'src/entities/User';
import { JwtPayload } from "./jwt-payload.interface";
import { UsersDTO } from "./users.dto";
import { doesNotMatch } from "assert";
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'Balalaika28'
        });

    }

    async validate(payload: JwtPayload): Promise<User> {
        const usrnm = payload;
        const user = await User.findOne({ username: usrnm.username });
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }

}