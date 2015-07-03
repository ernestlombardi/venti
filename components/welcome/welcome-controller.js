'use strict';

var Application = Application || {};

Application.Controllers
    .controller('WelcomeCtrl',
    function ($scope) {
        $scope.appTitle = 'Welcome to Project Seed Project';
    });
