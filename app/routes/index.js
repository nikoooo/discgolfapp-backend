const discRoutes = require('./discRoutes.js');

module.exports = {
    registerRoutes: function (router) {
        discRoutes.registerRoutes(router);
    }
};