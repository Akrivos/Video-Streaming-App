import { Module, HttpModule } from '@nestjs/common';
import { UsersController } from './users.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { UsersService } from './users.service';
import { MulterModule } from '@nestjs/platform-express'

@Module({
    imports: [
        HttpModule,
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
            secret: 'Balalaika28',
            signOptions: {
                expiresIn: 3600
            }
        }), PassportModule
    ],
    controllers: [UsersController],
    providers: [JwtStrategy, UsersService],
    exports: [JwtStrategy, PassportModule]
})
export class UsersModule { }
