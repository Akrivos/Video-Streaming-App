import { CreateActorDTO, ActorDTO, Movie2Actor } from './actors.dto';
import {
  Controller,
  Get,
  Post,
  Logger,
  Body,
  Param,
  InternalServerErrorException,
  Patch,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Actor } from 'src/entities/Actor';
import { Movie } from 'src/entities/Movie';
import { Connection } from 'typeorm';
import { Roles } from '../users/roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../users/roles.guard';
import * as moment from 'moment';
import { ActorsService } from './actors.service';



@Controller('/actor')
@ApiTags('actors')
export class ActorController {
  constructor(private actorsService: ActorsService) { }

  //@UseGuards(AuthGuard(), RolesGuard)
  // @Roles('admin')
  @Get()
  getAllActors(): Promise<ActorDTO[]> {
    try {
      return this.actorsService.getAllActors();
    } catch (e) {
      Logger.error(e, e);
      throw new InternalServerErrorException(e);
    }
  }


  //@UseGuards(AuthGuard(), RolesGuard)
  // @Roles('admin')
  @Get(':surname')
  getActorBySurname(
    @Param('surname') actorSurname: string,
  ): Promise<ActorDTO> {
    try {
      return this.actorsService.getActorBySurname(actorSurname);
    } catch (e) {
      Logger.error(e, e);
      throw new InternalServerErrorException(e);
    }
  }


  //@UseGuards(AuthGuard(), RolesGuard)
  //@Roles('admin')
  @Post()
  addActor(@Body() body: CreateActorDTO) {
    try {
      return this.actorsService.addActor(body);
    } catch (e) {
      Logger.error(e, e);
      throw new InternalServerErrorException(e);
    }
  }


  //@UseGuards(AuthGuard(), RolesGuard)
  //@Roles('admin')
  @Patch(':id')
  updateMovie(
    @Param('id') actorID: number,
    @Body() body: CreateActorDTO,
  ) {
    try {
      return this.actorsService.updateMovie(actorID, body);
    } catch (e) {
      Logger.error(e, e);
      throw new InternalServerErrorException(e);
    }
  }


  // @UseGuards(AuthGuard(), RolesGuard)
  //@Roles('admin')
  @Delete(':id')
  deleteActor(@Param('id') actorID: number) {
    try {
      return this.actorsService.deleteActor(actorID);
    } catch (e) {
      Logger.error(e, e);
      throw new InternalServerErrorException(e);
    }
  }



  //@UseGuards(AuthGuard(), RolesGuard)
  //@Roles('admin')
  @Post('/addMovie2Actor')
  addMovie2Actor(@Body() body: Movie2Actor) {
    try {
      return this.actorsService.addMovie2Actor(body);
    } catch (e) {
      Logger.error(e, e);
      throw new InternalServerErrorException(e);
    }
  }

  @Delete('/:fromActorID/:delMovieID')
  delMovieFromActor(@Param('fromActorID') actorID: number, @Param('delMovieID') movieID: number) {
    try {
      return this.actorsService.delMovieFromActor(actorID, movieID);
    }
    catch (e) {
      Logger.error(e, e);
      throw new InternalServerErrorException(e);
    }
  }
}
