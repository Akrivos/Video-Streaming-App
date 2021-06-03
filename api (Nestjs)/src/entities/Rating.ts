import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, OneToOne, JoinTable, ManyToMany, ManyToOne } from "typeorm";
import { MinLength, MaxLength } from "class-validator";
import { Movie } from "./Movie";
import { User } from "./User";
import { Series } from "./Series";

@Entity()
export class Rating extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    rating: number;

    //----------------------------------------------------//
    @ManyToMany(
        () => User,
        user => user.userRate,
        { eager: true }
    )
    @JoinTable()
    rateFromUser: User[];

    //----------------------------------------------------//
    @ManyToOne(
        () => Movie,
        movie => movie.movieHasRate,
    )
    ratingTheMovie: Movie;

    //----------------------------------------------------//
    @ManyToOne(
        () => Series,
        series => series.seriesHaveRate
    )
    ratingTheSeries: Series;
    //---------------------------------------------------//
}