angular.module('fafa')

 .service('Util', function(){
 	var hostURL = "https://fafa-osindex.c9users.io/public";

 	this.getHostURL = function(){
 		return hostURL;
 	};

 	var islogin = false;

 	this.setIsLogin = function(stat){
 		this.islogin = stat;
 	};
 	this.getIsLogin = function(){
 		return this.islogin;
 	};
 });