import { IsNumber, MinLength, MaxLength } from "class-validator";


export class RatingsDTO {
    id: number;
    @IsNumber()
    rating: number;
}

export class RatingDTO {
    @IsNumber()
    @MinLength(1)
    @MaxLength(10)
    rating: number;
}