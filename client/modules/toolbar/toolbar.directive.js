app.directive('toolBar', function ($mdDialog) {
    return {
        restrict: 'E',
        scope: {},
        templateUrl: './modules/toolbar/toolbar.html',
        link: function ($scope, element, attrs) {
            $scope.showInfoModal = function () {
                $mdDialog.show({
                    templateUrl: './modules/toolbar/info/info.html',
                    clickOutsideToClose: true,
                    parent: angular.element(document.body)
                });
            }
        }
    }
});