import {
  Entity, Column, ObjectIdColumn,
} from 'typeorm';
import { IsString } from 'class-validator';

@Entity()
export default class Tool {
  @ObjectIdColumn()
    id: string;

  @Column({ type: 'string' })
  @IsString()
    name: string;

  @Column({ type: 'string' })
  @IsString()
    homepageUrl: string;

  @Column({ type: 'string' })
  @IsString()
    description: string;

  @Column({ type: 'string' })
  @IsString()
    imageSrc: string;

  @Column('string', { array: true })
  @IsString({ each: true })
    tags: string[];

  @Column('string', { array: true })
  @IsString({ each: true })
    categoryIds: string[];
}
