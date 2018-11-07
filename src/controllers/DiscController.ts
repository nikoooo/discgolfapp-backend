import { JsonController, Get } from "routing-controllers";
import { EntityFromParam } from "typeorm-routing-controllers-extensions";
import { Disc } from "../entity/Disc";
import { Repository, getConnectionManager } from "typeorm";

@JsonController()
export class DiscController {
    private discRepository: Repository<Disc>;

    constructor() {
        this.discRepository = getConnectionManager().get().getRepository(Disc);
    }

    @Get("/discs")
    async getAll() {
        return await this.discRepository
            .find()
            .catch(e => { throw new Error(e); });
    }

    @Get("/discs/:id")
    get(@EntityFromParam("id") disc: Disc): Disc {
        return disc;
    }

}