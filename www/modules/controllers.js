angular.module("fafa")
    .controller('MenuCtrl', function ($scope, $localStorage, $state) {
        $scope.myAccount = function () {
            if($localStorage.loginStatus == 0){
                $state.go('login');
            }
            else{
                $state.go('app.profile');
            }
        };
    })
.controller('HomeCtrl', function($scope, $ionicModal, $ionicPush, ionicMaterialInk, ionicMaterialMotion, $localStorage){
	 $ionicPush.register().then(function(t) {
	   return $ionicPush.saveToken(t);
	 }).then(function(t) {
	   $localStorage.token = t.token;
	   console.log('Token saved:', t.token);
	 });

	
	 ionicMaterialInk.displayEffect();
	 ionicMaterialMotion.ripple();

	$ionicModal.fromTemplateUrl('modules/ad_details.html', {
      scope: $scope,
      animation:'slide-in-up'
   }).then(function(modal) {
      $scope.modal = modal;

   });

    $scope.openAdModal = function() {
      $scope.modal.show();
   };

   $scope.closeAdModal = function() {
      $scope.modal.hide();
   };

   //Cleanup the modal when we're done with it!
   $scope.$on('$destroy', function() {
      $scope.modal.remove();
   });
});