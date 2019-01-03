import { EntityRepository, Repository } from "typeorm";
import { PlasticFeature } from "../entity/PlasticFeature";

@EntityRepository(PlasticFeature)
export class PlasticFeatureRepository extends Repository<PlasticFeature> {

  findByName(name: string) {
    return this.find({ name: name });
  }

}