import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsString,
  IsOptional,
} from 'class-validator';
export class ActorDTO {
  @IsNumber()
  id: number;
  @IsString()
  name: string;
  @IsString()
  surname: string;
  @IsNumber()
  age: number;
}

export class CreateActorDTO {
  @IsString()
  @IsOptional()
  name?: string;
  @IsString()
  @IsOptional()
  surname?: string;
  @IsNumber()
  @IsOptional()
  age?: number;
}

export class Movie2Actor {
  @IsNumber()
  actorID: number;
  @IsNumber()
  movieID: number;
}
