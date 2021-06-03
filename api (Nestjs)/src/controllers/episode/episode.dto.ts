import { IsNumber, IsString, IsDateString, IsOptional } from "class-validator";

export class EpisodesOfSeriesDTO {
    @IsNumber()
    seriesID: number;
    @IsNumber()
    seasonID: number;
}

export class AddEpisodesToSeriesDTO {
    @IsNumber()
    seriesID: number;
    @IsString()
    title: string;
    @IsString()
    description: string;
    @IsNumber()
    duration: number;
    @IsDateString()
    releaseDate: Date;
    @IsNumber()
    season: number;
    @IsString()
    @IsOptional()
    video?: string;
}