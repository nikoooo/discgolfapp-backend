import { Get, JsonController } from "routing-controllers";
import { getConnectionManager, Repository } from "typeorm";
import { EntityFromParam } from "typeorm-routing-controllers-extensions";
import { Disc } from "../entity/Disc";

@JsonController()
export class DiscController {
    private discRepository: Repository<Disc>;

    constructor() {
        this.discRepository = getConnectionManager().get().getRepository(Disc);
    }

    @Get("/discs")
    async getAll() {
        return await this.discRepository
            .find() // { relations: ["FK?eller"] })
            .catch(e => { throw new Error(e); });
    }

    @Get("/discs/:id")
    get(@EntityFromParam("id") disc: Disc): Disc {
        return disc;
    }

}