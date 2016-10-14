app.factory('LaneService', function($http) {
   var serviceObj = {};
   var baseUrl = "/api/lane";
   
   serviceObj.getLanes = function() {
      return $http.get(baseUrl);
   }

   serviceObj.createLane = function(lane) {
      return $http.post(baseUrl, lane);
   }
   
   return serviceObj;
}); 
