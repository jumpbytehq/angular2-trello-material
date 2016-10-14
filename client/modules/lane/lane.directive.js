angular.module('myApp').directive('lane', function (cardService) {
    return {
        restrict: 'E',
        scope: {
            lane: '=data'         },
        templateUrl: './modules/lane/lane.html',
        link: function ($scope, element, attrs) { 
            $scope.card = {
                title: ''
            };
            $scope.isFormVisible = false;

            $scope.setFormVisibility = function(value) {
                $scope.isFormVisible = value;
            }

            $scope.createCard = function() {
                cardService.createdCard({
                    title: $scope.card.title,
                    lane: $scope.lane._id
                })
                .then(function(res) {
                    console.log(res);
                    // $scope.lane.cards.push(res.data);

                    $mdToast.show(
                      $mdToast.simple()
                        .textContent('Card '+$scope.card.title+' added to lane '+ $scope.lane.title)
                        .hideDelay(3000)
                    );
                })
            }
        }
    }
});