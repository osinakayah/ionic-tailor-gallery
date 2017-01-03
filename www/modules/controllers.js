angular.module("fafa")
.controller('HomeCtrl', function($scope, ionicMaterialInk, ionicMaterialMotion){
	ionicMaterialInk.displayEffect();
	ionicMaterialMotion.ripple();

});