angular.module('fafa')
.directive('like', function($http, Util, $localStorage){
	var directive = {};
	directive.restrict = "E";
	directive.template = '<i class="icon ion-ios-heart-outline"></i>';
	// directive.scope = {
	//  	like:'=id'
	//  }
	// directive.compile = function(elem, attr){
	// 	var linkFunction = function($scope, elem, attr){
	// 		var designId = $scope.design_id;
	// 		var myId = $localStorage.myId;
	// 		var link = Util.getHostURL()+"/api/v1/design/islike/"+myId+"/"+designId;
	// 		$prm = $http.get(link, {cache:true, timeout:20000});
	// 		$prm.success(function(result){
	// 			if(result.res == true){
	// 				$scope.icon = 'ion-ios-heart';
	// 			}
	// 		});
	// 		$prm.error(function(err){

	// 		});
	// 		elem.html('<i class="icon '+$scope.icon+'"></i>');
	// 	};
	// 	return linkFunction;
	// };


	 
	return directive;
})