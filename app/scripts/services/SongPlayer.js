/**********************************************************************
** Service - SongPlayer 
* @desc  : This service is used for playing and pausing the songs.
*        : It returns this object - SongPlayer thereby making 
*        : its properties and methods public to the rest of the application.
*        : Private function: setSong
*        : Public methods  : SongPlayer.play and SongPlayer.pause.
*        : Attributes      : currentSong and currentBuzzObject, 
* @return: {object} SongPlayer 
**********************************************************************/
(function() {
     function SongPlayer() {
 
/**
 * @desc SongPlayer: This object is returned by this service there by making
 *                   its properties and methods public to the rest of the app.
 * @type {Object}
 **/         
          var SongPlayer = {};
/**
 * @desc currentSong: It holds the current song being played/paused.
 * @type {Object}
 **/         
         
          var currentSong = null;
 /**
 * @desc Buzz object audio file
 * @type {Object}
 **/         
          var currentBuzzObject = null;

 /**
 * @function : playSong
 * @desc     : Plays the audio file - currentBuzzObject and sets song.playing to true.
 **/       
         var playSong = function () {
            currentBuzzObject.play();    
            song.playing = true;
         };

 /**
 * @function : setSong
 * @desc     : Stops currently playing song and loads new audio file as currentBuzzObject
 * @param    : {Object} song
 **/
        var setSong = function(song) {
        if (currentBuzzObject) {
            currentBuzzObject.stop();
            currentSong.playing = null;
        }
     
        currentBuzzObject = new buzz.sound(song.audioUrl, {
            formats: ['mp3'],
            preload: true
        });
     
        currentSong = song;
     };
   
 /**
 * @function : SongPlayer.play
 * @desc     : Loads new audio file as currentBuzzObject & plays the song
 * @param    : {Object} song
 */
     SongPlayer.play = function(song) {
         if (currentSong !== song) {
             
             setSong(song);
             playSong();
                                    
         } else if (currentSong === song) {
             if (currentBuzzObject.isPaused()) {
                 currentBuzzObject.play();
             }
         }            
         
     };
 
 /**
 * @function : SongPlayer.pause
 * @desc     : Pauses audio file - currentBuzzObject & makes song.playing false
 * @param    : {Object} song
 **/
      SongPlayer.pause = function(song) {
         currentBuzzObject.pause();
         song.playing = false;
     };
         
          return SongPlayer;
     }
 
 /**
 * @desc: Create a factory service SongPlayer for playing/pausing songs.
 */  
     angular
         .module('blocJams')
         .factory('SongPlayer', SongPlayer);
 })();