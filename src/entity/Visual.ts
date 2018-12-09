import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Disc } from "./Disc";

export interface IVisual {
    id?: number,
    name: string,
    discs?: Disc[]
}

@Entity()
export class Visual implements IVisual {

    constructor(visual?: IVisual) {
        if (visual) {
            this.id = visual.id;
            this.name = visual.name;
            this.discs = visual.discs;
        }
    }

    // @ts-ignore
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar" })
    name: string;

    @ManyToMany(type => Disc, disc => disc.visuals)
    discs: Disc[];
}
