(function() {
    
    function AlbumCtrl() {
          this.album = {};
          this.albumData = angular.copy(albumPicasso);
    }
    
    angular
        .module('blocJams')
        .controller('AlbumCtrl', AlbumCtrl);

})();