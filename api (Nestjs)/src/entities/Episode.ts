import { Series } from './Series';
import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Season } from './Season';

@Entity()
export class Episode extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    title: string;
    @Column()
    description: string;
    @Column()
    duration: number;
    @Column()
    releaseDate: Date;
    @Column()
    season: number;
    @Column()
    video: string;

    //--------------------------------------------------------//
    @ManyToOne(
        () => Series,
        series => series.seriesHaveEpisodes)

    episodesOfSeries: Series;

    //--------------------------------------------------------//
    @ManyToOne(
        () => Season,
        season => season.seasonHasEpisodes
    )
    seasonOfEpisode: Season;




}