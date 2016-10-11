(function() {
    
    function AlbumCtrl(Fixtures) {
          this.albumData = {};
          this.albumData = Fixtures.getAlbum();
    }
    
    angular
        .module('blocJams')
        .controller('AlbumCtrl', ['Fixtures', AlbumCtrl]);

})();