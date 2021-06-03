import { Controller, Get, Logger, InternalServerErrorException, Post, Param, Delete } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Rating } from "src/entities/Rating";
import { RatingDTO, RatingsDTO } from "./rating.dto";
import { RatingService } from "./rating.service";

@Controller('/rating')
@ApiTags('rating')
export class RatingController {
    constructor(private ratingService: RatingService) { }

    @Get()
    getAllRatings(): Promise<RatingsDTO[]> {
        try {
            return this.ratingService.getAllRatings();
        }
        catch (e) {
            Logger.error(e, e);
            throw new InternalServerErrorException(e);
        }
    }

    @Delete('/:ratingID')
    delRating(@Param('ratingID') ratingID: number) {
        try {
            return this.ratingService.delRating(ratingID);
        }
        catch (e) {
            Logger.error(e, e);
            throw new InternalServerErrorException(e);
        }
    }

}