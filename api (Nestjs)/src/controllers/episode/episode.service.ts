import { Injectable } from "@nestjs/common";
import { Episode } from "src/entities/Episode";
import { EpisodesOfSeriesDTO, AddEpisodesToSeriesDTO } from "./episode.dto";
import { getRepository } from "typeorm";
import { Series } from "src/entities/Series";
import { Season } from "src/entities/Season";

@Injectable()
export class EpisodeService {

    async getSeasonOfSeries(seriesID: number, seasonNumber: number): Promise<Episode[]> {
        const series = await getRepository(Series).findOne({ relations: ['seriesHaveEpisodes'], where: { id: seriesID } });
        const seasonOfSeries = series.seriesHaveEpisodes.filter(x => x.season === seasonNumber);
        return seasonOfSeries;
        //const series=await Series.findOne({id:seriesID});
    }

    async getEpisodesOfSeries(body: EpisodesOfSeriesDTO): Promise<Episode[]> {
        const series = await getRepository(Series).findOne({ relations: ['seriesHaveEpisodes'], where: { id: body.seriesID } });
        return series.seriesHaveEpisodes;
    }

    async addEpisodesToSeries(body: AddEpisodesToSeriesDTO) {
        const series = await getRepository(Series).findOne({ relations: ['seriesHaveEpisodes'], where: { id: body.seriesID } });
        await Episode.insert({ title: body.title, description: body.description, duration: body.duration, releaseDate: body.releaseDate, season: body.season, video: body.video });
        const findEpisode = await Episode.findOneOrFail({ title: body.title });
        series.seriesHaveEpisodes.push(findEpisode);
        return await series.save();
    }

    async deleteEpisodeFromSeries(seriesID: number, episodeID: number) {
        const series = await getRepository(Series).findOne({ relations: ['seriesHaveEpisodes'], where: { id: seriesID } });
        //const series = await Series.findOne({ id: seriesID });
        //console.log(series);
        //console.log(episodeID)
        //console.log(series.seriesHaveEpisodes)
        series.seriesHaveEpisodes = series.seriesHaveEpisodes.filter(x => x.id !== episodeID);
        console.log(series.seriesHaveEpisodes);
        await Episode.delete(episodeID);
        return await series.save();
    }

    /*async deleteAllEpisodesOfSeason(seriesID: number, seasonNumber: number) {
        const series = await getRepository(Series).findOne({ relations: ['seriesHaveEpisodes'], where: { id: seriesID } });
        series.seriesHaveEpisodes = series.seriesHaveEpisodes.filter(x => x.season !== seasonNumber);
        
        return await series.save();
    }
    */

}
   /* async getEpisodesOfSeries(body: EpisodesOfSeriesDTO): Promise<Episode[]> {
const series = await getRepository(Series).findOne({ relations: ['seriesHaveEpisodes'], where: { id: body.seriesID } });
return series.seriesHaveEpisodes;
}

async addEpisodesToSeries(body: AddEpisodesToSeriesDTO) {
const series = await getRepository(Series).findOne({ relations: ['seriesHaveEpisodes'], where: { id: body.seriesID } })
await Episode.insert({ title: body.title, description: body.description, duration: body.duration, releaseDate: body.releaseDate, video: body.video });
const findEpisode = await getRepository(Episode).findOne({ relations: ['seasonOfEpisode'], where: { title: body.title } });
const season = new Season();
season.seasonNumber = body.seasonNumber;
//season.seasonHasEpisodes.push(findEpisode);
findEpisode.seasonOfEpisode = season;
//await season.save();
//await Season.insert({ seasonNumber: body.seasonNumber })
//const findSeason = await Season.findOne({ seasonNumber: body.seasonNumber })
//await findSeason.save()
//findEpisode.seasonOfEpisode = findSeason;
//await findEpisode.save()
await findEpisode.save()
await season.save();
if (!series.seriesHaveEpisodes.find(x => x.id === findEpisode.id)) {
series.seriesHaveEpisodes.push(findEpisode);
console.log(series);
return await series.save()
}
return null;
}

async deleteEpisodeFromSeries(seriesID: number, episodeID: number) {
const series = await Series.findOne({ id: seriesID });
//const findSeries = await getRepository(Series).findOne({ relations: ['seriesHaveEpisodes'], where: { id: seriesID } });
series.seriesHaveEpisodes = series.seriesHaveEpisodes.filter(episode => episode.id !== episodeID)
return await series.save();
}

async deleteAllEpisodesOfSeason(seriesID: number, seasonNumber: number) {
const findSeries = await getRepository(Series).findOne({ relations: ['seriesHaveEpisodes'], where: { id: seriesID } });
//const findEpisode=await Episode.find();
//const episodesOfSeason=findEpisode.filter(x=>x.seasonOfEpisode.seasonNumber===seasonNumber);
findSeries.seriesHaveEpisodes = findSeries.seriesHaveEpisodes.filter(x => x.seasonOfEpisode.seasonNumber !== seasonNumber);
return await findSeries.save();
}
}
*/