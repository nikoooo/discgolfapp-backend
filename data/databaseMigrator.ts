
import { getConnectionManager, Repository } from "typeorm";
import { Disc } from "../src/entity/Disc";
import { DiscType } from "../src/entity/DiscType";
import { Manufacturer } from "../src/entity/Manufacturer";
import { Plastic } from "../src/entity/Plastic";
import { PlasticFeature } from "../src/entity/PlasticFeature";
import { Tag } from "../src/entity/Tag";
import { Visual } from "../src/entity/Visual";
import { DiscRepository } from "../src/repositories/DiscRepository";
import { DiscTypeRepository } from "../src/repositories/DiscTypeRepository";
import { ManufacturerRepository } from "../src/repositories/ManufacturerRepository";
import { PlasticRepository } from "../src/repositories/PlasticRepository";
import { PlasticFeatureRepository } from "../src/repositories/plasticFeatureRepository";
import { TagRepository } from "../src/repositories/TagRepository";
import { VisualRepository } from "../src/repositories/VisualRepository";

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

    private discRepo: DiscRepository;
    private discTypeRepo: DiscTypeRepository;
    private manufacturerRepo: ManufacturerRepository;
    private plasticRepo: PlasticRepository;
    private plasticFeatureRepo: PlasticFeatureRepository;
    private tagRepo: TagRepository;
    private visualRepo: VisualRepository;

    constructor() {
        this.discRepo = getConnectionManager().get().getCustomRepository(DiscRepository);
        this.discTypeRepo = getConnectionManager().get().getCustomRepository(DiscTypeRepository);
        this.manufacturerRepo = getConnectionManager().get().getCustomRepository(ManufacturerRepository);
        this.plasticRepo = getConnectionManager().get().getCustomRepository(PlasticRepository);
        this.plasticFeatureRepo = getConnectionManager().get().getCustomRepository(PlasticFeatureRepository);
        this.tagRepo = getConnectionManager().get().getCustomRepository(TagRepository);
        this.visualRepo = getConnectionManager().get().getCustomRepository(VisualRepository);
    }

    public migrate = () => {
        let that = this;

        let transactions = that.data.map((disc, i) => async () => {
            let pendingDiscTypes = (await that.discTypeRepo.findByName(disc.type));
            let discType = pendingDiscTypes.length ?
                pendingDiscTypes[0] : (await that.discTypeRepo.save(new DiscType({name: disc.type})));
                
            let pendingPlastics = (await that.plasticRepo.findByName(disc.plastic));
            let plastic = pendingPlastics.length ?
                pendingPlastics[0] : (await that.plasticRepo.save(new Plastic({name: disc.plastic})));
                
            let pendingManufacturer = (await that.manufacturerRepo.findByName(disc.manufacturer));
            let manufacturer = pendingManufacturer.length ?
                pendingManufacturer[0] : (await that.manufacturerRepo.save(new Manufacturer({name: disc.manufacturer})));

            let plasticFeatures = await Promise.all(disc.plasticFeatures
                .map(async pf => {
                    let pendingPF = (await that.plasticFeatureRepo.findByName(pf));
                    let newPF = pendingPF.length ?
                        pendingPF[0] : (await that.plasticFeatureRepo.save(new PlasticFeature({name: pf})));
                    return newPF;
                }));
            
            let tags = await Promise.all(disc.tags
                .map(async tag => {
                    let pendingTag = (await that.tagRepo.findByName(tag));
                    let newTag = pendingTag.length ?
                        pendingTag[0] : (await that.tagRepo.save(new Tag({ name: tag })));
                    return newTag;
                }));
            
            let visuals = await Promise.all(disc.visuals
                .map(async vis => {
                    let pendingVis = (await that.visualRepo.findByName(vis));
                    let newVis = pendingVis.length ?
                        pendingVis[0] : (await that.visualRepo.save(new Visual({ name: vis })));
                    return newVis;
                }));
            
            let newDisc = new Disc({
                source: disc.source,
                model: disc.model,
                speed: parseInt(disc.speed),
                glide: parseInt(disc.glide),
                turn: parseInt(disc.turn),
                fade: parseInt(disc.fade),
                imgPath: disc.imgUrl,
                discType: discType,
                plastic: plastic,
                manufacturer: manufacturer,
                plasticFeatures: plasticFeatures,
                tags: tags,
                visuals: visuals
            });
            await that.discRepo.save(newDisc);
            console.log((i + 1) + " done of " + that.data.length);
            return i + 1; // next
        });
        this.recursivelyRunTransactions(transactions, 0);
    }

    private recursivelyRunTransactions = (transactions: (() => Promise<number>)[], index: number) => {
        if (index === transactions.length) { // end
            console.log("transactions done");
            return;
        }
        transactions[index]()
            .then((nextIndex: number) => {
                this.recursivelyRunTransactions(transactions, nextIndex);
            });
    }

}