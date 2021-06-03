import { Movie } from './Movie';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  BaseEntity,
  JoinTable,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Actor extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  surname: string;
  @Column()
  age: number;
  @ManyToMany(
    () => Movie,
    movie => movie.actors
  )
  moviesPlayedIn: Movie[];
}
