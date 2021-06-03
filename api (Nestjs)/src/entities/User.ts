import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, Unique, OneToMany, ManyToMany, JoinTable } from "typeorm";
import * as bcrypt from 'bcrypt';
import { Movie } from "./Movie";
import { Rating } from "./Rating";
import { IsOptional } from "class-validator";
import { Series } from "./Series";


@Entity()
@Unique(['username'])
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    username: string;
    @Column()
    password: string;
    @Column()
    salt: string;
    @Column()
    type: string;

    //------------------------------------------//
    @ManyToMany(
        () => Rating,
        rating => rating.rateFromUser
    )
    userRate: Rating[];
    //------------------------------------------//
    @ManyToMany(
        () => Movie,
        movie => movie.moviesHaveUser,
        { eager: true }
    )
    @JoinTable()
    userHasMovies: Movie[];
    //------------------------------------------// 
    @ManyToMany(
        () => Series,
        series => series.seriesHaveUser,
        { eager: true }
    )
    @JoinTable()
    userHasSeries: Series[];
    //------------------------------------------//   

    async validatePassword(password: string): Promise<string> {
        const checkPassword = await bcrypt.hash(password, this.salt);
        return checkPassword;
    }



}
