import { APIController } from "./APIController";
import { Disc } from "../entity/Disc";
import { getRepository } from 'typeorm';

export class DiscController extends APIController {

    public getDisc = async function(id: number): Promise<Disc> {
        return await getRepository(Disc)
            .findOne(id)
            .catch(e => { throw new Error(e); });
    }

    public getDiscs = async function(): Promise<Disc[]> {
        return await getRepository(Disc)
            .find()
            .catch(e => { throw new Error(e); });
    }

    public createDisc = async function(disc: Disc): Promise<Disc> {
        return await getRepository(Disc)
            .save(disc)
            .catch(e => { throw new Error(e); });
    }

    public updateDisc = async function (id: number, disc: Disc) {
        if (id !== disc.id) {
            throw new Error("Bad request, id is not matching disc.id");
        }
        const repo = await getRepository(Disc);
        return repo.findOne(id)
            .then(_disc => repo.save(disc))
            .catch(e => { throw new Error(e); });
    }

    public deleteDisc = async function (id: number) {
        const repo = await getRepository(Disc);
        const disc = repo.findOne(id)
            .then(_disc => repo.remove(disc))
            .catch(e => { throw new Error(e); });
    }

}