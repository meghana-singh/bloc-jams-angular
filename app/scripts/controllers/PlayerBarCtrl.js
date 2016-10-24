//Controller for controlling the player bar.
//Have injected the following dependencies - Fixtures, SongPlayer
(function() {
     function PlayerBarCtrl(Fixtures, SongPlayer) {
         this.albumData  = {};
         this.albumData = Fixtures.getAlbum();
         this.songPlayer = SongPlayer;
      /*   this.setTime = function (value) {
             console.log("setTime is called");
             console.log(this.songPlayer);
             this.songPlayer.setCurrentTime(value);
         };
         */
     }
 
     angular
         .module('blocJams')
         .controller('PlayerBarCtrl', ['Fixtures', 'SongPlayer', PlayerBarCtrl]);
 })();