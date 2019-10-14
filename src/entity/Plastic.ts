import { Column, Entity, OneToMany, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Disc } from "./Disc";
import { Manufacturer } from "./Manufacturer";

export interface IPlastic {
  id?: number,
  name: string,
  discs?: Disc[],
  manufacturer?: Manufacturer
}

@Entity()
export class Plastic implements IPlastic {

  constructor(plastic?: IPlastic) {
    if (plastic) {
      this.id = plastic.id;
      this.name = plastic.name;
      this.discs = plastic.discs;
      this.manufacturer = plastic.manufacturer;
    }
  }

  // @ts-ignore
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar" })
  name: string;

  @OneToMany(type => Disc, disc => disc.plastic)
  discs: Disc[];

  @ManyToOne(type => Manufacturer, manufacturer => manufacturer.plastics, {
    eager: true
  })
  manufacturer: Manufacturer;
}
