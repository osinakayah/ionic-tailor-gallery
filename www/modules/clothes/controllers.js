angular.module("fafa")
.controller('PendingClothCtrl', function($scope, $ionicLoading, ionicMaterialInk, $rootScope, ionicMaterialMotion, ClothService, $cordovaNetwork){
	$scope.clothes = [];
	$scope.isMore = true;
	$scope.page = 0;
    $scope.isNoCloth = false;
    $scope.isError = false;
	$scope.hasNext = function(){
		return $scope.isMore;
	};

	$scope.loadMyClothes = function(){
        $scope.isNoCloth = false;
        $scope.isError = false;
		document.addEventListener("deviceready", function(){
			if($cordovaNetwork.isOnline() == true){
				$prom = ClothService.getPendingClothes($scope.page);
				$prom.success(function(res){
					$ionicLoading.hide();
					if(res.length == 0){
						$scope.isNoCloth = true;
					}
					else{
                        if($scope.page == 0){
                            $scope.clothes = res;
                            $ionicLoading.hide();
                        }
                        else{
                            $scope.clothes = $scope.clothes.concat(res);
                        }
                        if(res.length==0){
                            $scope.isMore = false;
                        }

                        $scope.page++;
					}

				});
				$prom.error(function(err){
					$ionicLoading.hide();
					$scope.isError = true;
				});
			}
			else{
				$scope.isNoNetwork = true;
			}
		}, false);
	};
	$rootScope.$on('$cordovaNetwork:online', function(event, networkState){
      var onlineState = networkState;
      $scope.isNoNetwork = false;
      $scope.loadMyClothes();
    });
    
	$scope.loadMyClothes();
})
.controller('ClothCtrl', function($scope, ClothService, $rootScope, $cordovaNetwork, $ionicLoading){
	$scope.isNoCloth = false;
	$scope.clothes = [];
	$scope.isMore = true;
	$scope.page = 0;
    $scope.isError = false;
	$scope.hasNext = function(){
		return $scope.isMore;
	};

	$scope.loadMyClothes = function(){
        $scope.isNoCloth = false;
        $scope.isError = false;
		document.addEventListener("deviceready", function(){
			if($cordovaNetwork.isOnline() == true){
				$prom = ClothService.getMyClothes($scope.page);
				$prom.success(function(res){
                    $ionicLoading.hide();

					if(res.length == 0){
						//no clothes
                        $scope.isNoCloth = true;
					}
					else{
                        if($scope.page == 0){
                            $scope.clothes = res;
                            $ionicLoading.hide();
                        }
                        else{
                            $scope.clothes = $scope.clothes.concat(res);
                        }
                        if(res.length==0){
                            $scope.isMore = false;
                        }

                        $scope.page++;
					}
				});
				$prom.error(function(err){
					$ionicLoading.hide();
					$scope.isError = true;
					console.log(JSON.stringify(err));
				});
			}
			else{
				$scope.isNoNetwork = true;
			}
		}, false);
	};
	$rootScope.$on('$cordovaNetwork:online', function(event, networkState){
      var onlineState = networkState;
      $scope.isNoNetwork = false;
      $scope.loadMyClothes();
    });
	$scope.loadMyClothes();

});