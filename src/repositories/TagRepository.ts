import { EntityRepository, Repository } from "typeorm";
import { Tag } from "../entity/Tag";

@EntityRepository(Tag)
export class TagRepository extends Repository<Tag> {

  findByName(name: string) {
    return this.find({ name: name });
  }

}