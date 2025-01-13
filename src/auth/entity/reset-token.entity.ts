import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity('reset_tokens')
export class ResetToken {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: false })
  token: string;

  @Column({ type: 'timestamp', nullable: false })
  expiryDate: Date;

  @ManyToOne(() => User, (user) => user.resetTokens, { onDelete: 'CASCADE' })
  user: User;
}
