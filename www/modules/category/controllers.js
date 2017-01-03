angular.module("fafa")
.controller('CategoryCtrl', function($scope, ionicMaterialInk, ionicMaterialMotion){
	ionicMaterialInk.displayEffect();
	ionicMaterialMotion.ripple();

});