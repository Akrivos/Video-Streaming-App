import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { Series } from "src/entities/Series";
import { CreateSeriesDTO, SeriesRateDTO, AddSeriesFromUserDTO } from "./series.dto";
import { getRepository } from "typeorm";
import { User } from "src/entities/User";
import { Rating } from "src/entities/Rating";
import { AddMoviesFromUserDTO } from "../movies/movies.dto";

@Injectable()
export class SeriesService {

    async getAllSeries(): Promise<Series[]> {
        return await Series.find();
    }

    async getSeriesByName(titleOfSeries: string): Promise<Series> {
        return await Series.findOne({ title: titleOfSeries });
    }

    async addSeries(body: CreateSeriesDTO) {
        return await Series.insert(body);
    }

    async updateSeries(seriesID: number, body: CreateSeriesDTO) {
        return await Series.update({ id: seriesID }, body);
    }

    async deleteSeries(seriesID: number) {
        return await Series.delete(seriesID);
    }

    async seriesRate(body: SeriesRateDTO): Promise<Series> {
        const seriesRate = await getRepository(Series).findOne({ relations: ['seriesHaveRate'], where: { id: body.seriesID } });
        const user = await getRepository(User).findOne({ relations: ['userRate'], where: { id: body.userID } })
        const rate = new Rating();

        rate.rating = body.rating;
        user.userRate.push(rate);
        await rate.save()
        await user.save();
        seriesRate.seriesHaveRate.push(rate);
        console.log(seriesRate);
        return await seriesRate.save();
    }

    async updateRate(body: SeriesRateDTO) {
        const seriesRate = await getRepository(Series).findOne({ relations: ['seriesHaveRate'], where: { id: body.seriesID } });
        const ratingID = seriesRate.seriesHaveRate.find(x => x.rateFromUser.find(z => z.id === body.userID));
        await Rating.update({ id: ratingID.id }, { rating: body.rating });
        const x = await Rating.update({ id: ratingID.id }, { rating: body.rating });
        await seriesRate.save();
        console.log(x);
        return seriesRate;
    }

    async getRatesOfSeries(seriesID: number): Promise<Series> {
        const series = await getRepository(Series).findOne({ relations: ['seriesHaveRate'], where: { id: seriesID } });
        //console.log(movie);
        return series;
    }

    async addSeriesFromUser(body: AddSeriesFromUserDTO) {
        const series = await getRepository(Series).findOne({ relations: ['seriesHaveUser'], where: { id: body.seriesID } })
        const user = await User.findOne({ id: body.userID });
        if (!series.seriesHaveUser.find(x => x.id === user.id)) {
            series.seriesHaveUser.push(user);
            await series.save()
            //delete movie.moviesHaveUser;
            return series;
        } else {
            throw new InternalServerErrorException();
        }

    }

    async getSeriesOfUser(userID: number): Promise<Series[]> {
        const user = User.findOne({ id: userID });
        const userHasSeries = (await user).userHasSeries;
        return userHasSeries;
    }

    async delSeriesFromUser(userID: number, seriesID: number) {
        const user = await User.findOne({ id: userID });
        user.userHasSeries = user.userHasSeries.filter(x => x.id !== seriesID);
        return await user.save();
    }


    async searchSeries(text: string) {
        const series = await Series.find();
        const searchSeries = series.filter(x => x.title.startsWith(text.charAt(0).toUpperCase() + text.slice(1)));
        return searchSeries;
    }

}