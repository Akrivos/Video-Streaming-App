import { Controller, Get, Logger, InternalServerErrorException, UseGuards, Param, Post, Body, Patch, Delete } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { SeriesService } from "./series.service";
import { Series } from "src/entities/Series";
import { AuthGuard } from "@nestjs/passport";
import { CreateSeriesDTO, SeriesRateDTO, AddSeriesFromUserDTO } from "./series.dto";

@Controller('/series')
@ApiTags('series')
export class SeriesController {
    constructor(private seriesService: SeriesService) { }

    @Get()
    async getAllSeries(): Promise<Series[]> {
        try {
            return this.seriesService.getAllSeries();
        } catch (e) {
            Logger.error(e, e);
            throw new InternalServerErrorException(e);
        }
    }

    //@UseGuards(AuthGuard())
    //@UseGuards(AuthGuard(), RolesGuard)
    //@Roles('admin')
    @Get('/:getSeriesOfUser')
    async getSeriesOfUser(@Param('getSeriesOfUser') userID: number): Promise<Series[]> {
        try {
            return this.seriesService.getSeriesOfUser(userID);
        } catch (e) {
            Logger.error(e, e);
            throw new InternalServerErrorException(e);
        }
    }

    //@UseGuards(AuthGuard(), RolesGuard)
    // @Roles('admin')
    @Get('/name/:name')
    async getSeriesByName(@Param('name') name: string): Promise<Series> {
        try {
            //console.log(this.moviesService.getMovieByName(name))
            return this.seriesService.getSeriesByName(name);
        } catch (e) {
            Logger.error(e, e);
            throw new InternalServerErrorException(e);
        }
    }



    //@UseGuards(AuthGuard(), RolesGuard)
    //@Roles('admin')
    @Post()
    addSeries(@Body() body: CreateSeriesDTO) {
        try {
            return this.seriesService.addSeries(body)
        } catch (e) {
            Logger.error(e, e);
            throw new InternalServerErrorException(e);
        }
    }

    //@UseGuards(AuthGuard(), RolesGuard)
    //@Roles('admin')
    @Patch(':id')
    updateSeries(
        @Param('id') seriesID: number,
        @Body() body: CreateSeriesDTO,
    ) {
        try {
            return this.seriesService.updateSeries(seriesID, body);
        } catch (e) {
            Logger.error(e, e);
            throw new InternalServerErrorException(e);
        }
    }


    //@UseGuards(AuthGuard(), RolesGuard)
    // @Roles('admin')
    @Delete(':id')
    deleteSeries(@Param('id') seriesID: number) {
        try {
            return this.seriesService.deleteSeries(seriesID);
        } catch (e) {
            Logger.error(e, e);
            throw new InternalServerErrorException(e);
        }
    }

    @Post('/seriesRate')
    seriesRate(@Body() body: SeriesRateDTO): Promise<Series> {
        try {
            return this.seriesService.seriesRate(body);
        } catch (e) {
            Logger.error(e, e);
            throw new InternalServerErrorException(e);
        }
    }


    @Post('/updateRate')
    updateRate(@Body() body: SeriesRateDTO) {
        try {
            return this.seriesService.updateRate(body);
        } catch (e) {
            Logger.error(e, e);
            throw new InternalServerErrorException(e);
        }

    }

    //@UseGuards(AuthGuard())
    @Post('/add/addSeriesFromUser')
    addSeriesFromUser(@Body() body: AddSeriesFromUserDTO) {
        try {
            return this.seriesService.addSeriesFromUser(body);
        } catch (e) {
            Logger.error(e, e);
            throw new InternalServerErrorException(e);
        }
    }

    //@UseGuards(AuthGuard())
    @Delete('/delSeriesFromUser/:fromUserID/:delSeriesID')
    delSeriesFromUser(@Param('fromUserID') userID: number, @Param('delSeriesID') seriesID: number) {
        try {
            return this.seriesService.delSeriesFromUser(userID, seriesID);
        } catch (e) {
            Logger.error(e, e);
            throw new InternalServerErrorException(e);
        }
    }

    @Get('/searchSeries/:text')
    searchSeries(@Param('text') text: string) {
        try {
            return this.seriesService.searchSeries(text);
        } catch (e) {
            Logger.error(e, e);
            throw new InternalServerErrorException(e);
        }
    }

    @Get('/getRatesOfSeries/:seriesID')
    getRatesOfSeries(@Param('seriesID') seriesID: number): Promise<Series> {
        try {
            //console.log(this.moviesService.getRatesOfMovie(movieID));
            return this.seriesService.getRatesOfSeries(seriesID);
        } catch (e) {
            Logger.error(e, e);
            throw new InternalServerErrorException(e);
        }
    }

}