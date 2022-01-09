import {
  Entity, Column, ObjectIdColumn, ObjectID,
} from 'typeorm';
import { IsString } from 'class-validator';

@Entity()
export default class Tricks {
  @ObjectIdColumn()
    id: ObjectID;

  @Column({ type: 'string' })
  @IsString()
    value: string;

  @Column({ type: 'string' })
  @IsString()
    language: string;

  @Column({ type: 'string' })
  @IsString()
    title: string;
}
