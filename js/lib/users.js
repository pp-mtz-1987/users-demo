var usersApp = angular.module('usersApp', ['ui.bootstrap', 'modalsApp']);

usersApp.controller('users', ['$scope', '$http', '$uibModal', 'modalLoader', 'modalMessage', function ($scope, $http, $uibModal, modalLoader, modalMessage) {
	$scope.totalUsers = 0;
	$scope.selectedUsers = 0;
	$scope.selectedUserNames = [];
	
	if (!modalLoader.isLoading()) {
		modalLoader.start();
    
		$http.get('https://jsonplaceholder.typicode.com/users')
    		.then(
    			function (response) {
    				response.data.sort(function (a, b) {
    					return a.name > b.name;
    				});
    			
    				$scope.users = response.data;
    				$scope.totalUsers = response.data.length;
    			
    				modalLoader.stop();
    			},
    			function (response) {    			
    				modalLoader.stop();
    				modalMessage.show('Unexpected error.');
    			}
    		);
	}
	
	$scope.toggleSelection = function(selectedUserName) {
		var index = $scope.selectedUserNames.indexOf(selectedUserName);
		
		if (index === -1) {
			$scope.selectedUserNames.push(selectedUserName);			
		} else {
			$scope.selectedUserNames.splice(index, 1);
		}
		
		$scope.selectedUsers = $scope.selectedUserNames.length;
	}
	
	$scope.confirm = function () {
		var i, j;
		
		if ($scope.selectedUsers === 0) {
			modalMessage.show('No users selected.');
		} else {
			$uibModal.open({
	            animation: true,
	            templateUrl: '/templates/modals/users-list.html?timestamp=' + (new Date()), // DEV - Timestamp,
	            size: 'md',
	            backdrop: 'static',
	            controllerAs: '$ctrl',
	            controller: ['$scope', '$uibModalInstance', 'userNames', function ($scope, $uibModalInstance, userNames) {
	                var $ctrl = this;
	                
	                $scope.userNames = userNames;

	                $ctrl.close = function () {
	                    $uibModalInstance.dismiss('cancel');
	                }
	            }],
	            resolve: {
	                userNames: function () {
	                	$scope.selectedUserNames.sort(function (a, b) {
	    					return a > b;
	    				});
	                	
	                    return $scope.selectedUserNames;
	                }
	            }
	        });
		}
	}
}]);