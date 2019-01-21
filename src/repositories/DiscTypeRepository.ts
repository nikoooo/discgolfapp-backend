import { EntityRepository, Repository } from "typeorm";
import { DiscType } from "../entity/DiscType";

@EntityRepository(DiscType)
export class DiscTypeRepository extends Repository<DiscType> {

  findByName(name: string) {
    return this.find({ name: name });
  }

}