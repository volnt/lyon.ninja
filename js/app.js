var app = angular.module("app", []);

app.filter("filterByTags", function () {
  return (function(array, tags) {
    var filtered = [];

    if (tags === undefined || !tags || tags.length === 0) {
      return array;
    }
    for (var i = 0; i < array.length; i++) {
      if (array[i].tags) {
        var valid = true;

        for (var ti = 0; ti < tags.length; ti++) {
          if (array[i].tags.indexOf(tags[ti]) === -1) {
            valid = false;
            break;
          }
        }
        if (valid) {
          filtered.push(array[i]);
        }
      }
    }
    return filtered;
  });
});

app.controller("IndexCtrl", function ($scope, $http) {
  var arrayToUpper = function (array) {
    var upper = [];
    
    for (var i = 0; i < array.length; i++) {
      upper.push(array[i].toUpperCase());
    }
    return upper;
  };

  var sanitizeTag = function (tag) {
    if (tag.length > 1) {
      if (tag[0] !== '#') {
        tag = '#' + tag;
      }
    } else {
      tag = '#';
    }
    return tag.toUpperCase();
  };
  
  var shuffle = function (array) {
    /* http://stackoverflow.com/a/12646864/2437219 */
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  };

  $scope.toggleTag = function (tag) {
    tag = sanitizeTag(tag);
    var index = $scope.tags.indexOf(tag);

    if (index !== -1) {
      $scope.tags.splice(index, 1);
    } else {
      $scope.tags.push(tag);
    }
  };
  
  (function () {
    $scope.developers = [];
    $scope.error = false;
    $scope.tags = [];

    $http.get("developers.json").success(function (response) {
      $scope.developers = shuffle(response.developers);
      for (var i = 0; i < $scope.developers.length; i++) {
        if ($scope.developers[i].tags) {
          $scope.developers[i].tags = arrayToUpper($scope.developers[i].tags);
        }
      }
    }).error(function (response) {
      $scope.error = true;
    });
  }());
});
