/**********************************************************************
** Service - SongPlayer 
* @desc  : This service is used for playing and pausing the songs.
*        : It returns this object - SongPlayer thereby making 
*        : its properties and methods public to the rest of the application.
*        : Private function: setSong
*        : Public methods  : SongPlayer.play and SongPlayer.pause.
*        : Attributes      : SongPlayer.currentSong and currentBuzzObject, 
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
 * @desc Buzz object audio file
 * @type {Object}
 **/         
          var currentBuzzObject = null;

 /**
 * @function : playSong
 * @desc     : Plays the audio file - currentBuzzObject and sets song.playing to true.
 **/       
         var playSong = function (song) {
            currentBuzzObject.play();    
            song.playing = true;
         };

 /**
 * @function : stopSong
 * @desc     : Stops the audio file - currentBuzzObject and sets playing & songEnded attributes to false.
 **/       
         var stopSong = function () {
            currentBuzzObject.stop();
            SongPlayer.currentSong.playing = null;
            SongPlayer.songEnded = null;
            SongPlayer.isMute = false;    
        }

 /**
 * @function : setSong
 * @desc     : Stops currently playing song and loads new audio file as currentBuzzObject
 *           : Updates the volume and currentSong attributes. 
 *           : Updates the currentTime attribute of the song based on the "timeupdate" event of the currentBuzzObject.
 *           : Plays the next song automatically once the current song comes to an end.
 * @param    : {Object} song
 **/
        var setSong = function(song) {
        if (currentBuzzObject) {
            stopSong();
        }
     
        currentBuzzObject = new buzz.sound(song.audioUrl, {
            formats: ['mp3'],
            preload: true
        });
     
        currentBuzzObject.bind('timeupdate', function() {
          $rootScope.$apply(function() {
              SongPlayer.currentTime = currentBuzzObject.getTime();
          });
        });
            
        //To check if song ended. If true, start the playback of next song.
        currentBuzzObject.bind('ended', function() {
          $rootScope.$apply(function() {
              SongPlayer.songEnded = true;
          });
          if (SongPlayer.songEnded === true) {
            SongPlayer.next();
            SongPlayer.songEnded = null;
          }
        });
            
        SongPlayer.volume = currentBuzzObject.getVolume();    
        SongPlayer.currentSong = song;
     };
   
/**
 * @desc SongPlayer.currentSong: It holds the current song being played/paused.
 * @type {Object}
 **/         
          SongPlayer.currentSong = null;
          SongPlayer.songEnded = null;
         
/**
 * @desc Current playback time (in seconds) of currently playing song
 * @type {Number}
 */
 SongPlayer.currentTime = null;

/**
 * @desc Current volume of currently playing song
 * @type {Number}
 */
 SongPlayer.volume = null;

 /**
 * @desc currently playing song is mute or unmuted.
 * @type {boolean} By default, its unmute.
 */
 SongPlayer.isMute = false;         
         
 /**
 * @function : SongPlayer.play
 * @desc     : Loads new audio file as currentBuzzObject & plays the song
 * @param    : {Object} song
 */
     SongPlayer.play = function(song) {
         //When song is played from album view song row - song is assigned & when played from playbar currentSong is assigned.
         song = song || SongPlayer.currentSong; 
         if (SongPlayer.currentSong !== song) {
             
             setSong(song);
             playSong(song);
                                    
         } else if (SongPlayer.currentSong === song) {
             if (currentBuzzObject.isPaused()) {
                 playSong(song);
                 //currentBuzzObject.play();
             }
         }            
         
     };
 
 /**
 * @function : SongPlayer.pause
 * @desc     : Pauses audio file - currentBuzzObject & makes song.playing false
 * @param    : {Object} song
 **/
      SongPlayer.pause = function(song) {
        //When song is played from album view song row - song is assigned & when played from playbar currentSong is assigned.
         song = song || SongPlayer.currentSong;      
         currentBuzzObject.pause();
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
         if (currentBuzzObject) {
             currentBuzzObject.setTime(time);
         }
     };
 
/**
 * @function setVolume
 * @desc Set the volume for the current playing song
 * @param {Number} volume
 */
     SongPlayer.setVolume = function(volume) {
         if (currentBuzzObject) {
             currentBuzzObject.setVolume(volume);
         }
     };
/**
 * @function Mute
 * @desc Mute the volume for the current playing song
 */
    SongPlayer.mute = function() {
        if (currentBuzzObject) {
            if (currentBuzzObject.isMuted()) {
              currentBuzzObject.unmute();
              SongPlayer.isMute = false;    
            } else {
              currentBuzzObject.mute();    
              SongPlayer.isMute = true;        
            }
         }
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