import { Get, JsonController, Param } from "routing-controllers";
import { getConnectionManager } from "typeorm";
import { EntityFromParam } from "typeorm-routing-controllers-extensions";
import { Disc } from "../entity/Disc";
import { DiscRepository } from "../repositories/DiscRepository";

@JsonController()
export class DiscController {
  private discRepository: DiscRepository;

  constructor() {
    this.discRepository = getConnectionManager().get().getCustomRepository(DiscRepository);
  }

  /**
   * Gets all discs.
   */
  @Get("/discs")
  async getAll() {
    return await this.discRepository
      .find() // { relations: ["FK?eller"] })
      .catch(e => { throw new Error(e); });
  }
  
  /**
   * Get specific disc.
   * @param disc 
   */
  @Get("/discs/:id")
  getOne(@EntityFromParam("id") disc: Disc): Disc {
    return disc;
  }

  @Get("/discs/model/:model")
  async findByModel(@Param("model") model: string): Promise<Disc[]> {
    return await this.discRepository.findByModel(model)
      .catch(e => { throw new Error(e); });
  }
}