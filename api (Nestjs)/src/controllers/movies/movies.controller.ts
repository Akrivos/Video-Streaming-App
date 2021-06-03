import { CreateMovieDTO, MovieDTO, MovieRateDTO, Actor2Movie, AddMoviesFromUserDTO } from './movies.dto';
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
  Req,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Movie } from 'src/entities/Movie';
import { MoviesService } from './movies.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../users/roles.guard';




@Controller('/movie')
@ApiTags('movies')
export class MovieController {
  constructor(private moviesService: MoviesService) { }

  @Get()
  async getAllMovies(): Promise<Movie[]> {
    try {
      return this.moviesService.getAllMovies();
    } catch (e) {
      Logger.error(e, e);
      throw new InternalServerErrorException(e);
    }
  }

  //@UseGuards(AuthGuard())
  //@UseGuards(AuthGuard(), RolesGuard)
  //@Roles('admin')
  @Get('/:getMoviesOfUser')
  async getMoviesOfUser(@Param('getMoviesOfUser') userID: number): Promise<Movie[]> {
    try {
      return this.moviesService.getMoviesOfUser(userID);
    } catch (e) {
      Logger.error(e, e);
      throw new InternalServerErrorException(e);
    }
  }

  //@UseGuards(AuthGuard(), RolesGuard)
  // @Roles('admin')
  @Get('/name/:name')
  async getMovieByName(@Param('name') name: string): Promise<Movie> {
    try {
      //console.log(this.moviesService.getMovieByName(name))
      return this.moviesService.getMovieByName(name);
    } catch (e) {
      Logger.error(e, e);
      throw new InternalServerErrorException(e);
    }
  }



  //@UseGuards(AuthGuard(), RolesGuard)
  //@Roles('admin')
  @Post()
  addMovie(@Body() body: CreateMovieDTO) {
    try {
      return this.moviesService.addMovie(body)
    } catch (e) {
      Logger.error(e, e);
      throw new InternalServerErrorException(e);
    }
  }

  //@UseGuards(AuthGuard(), RolesGuard)
  //@Roles('admin')
  @Patch(':id')
  updateMovie(
    @Param('id') movieID: number,
    @Body() body: CreateMovieDTO,
  ) {
    try {
      return this.moviesService.updateMovie(movieID, body);
    } catch (e) {
      Logger.error(e, e);
      throw new InternalServerErrorException(e);
    }
  }


  //@UseGuards(AuthGuard(), RolesGuard)
  // @Roles('admin')
  @Delete(':id')
  deleteMovie(@Param('id') movieID: number) {
    try {
      return this.moviesService.deleteMovie(movieID);
    } catch (e) {
      Logger.error(e, e);
      throw new InternalServerErrorException(e);
    }
  }


  //@UseGuards(AuthGuard(), RolesGuard)
  //@Roles('admin')
  @Post('/addActor2Movie')
  addActor2Movie(@Body() body: Actor2Movie): Promise<MovieDTO> {
    try {
      return this.moviesService.addActor2Movie(body);
    } catch (e) {
      Logger.error(e, e);
      throw new InternalServerErrorException(e);
    }
  }




  // @UseGuards(AuthGuard(), RolesGuard)
  // @Roles('admin')
  @Delete('/:fromMovieID/:delActorID')
  delActorFromMovie(
    @Param('fromMovieID') fromMovieID: number,
    @Param('delActorID') delActorID: number,
  ): Promise<MovieDTO> {
    try {
      return this.moviesService.delActorFromMovie(fromMovieID, delActorID);
    } catch (e) {
      Logger.error(e, e);
      throw new InternalServerErrorException(e);
    }
  }

  @Post('/movieRate')
  movieRate(@Body() body: MovieRateDTO): Promise<Movie> {
    try {
      return this.moviesService.movieRate(body);
    } catch (e) {
      Logger.error(e, e);
      throw new InternalServerErrorException(e);
    }
  }


  @Post('/updateRate')
  updateRate(@Body() body: MovieRateDTO) {
    try {
      return this.moviesService.updateRate(body);
    } catch (e) {
      Logger.error(e, e);
      throw new InternalServerErrorException(e);
    }

  }

  //@UseGuards(AuthGuard())
  @Post('/add/addMoviesFromUser')
  addMoviesFromUser(@Body() body: AddMoviesFromUserDTO) {
    try {
      return this.moviesService.addMoviesFromUser(body);
    } catch (e) {
      Logger.error(e, e);
      throw new InternalServerErrorException(e);
    }
  }

  //@UseGuards(AuthGuard())
  @Delete('/delMovieFromUser/:fromUserID/:delMovieID')
  delMovieFromUser(@Param('fromUserID') userID: number, @Param('delMovieID') movieID: number) {
    try {
      return this.moviesService.delMovieFromUser(userID, movieID);
    } catch (e) {
      Logger.error(e, e);
      throw new InternalServerErrorException(e);
    }
  }

  @Get('/searchMovies/:text')
  searchMovies(@Param('text') text: string) {
    try {
      return this.moviesService.searchMovies(text);
    } catch (e) {
      Logger.error(e, e);
      throw new InternalServerErrorException(e);
    }
  }

  @Get('/getRatesOfMovie/:movieID')
  getRatesOfMovie(@Param('movieID') movieID: number): Promise<Movie> {
    try {
      //console.log(this.moviesService.getRatesOfMovie(movieID));
      return this.moviesService.getRatesOfMovie(movieID);
    } catch (e) {
      Logger.error(e, e);
      throw new InternalServerErrorException(e);
    }
  }
}
