import { EntityRepository, Repository } from "typeorm";
import { Plastic } from "../entity/Plastic";

@EntityRepository(Plastic)
export class PlasticRepository extends Repository<Plastic> {

  findByName(name: string) {
    return this.find({ name: name });
  }

}