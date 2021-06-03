import { MoviesModule } from './controllers/movies/movies.module';
import { Module, HttpModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActorsModule } from './controllers/actors/actors.module';
import { UsersModule } from './controllers/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './controllers/users/jwt.strategy';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './controllers/users/roles.guard';
import { Rating } from './entities/Rating';
import { RatingModule } from './controllers/rating/rating.module';
import { SeriesModule } from './controllers/series/series.module';
import { EpisodeModule } from './controllers/episode/episode.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '...',
      port: 123,
      username: '...',
      password: '...',
      database: '...',
      entities: [__dirname + '/entities/**{.ts,.js}'],
      synchronize: true
    }),
    MoviesModule, ActorsModule, UsersModule, RatingModule, SeriesModule, EpisodeModule
  ],
  controllers: [AppController],
  providers: []
})
export class AppModule { }
