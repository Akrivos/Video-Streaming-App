import { Module } from '@nestjs/common';
import { MovieController } from './movies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from '../users/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from '../users/roles.guard';
import { MoviesService } from './movies.service';
import { MulterModule } from '@nestjs/platform-express';


@Module({
  imports: [UsersModule, JwtStrategy, PassportModule],
  controllers: [MovieController],
  providers: [MoviesService],
})
export class MoviesModule { }
