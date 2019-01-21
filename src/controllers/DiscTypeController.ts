import {
    Body,
    Get,
    JsonController,
    Param,
    Post
} from 'routing-controllers';
import { DiscType } from '../entity/DiscType';
import { DiscTypeRepository } from '../repositories/DiscTypeRepository';
import { EntityFromQuery } from 'typeorm-routing-controllers-extensions';
import { getConnectionManager } from 'typeorm';

@JsonController()
export class DiscTypeController {
    private discTypeRepository: DiscTypeRepository;

    constructor() {
        this.discTypeRepository = getConnectionManager().get().getCustomRepository(DiscTypeRepository);
    }

    @Get("/discModels")
    getAll(): Promise<DiscType[]> {
        return this.discTypeRepository
            .find()
            .catch(e => { throw new Error(e); });
    }

    @Get("/discModels/:id")
    getOne(@EntityFromQuery("id") disc: DiscType): DiscType {
        return disc;
    }

    @Get("/discModels/name/:name")
    getByName(@Param("name") name: string): Promise<DiscType[]> {
        return this.discTypeRepository.findByName(name);
    }

    @Post("discModels")
    create(@Body() discType: DiscType): Promise<DiscType> {
        return this.discTypeRepository.save(discType);
    }

}