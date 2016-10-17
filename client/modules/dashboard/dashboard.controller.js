app.controller('DashboardController', ['$scope', 'LaneService', '$mdDialog', '$mdToast', function($scope, laneService, $mdDialog, $mdToast) {
    $scope.UIData = {
    	lanes: []
    };

    var fetchLanes = function() {
		laneService.getLanes().then(function(res) {
			$scope.UIData.lanes = res.data.lanes;
		});
	}

	fetchLanes();

	$scope.showAddLaneModal = function() {
		$mdDialog.show({
	      	controller: AddLaneModalController,
	      	templateUrl: './modules/dashboard/create-lane/create-lane.html',
	      	parent: angular.element(document.body),
	      	clickOutsideToClose:true
	    })
	    .then(function(lane) {
	    	laneService.createLane(lane).then(function(res) {
	    		var createdLane = res.data;

				$mdToast.show(
			      $mdToast.simple()
			        .textContent('Lane \''+createdLane.title+'\' created')
			        .hideDelay(3000)
			    );

			    $scope.UIData.lanes.push(createdLane);
			});
	    });
	}

	var AddLaneModalController = function($scope, $mdDialog) {
		
		$scope.lane = {
			title: ''
		}

		$scope.addLane = function() {
			$mdDialog.hide(angular.copy($scope.lane))
		}

		$scope.cancel = function() {
			$mdDialog.cancel();
		}
	}
}]);
