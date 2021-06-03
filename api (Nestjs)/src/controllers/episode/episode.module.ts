import { Module } from "@nestjs/common";
import { UsersModule } from "../users/users.module";
import { JwtStrategy } from "../users/jwt.strategy";
import { PassportModule } from "@nestjs/passport";
import { EpisodeController } from "./episode.controller";
import { EpisodeService } from "./episode.service";

@Module({
    imports: [UsersModule, JwtStrategy, PassportModule],
    controllers: [EpisodeController],
    providers: [EpisodeService],
})
export class EpisodeModule { }