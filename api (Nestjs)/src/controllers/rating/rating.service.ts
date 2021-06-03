import { Injectable } from "@nestjs/common";
import { RatingsDTO } from "./rating.dto";
import { Rating } from "src/entities/Rating";

@Injectable()
export class RatingService {

    async getAllRatings(): Promise<RatingsDTO[]> {
        return await Rating.find();
    }

    async delRating(ratingID: number) {
        return await Rating.delete(ratingID);
    }
}