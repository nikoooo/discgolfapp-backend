import {
    Body,
    Get,
    JsonController,
    Param,
    Post
} from 'routing-controllers';
import { Manufacturer } from '../entity/Manufacturer';
import { ManufacturerRepository } from '../repositories/ManufacturerRepository';
import { EntityFromQuery } from 'typeorm-routing-controllers-extensions';
import { getConnectionManager } from 'typeorm';

@JsonController()
export class ManufacturerController {
    private manufacturerRepository: ManufacturerRepository;

    constructor() {
        this.manufacturerRepository = getConnectionManager().get().getCustomRepository(ManufacturerRepository);
    }

    @Get("/manufacturers")
    getAll(): Promise<Manufacturer[]> {
        return this.manufacturerRepository
            .find()
            .catch(e => { throw new Error(e); });
    }

    @Get("/manufacturers/:id")
    getOne(@EntityFromQuery("id") disc: Manufacturer): Manufacturer {
        return disc;
    }

    @Get("/manufacturers/name/:name")
    getByName(@Param("name") name: string): Promise<Manufacturer[]> {
        return this.manufacturerRepository.findByName(name);
    }

    @Post("manufacturers")
    create(@Body() manufacturer: Manufacturer): Promise<Manufacturer> {
        return this.manufacturerRepository.save(manufacturer);
    }

}