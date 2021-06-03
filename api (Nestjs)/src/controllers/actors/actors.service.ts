import { Injectable } from "@nestjs/common";
import { ActorDTO, CreateActorDTO, Movie2Actor } from "./actors.dto";
import { Actor } from "src/entities/Actor";
import { Movie } from "src/entities/Movie";
import { getRepository } from "typeorm";

@Injectable()
export class ActorsService {

    async getAllActors(): Promise<ActorDTO[]> {
        return await Actor.find();
    }

    async getActorBySurname(surname: string): Promise<ActorDTO> {
        return await Actor.findOne({ surname: surname });
    }

    async addActor(body: CreateActorDTO) {
        return await Actor.insert(body);

    }

    async updateMovie(actorID: number, body: CreateActorDTO) {
        return await Actor.update({ id: actorID }, body);
    }

    async deleteActor(actorID: number) {
        return await Actor.delete(actorID);;
    }

    async addMovie2Actor(body: Movie2Actor) {
        const movie = await Movie.findOneOrFail({ id: body.movieID });
        const actorsRepository = await getRepository(Actor).findOne({ relations: ['moviesPlayedIn'], where: { id: body.actorID } });
        actorsRepository.moviesPlayedIn.push(movie);
        return await actorsRepository.save();
    }

    async delMovieFromActor(actorID: number, movieID: number) {
        const movie = await Movie.findOneOrFail({ id: movieID });
        const actorsRepository = await getRepository(Actor).findOne({ relations: ['moviesPlayedIn'], where: { id: actorID } });
        actorsRepository.moviesPlayedIn = actorsRepository.moviesPlayedIn.filter(_movie => _movie.id !== movie.id);
        return await actorsRepository.save();

    }
}