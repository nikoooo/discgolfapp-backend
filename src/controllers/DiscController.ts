import { JsonController, Get } from "routing-controllers";
import { EntityFromParam } from "typeorm-routing-controllers-extensions";
import { Disc } from "../entity/Disc";
import { Repository, getConnectionManager } from "typeorm";
import { Manufacturer } from "../entity/Manufacturer";

@JsonController()
export class DiscController {
    private discRepository: Repository<Disc>;
    private manufacturerRepository: Repository<Manufacturer>;

    constructor() {
        this.discRepository = getConnectionManager().get().getRepository(Disc);
        this.manufacturerRepository = getConnectionManager().get().getRepository(Manufacturer);
    }

    @Get("/discs")
    async getAll() {
        return await this.discRepository
            .find({ relations: ["manufacturerFK"] })
            .catch(e => { throw new Error(e); });
    }

    @Get("/discs/:id")
    get(@EntityFromParam("id") disc: Disc): Disc {
        return disc;
    }

}