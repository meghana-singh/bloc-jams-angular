//Controller for Collections View
(function() {
     function CollectionCtrl() {
        this.albums = [];
        for (var i=0; i < 12; i++) {
         this.albums.push(angular.copy(albumPicasso));
        // this.albums.push(angular.copy(albumMarconi));
        // this.albums.push(angular.copy(albumAdele));
        }
     }
 
     angular
         .module('blocJams')
         .controller('CollectionCtrl', CollectionCtrl);
 })();