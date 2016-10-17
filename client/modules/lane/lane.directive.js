angular.module('myApp').directive('lane', function (CardService, $mdToast) {
    return {
        restrict: 'E',
        scope: {
            lane: '=data'         },
        templateUrl: './modules/lane/lane.html',
        link: function ($scope, element, attrs) { 
            $scope.card;
            $scope.isFormVisible;

            var resetForm = function() {
                $scope.card = {
                    title: ''
                };
                $scope.isFormVisible = false;
            }
            resetForm();

            $scope.setFormVisibility = function(value) {
                $scope.isFormVisible = value;
            }

            $scope.createCard = function() {
                CardService.createCard({
                    title: $scope.card.title,
                    lane: $scope.lane._id
                })
                .then(function(res) {
                    $scope.lane.cards.push(res.data);

                    $mdToast.show(
                      $mdToast.simple()
                        .textContent('Card \''+$scope.card.title+'\' added to lane \''+ $scope.lane.title+'\'')
                        .position('bottom left')
                        .hideDelay(200000)
                    );

                    resetForm();
                })
            }

            $scope.$on('lane.drag', function (e, el) {
                console.log("inside lane.drag");
                // el.removeClass('ex-moved');
            });

            $scope.$on('lane.drop', function (e, el) {
                console.log("inside lane.drop");
                // el.addClass('ex-moved');
            });

            $scope.$on('lane.over', function (e, el, container) {
                console.log("inside lane.over");
                // container.addClass('ex-over');
            });

            $scope.$on('lane.out', function (e, el, container) {
                console.log("inside lane.out");
                // container.removeClass('ex-over');
            });

            $scope.$on('lane.drop', function (e, el, container) {
                console.log("inside lane.drop");
                // container.removeClass('ex-over');
            });

            $scope.$on('lane.cancel', function (e, el, container) {
                console.log("inside lane.cancel");
                // container.removeClass('ex-over');
            });

            $scope.getStyle = function() {
                var style = {};

                if($scope.isFormVisible) {
                    style.height = "240px";
                }

                return style;
            }
        }
    }
});