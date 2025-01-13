import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { ResetToken } from './reset-token.entity';
import {  Rolles } from '../enums/role.enum';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 255, unique: true, nullable: false })
  email: string;

  @Column({ type: 'varchar', nullable: false })
  password: string;

  @Column({type:'enum',enum:Rolles,default:Rolles.USER})
  role:Rolles;


  @OneToMany(() => ResetToken, (resetToken) => resetToken.user, {
    cascade: true,
  })
  resetTokens: ResetToken[];
}
