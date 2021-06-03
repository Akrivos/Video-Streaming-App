import { Episode } from './Episode';
import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany } from "typeorm";
import { User } from './User';
import { Rating } from './Rating';
import { Season } from './Season';

@Entity()
export class Series extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    title: string;
    @Column()
    description: string;
    @Column()
    releaseDate: Date;
    @Column()
    video: string;
    @Column()
    numberOfSeasons: number;
    @Column({ type: "blob" })
    image: string;

    //----------------------------------------------//
    @OneToMany(
        () => Episode,
        episode => episode.episodesOfSeries)
    seriesHaveEpisodes: Episode[];

    //----------------------------------------------//

    @ManyToMany(
        () => User,
        user => user.userHasSeries
    )
    seriesHaveUser: User[];
    //----------------------------------------------//
    @OneToMany(
        () => Rating,
        rating => rating.ratingTheSeries
    )
    seriesHaveRate: Rating[];
    //---------------------------------------------//
    // @OneToMany(
    //    () => Season,
    //    season => season.seasonOfSeries
    // )
    // seriesHaveSeason: Season[]
    //--------------------------------------------//
}