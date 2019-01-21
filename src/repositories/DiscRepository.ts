import { EntityRepository, Repository } from "typeorm";
import { Disc } from "../entity/Disc";

@EntityRepository(Disc)
export class DiscRepository extends Repository<Disc> {

  findByModel(model: string) {
    return this.find({ model: model });
  }

}