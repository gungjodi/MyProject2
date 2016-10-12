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
    .controller('NewProjectCtrl',function ($scope,$window,$ionicScrollDelegate, $cordovaImagePicker,$ionicPlatform,$ionicActionSheet,$ionicGesture,LayoutService, $filter,$stateParams) {
        $scope.layouts= LayoutService.grids;
        $scope.isDrag=true;
        $scope.dev_width = $window.innerWidth;
        $scope.dev_height = $window.innerHeight;
        $scope.pickedImages=[

        ];

        var options = {
            maximumImagesCount: 10,
            quality: 100
        };


        $scope.getImages=function(){
            console.log('getImages');
            // var random = Math.floor((Math.random() * 4) + 1);
            // $scope.pickedImages.push({url:'img/'+random+'.jpg'});
            $cordovaImagePicker.getPictures(options).then(function (results) {
                // $scope.pickedImages=[];
                for (var i = 0; i < results.length; i++) {
                    $scope.pickedImages.push({url:results[i]});
                    console.log($scope.pickedImages[i].url);
                }
                if(!$scope.$$phase) {
                    $scope.$apply();
                }
            }, function(error) {
                console.log('Error getting images');
            });
        };

        $scope.onDoubleTap=function(index)
        {
            console.log('Double tap');
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
