var app = angular.module('myApp', []);

  app.filter('trustUrl', function ($sce) {
    return function(url) {
      return $sce.trustAsResourceUrl(url);
    };
  });

app.controller('AlbumCtrl', function($http, $scope, $rootScope,$sce) {

$scope.playlist ;

    function getHashParams() {
      var hashParams = {};
      var e, r = /([^&;=]+)=?([^&;]*)/g,
          q = window.location.hash.substring(1);
      while ( e = r.exec(q)) {
         hashParams[e[1]] = decodeURIComponent(e[2]);
      }
      return hashParams;
    }

    var params = getHashParams();
    console.log("PARAMS", params)

    var access_token = params.access_token,
    refresh_token = params.refresh_token,
    error = params.error;

    if (error) {
        alert('There was an error during the authentication');
    } else {
        if (access_token) {

            $.ajax({
               url: 'https://api.spotify.com/v1/users/emches/playlists/1BUQYnc3enS7OQpRhFxOIP/tracks',
               headers: {
                 'Authorization': 'Bearer ' + access_token
               },
               success: function(response) {
                 console.log("front end resp", response)
                 playlist = response
             //    userProfilePlaceholder.innerHTML = userProfileTemplate(response);
             //   uriSetter(playlist);

              playlist = trackSetter(playlist)

              console.log("new pl", playlist)
                $scope.playlist = playlist;
                $scope.currentSong = $scope.playlist.items[0];

                 console.log("scope PL", $scope.playlist)
                 var albumId = '565f319c739293c850a2d5b9';
                 $scope.$digest()
             }
        });
      } else {
          // render initial screen
          $('#login').show();
          $('#loggedin').hide();
      }
  }

  $scope.upCountAdd = function(item){
      item.upCount++;
      item.score = item.upCount - item.downCount;
      $scope.resetItems()
      $scope.setColor(item);
      console.log(item.score);
  }

 $scope.downCountAdd = function(item){
      item.downCount++;
      item.score = item.upCount - item.downCount;
      $scope.resetItems();
      $scope.setColor(item);
      console.log(item.score);
  }

  function trackSetter (playlist) {
    playlist.items = playlist.items.map(function (item) {
      console.log("track uri", item.track.uri)
      item.embedUri = "https://embed.spotify.com/?uri=" + String(item.track.uri);
      item.upCount = 0;
      item.downCount = 0;
      item.score = 0;
      console.log("new embed", item.embedUri)
      item.tempClass = null;
      return item;
    });
    return playlist;
  }

  $scope.resetItems = function(){

    $scope.playlist.items = $scope.playlist.items.sort(function( a, b){
      console.log("a", a)
      return a.score - b.score
    })

    $scope.currentSong = $scope.playlist.items[0];
  }


  $scope.nowPlaying = function(track){
    return track == $scope.currentSong;
  }

  $scope.setColor = function(track) {
    var scoreArray = [];

    $scope.playlist.items.forEach(function(song) {
        scoreArray.push(song.score);
    });

    if (track.score > 0) track.tempClass = "tempRed5";
    else if (track.score < 0) track.tempClass = "tempBlue5";
  }

});