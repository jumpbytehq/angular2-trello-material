angular.module('myApp').directive('lane', function (CardService, $mdToast, $rootScope) {
    return {
        restrict: 'EA',
        scope: {
            lane: '=data'
        },
        templateUrl: './modules/lane/lane.html',
        link: function ($scope, element, attrs) {
            $scope.card;
            $scope.isFormVisible;

            var resetForm = function () {
                $scope.card = {
                    title: ''
                };
                $scope.isFormVisible = false;
            }
            resetForm();

            $scope.setFormVisibility = function (value) {
                $scope.isFormVisible = value;
            }

            $scope.createCard = function () {
                CardService.createCard({
                    title: $scope.card.title,
                    lane: $scope.lane._id
                })
                    .then(function (res) {
                        $scope.lane.cards.push(res.data);

                        $mdToast.show(
                            $mdToast.simple()
                                .textContent('Card \'' + $scope.card.title + '\' added to lane \'' + $scope.lane.title + '\'')
                                .position('bottom left')
                                .hideDelay(2000)
                        );

                        resetForm();
                    })
            }

            var removeCard = function (cardObj) {
                var i;
                for (i = 0; i < $scope.lane.cards.length; i++) {
                    if ($scope.lane.cards[i]._id === cardObj._id) {
                        break;
                    }
                }

                if (i < $scope.lane.cards.length) { //break was executed
                    $scope.lane.cards.splice(i, 1);
                }
            }

            var addCard = function(index, cardObj) {
                $scope.lane.cards.splice(index, 0, cardObj);
            } 

            $scope.dropCallback = function (event, index, cardObj, external, type, containerType) {

                var isDroppedToSameLane = $scope.lane._id === cardObj.lane;

                if (isDroppedToSameLane) {
                    removeCard(cardObj);
                }
                else {
                    CardService.transferCard(cardObj._id, cardObj.lane, $scope.lane._id).then(function () {
                        $rootScope.$broadcast(cardObj.lane, {
                            action: 'remove',
                            card: cardObj
                        });

                        $mdToast.show(
                            $mdToast.simple()
                                .textContent('Card \'' + cardObj.title + '\' transfered')
                                .position('bottom left')
                                .hideDelay(2000)
                        );
                    });
                }

                addCard(index, cardObj);
                return true;
            }

            $rootScope.$on($scope.lane._id, function (event, data) {
                if (data.action === 'remove') {
                    removeCard(data.card);
                }
            });
        }
    }
});