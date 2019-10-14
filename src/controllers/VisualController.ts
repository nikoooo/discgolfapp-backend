import {
  Body,
  Get,
  JsonController,
  Param,
  Post
} from 'routing-controllers';
import { Visual } from '../entity/Visual';
import { VisualRepository } from '../repositories/VisualRepository';
import { EntityFromQuery } from 'typeorm-routing-controllers-extensions';
import { getConnectionManager } from 'typeorm';

@JsonController()
export class VisualController {
  private visualRepository: VisualRepository;

  constructor() {
    this.visualRepository = getConnectionManager().get().getCustomRepository(VisualRepository);
  }

  @Get("/visuals")
  getAll(): Promise<Visual[]> {
    return this.visualRepository
      .find()
      .catch(e => { throw new Error(e); });
  }

  @Get("/visuals/:id")
  getOne(@EntityFromQuery("id") disc: Visual): Visual {
    return disc;
  }

  @Get("/visuals/name/:name")
  getByName(@Param("name") name: string): Promise<Visual[]> {
    return this.visualRepository.findByName(name);
  }

  @Post("visuals")
  create(@Body() visual: Visual): Promise<Visual> {
    return this.visualRepository.save(visual);
  }

}