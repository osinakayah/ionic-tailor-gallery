angular.module('fafa')
.service('ClothService', function($http, $ionicLoading, Util, $localStorage){
	this.getMyClothes = function(page){
		if(page == 0){
			$ionicLoading.show({duration:20000, noBackdrop:true});
		}
		if($localStorage.loginStatus == 1){
			var myId = $localStorage.myId;
			var link = Util.getHostURL()+"/api/v1/job/completed/"+myId+"/"+page;
			
			return $http.get(link, {cache:true, timeout:20000});
		}
	};
	this.getPendingClothes = function(page){
		if(page == 0){
			$ionicLoading.show({duration:20000, noBackdrop:true});
		}
		if($localStorage.loginStatus == 1){
			var myId = $localStorage.myId;
			var link = Util.getHostURL()+"/api/v1/job/pending/"+myId+"/"+page;
			
			return $http.get(link, {cache:true, timeout:20000});
		}
	};
});