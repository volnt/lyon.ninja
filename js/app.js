var app = angular.module("app", []);

app.filter("shuffle", function() {
    return (function(array) {
	/* http://stackoverflow.com/a/12646864/2437219 */
	for (var i = array.length - 1; i > 0; i--) {
	    var j = Math.floor(Math.random() * (i + 1));
	    var temp = array[i];
	    array[i] = array[j];
	    array[j] = temp;
	}
	return array;
    });
});

app.controller("IndexCtrl", function ($scope, $http) {
    (function () {
	$scope.developers = [];
	$scope.error = false;

	$http.get("developers.json").success(function (response) {
	    $scope.developers = response.developers;
	}).error(function (response) {
	    $scope.error = true;
	});
    }());
});
