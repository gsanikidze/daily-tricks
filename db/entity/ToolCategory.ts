import {
  Entity, Column, ObjectIdColumn, ObjectID,
} from 'typeorm';
import { IsString } from 'class-validator';

@Entity()
export default class ToolCategory {
  @ObjectIdColumn()
    id: ObjectID;

  @Column({ type: 'string' })
  @IsString()
    title: string;
}
