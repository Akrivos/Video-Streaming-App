import { Controller, Body, Get, Logger, InternalServerErrorException, Post, Delete, Param } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { EpisodesOfSeriesDTO, AddEpisodesToSeriesDTO } from "./episode.dto";
import { EpisodeService } from "./episode.service";
import { Episode } from "src/entities/Episode";

@Controller('/episodes')
@ApiTags('episodes')
export class EpisodeController {
    constructor(private episodeService: EpisodeService) { }

    @Get('/getSeasonOfSeries/:fromSeriesID/:getSeasonNumber')
    getSeasonOfSeries(@Param('fromSeriesID') seriesID: number, @Param('getSeasonNumber') seasonNumber: number): Promise<Episode[]> {
        try {
            return this.episodeService.getSeasonOfSeries(seriesID, seasonNumber);
        } catch (e) {
            Logger.error(e, e);
            throw new InternalServerErrorException(e);
        }
    }

    @Post('getEpisodesOfSeries')
    getEpisodesOfSeries(@Body() body: EpisodesOfSeriesDTO): Promise<Episode[]> {
        try {
            return this.episodeService.getEpisodesOfSeries(body);
        } catch (e) {
            Logger.error(e, e);
            throw new InternalServerErrorException(e);
        }
    }

    @Post('/addEpisodesToSeries')
    addEpisodesToSeries(@Body() body: AddEpisodesToSeriesDTO) {
        try {
            return this.episodeService.addEpisodesToSeries(body);
        } catch (e) {
            Logger.error(e, e);
            throw new InternalServerErrorException(e);
        }
    }

    @Delete('/delAnEpisode/:seriesID/:episodeID')
    deleteEpisodeFromSeries(@Param('seriesID') seriesID: number, @Param('episodeID') episodeID: number) {
        try {
            return this.episodeService.deleteEpisodeFromSeries(seriesID, episodeID);
        } catch (e) {
            Logger.error(e, e);
            throw new InternalServerErrorException(e);
        }
    }

    /*@Delete('/delAllEpisodes/:seriesID/:seasonNumber')
    deleteAllEpisodesOfSeason(@Param('seriesID') seriesID: number, @Param('seasonNumber') seasonNumber: number) {
        try {
            return this.episodeService.deleteAllEpisodesOfSeason(seriesID, seasonNumber);
        } catch (e) {
            Logger.error(e, e);
            throw new InternalServerErrorException(e);
        }
    }
    */
}

