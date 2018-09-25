const discRoutes = require('./discRoutes.ts');

module.exports = {
    registerDiscRoutes: function (router) {
        discRoutes.registerRoutes(router);
    }
};