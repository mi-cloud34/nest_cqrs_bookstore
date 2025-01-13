import { Book } from 'src/book/entity/book.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';

@Entity()
export class BookStore {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  address: string;

  /* @ManyToMany(() => Book)
  @JoinTable()
  books: Book[]; */
  @Column({ type: 'int', array: true })
  books:number[];

}