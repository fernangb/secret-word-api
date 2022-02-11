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

@Entity({ name: 'rounds' })
export class Game {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'game_id' })
  gameId: string;

  @Column({ name: 'word_sent' })
  wordSent: string;

  @Column({ name: 'is_found' })
  isFound: boolean;

  @Column()
  attempt: number;

  @Column()
  points: number;

  @ManyToOne(() => Game, (game) => game.id, { eager: true })
  @JoinColumn({ name: 'game_id' })
  game: Game;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
