import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinTable } from "typeorm";
import { Movie } from './Movie';
import { Episode } from "./Episode";

@Entity()
export class Season extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    seasonNumber: number;


    //--------------------------------------------------------//
    //@ManyToOne(
    //    () => Episode,
    //    episode => episode.seasonOfEpisode,
    //)
    //seasonHasEpisode: Episode;

    //-------------------------------------------------------//
    @OneToMany(
        () => Episode,
        episode => episode.seasonOfEpisode
    )
    seasonHasEpisodes: Episode[]

    //-------------------------------------------------------//




}