angular.module('starter.services', [])

    .factory('BestSelling', function ($http) {
        var items = [];

        this.get = function ($scope) {
            var api = 'http://preview.iboostme.com/miruhssa/ukay/public/api/product/best-selling';
            $http.get(api)
                .success(function (result) {
                    $scope.lists = result.products;
                    items = result.products;
                }).error(function () {
                    alert('Failed to initialized data. It seems you are not connected to the internet.');
                });
        };

        this.getItem = function (id) {
            for(var i = 0; i<items.length; i++){
                if(id == items[i].id){
                    return items[i];
                }
            }

            return null;
        };

        return this;
    })

    .factory('UpdatedList', function ($http, $ionicLoading) {
        var items = [];

        this.get = function ($scope) {
            $http.get("http://preview.iboostme.com/miruhssa/ukay/public/api/product/new-arrivals")
                .success(function (data) {
                    $scope.lists = data.products;
                    items = data.products;
                    $ionicLoading.hide();
                    $scope.$broadcast('scroll.refreshComplete');
                }).error(function () {
                    $ionicLoading.hide();
                    $scope.$broadcast('scroll.refreshComplete');
                    alert('Failed to initialized data. It seems you are not connected to the internet.');
                });
        };

        this.getItem = function(id){
            for(var i = 0; i<items.length; i++){
                if(id == items[i].id){
                    return items[i];
                }
            }

            return null;
        };


        return this;
    })
;
