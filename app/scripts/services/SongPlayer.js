/**********************************************************************
** Service - SongPlayer 
* @desc  : This service is used for playing and pausing the songs.
*        : It returns this object - SongPlayer thereby making 
*        : its properties and methods public to the rest of the application.
*        : Private function: setSong
*        : Public methods  : SongPlayer.play and SongPlayer.pause.
*        : Attributes      : SongPlayer.currentSong and Song.currentBuzzObject, 
* @return: {object} SongPlayer 
**********************************************************************/
(function() {
     function SongPlayer($rootScope, Fixtures) {
 
/**
 * @desc SongPlayer: This object is returned by this service there by making
 *                   its properties and methods public to the rest of the app.
 * @type {Object}
 **/         
          var SongPlayer = {};
 
/**
 * @desc The current album being played.
 * @type {Object}
 **/         
          var currentAlbum = Fixtures.getAlbum();

 /**
 * @function : getSongIndex
 * @desc     : It finds out the index number of the song being played.
 * @param    : {object} song: song from the album
 * @return   : {number} 
 **/       
         
         var getSongIndex = function(song) {
             return currentAlbum.songs.indexOf(song);
         };
         
 
 /**
 * @function : playSong
 * @desc     : Plays the audio file - Song.currentBuzzObject and sets song.playing to true.
 **/       
         var playSong = function (song) {
            SongPlayer.currentBuzzObject.play();    
            song.playing = true;
         };

 /**
 * @function : stopSong
 * @desc     : Stops the audio file - Song.currentBuzzObject and sets song.playing to false.
 **/       
         var stopSong = function () {
            SongPlayer.currentBuzzObject.stop();
            SongPlayer.currentSong.playing = null;
            SongPlayer.songIsSet = 0; 
        }

 /**
 * @function : setSong
 * @desc     : Stops currently playing song and loads new audio file as Song.currentBuzzObject
 *           : Updates the volume and currentSong attributes. 
 *           : Updates the currentTime attribute of the song based on the "timeupdate" event of the Song.currentBuzzObject.
 * @param    : {Object} song
 **/
        var setSong = function(song) {
        if (SongPlayer.currentBuzzObject) {
            stopSong();
            
        }
     
        SongPlayer.currentBuzzObject = new buzz.sound(song.audioUrl, {
            formats: ['mp3'],
            preload: true
        });
   
        SongPlayer.songIsSet = 1;
            
/*        Song.currentBuzzObject.bind('timeupdate', function() {
//         $rootScope.$apply(function() {
              //SongPlayer.currentTimeNotWatched = Song.currentBuzzObject.getTime();
              SongPlayer.currentTime = Song.currentBuzzObject.getTime();
//          });
        });
     */
            
        SongPlayer.volume = SongPlayer.currentBuzzObject.getVolume();    
        SongPlayer.currentSong = song;
     };
   
/**
 * @desc SongPlayer.currentSong: It holds the current song being played/paused.
 * @type {Object}
 **/         
          SongPlayer.currentSong = null;
 
/**
 * @desc Current playback time (in seconds) of currently playing song
 * @type {Number}
 */
 SongPlayer.currentTime = null;
 SongPlayer.currentTimeNotWatched = null;
         
/**
 * @desc Current volume of currently playing song
 * @type {Number}
 */
 SongPlayer.volume = null;
 
/**
 * @desc Buzz object audio file
 * @type {Object}
 **/         
          SongPlayer.currentBuzzObject = null;
          SongPlayer.songIsSet = null;
         
 /**
 * @function : SongPlayer.play
 * @desc     : Loads new audio file as Song.currentBuzzObject & plays the song
 * @param    : {Object} song
 */
     SongPlayer.play = function(song) {
         //When song is played from album view song row - song is assigned & when played from playbar currentSong is assigned.
         song = song || SongPlayer.currentSong; 
         if (SongPlayer.currentSong !== song) {
             
             setSong(song);
             playSong(song);
                                    
         } else if (SongPlayer.currentSong === song) {
             if (SongPlayer.currentBuzzObject.isPaused()) {
                 playSong(song);
                 //Song.currentBuzzObject.play();
             }
         }            
         
     };
 
 /**
 * @function : SongPlayer.pause
 * @desc     : Pauses audio file - Song.currentBuzzObject & makes song.playing false
 * @param    : {Object} song
 **/
      SongPlayer.pause = function(song) {
        //When song is played from album view song row - song is assigned & when played from playbar currentSong is assigned.
         song = song || SongPlayer.currentSong;      
         SongPlayer.currentBuzzObject.pause();
         song.playing = false;
      };
     
 /**
 * @function : SongPlayer.previous  
 * @desc     : It updates the song index to the previous song's index and plays the song.
 *           : If the currentSong is the first song then it stops the play of the song.
 **/
         
     SongPlayer.previous = function() {
         var currentSongIndex = getSongIndex(SongPlayer.currentSong);
         currentSongIndex--;
             if (currentSongIndex < 0) {
                 stopSong();
             } else {
                 var song = currentAlbum.songs[currentSongIndex];
                 setSong(song);
                 playSong(song);
             }
     };

/**
 * @function : SongPlayer.next
 * @desc     : It updates the song index to the next song's index and plays the song.
 *           : If the currentSong is the last song then it stops the play of the song.
 **/
         
     SongPlayer.next = function() {
         var currentSongIndex = getSongIndex(SongPlayer.currentSong);
         currentSongIndex++;
             if (currentSongIndex >= currentAlbum.songs.length) {
                 stopSong();
             } else {
                 var song = currentAlbum.songs[currentSongIndex];
                 setSong(song);
                 playSong(song);
             }
     };

             
/**
 * @function setCurrentTime
 * @desc Set current time (in seconds) of currently playing song
 * @param {Number} time
 */
     SongPlayer.setCurrentTime = function(time) {
         console.log("setCurrentTime is called!");
         if (SongPlayer.currentBuzzObject) {
             SongPlayer.currentBuzzObject.setTime(time);
         }
     };
 
/**
 * @function setVolume
 * @desc Set the volume for the current playing song
 * @param {Number} volume
 */
     SongPlayer.setVolume = function(volume) {
         console.log("setVolume is called!");
         if (SongPlayer.currentBuzzObject) {
             SongPlayer.currentBuzzObject.setVolume(volume);
         }
     };

    SongPlayer.updateCurrentTime = function (newTime) {
      SongPlayer.currentTime = newTime;    
    };

          return SongPlayer;
     }
    
 /**
 * @desc: Create a factory service SongPlayer for playing/pausing songs.
 */  
     angular
         .module('blocJams')
         .factory('SongPlayer', ["$rootScope", "Fixtures", SongPlayer]);
 })();