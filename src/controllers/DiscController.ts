import { Get, JsonController, Param } from "routing-controllers";
import { getConnectionManager } from "typeorm";
import { EntityFromQuery } from "typeorm-routing-controllers-extensions";
import { Disc } from "../entity/Disc";
import { DiscRepository } from "../repositories/DiscRepository";

@JsonController()
export class DiscController {
    private discRepository: DiscRepository;

    constructor() {
        this.discRepository = getConnectionManager().get().getCustomRepository(DiscRepository);
    }

    @Get("/discs")
    async getAll() {
        return await this.discRepository
            .find() // { relations: ["FK?eller"] })
            .catch(e => { throw new Error(e); });
    }

    @Get("/discs/:id")
    get(@EntityFromQuery("id") disc: Disc): Disc {
        return disc;
    }

    @Get("/discs/model/:model")
    async findByModel(@Param("model") model: string): Promise<Disc[]> {
        return await this.discRepository.findByModel(model);
    }

}