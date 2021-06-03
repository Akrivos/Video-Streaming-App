import { Actor } from './Actor';
import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  ManyToMany,
  BaseEntity,
  JoinTable,
  JoinColumn,
  OneToMany,
  Long,
} from 'typeorm';
import { User } from './User';
import { Rating } from './Rating';
import { IsOptional } from 'class-validator';
import { Season } from './Season';
@Entity()
export class Movie extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ unique: true })
  name: string;
  @Column()
  duration: number;
  @Column({ nullable: true })
  description: string;
  @Column()
  releaseDate: Date;
  @Column()
  video: string;
  @Column({ type: "blob" })
  image: string;


  //---------------------------------------------//
  @ManyToMany(
    () => Actor,
    actor => actor.moviesPlayedIn,
    { eager: true },
  )
  @JoinTable()
  actors: Actor[];
  //---------------------------------------------//
  @OneToMany(
    () => Rating,
    rating => rating.ratingTheMovie
  )
  movieHasRate: Rating[];
  //---------------------------------------------//
  @ManyToMany(
    () => User,
    user => user.userHasMovies,
  )
  moviesHaveUser: User[];
  //--------------------------------------------//
  //@OneToMany(
  //  () => Season,
  //  season => season.seasonOfMovie
  // )
  // movieHasSeason: Season[]
  //--------------------------------------------//
}
