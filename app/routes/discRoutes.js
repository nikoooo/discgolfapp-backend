var Disc = require('../models/disc');

module.exports = {
    registerRoutes: function (router) {
        router.route('/discs')
            .post(function (req, res) {

                var disc = new Disc(req.body);

                // save the disc and check for errors
                disc.save(function (err) {
                    if (err)
                        res.send(err);
                    
                    res.json({ message: 'Disc created!', disc: disc });
                });

            })
            .get(function (req, res) {
                Disc.find(function (err, discs) {

                    if (err)
                        res.send(err);

                    res.json(discs);
                });
            });

        router.route('/discs/:disc_id')
            .get(function(req, res) {
                Disc.findById(req.params.disc_id, function(err, disc) {

                    if (err)
                        res.send(err);
                    
                    res.json(disc);
                });
            })
            .put(function(req, res) {

                // use our disc model to find the bear we want
                Disc.findById(req.params.disc_id, function(err, disc) {
        
                    if (err)
                        res.send(err);

                    const {
                        company,
                        glide,
                        imgUrl,
                        manufacturerImgUrl,
                        name,
                        plastic,
                        speed,
                        turn,
                        type,
                    } = req.body;

                    disc.company = company || disc.company;
                    disc.glide = glide || disc.glide;
                    disc.imgUrl = imgUrl || disc.imgUrl;
                    disc.manufacturerImgUrlm = manufacturerImgUrl || disc.manufacturerImgUrl;
                    disc.name = name || disc.name;
                    disc.plastic = plastic || disc.plastic;
                    disc.speed = speed || disc.speed;
                    disc.turn = turn || disc.turn;
                    disc.type = type || disc.type;
                    
                    disc.save(function(err) {
                        if (err)
                            res.send(err);
        
                        res.json({ message: 'Disc updated!' });
                    });
        
                });
            })
            .delete(function(req, res) {
                Disc.remove({
                    _id: req.params.disc_id
                }, function(err, disc) {
                    if (err)
                        res.send(err);
        
                    res.json({ message: 'Successfully deleted disc!' });
                });
            });
    }
}