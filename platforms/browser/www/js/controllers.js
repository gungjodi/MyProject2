angular.module('starter.controllers', ['ngCordova'])
    .controller('AppCtrl', function($scope, $ionicModal, $timeout) {

        // With the new view caching in Ionic, Controllers are only called
        // when they are recreated or on app start, instead of every page change.
        // To listen for when this page is active (for example, to refresh data),
        // listen for the $ionicView.enter event:
        //$scope.$on('$ionicView.enter', function(e) {
        //});

        // Form data for the login modal
        $scope.loginData = {};

        // Create the login modal that we will use later
        $ionicModal.fromTemplateUrl('templates/login.html', {
            scope: $scope
        }).then(function(modal) {
            $scope.modal = modal;
        });

        // Triggered in the login modal to close it
        $scope.closeLogin = function() {
            $scope.modal.hide();
        };

        // Open the login modal
        $scope.login = function() {
            $scope.modal.show();
        };

        // Perform the login action when the user submits the login form
        $scope.doLogin = function() {
            console.log('Doing login', $scope.loginData);

        // Simulate a login delay. Remove this and replace with your login
        // code if using a login system
        $timeout(function() {
            $scope.closeLogin();
            }, 1000);
        };
    })
    .controller('PlaylistsCtrl', function($scope,PlaylistService) {
        $scope.playlists = PlaylistService.playlists;
    })
    .controller('PlaylistCtrl', function($scope, $stateParams,PlaylistService,$filter) {
        var object_by_id = $filter('filter')(PlaylistService.playlists, {id: $stateParams.playlistId })[0];
        console.log(object_by_id);
        $scope.playlist=object_by_id;
    })
    .controller('NewProjectCtrl',function ($scope, $cordovaImagePicker,$ionicPlatform,$ionicActionSheet,$ionicGesture,LayoutService, $filter,$stateParams) {
        $scope.layouts= LayoutService.grids;

        var object_by_id = $filter('filter')(LayoutService.grids, {id: $stateParams.layoutId })[0];
        console.log(object_by_id);
        $scope.layout_selected=object_by_id;

        var options = {
            maximumImagesCount: 4,
            quality: 100
        };
        $scope.pickedImages=[
            'img/1.jpg',
            'img/2.jpg',
            'img/3.jpg',
            'img/4.jpg',
        ];
        $scope.getImages=function(){
            console.log('getImages');
            $cordovaImagePicker.getPictures(options).then(function (results) {
                $scope.pickedImages=[];
                for (var i = 0; i < results.length; i++) {
                    console.log('Image URI: ' + results[i]);
                    $scope.pickedImages.push(results[i]);
                }
            }, function(error) {
                console.log('Error getting images');
            });
        };
        $scope.onHold=function(index)
        {
            console.log('HOLD');
            // Show the action sheet
            var hideSheet = $ionicActionSheet.show({
                destructiveText: 'Delete',
                cancelText: 'Cancel',
                cancel: function() {
                    console.log("Cancel");
                    return true;
                },
                destructiveButtonClicked: function() {
                    console.log("Delete "+index);
                    $scope.pickedImages.splice(index,1);
                    return true;
                }
            });
        }
    });
