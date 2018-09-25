import { Disc } from '../../src/entity/Disc';
import { getRepository } from 'typeorm';

module.exports = {
    registerRoutes: function (router) {
        router.route('/discs')
            .post(async function (req, res) {
                let newDisc = res.body as Disc;
                // Todo: validate model in Disc.validate
                let savedDisc = await getRepository(Disc)
                    .save(newDisc)
                    .catch(e => res.send(e));
                res.json(savedDisc);
            })
            .get(async function (req, res) {
                let discs = await getRepository(Disc)
                    .find()
                    .catch(e => res.send(e));
                res.json(discs);
            });


        router.route('/discs/:id')
            .get(async function (req, res) {
                let disc = await getRepository(Disc)
                    .findOne(req.params.id)
                    .catch(e => res.send(e));

                res.json(disc);
            })
            .put(async function (req, res) {
                let repo = await getRepository(Disc);
                await repo.findOne(req.params.id)
                    .then(async _disc => {
                        // Todo validate
                        let updatedDisc = req.body as Disc;
                        await repo.save(updatedDisc)
                        res.json(updatedDisc);
                    })
                    .catch(e => res.send(e));
            })
            .delete(async function (req, res) {
                await getRepository(Disc)
                    .delete(req.params.id)
                    .then(() => {
                        res.json({ message: 'Successfully deleted model!' })
                    })
                    .catch(e => res.send(e));
            });
    }
}