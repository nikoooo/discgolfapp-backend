import { Disc } from '../../src/entity/Disc';
import { DiscController } from "../controllers/DiscController";

module.exports = {
    registerRoutes: function (router) {
        let discController = new DiscController();

        router.route('/discs')
            .post(async function (req, res) {
                // Todo: validate model in Disc.validate
                await discController.createDisc(res.body as Disc)
                    .then(disc => res.json(disc))
                    .catch(e => res.send(e));
            })
            .get(async function (req, res) {
                await discController.getDiscs()
                    .then(discs => res.json(discs))
                    .catch(e => res.send(e));
            });

        router.route('/discs/:id')
            .get(async function (req, res) {
                await discController.getDisc(req.params.id)
                    .then(disc => res.json(disc))
                    .catch(e => res.send(e));
            })
            .put(async function (req, res) {
                await discController.updateDisc(req.params.id, req.body)
                    .then(disc => res.json(disc))
                    .catch(e => res.send(e));
            })
            .delete(async function (req, res) {
                await discController.deleteDisc(req.params.id)
                    .then(disc => res.json(disc))
                    .catch(e => res.send(e));
            });
    }
}