import { Body, Get, JsonController, Param, Post } from 'routing-controllers';
import { getConnectionManager } from 'typeorm';
import { EntityFromParam } from 'typeorm-routing-controllers-extensions';
import { Plastic } from '../entity/Plastic';
import { PlasticRepository } from '../repositories/PlasticRepository';

@JsonController()
export class PlasticController {
  private plasticRepository: PlasticRepository;

  constructor() {
    this.plasticRepository = getConnectionManager().get().getCustomRepository(PlasticRepository);
  }

  @Get("/plastics")
  getAll(): Promise<Plastic[]> {
    return this.plasticRepository
      .find()
      .catch(e => { throw new Error(e); });
  }

  @Get("/plastics/:id")
  getOne(@EntityFromParam("id") disc: Plastic): Plastic {
    return disc;
  }

  @Get("/plastics/name/:name")
  getByName(@Param("name") name: string): Promise<Plastic[]> {
    return this.plasticRepository.findByName(name);
  }

  @Post("plastics")
  create(@Body() plastic: Plastic): Promise<Plastic> {
    return this.plasticRepository.save(plastic);
  }

}