app.directive('card', function () {
    return {
        restrict: 'E',
        scope: {
            card: '=data'
        },
        templateUrl: './modules/card/card.html',
        link: function ($scope, element, attrs) { 
            
        }
    }
});