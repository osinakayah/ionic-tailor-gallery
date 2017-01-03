angular.module("fafa")
.controller('ClothCtrl', function($scope, ionicMaterialInk, ionicMaterialMotion, $timeout){
	$timeout(function() {
        ionicMaterialMotion.fadeSlideInRight({
            startVelocity: 3000
        });
    }, 700);
	ionicMaterialInk.displayEffect();
	ionicMaterialMotion.ripple();

});