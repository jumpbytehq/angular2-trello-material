app.directive('card', function () {
    return {
        restrict: 'EA',
        scope: {
            card: '=data'
        },
        templateUrl: './modules/card/card.html',
        link: function ($scope, element, attrs) {

        }
    }
});