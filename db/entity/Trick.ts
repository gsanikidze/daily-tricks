import {
  Entity, Column, ObjectIdColumn, ObjectID,
} from 'typeorm';

@Entity()
export default class Tricks {
  @ObjectIdColumn()
    id: ObjectID;

  @Column({ type: 'string' })
    value: string;

  @Column({ type: 'string' })
    language: string;

  @Column({ type: 'string' })
    title: string;
}
