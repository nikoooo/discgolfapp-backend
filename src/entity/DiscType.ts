import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Disc } from "./Disc";

export interface IDiscType {
    id?: number,
    name: string,
    discs?: Disc[]
}

@Entity()
export class DiscType implements IDiscType {

    constructor(discType?: IDiscType) {
        if (discType) {
            this.id = discType.id;
            this.name = discType.name;
            this.discs = discType.discs;
        }
    }

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar" })
    name: string;

    @OneToMany(type => Disc, disc => disc.discType)
    discs: Disc[];
}