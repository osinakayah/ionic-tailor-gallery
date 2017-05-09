angular.module("fafa")
.filter('likebtn', function(){
	return function(state){
		var icon = 'ion-ios-heart-outline';
		if(state == true){
			icon = 'ion-ios-heart';
		}
		return icon;
	};
})
.controller('CategoryCtrl', function($scope, $ionicModal, $state, $ionicHistory, $rootScope, $stateParams, ionicMaterialInk, ionicMaterialMotion, $ionicLoading, CategoryService, Util, $cordovaNetwork){

	$scope.designs = [];
	$scope.noData = false;
	$scope.noDesign = false;
	ionicMaterialInk.displayEffect();
	ionicMaterialMotion.ripple();
	$scope.page = 0;
	$scope.isMore = true;
	$scope.host = Util.getHostURL()+"/images/";
	$scope.likeDesign = function(id){
		for (var key in $scope.designs) {
		    var obj = $scope.designs[key];
		    if(obj.design_id == id){
		    	if(obj.isLike == true){
		    		CategoryService.likeThisDesign(id, 2);
			    	$scope.designs[key].isLike = false;
			    }
			    else{
			    	CategoryService.likeThisDesign(id, 1);
			    	$scope.designs[key].isLike = true;
			    }
		    }
		}
		
		
	};
	$scope.hasNext = function(){
		return $scope.isMore;
	};
	var cat = $stateParams.catId;
	$scope.catName = $stateParams.catName;

	$scope.doRefresh = function(){

	};
	$scope.loadMoreDesigns = function(){
		$scope.noData = false;
		$scope.noDesign = false;
		document.addEventListener("deviceready", function(){
			if($cordovaNetwork.isOnline() == true){
				$prom = CategoryService.design(cat, $scope.page);
				$prom.success(function(res){
					console.log(JSON.stringify(res));
					//add response status in json response
					$ionicLoading.hide();
					if(res.code == -1){
						//No design Found
						$scope.noDesign = true;
					}
					else{
						if($scope.page == 0){
						
						$scope.designs = res;
						console.log(JSON.stringify(res));
						$scope.$broadcast('scroll.infiniteScrollComplete');
						
						}
						else{
							$scope.designs = $scope.designs.concat(res);
							
							$scope.$broadcast('scroll.infiniteScrollComplete');
						}
						$scope.page++;
						if(res.length==0){
							$scope.isMore = false;
							
						}
					}
					
				});
				$prom.error(function(err){
					$scope.noData = true;
					console.log(JSON.stringify(err));
					$scope.isMore = false;
					//$scope.$broadcast('scroll.infiniteScrollComplete');
				});
			}
			else{
				$scope.isNoNetwork = true;
			}
		}, false);

	};
	
	$scope.loadMoreDesigns();
	$scope.selectTailor = function(name, num, addr, trust, id){
		CategoryService.setTailorName(name);
		CategoryService.setTailorNum(num);
		CategoryService.setTailorAddr(addr);
		CategoryService.setTailorTrust(trust);
		$state.go('tailor', {tailorId:id});
	};
	$rootScope.$on('$cordovaNetwork:online', function(event, networkState){
      var onlineState = networkState;
      $scope.isNoNetwork = false;
      $scope.loadMoreDesigns();
    });
    $rootScope.$on('$cordovaNetwork:offline', function(event, networkState){
        var onlineState = networkState;
        $scope.isNoNetwork = true;
        CategoryService.cancelAllRequest();
    });


    $ionicModal.fromTemplateUrl('modules/category/image_fullview.html', {
      scope: $scope,
      animation:'slide-in-up'
   }).then(function(modal) {
      $scope.modal = modal;

   });

    $scope.openFullViewModal = function() {
      $scope.modal.show();
   };

   $scope.closeFullViewModal = function() {
      $scope.modal.hide();
   };

   //Cleanup the modal when we're done with it!
   $scope.$on('$destroy', function() {
      $scope.modal.remove();
   });

   $scope.showFullView = function(image){
   		$scope.imageToShow = image;
   		$scope.openFullViewModal();
   };

   $scope.goBack = function () {
	 $ionicHistory.goBack(-1);
   };
});