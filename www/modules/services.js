angular.module('fafa')

 .service('Util', function(){
 	var hostURL = "http://localhost:8000";

 	this.getHostURL = function(){
 		return hostURL;
 	};
 });