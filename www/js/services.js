angular.module('starter.services', [])

    //ActionSheet
    .factory('ActionSheet', function($ionicActionSheet, $timeout){

        this.show = function($scope){

            var hideSheet = $ionicActionSheet.show({
                buttons: [
                    { text: '<i class="icon ion-bag"></i> Add to bag' },
                    { text: '<i class="icon ion-heart"></i> Add to wishlist' }
                ],

                titleText: 'What should you do?',
                cancelText: 'Cancel',

                buttonClicked: function(index) {
                    return true;
                }
            });

            $timeout(function() {
                hideSheet();
            }, 5000);
        };

        return this;
    })

    //BestSelling
    .factory('BestSelling', function ($http) {
        var items = [];

        this.get = function ($scope) {
            var api = 'http://preview.iboostme.com/miruhssa/ukay/public/api/product/product-status';
            $http.get(api, {status: 'feature'})
                .success(function (result) {
                    $scope.lists = result.products;
                    items = result.products;
                }).error(function () {
                    alert('Failed to initialized data. It seems you are not connected to the internet.');
                });
        };

        this.getItem = function (id) {
            for (var i = 0; i < items.length; i++) {
                if (id == items[i].id) {
                    return items[i];
                }
            }

            return null;
        };

        return this;
    })


    //UpdatedLists
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

        this.getItem = function (id) {
            for (var i = 0; i < items.length; i++) {
                if (id == items[i].id) {
                    return items[i];
                }
            }

            return null;
        };


        return this;
    })

    /*Search*/
    .factory('Search', function ($http) {
        var api = "http://preview.iboostme.com/miruhssa/ukay/public/api/product/search/search";
        var items = [];

        this.get = function ($scope) {

            $http({
                url: api,
                method: "GET",
                params: $scope.items
            }).success(function (data) {
                $scope.lists = data;
                items = data;
                $scope.status.loading = false;
                $scope.status.tapToRefresh = false;
            }).error(function () {
                $scope.tapToRefresh = true;
            });

        };

        this.getItem = function (id) {
            for (var i = 0; i < items.length; i++) {
                if (id == items[i].id) {
                    return items[i];
                }
            }

            return null;
        };

        return this;
    })
;
