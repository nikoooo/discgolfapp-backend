import { Body, Get, JsonController, Param, Post } from 'routing-controllers';
import { getConnectionManager } from 'typeorm';
import { EntityFromParam } from 'typeorm-routing-controllers-extensions';
import { DiscType } from '../entity/DiscType';
import { DiscTypeRepository } from '../repositories/DiscTypeRepository';

@JsonController()
export class DiscTypeController {
  private discTypeRepository: DiscTypeRepository;

  constructor() {
    this.discTypeRepository = getConnectionManager().get().getCustomRepository(DiscTypeRepository);
  }

  @Get("/discTypes")
  getAll(): Promise<DiscType[]> {
    return this.discTypeRepository
      .find()
      .catch(e => { throw new Error(e); });
  }

  @Get("/discTypes/:id")
  getOne(@EntityFromParam("id") disc: DiscType): DiscType {
    return disc;
  }

  @Get("/discTypes/name/:name")
  getByName(@Param("name") name: string): Promise<DiscType[]> {
    return this.discTypeRepository.findByName(name);
  }

  @Post("discTypes")
  create(@Body() discType: DiscType): Promise<DiscType> {
    return this.discTypeRepository.save(discType);
  }

}