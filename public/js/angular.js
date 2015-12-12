var app = angular.module('myApp', []);


app.controller('AlbumCtrl', function($http, $scope, $rootScope) {
    var albumId = '565f319c739293c850a2d5b9';
    $http.get('/api/albums/' + albumId)
        .then(function(response){
            $scope.data = response.data;
            // console.log('scope data: ', $scope.data);
            $scope.imageUrl = 'api/albums/' + albumId + '.image';
        })

    $scope.playSong = function(songID) {
        console.log('in playSong: ', songID);
        $rootScope.currentSong = songID;
        $rootScope.isPlaying = true;
        $rootScope.$broadcast('controlPlay', songID);
    }

    $scope.pauseSong = function(songID) {
        console.log('in pauseSong: ',   songID);
        $rootScope.currentSong = null;
        $rootScope.isPlaying = false;
        $rootScope.$broadcast('controlPause');
    }
})