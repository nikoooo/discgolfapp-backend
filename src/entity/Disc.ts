import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Manufacturer } from "./Manufacturer";
import { Plastic } from "./Plastic";
import { PlasticFeature } from "./PlasticFeature";
import { Tag } from "./Tag";
import { Visual } from "./Visual";
import { DiscType } from "./DiscType";

export interface IDisc {

    id?: number;

    source?: string;

    model: string

    speed: number;

    glide: number;

    turn: number;

    fade: number;

    imgPath?: string;

    discType: DiscType;

    plastic: Plastic;

    manufacturer: Manufacturer;

    plasticFeatures?: PlasticFeature[];

    tags?: Tag[];

    visuals?: Visual[];
}
 

@Entity()
export class Disc implements IDisc {

    constructor(disc?: IDisc){
        if (disc) {
            this.id = disc.id;
            this.source = disc.source;
            this.model = disc.model;
            this.speed = disc.speed;
            this.glide = disc.glide;
            this.turn = disc.turn;
            this.fade = disc.fade;
            this.imgPath = disc.imgPath;
            this.discType = disc.discType;
            this.plastic = disc.plastic;
            this.manufacturer = disc.manufacturer;
            this.plasticFeatures = disc.plasticFeatures;
            this.tags = disc.tags;
            this.visuals = disc.visuals;
        }
    }

    @PrimaryGeneratedColumn()
    id: number;

    @Column("varchar")
    source: string;

    @Column("varchar")
    model: string

    @Column()
    speed: number;

    @Column()
    glide: number;

    @Column()
    turn: number;

    @Column()
    fade: number;

    @Column("varchar")
    imgPath: string;

    @ManyToOne(type => DiscType, discType => discType.discs, { cascade: ["insert", "update"] })
    discType: DiscType;

    @ManyToOne(type => Plastic, plastic => plastic.discs, { cascade: ["insert", "update"] })
    @JoinTable()
    plastic: Plastic;

    @ManyToOne(type => Manufacturer, manufacturer => manufacturer.discs, { cascade: ["insert", "update"] })
    manufacturer: Manufacturer;

    @ManyToMany(type => PlasticFeature, plasticFeature => plasticFeature.discs, { cascade: ["insert", "update"] })
    @JoinTable()
    plasticFeatures: PlasticFeature[];

    @ManyToMany(type => Tag, plastic => plastic.discs, { cascade: ["insert", "update"] })
    @JoinTable()
    tags: Tag[];

    @ManyToMany(type => Visual, visual => visual.discs, { cascade: ["insert", "update"] })
    @JoinTable()
    visuals: Visual[];
}
