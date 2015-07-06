var Application = Application || {};

Application.Controllers
    .controller("DialogCtrl",
    function ($scope, $mdDialog) {
        "use strict";

        $scope.submitForgotPassword = function () {
            console.log("submitted");
            console.log($scope.email);
            $mdDialog.hide();
        };

        $scope.cancel = function () {
            console.log("cancelled");
            $mdDialog.cancel();
        };

    });
