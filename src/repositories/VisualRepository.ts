import { EntityRepository, Repository } from "typeorm";
import { Visual } from "../entity/Visual";

@EntityRepository(Visual)
export class VisualRepository extends Repository<Visual> {

  findByName(name: string) {
    return this.find({ name: name });
  }

}