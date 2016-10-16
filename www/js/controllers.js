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
        $scope.dev_width = $window.innerWidth;
        $scope.dev_height = $window.innerHeight;

        $scope.pickedImages=[
            {url:'img/2.jpg',posX:0,posY:20,width:0,height:0,scale:1,rotation:5,page:1},
            {url:'img/4.jpg',posX:0,posY:0,width:0,height:0,scale:1,rotation:90,page:1},
            {url:'img/1.jpg',posX:0,posY:20,width:0,height:0,scale:1,rotation:5,page:2},
            {url:'img/3.jpg',posX:0,posY:0,width:0,height:0,scale:1,rotation:90,page:2}
        ];

        var options = {
            maximumImagesCount: 10,
            quality: 100
        };

        function newpage()
        {
            var max = Math.max.apply(Math,$scope.pickedImages.map(function(item){return item.page;}));
            console.log(max);
            return max;
        }

        $scope.newpage=function () {
            $scope.activeIndex=newpage();
            $scope.slider.appendSlide('<div class="swiper-slide"></div>');
            dataChangeHandler();
        }

        $scope.getImages=function(){
            console.log('getImages');
            var random = Math.floor((Math.random() * 4) + 1);
            $scope.pickedImages.push({url:'img/'+random+'.jpg',page:(+$scope.activeIndex+1)});
            console.log({url:'img/'+random+'.jpg',page:(+$scope.activeIndex+1)});
            $cordovaImagePicker.getPictures(options).then(function (results) {
                // $scope.pickedImages=[];
                for (var i = 0; i < results.length; i++) {
                    $scope.pickedImages.push({url:results[i],page:(+$scope.activeIndex+1)});
                    console.log($scope.pickedImages[i].url);
                }
                if(!$scope.$$phase) {
                    $scope.$apply();
                }
                $scope.slider.removeSlide(slideIndex);
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
                },
            });
        }

        $scope.load = function () {
            for (var i = 0; i < $scope.pickedImages.length; i++) {
                // $scope.pickedImages[i].posX = 20+(i*100);
                // $scope.pickedImages[i].posY = 20;
                // $scope.pickedImages[i].scale = 1;
                // $scope.pickedImages[i].rotation = 1+i;
                var transform =
                    "translate3d(" + $scope.pickedImages[i].posX + "px," + $scope.pickedImages[i].posY + "px, 0) " +
                    "scale(" + $scope.pickedImages[i].scale  + ")" +
                    "rotate(" + $scope.pickedImages[i].rotation + "deg) ";
                var image = document.getElementById("image"+i);
                console.log(image.style);
                image.style.transform = transform;
                image.style.webkitTransform = transform;
            }
        }
        $scope.save = function () {
            for (var i = 0; i < $scope.pickedImages.length; i++) {
                var transform =
                    "translate3d(" + $scope.pickedImages[i].posX + "px," + $scope.pickedImages[i].posY + "px, 0) " +
                    "scale(" + $scope.pickedImages[i].scale  + ")" +
                    "rotate(" + $scope.pickedImages[i].rotation + "deg) ";
                var image = document.getElementById("image"+i);
                console.log("image"+i+"left: ",image.getBoundingClientRect().left);
                console.log("image"+i+"top: ",image.getBoundingClientRect().top);
                console.log("image"+i+"width: ",image.getBoundingClientRect().width);
                console.log("image"+i+"height: ",image.getBoundingClientRect().height);
            }
        }

        $scope.options = {
            effect: 'coverflow',
            speed: 500,
            onlyExternal: true,
            loopAdditionalSlides:3,    //<-- This one
            paginationClickable: true,
            loop: false,
            observer:true,
            observeParents:true,
        }

        $scope.$on("$ionicSlides.sliderInitialized", function(event, data){
            // data.slider is the instance of Swiper
            $scope.slider = data.slider;
        });

        function dataChangeHandler()
        {
            // call this function when data changes, such as an HTTP request, etc
            if ( $scope.slider ){
                $scope.slider.updateLoop();
            }
        }

        $scope.$on("$ionicSlides.slideChangeStart", function(event, data){
            console.log('Slide change is beginning');
        });

        $scope.$on("$ionicSlides.slideChangeEnd", function(event, data){
            // note: the indexes are 0-based
            $scope.activeIndex = data.activeIndex;
            $scope.previousIndex = data.previousIndex;
        });
    });
