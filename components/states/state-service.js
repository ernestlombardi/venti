var Application = Application || {};

Application.Services.service("stateService",
    function stateServiceFactory($rootScope, $http) {
        "use strict";

        var stateService = {};

        stateService.getPopulation = function (state) {
            return 100;
        };

        return stateService;
    });