import { EntityRepository, Repository } from "typeorm";
import { Manufacturer } from "../entity/Manufacturer";

@EntityRepository(Manufacturer)
export class ManufacturerRepository extends Repository<Manufacturer> {

  findByName(name: string) {
    return this.find({ name: name });
  }

}