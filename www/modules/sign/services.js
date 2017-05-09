angular.module('fafa')
.service('RegisterService', function($http, Util, $ionicLoading){
	this.loadStates = function(){
		var link = Util.getHostURL()+"/api/v1/states";
        
        $ionicLoading.show({duration:20000, noBackdrop:true});
        return $http.get(link);
	};
	this.loadCities = function(stateId){
		var link = Util.getHostURL()+"/api/v1/cities/"+stateId;
        $ionicLoading.show({duration:20000, noBackdrop:true});
        return $http.get(link);
	};
	this.register = function(param){
		var link = Util.getHostURL()+"/api/v1/user";
		console.log(link);
		console.log(JSON.stringify(param));
        $ionicLoading.show({duration:20000, noBackdrop:true});
        return $http.post(link, param);
	};
})
.service('ProfileService', function(){})
.service('LoginService', function($http, Util, $ionicLoading){
	this.login = function(param){
		var link = Util.getHostURL()+"/api/v1/user/login";
        
        $ionicLoading.show({duration:20000, noBackdrop:true});
        return $http.post(link, param);
	}
})

