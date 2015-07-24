"use strict";

var Application = Application || {};

Application.Services.service("stateService",
    function stateServiceFactory($rootScope, $http) {
        var stateService = {};

        stateService.getPopulation = function (state) {
            return 100;
        };

        return stateService;
    });