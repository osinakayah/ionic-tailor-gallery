angular.module('fafa')

.service('CategoryService', function(Util, $state, $localStorage, $http, $cordovaNetwork, $ionicLoading, $q){
	var canceler;
	var name;
	var num;
	var addr;
	var trust;
	this.design = function(cat, page){
        this.canceler = $q.defer();
		if(page == 0){
			$ionicLoading.show({duration:20000, noBackdrop:true});
		}
		var link = Util.getHostURL()+"/api/v1/design/"+cat+"/"+page;
		if(typeof($localStorage.state) != 'undefined' && typeof($localStorage.local) != 'undefined'){
			var state = $localStorage.state;
			var local = $localStorage.local;
			var myId = $localStorage.myId;
			var link = Util.getHostURL()+"/api/v1/design/"+cat+"/"+page+"/"+state+"/"+local+"/"+myId;
		}
		
		console.log(link);
		//return $http.get(link, {cache:true, timeout:20000});
        return $http.get(link, {cache:true, timeout:this.canceler});
	};

	this.likeThisDesign = function(id, op){
		if($localStorage.loginStatus != 1){
			$state.go('login');
		}
		else{
			if(op == 2){
				var myId = $localStorage.myId;
				var link = Util.getHostURL()+"/api/v1/designlike/like/"+myId+"/"+id;
				console.log(link);
				$prm = $http.delete(link, {cache:false, timeout:20000});
				$prm.success(function(res){
					console.log(2);
				});
			}
			else{
				var myId = $localStorage.myId;
				var link = Util.getHostURL()+"/api/v1/designlike/like/"+myId+"/"+id;
				console.log(link);
				$prm = $http.get(link, {cache:false, timeout:20000});
				$prm.success(function(res){
					console.log(1);
				});
			}
			
		}
	};

	this.setTailorName = function(name){
		this.name = name;
	};
	this.setTailorNum = function(num){
		this.num = num;
	};
	this.setTailorAddr = function(addr){
		this.addr = addr;
	};
	this.setTailorTrust = function(trust){
		this.trust = trust;
	};
	

	this.getTailorName = function(){
		return this.name;
	};

	this.getTailorNum = function(){
		return this.num
	};
	this.getTailorAddr = function(){
		return this.addr;
	};

	this.getTailorTrust = function(){
		return this.trust;
	};

	this.cancelAllRequest = function () {
		this.canceler.resolve();
    };
});