angular.module('fafa')
.factory('UserService', function($resource){
	return $resource('http://fafa.owngoal.com.ng/index.php/User');
})

 // .service('UserService', function($http, Util){
 // 	this.register = function(param){
 // 		var link = Util.getHostURL()+"/api/v1/user/register";
 // 		$p = $http.post(link, param);

 // 		$p.success(function(res){
 // 			console.log(JSON.stringify(res));
 // 		});
 // 		$p.error(function(err){
 // 			console.log(JSON.stringify(err));
 // 		});


 // 	};
 // });