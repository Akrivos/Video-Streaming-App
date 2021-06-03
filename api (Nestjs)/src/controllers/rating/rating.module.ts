import { Module } from "@nestjs/common";
import { RatingController } from "./rating.controller";
import { UsersModule } from "../users/users.module";
import { JwtStrategy } from "../users/jwt.strategy";
import { PassportModule } from "@nestjs/passport";
import { RatingService } from "./rating.service";


@Module({
    imports: [UsersModule, JwtStrategy, PassportModule],
    controllers: [RatingController],
    providers: [RatingService],
    exports: []
})
export class RatingModule { }