import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { Movie } from "src/entities/Movie";
import { MovieDTO, CreateMovieDTO, Actor2Movie, MovieRateDTO, AddMoviesFromUserDTO } from "./movies.dto";
import { Actor } from "src/entities/Actor";
import { getRepository } from "typeorm";
import { User } from "src/entities/User";
import { Rating } from "src/entities/Rating";

@Injectable()
export class MoviesService {

    async getAllMovies(): Promise<Movie[]> {
        return await Movie.find();
    }

    async getMovieByName(nameOfMovie: string): Promise<Movie> {
        return await Movie.findOne({ name: nameOfMovie });
    }

    async addMovie(body: CreateMovieDTO) {
        return await Movie.insert(body);
    }

    async updateMovie(movieID: number, body: CreateMovieDTO) {
        return await Movie.update({ id: movieID }, body);
    }

    async deleteMovie(movieID: number) {
        return await Movie.delete(movieID);
    }

    async addActor2Movie(body: Actor2Movie): Promise<MovieDTO> {
        const actor = await Actor.findOneOrFail({
            where: { id: body.actorID },
        });
        const movie = await Movie.findOneOrFail({ id: body.movieID });
        movie.actors.push(actor);
        return await movie.save();
    }

    async delActorFromMovie(movieID: number, actorID: number): Promise<MovieDTO> {
        const actor = await Actor.findOneOrFail({ id: actorID });
        const movie = await Movie.findOneOrFail({ id: movieID });
        movie.actors = movie.actors.filter(_actor => _actor.id !== actor.id);
        return movie.save();
    }

    async movieRate(body: MovieRateDTO): Promise<Movie> {
        const movieRate = await getRepository(Movie).findOne({ relations: ['movieHasRate'], where: { id: body.movieID } });
        const user = await getRepository(User).findOne({ relations: ['userRate'], where: { id: body.userID } })
        const rate = new Rating();

        rate.rating = body.rating;
        user.userRate.push(rate);
        await rate.save()
        await user.save();
        movieRate.movieHasRate.push(rate);
        console.log(movieRate);
        return await movieRate.save();
    }

    async updateRate(body: MovieRateDTO) {
        const movieRate = await getRepository(Movie).findOne({ relations: ['movieHasRate'], where: { id: body.movieID } });
        //console.log(movieRate);
        //if (movieRate.movieHasRate.find(x => x.rateFromUser.find(z => z.id === body.userID))) {
        const ratingID = movieRate.movieHasRate.find(x => x.rateFromUser.find(z => z.id === body.userID));
        //console.log(ratingID)
        await Rating.update({ id: ratingID.id }, { rating: body.rating });
        const x = await Rating.update({ id: ratingID.id }, { rating: body.rating });
        await movieRate.save();
        console.log(x);
        return movieRate;
        //}
    }

    async getRatesOfMovie(movieID: number): Promise<Movie> {
        const movie = await getRepository(Movie).findOne({ relations: ['movieHasRate'], where: { id: movieID } });
        //console.log(movie);
        return movie;
    }

    async addMoviesFromUser(body: AddMoviesFromUserDTO) {
        const movie = await getRepository(Movie).findOne({ relations: ['moviesHaveUser'], where: { id: body.movieID } })
        const user = await User.findOne({ id: body.userID });
        if (!movie.moviesHaveUser.find(x => x.id === user.id)) {
            movie.moviesHaveUser.push(user);
            await movie.save()
            //delete movie.moviesHaveUser;
            return movie;
        } else {
            throw new InternalServerErrorException();
        }

    }

    async getMoviesOfUser(userID: number): Promise<Movie[]> {
        const user = User.findOne({ id: userID });
        const userHasMovies = (await user).userHasMovies;
        return userHasMovies;
    }

    async delMovieFromUser(userID: number, movieID: number) {
        const user = await User.findOne({ id: userID });
        user.userHasMovies = user.userHasMovies.filter(x => x.id !== movieID);
        return await user.save();
    }


    async searchMovies(text: string) {
        const movie = await Movie.find();
        const allMovies = await Movie.find()
        //const movie=new Movie();
        //const searchingMovies=movie.name.startsWith(text);
        const searchMovies = movie.filter(x => x.name.startsWith(text.charAt(0).toUpperCase() + text.slice(1)));
        return searchMovies;
    }

}