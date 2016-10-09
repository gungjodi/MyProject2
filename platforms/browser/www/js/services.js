angular.module('starter.services',[])
.factory('PlaylistService',function(){
    var playlists = [
        { title: 'Reggae', id: 1 },
        { title: 'Chill', id: 2 },
        { title: 'Dubstep', id: 3 },
        { title: 'Indie', id: 4 },
        { title: 'Rap', id: 5 },
        { title: 'Cowbell', id: 6 }
    ];

    return {
        playlists:playlists
    };
})
.factory('LayoutService',function(){
    var grids = [
        { title: '1x1 Grid', id: 1 },
        { title: '1x2 Grid', id: 2 },
        { title: '2x1 Grid', id: 3 },
        { title: '2x2 Grid', id: 4 },
    ];

    return {
        grids:grids
    };
});