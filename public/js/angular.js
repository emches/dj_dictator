var app = angular.module('myApp', []);


app.controller('AlbumCtrl', function($http, $scope, $rootScope) {
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
                $scope.playlist = playlist;
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


    // $http.get('/api/albums/' + albumId)
    //     .then(function(response){
    //         $scope.data = response.data;
    //         // console.log('scope data: ', $scope.data);
    //         $scope.imageUrl = 'api/albums/' + albumId + '.image';
    //     })

});
