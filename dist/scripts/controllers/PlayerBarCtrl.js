//Controller for controlling the player bar.
//Have injected the following dependencies - Fixtures, SongPlayer
(function() {
     function PlayerBarCtrl(Fixtures, SongPlayer) {
         this.albumData  = {};
         this.albumData = Fixtures.getAlbum();
         this.songPlayer = SongPlayer;
     }
 
     angular
         .module('blocJams')
         .controller('PlayerBarCtrl', ['Fixtures', 'SongPlayer', PlayerBarCtrl]);
 })();