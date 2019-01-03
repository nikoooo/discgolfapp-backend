import {
    Body,
    Get,
    JsonController,
    Param,
    Post
} from 'routing-controllers';
import { PlasticFeature } from '../entity/PlasticFeature';
import { PlasticFeatureRepository } from '../repositories/PlasticFeatureRepository';
import { EntityFromQuery } from 'typeorm-routing-controllers-extensions';
import { getConnectionManager } from 'typeorm';

@JsonController()
export class PlasticFeatureController {
    private plasticFeatureRepository: PlasticFeatureRepository;

    constructor() {
        this.plasticFeatureRepository = getConnectionManager().get().getCustomRepository(PlasticFeatureRepository);
    }

    @Get("/plasticFeatures")
    getAll(): Promise<PlasticFeature[]> {
        return this.plasticFeatureRepository
            .find()
            .catch(e => { throw new Error(e); });
    }

    @Get("/plasticFeatures/:id")
    getOne(@EntityFromQuery("id") disc: PlasticFeature): PlasticFeature {
        return disc;
    }

    @Get("/plasticFeatures/name/:name")
    getByName(@Param("name") name: string): Promise<PlasticFeature[]> {
        return this.plasticFeatureRepository.findByName(name);
    }

    @Post("plasticFeatures")
    create(@Body() plasticFeature: PlasticFeature): Promise<PlasticFeature> {
        return this.plasticFeatureRepository.save(plasticFeature);
    }

}