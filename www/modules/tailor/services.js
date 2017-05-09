angular.module("fafa")
.service('TailorService', function($http, Util, $state, $ionicLoading){
	this.designerDesigns = function(id, page){

		var link = Util.getHostURL()+"/api/v1/designer/"+id+"/"+page;
        $ionicLoading.show({duration:20000, noBackdrop:true});
		return $http.get(link, {cache:true, timeout:20000});
	};

	this.likeDesigner = function(designerId){
		if($localStorage.loginStatus != 1){
			$state.go('login');
		}
		else{
			// var myId = $localStorage.userId;
			// var link = Util.getHostURL()+"/api/v1/designer/like/myId/designerId";
			// $http.get(link, {cache:true, timeout:20000});
		}
	};
	
});