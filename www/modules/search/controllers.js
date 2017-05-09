angular.module("fafa")
.controller('SearchCtrl', function($scope, $timeout, $q, $http){
	
	$scope.search = {};
	$scope.previous = null;
	$scope.current = new Date();
	
	$scope.searchUsername = function(){
		
		
		var query = $scope.search.username;
		$scope.previous = $scope.current;
		$scope.current = new Date();

		
		var prom = async(query);
		
		prom.then(function(res){
			console.log(res);
		}, function(err){});
		//sendQuery(query, $scope.previous, $scope.current);
		// $timeout(function () {
	        
	 //        var link = "http://localhost/web_design/auto/search_locals.php?name="+query;
	 //        console.log('New Query '+query);

		//     $prom = $http.get(link, {timeout:$scope.canceler.promise});
	        
	 //        $prom.success(function(res){
	        	
	 //        });
	 //        $prom.error(function(data, status, headers, config){
	        	
	 //        });
	 //    }, 3000);
	};
	function sendQuery(key, lastTime, currentTime){
		var difference = (currentTime.getTime() - lastTime.getTime())/1000;
		if(key.length == 1){
			console.log("Send Query for "+key);
		}
		else if(difference > 2){
			console.log("Send Query for "+key);
		}
		
	};

	function async(str){
		return $q(function(resolve, reject){
			if(str.length == 1){
				resolve("Quering db for "+str);
			}
			else if(true){

			}
		});
	};
})