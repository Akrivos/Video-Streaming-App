import { IsString, IsOptional, IsDateString, IsNumber } from "class-validator";

export class CreateSeriesDTO {
    @IsString()
    @IsOptional()
    title?: string;
    @IsString()
    @IsOptional()
    description: string;
    @IsDateString()
    @IsOptional()
    releaseDate?: Date;
    @IsNumber()
    numberOfSeasons: number;
    @IsString()
    @IsOptional()
    video?: string;
    @IsString()
    @IsOptional()
    image?: string;
}

export class SeriesRateDTO {
    @IsNumber()
    userID: number;
    @IsNumber()
    seriesID: number;
    @IsNumber()
    rating: number;
}

export class AddSeriesFromUserDTO {
    @IsNumber()
    userID: number;
    @IsNumber()
    seriesID: number;
}