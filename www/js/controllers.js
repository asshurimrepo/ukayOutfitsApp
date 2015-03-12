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

    .controller('BestSellingCtrl', function ($scope, BestSelling, $ionicActionSheet, $timeout) {
        $scope.lists = [];
        BestSelling.get($scope);

        $scope.showOpts = function() {
            // Show the action sheet
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

    .controller('SearchCtrl', function ($scope, $ionicModal, Search) {

        $scope.items = {};
        $scope.lists = {};

        $scope.status = {
            tapToRefresh:false,
            loading: true
        };

        $ionicModal.fromTemplateUrl('templates/modal-search-result.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.modal = modal;
        });

        $scope.beginSearch = function(){
            Search.get($scope);
            $scope.modal.show();
        };

        $scope.reload = function(){

        };

        $scope.closeResult = function(){
            $scope.modal.hide();
        };
    });

