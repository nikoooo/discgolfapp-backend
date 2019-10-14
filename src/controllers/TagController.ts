import {
  Body,
  Get,
  JsonController,
  Param,
  Post
} from 'routing-controllers';
import { Tag } from '../entity/Tag';
import { TagRepository } from '../repositories/TagRepository';
import { EntityFromQuery } from 'typeorm-routing-controllers-extensions';
import { getConnectionManager } from 'typeorm';

@JsonController()
export class TagController {
  private tagRepository: TagRepository;

  constructor() {
    this.tagRepository = getConnectionManager().get().getCustomRepository(TagRepository);
  }

  @Get("/tags")
  getAll(): Promise<Tag[]> {
    return this.tagRepository
      .find()
      .catch(e => { throw new Error(e); });
  }

  @Get("/tags/:id")
  getOne(@EntityFromQuery("id") disc: Tag): Tag {
    return disc;
  }

  @Get("/tags/name/:name")
  getByName(@Param("name") name: string): Promise<Tag[]> {
    return this.tagRepository.findByName(name);
  }

  @Post("tags")
  create(@Body() tag: Tag): Promise<Tag> {
    return this.tagRepository.save(tag);
  }

}