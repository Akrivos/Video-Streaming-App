import { Module } from "@nestjs/common";
import { UsersModule } from "../users/users.module";
import { JwtStrategy } from "../users/jwt.strategy";
import { PassportModule } from "@nestjs/passport";
import { SeriesController } from "./series.controller";
import { SeriesService } from "./series.service";

@Module({
    imports: [UsersModule, JwtStrategy, PassportModule],
    controllers: [SeriesController],
    providers: [SeriesService],
})
export class SeriesModule { }