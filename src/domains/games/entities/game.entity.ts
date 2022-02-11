import { Word } from 'src/domains/words/entities/word.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'games' })
export class Game {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'word_id' })
  wordId: string;

  @Column({ name: 'is_successfull', default: false })
  isSuccessfull: boolean;

  @Column({ default: 0 })
  rounds: number;

  @Column({ default: 0 })
  points: number;

  @ManyToOne(() => Word, (word) => word.name, { eager: true })
  @JoinColumn({ name: 'word_id' })
  word: Word;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
