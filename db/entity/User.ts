import {
  Entity, Column, ObjectIdColumn, ObjectID,
} from 'typeorm';
import { IsString } from 'class-validator';

@Entity()
export default class User {
  @ObjectIdColumn()
    id: ObjectID;

  @Column({ type: 'string' })
  @IsString()
    fbId: string;

  @Column({ type: 'array' })
  @IsString({ each: true })
    bookmarkedTricks: string[];
}
