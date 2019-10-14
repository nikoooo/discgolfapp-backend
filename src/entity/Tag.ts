import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Disc } from "./Disc";

export interface ITag {
  id?: number,
  name: string,
  discs?: Disc[]
}

@Entity()
export class Tag implements ITag {

  constructor(tag?: ITag) {
    if (tag) {
      this.id = tag.id;
      this.name = tag.name;
      this.discs = tag.discs;
    }
  }

  // @ts-ignore
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar" })
  name: string;

  @ManyToMany(type => Disc, disc => disc.tags)
  discs: Disc[];
}
