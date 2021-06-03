import { Module } from '@nestjs/common';
import { ActorController } from './actors.controller';
import { JwtStrategy } from '../users/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module';
import { RolesGuard } from '../users/roles.guard';
import { APP_GUARD } from '@nestjs/core';
import { ActorsService } from './actors.service';

@Module({
    imports: [UsersModule, JwtStrategy, PassportModule],
    controllers: [ActorController],
    providers: [ActorsService],
})
export class ActorsModule { }
