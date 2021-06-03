import { IsString, IsNumberString, IsDate, IsNumber, IsOptional, IsDateString, IsArray } from 'class-validator';


export class MovieDTO {
  id: number;
  @IsString()
  name: string;
  @IsString()
  description: string;
  @IsNumber()
  duration: number;
  @IsDateString()
  releaseDate: Date;
}

export class CreateMovieDTO {
  @IsString()
  @IsOptional()
  name?: string;
  @IsString()
  @IsOptional()
  description?: string;
  @IsNumber()
  @IsOptional()
  duration?: number;
  @IsDateString()
  @IsOptional()
  releaseDate?: Date;
  @IsString()
  @IsOptional()
  video?: string;
  @IsString()
  @IsOptional()
  image?: string;
}

export class Actor2Movie {
  @IsNumber()
  actorID: number;
  @IsNumber()
  movieID: number;
}

export class MovieRateDTO {
  @IsNumber()
  userID: number;
  @IsNumber()
  movieID: number;
  @IsNumber()
  rating: number;
}

export class AddMoviesFromUserDTO {
  @IsNumber()
  userID: number;
  @IsNumber()
  movieID: number;
}