import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Disc } from "./Disc";

export interface IPlasticFeature {
  id?: number,
  name: string,
  discs?: Disc[]
}

@Entity()
export class PlasticFeature implements IPlasticFeature {

  constructor(plasticFeature?: IPlasticFeature) {
    if (plasticFeature) {
      this.id = plasticFeature.id;
      this.name = plasticFeature.name;
      this.discs = plasticFeature.discs;
    }
  }

  // @ts-ignore
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar" })
  name: string;

  @ManyToMany(type => Disc, disc => disc.plasticFeatures)
  discs: Disc[];
}
