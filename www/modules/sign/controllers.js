angular.module("fafa")
.controller('UserCtrl', function($scope, ionicMaterialInk, ionicMaterialMotion, $timeout, UserService){
	$timeout(function() {
        ionicMaterialMotion.fadeSlideInRight({
            startVelocity: 3000
        });
    }, 700);

    $timeout(function() {
        ionicMaterialMotion.slideUp({
            selector: '.slide-up'
        });
    }, 300);
    
	ionicMaterialInk.displayEffect();
	ionicMaterialMotion.ripple();

    UserService.save({id:'osi'});

});