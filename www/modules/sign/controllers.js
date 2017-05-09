angular.module("fafa")
.controller('RegisterCtrl', function($scope, $ionicLoading, $localStorage, $ionicPopup, $ionicPush, $cordovaToast, $cordovaNetwork, ionicMaterialInk, ionicMaterialMotion, $timeout, RegisterService, Util, $state){
    $timeout(function() {
        ionicMaterialMotion.fadeSlideInRight({
            startVelocity: 3000
        });
    }, 700);

    $timeout(function() {
        ionicMaterialMotion.slideUp({
            selector: '.slide-up'
        });
    }, 300);
    
    ionicMaterialInk.displayEffect();
    ionicMaterialMotion.ripple();
    
    $ionicPush.register().then(function(t) {
      return $ionicPush.saveToken(t);
    }).then(function(t) {
      $localStorage.token = t.token;
      console.log('Token saved:', t.token);
    });
     
    $scope.registerData = {};
    $scope.registerData.token = $localStorage.token;
    console.log($localStorage.token);
    $scope.doRegister = function(){
        $scope.registerData.not = false;
        $scope.notMsg = 'Username or email is in use';
        document.addEventListener("deviceready", function(){
            if($cordovaNetwork.isOnline() == true){
                $prom = RegisterService.register($scope.registerData);
                $prom.success(function(res){
                    console.log(JSON.stringify(res));
                    $ionicLoading.hide();
                    if(res.code == 1){
                        $cordovaToast.show("Login Successfully", 'short', 'bottom');
                        $localStorage.loginStatus = 1;
                        $localStorage.myId = res.my_id;
                        $localStorage.state = res.state;
                        $localStorage.local = res.local;
                        $state.go('app.profile');
                    }
                    else if(res.code == 0){
                        $scope.registerData.not = true;
                        $scope.notMsg = 'Username or email is in use';
                    }
                });
                $prom.error(function(err){
                    $ionicLoading.hide();
                    $scope.registerData.not = true;
                    $scope.notMsg = 'Ops, an error occured';
                });
            }
        }, false);
    };
    $scope.loadLocals = function(){
        console.log($scope.registerData);
        document.addEventListener("deviceready", function(){
            if($cordovaNetwork.isOnline() == true){
                $prom = RegisterService.loadCities($scope.registerData.state);
                $prom.success(function(res){
                    $scope.locals = res;
                    $ionicLoading.hide();
                });
                $prom.error(function(err){
                    $ionicLoading.hide();
                });
            }
            else{
                var alertPopup = $ionicPopup.alert({
                    title: 'Error',
                    template: 'Check Network Connection'
                 });
            }
        }, false);
    };
    $scope.loadStates = function(){
        document.addEventListener("deviceready", function(){
             if($cordovaNetwork.isOnline() == true){
                 $prom = RegisterService.loadStates();
                 $prom.success(function(res){
                    $ionicLoading.hide();
                    $scope.states = res;
                    $localStorage.loginStatus = 1;
                    $localStorage.myId = res.my_id;

                 });
                 $prom.error(function(res){

                 });
             }
             else{
                 var alertPopup = $ionicPopup.alert({
                     title: 'Error',
                     template: 'Check Network Connection'
                 });
             }
         }, false);
    };
    $scope.loadStates();
    $scope.states = [];
})
.controller('ProfileCtrl', function($scope, $localStorage, $state, ionicMaterialInk, $state, $ionicHistory,ionicMaterialMotion, $timeout, Util, $ionicPopover){
    $timeout(function() {
        ionicMaterialMotion.fadeSlideInRight({
            startVelocity: 3000
        });
    }, 700);

    $timeout(function() {
        ionicMaterialMotion.slideUp({
            selector: '.slide-up'
        });
    }, 300);
    if($localStorage.loginStatus != 1){
        $state.go('login');
    }
    ionicMaterialInk.displayEffect();
    ionicMaterialMotion.ripple();

    $ionicPopover.fromTemplateUrl('modules/sign/mypopover.html', {scope:$scope}).then(function(popover){
        $scope.popover = popover;
    });

    $scope.openPopover = function($event){
        $scope.popover.show($event);
    };

    $scope.closePopover = function(){
        $scope.popover.hide();
    };

    $scope.logout = function () {
        $localStorage.loginStatus = 0;
        $ionicHistory.clearHistory();
        $ionicHistory.clearCache();
        $state.go('app.dash');
    };
})
.controller('LoginCtrl', function($scope, $cordovaNetwork, $ionicPush, $ionicPopup, $ionicLoading, $http, $state, $localStorage, ionicMaterialInk, ionicMaterialMotion, $timeout, LoginService, Util){
	$timeout(function() {
        ionicMaterialMotion.fadeSlideInRight({
            startVelocity: 3000
        });
    }, 700);

    $timeout(function() {
        ionicMaterialMotion.slideUp({
            selector: '.slide-up'
        });
    }, 200);

    $ionicPush.register().then(function(t) {
      return $ionicPush.saveToken(t);
    }).then(function(t) {
      $localStorage.token = t.token;
      console.log('Token saved:', t.token);
    });

    $scope.loginData = {};
    $scope.loginData.not = false;
    $scope.doLogin = function(){
        console.log(JSON.stringify($scope.loginData));
        $scope.loginData.not = false;
        $scope.loginData.token = $localStorage.token;
        document.addEventListener("deviceready", function(){
            if($cordovaNetwork.isOnline() == true){
                $prom = LoginService.login($scope.loginData);
                $prom.success(function(res){
                    console.log(JSON.stringify(res));
                    $ionicLoading.hide();
                    if(res.code == 1){
                        $localStorage.loginStatus = 1;
                        $localStorage.myId = res.my_id;
                        $localStorage.state = res.state;
                        $localStorage.local = res.local;
                        $state.go('app.dash');
                    }
                    else if(res.code == 0){
                        $scope.loginData.not = true;
                        $scope.notMsg = "Wrong Username or Password";
                    }
                    else{
                        $scope.loginData.not = true;
                        $scope.notMsg = "Ops an error just occured";
                    }
                });
                $prom.error(function(err){
                    $ionicLoading.hide();
                    $scope.loginData.not = true;
                    $scope.notMsg = "Ops an error just occured";
                });
            }
            else{
                var alertPopup = $ionicPopup.alert({
                    title: 'Error',
                    template: 'Check Network Connection'
                });
            }
        }, false);
    }; 
	ionicMaterialInk.displayEffect();
	ionicMaterialMotion.ripple();

    $scope.toRegister = function(){
        $state.go('register');
    }
});