import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Tobaianor {
  public constructor(id?: number, nickname?: string, tobaianisse?: number) {
    if (id && nickname && tobaianisse) {
      this.id = id;
      this.nickname = nickname;
      this.tobaianisse = tobaianisse;
    }
  }
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nickname: string;

  @Column()
  tobaianisse: number;
}
