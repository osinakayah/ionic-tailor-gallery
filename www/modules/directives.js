angular.module('fafa')
.directive('design', function(){
	var directive = {};
	directive.restrict = "E";
	directive.template = '<a class="item item-thumbnail-left" href="#"><img src="img/img1.jpg"><span class="item-note">&#x20a6;1,000</span><h2>{{design.designer}}</h2><p>Nine Inch Nails</p></a>';
	directive.scope = {
	 	design:'=name'
	 }
	directive.compile = function(elem, attr){
		var linkFunction = function($scope, elem, attr){
			elem.html('<a class="item item-thumbnail-left" href="#"><img src="img/img1.jpg"><span class="item-note">&#x20a6;1,000</span><h2>'+$scope.design.designer+'</h2><p>Nine Inch Nails</p></a>');
		};
		return linkFunction;
	};


	 
	 return directive;
})