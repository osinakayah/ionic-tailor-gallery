angular.module("fafa")
.controller('NotificationCtrl', function($scope, ionicMaterialInk, $ionicPopup, ionicMaterialMotion, $timeout){
	$scope.$on('cloud:push:notification', function(event, data) {
	  var msg = data.message;
	  alert(msg.title + ': ' + msg.text);
	  //insert in2 db
	});
	$timeout(function() {
        ionicMaterialMotion.fadeSlideInRight({
            startVelocity: 3000
        });
    }, 700);

	ionicMaterialInk.displayEffect();
	ionicMaterialMotion.ripple();

	$scope.jobRequest = function(){
		var confirmRequest = $ionicPopup.confirm({
			title:'Accept this job?',
			template:'Payment will be deducted automatically from account'
		});
		confirmRequest.then(function(res){
			if(res){
				console.log(1);
				//deduct cash from account
				//remove notification
				//send put request to update job status
			}
			else{
				console.log(0);
				//remove notification
				//send put request to update job status
			}
		});
	};
});