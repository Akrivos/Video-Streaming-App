import { Controller, Get, Logger, InternalServerErrorException, Post, Body, Delete, Param, ValidationPipe, UnauthorizedException, UseGuards, Req, UseInterceptors, Res, UploadedFile, UploadedFiles } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { UsersDTO, SignUpUsersDTO, SignInUsersDTO, UserRateMovieDTO, FindAUserDTO } from "./users.dto";
import { RolesGuard } from "./roles.guard";
import { UsersService } from "./users.service";
import { AuthGuard } from "@nestjs/passport";
import { FileInterceptor, FilesInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";



@Controller('/users')
@ApiTags('users')
export class UsersController {
    constructor(private usersService: UsersService) { }

    //@UseGuards(AuthGuard())
    @Get()
    getAllUsers(): Promise<UsersDTO[]> {
        try {
            return this.usersService.getAllUsers();
        } catch (e) {
            Logger.error(e, e);
            throw new InternalServerErrorException(e);
        }

    }

    @Post()
    findAUser(@Body() body: FindAUserDTO): Promise<UsersDTO> {
        try {
            return this.usersService.findAUser(body);
        } catch (e) {
            Logger.error(e, e);
            throw new InternalServerErrorException(e);
        }
    }


    @Post('/signUp')
    signUp(@Body() body: SignUpUsersDTO) {
        try {
            return this.usersService.signUp(body);
        }
        catch (e) {
            Logger.error(e, e);
            throw new InternalServerErrorException(e);
        }
    }

    @Post('/signIn')
    signIn(@Body() body: SignInUsersDTO): Promise<{ accessToken: string, username: string, id: number, token: string, msg: string }> {
        try {
            return this.usersService.signIn(body);

        } catch (e) {
            Logger.error(e, e);
            throw new InternalServerErrorException(e);
        }
    }

    //@UseGuards(AuthGuard())
    //@UseGuards(AuthGuard(), RolesGuard)
    //@Roles('admin')
    @Delete(':id')
    deleteUser(@Param('id') userID: number) {
        try {
            return this.usersService.deleteUser(userID);
        } catch (e) {
            Logger.error(e, e);
            throw new InternalServerErrorException(e);
        }
    }

}