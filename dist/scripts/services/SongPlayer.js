/**********************************************************************
** Service - SongPlayer 
* @desc  : This service is used for playing and pausing the songs.
*        : It returns this object - SongPlayer thereby making 
*        : its properties and methods public to the rest of the application.
*        : Private function: setSong
*        : Public methods  : SongPlayer.play and SongPlayer.pause.
*        : Attributes      : currentSong and currentBuzzObject, 
* @func  :
* @param :  
* @return: SongPlayer Object
**********************************************************************/
(function() {
     function SongPlayer() {
         
          var SongPlayer = {};
          var currentSong = null;
/**
 * @desc Buzz object audio file
 * @type {Object}
 */         
          var currentBuzzObject = null;

 /**
 * @function : setSong
 * @desc     : Stops currently playing song and loads new audio file as currentBuzzObject
 * @param    : {Object} song
 * @return   : -
 */
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
 * @return   : -
 */
         SongPlayer.play = function(song) {
             if (currentSong !== song) {
                 
                 setSong(song);
               
                 currentBuzzObject.play();    
                 song.playing = true;
                 
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
 * @return   : -
 */
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