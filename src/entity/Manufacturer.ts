import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Disc } from "./Disc";
import { Plastic } from "./Plastic";

export interface IManufacturer {
    id?: number,
    name: string,
    discs?: Disc[],
    plastics?: Plastic[]
}

@Entity()
export class Manufacturer implements IManufacturer {

    constructor(manufacturer?: IManufacturer) {
        if (manufacturer) {
            this.id = manufacturer.id;
            this.name = manufacturer.name;
            this.discs = manufacturer.discs;
            this.plastics = manufacturer.plastics;
        }
    }

    // @ts-ignore
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar" })
    name: string;

    @OneToMany(type => Disc, disc => disc.manufacturer)
    discs: Disc[];

    @OneToMany(type => Plastic, plastic => plastic.manufacturer, {
        cascade: ["insert", "update"]
    })
    plastics: Plastic[];
}
