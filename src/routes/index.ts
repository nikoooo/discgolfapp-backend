const discRoutes = require('./discRoutes');

module.exports = {
    registerDiscRoutes: function (router) {
        discRoutes.registerRoutes(router);
    }
};