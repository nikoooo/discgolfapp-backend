
import { getConnectionManager, Repository } from "typeorm";
import { Disc } from "../src/entity/Disc";
import { DiscType } from "../src/entity/DiscType";
import { Manufacturer } from "../src/entity/Manufacturer";
import { Plastic } from "../src/entity/Plastic";
import { PlasticFeature } from "../src/entity/PlasticFeature";
import { Tag } from "../src/entity/Tag";
import { Visual } from "../src/entity/Visual";

type DataModel = {
    type: string,
    manufacturer: string,
    model: string,
    plastic: string,
    plasticFeatures: string[],
    tags: string[],
    visuals: string[],
    imgUrl: string,
    source: string,
    speed: string,
    glide: string,
    turn: string,
    fade: string
}

export class DatabaseMigrator {
    private data: DataModel[] = require('./data.json').data;

    private discRepo: Repository<Disc>;
    private discTypeRepo: Repository<DiscType>;
    private manufacturerRepo: Repository<Manufacturer>;
    private plasticRepo: Repository<Plastic>;
    private plasticFeatureRepo: Repository<PlasticFeature>;
    private tagRepo: Repository<Tag>;
    private visualRepo: Repository<Visual>;

    constructor() {
        this.discRepo = getConnectionManager().get().getRepository(Disc);
        this.discTypeRepo = getConnectionManager().get().getRepository(DiscType);
        this.manufacturerRepo = getConnectionManager().get().getRepository(Manufacturer);
        this.plasticRepo = getConnectionManager().get().getRepository(Plastic);
        this.plasticFeatureRepo = getConnectionManager().get().getRepository(PlasticFeature);
        this.tagRepo = getConnectionManager().get().getRepository(Tag);
        this.visualRepo = getConnectionManager().get().getRepository(Visual);
    }

    public migrate = () => {
        let that = this;
        that.data.forEach(async disc => {
            let newDisc = new Disc({
                source: disc.source,
                model: disc.model,
                speed: parseInt(disc.speed),
                glide: parseInt(disc.glide),
                turn: parseInt(disc.turn),
                fade: parseInt(disc.fade),
                imgPath: disc.imgUrl,
                discType: new DiscType({
                    name: disc.type
                }),
                plastic: new Plastic({
                    name: disc.plastic
                }),
                manufacturer: new Manufacturer({
                    name: disc.manufacturer
                }),
                plasticFeatures: disc.plasticFeatures.map(pf => new PlasticFeature({
                    name: pf
                })),
                tags: disc.tags.map(t => new Tag({
                    name: t
                })),
                visuals: disc.visuals.map(v => new Visual({
                    name: v
                }))
            });
            await that.discRepo.save(newDisc);
        });
    }

}