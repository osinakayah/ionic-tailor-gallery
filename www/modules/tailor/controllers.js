angular.module("fafa")
.controller('TailorCtrl', function($scope, ionicMaterialInk, ionicMaterialMotion, TailorService, $cordovaNetwork, CategoryService, $stateParams, $rootScope, Util, $ionicModal){
	$scope.host = Util.getHostURL()+"/images/";
	$scope.designs = [];
	$scope.isMore = true;
	$scope.page = 0;
	ionicMaterialInk.displayEffect();
	ionicMaterialMotion.ripple();
	$scope.designer = {};
	$scope.designer.name = CategoryService.getTailorName();
	$scope.designer.num = CategoryService.getTailorNum();
	$scope.designer.addr = CategoryService.getTailorAddr();
	$scope.designer.trust = CategoryService.getTailorTrust();
	
	$scope.likeDesigner = function(){
		TailorService.likeDesigner();
	};


	$scope.hasNext = function(){
		return $scope.isMore;
	};
	var designerId = $stateParams.tailorId;
	console.log(designerId);
	$scope.loadMoreDesigns = function(){
		document.addEventListener("deviceready", function(){
			if($cordovaNetwork.isOnline() == true){
				$prom = TailorService.designerDesigns(designerId, $scope.page);
				$prom.success(function(res){
					//console.log(JSON.stringify(res));
					if($scope.page == 0){
						$scope.designs = res;
					}
					else{
						$scope.designs = $scope.designs.concat(res);
					}
					if(res.length==0){
						$scope.isMore = false;
					}
					$scope.$broadcast('scroll.infiniteScrollComplete');
					$scope.page++;
				});
				$prom.error(function(err){

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
      $scope.loadMoreDesigns();
    });
    
	$scope.loadMoreDesigns();

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
});