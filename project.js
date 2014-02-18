/*
######### FUNCIONANDO OK!!! ############

angular.module('myApp', ['ngResource'])
.factory('AngularData', function ($resource) {
    return $resource('http://localhost/testes/angular/api.php/dir.log/:id/', {
        "id" : "@id"
    })
})

.controller('MyCtrl1', ['$scope', 'AngularData', function ($scope, AngularData) {
    $scope.myData = {
        linhas : {},
        current : null,
        sort : 'id',
        listDirecton : 'desc'
    };

    $scope.setCurrentIssue = function (number) {
        AngularData.get({
            "id" : number
        }, function (data) {
            $scope.myData.current = data;
        });
    };

    $scope.showAll = function (){
        $scope.myData.current = null;
    };

    $scope.setSort = function(sort){
        AngularData.query({
            "by" : sort
        }, function(data){
            $scope.myData.linhas = data;
        })
    }

    $scope.sortClass = function (column) {
        return column == $scope.myData.sort && 'sort-' + $scope.myData.listDirection;
    };

    $scope.setSort = function (sort) {
        var oldSort = angular.copy($scope.myData.sort);
        $scope.myData.sort = sort;
        if (oldSort == sort) {
            $scope.setDirection($scope.myData.listDirection == 'desc' ? 'asc' : 'desc');
        } else {
            $scope.setDirection('desc');
        }
    };   

    $scope.setIssueList = function () {
        AngularData.query({
            by: $scope.myData.sort,
            order: $scope.myData.listDirection
        }, function (data) {
            $scope.myData.linhas = data;
        });
    };

    $scope.setDirection = function (direction) {
        $scope.myData.listDirection = direction;
        $scope.setIssueList();
    };     


    $scope.setIssueList();
}]);
*/

angular.module('myApp', ['ngResource', 'ngRoute'])
.factory('AngularData', function ($resource) {
    return $resource('http://localhost/testes/angular/api.php/dir.log/:id', {
        "id" : "@id"
    }, {
        update : {
            method : "PUT"
        },
        save : {
            method : "POST"
        },
        remove: {
            method:'DELETE'
        }
    })
})

.config(function($routeProvider) {
  $routeProvider
  .when('/', {
      controller:'MyCtrl1',
      templateUrl:'index.html'
  })
  .when('/edit/:id', {
      controller:'EditCtrl',
      templateUrl:'detail.html'
  })
  .when('/new', {
      controller:'CreateCtrl',
      templateUrl:'detail.html'
  })
  .otherwise({
      redirectTo:'/',
      templateUrl:'index.html'
  });
})

.controller('CreateCtrl', ['$scope', 'AngularData', '$location', function($scope, AngularData, $location) {
    $scope.myData = {
        linhas : {}
    }

    $scope.save = function() {
        AngularData.save({
            action: $scope.myData.linhas.action,
            text: $scope.myData.linhas.text
        });
        $location.path('/');
    };
}])

.controller('EditCtrl', ['$scope', 'AngularData', '$location', '$routeParams', '$http', function($scope, AngularData, $location, $routeParams, $http) {
    $scope.myData = {
        linhas : {}
    }

    AngularData.get({
        "id" : $routeParams.id
    }, function (data) {
        $scope.myData.linhas = data;
    });

    $scope.destroy = function() {
        if (confirm("Voce deseja realmente deletar?")){
            AngularData.remove({ 
                "id" : $routeParams.id 
            });
            $location.path('/');
        }
    };

    $scope.save = function() {
        AngularData.update({
            "id" : $routeParams.id,
            action: $scope.myData.linhas.action,
            text: $scope.myData.linhas.text,
        });
        $location.path('/');
    };

}])

.controller('MyCtrl1', ['$scope', 'AngularData', function ($scope, AngularData) {
    $scope.myData = {
        linhas : {},
        current : null,
        sort : 'id',
        listDirecton : 'desc'
    };

    $scope.setCurrentIssue = function (number) {
        AngularData.get({
            "id" : number
        }, function (data) {
            $scope.myData.current = data;
        });
    };

    $scope.showAll = function (){
        $scope.myData.current = null;
    };

    $scope.setSort = function(sort){
        AngularData.query({
            "by" : sort
        }, function(data){
            $scope.myData.linhas = data;
        })
    }

    $scope.sortClass = function (column) {
        return column == $scope.myData.sort && 'sort-' + $scope.myData.listDirection;
    };

    $scope.setSort = function (sort) {
        var oldSort = angular.copy($scope.myData.sort);
        $scope.myData.sort = sort;
        if (oldSort == sort) {
            $scope.setDirection($scope.myData.listDirection == 'desc' ? 'asc' : 'desc');
        } else {
            $scope.setDirection('desc');
        }
    };   

    $scope.setIssueList = function () {
        AngularData.query({
            by: $scope.myData.sort,
            order: $scope.myData.listDirection
        }, function (data) {
            $scope.myData.linhas = data;
        });
    };

    $scope.setDirection = function (direction) {
        $scope.myData.listDirection = direction;
        $scope.setIssueList();
    };     


    $scope.setIssueList();
}]);
