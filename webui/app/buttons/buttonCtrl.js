(function (app) {
    'use strict';

    app.controller('buttonCtrl', function($scope, repository, meta) {
          $scope.loading = true;
          var _meta = angular.copy(meta.button);
          _meta.sequence.forEach(function(m) {
              m.p.push($scope.idx);
          });
          repository.get(_meta).then(function(d, r) {
        	 $scope.obj = d;
             $scope.$watchCollection('obj', function(newValue, oldValue) {
                if (oldValue && newValue) {
                    for (var prop in $scope.obj) {
                        if(newValue[prop] !== oldValue[prop]) {
                            repository.set(_meta, prop, newValue[prop]);
                    }
             }               
            }
            
            });
            $scope.loading = false;
            if (!$scope.$$phase) {
                $scope.$apply();
            }
        });
	});
	
})(angular.module('app'));