angular.module('starter.controllers', [])

    .constant('$ionicLoadingConfig', {
        template: '<ion-spinner></ion-spinner> <br> Initializing App...'
    })

    .controller('DashCtrl', function ($scope, UpdatedList, $ionicLoading) {
        $scope.lists = [];

        $scope.getNewList = function () {
            UpdatedList.get($scope);
        };

        /*Init*/
        if ($scope.lists.length > 0) {
            return;
        }

        $ionicLoading.show();
        $scope.getNewList();
    })

    .controller('DashProductCtrl', function($scope, UpdatedList, $stateParams){
        $scope.item = UpdatedList.getItem($stateParams.productId);
    })

    .controller('BestSellingCtrl', function ($scope, BestSelling) {
        $scope.lists = [];
        BestSelling.get($scope);
    })

    .controller('AccountCtrl', function ($scope) {
        $scope.settings = {
            enableFriends: true
        };
    })

    .controller('ProductCtrl', function($scope, $stateParams, BestSelling){
        $scope.item = BestSelling.getItem($stateParams.productId);
    })

    .controller('SearchCtrl', function ($scope) {
    });

