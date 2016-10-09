angular.module('starter.controllers', ['ngCordova','ngDraggable'])
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
    .controller('NewProjectCtrl',function ($scope,$window, $cordovaImagePicker,$ionicPlatform,$ionicActionSheet,$ionicGesture,LayoutService, $filter,$stateParams) {
        $scope.layouts= LayoutService.grids;

        $scope.dev_width = $window.innerWidth;
        $scope.dev_height = $window.innerHeight;

        var object_by_id = $filter('filter')(LayoutService.grids, {id: $stateParams.layoutId })[0];
        console.log(object_by_id);
        $scope.layout_selected=object_by_id;

        // $scope.pickedImages=[
        //     {url:'img/1.jpg'},
        //     {url:'img/2.jpg'},
        //     {url:'img/3.jpg'},
        //     {url:'img/4.jpg'},
        // ];

        if($stateParams.layoutId==1)
        {
            $scope.pickedImages=[
                {url:'img/1.jpg'},
            ];
            $scope.imagecount=1;
        }
        else if($stateParams.layoutId==2||$stateParams.layoutId==3)
        {
            $scope.pickedImages=[
                {url:'img/1.jpg'},
                {url:'img/2.jpg'},
            ];
            $scope.imagecount=2;
        }
        else
        {
            $scope.pickedImages=[
                {url:'img/1.jpg'},
                {url:'img/2.jpg'},
                {url:'img/3.jpg'},
                {url:'img/4.jpg'},
            ];
            $scope.imagecount=4;
        }
        var options = {
            maximumImagesCount: $scope.imagecount,
            quality: 100
        };


        $scope.getImages=function(){
            console.log('getImages');
            var random = Math.floor((Math.random() * 4) + 1);
            $scope.pickedImages.push({url:'img/'+random+'.jpg'});
            $cordovaImagePicker.getPictures(options).then(function (results) {
                $scope.pickedImages=[];
                for (var i = 0; i < results.length; i++) {
                    console.log('Image URI: ' + results[i]);
                    $scope.pickedImages.push({url:results[i]});
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

        $scope.onDropComplete = function (index, obj, evt) {
            var otherObj = $scope.pickedImages[index];
            var otherIndex = $scope.pickedImages.indexOf(obj);
            $scope.pickedImages[index] = obj;
            $scope.pickedImages[otherIndex] = otherObj;
            console.log(index + ' | '+ obj + ' | '+ evt)
        }
    });
