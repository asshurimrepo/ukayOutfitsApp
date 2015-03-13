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

    .controller('DashProductCtrl', function ($scope, UpdatedList, $stateParams, $timeout) {
        $scope.item = UpdatedList.getItem($stateParams.productId);

        console.log($scope.item.imgSequence);

        $timeout(function () {
            $("#image" + $scope.item.id).reel({
                images: $scope.item.imgSequence,
                opening: 1,
                delay: 5,
                speed: .2
            });
        });
    })

    .controller('BestSellingCtrl', function ($scope, BestSelling, ActionSheet) {
        $scope.lists = [];
        BestSelling.get($scope);

        $scope.showOpts = function() {
            ActionSheet.show($scope);
        };

    })

    .controller('AccountCtrl', function ($scope) {
        $scope.settings = {
            enableFriends: true
        };
    })

    .controller('ProductCtrl', function ($scope, $stateParams, BestSelling, $timeout) {
        $scope.item = BestSelling.getItem($stateParams.productId);

        $timeout(function () {
            $("#image" + $scope.item.id).reel({
                images: $scope.item.imgSequence,
                opening: 1,
                delay: 5,
                speed: .2
            });
        });
    })

    .controller('SearchCtrl', function ($scope, $ionicModal, Search, ActionSheet, $timeout) {

        $scope.items = {};
        $scope.lists = {};

        $scope.status = {
            tapToRefresh:false,
            loading: true
        };

        $scope.showOpts = function() {
            ActionSheet.show($scope);
        };

        $ionicModal.fromTemplateUrl('templates/modal-search-result.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.modal = modal;
        });

        $scope.beginSearch = function(){
            Search.get($scope);
            $scope.lists = [];
            $scope.status.loading = true;
            $scope.modal.show();
        };

        $scope.reload = function(){
            $scope.status.loading = true;
            $scope.status.tapToRefresh = false;
        };

        $scope.closeResult = function(){
            $timeout(function(){
                $scope.modal.hide();
            }, 400);
        };
    })
    .controller('SearchProductCtrl', function ($scope, $stateParams, Search, $timeout) {
        $scope.item = Search.getItem($stateParams.productId);

        $timeout(function () {
            $("#image" + $scope.item.id).reel({
                images: $scope.item.imgSequence,
                opening: 1,
                delay: 5,
                speed: .2
            });
        });
    })

;

