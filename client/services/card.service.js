app.factory('CardService', function($http) {
    var serviceObj = {};
    var baseUrl = "/api/card";

    serviceObj.createCard = function(card) {
        return $http.post(baseUrl, card);
    };

    serviceObj.transferCard = function(cardId, fromLane, toLane) {
        return $http.post(baseUrl + '/transfer-card', {
            case: cardId,
            fromLane: fromLane,
            toLane: toLane
        });
    };

    return serviceObj;
});
