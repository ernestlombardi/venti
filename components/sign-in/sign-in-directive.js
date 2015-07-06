var Application = Application || {};
var angular = angular || {};

Application.Directives
    .directive("signin", function ($mdDialog) {
        "use strict";
        return {
            restrict: "E",
            resolve: "AppCtrl",
            templateUrl: "components/sign-in/sign-in-form.html",
            link: function ($scope) {
                $scope.showForgotPassword = function(ev) {
                    /*Invoking an Angular Material Dialog here but providing our own controller and content template*/
                    $mdDialog.show({
                        controller: "DialogCtrl",
                        templateUrl: "components/dialog/forgot-password.html",
                        parent: angular.element(document.body),
                        targetEvent: ev,
                    }).then(function(submitForgotPassword) {
                        //submit via DialogCtrl
                    }, function() {
                        //cancel via DialogCtrl
                    });
                };
            },
        };
    });