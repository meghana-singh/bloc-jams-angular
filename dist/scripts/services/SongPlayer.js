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
     function SongPlayer(Fixtures) {
 
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
 * @desc     : Stops the audio file - currentBuzzObject and sets song.playing to false.
 **/       
         var stopSong = function () {
            currentBuzzObject.stop();
            SongPlayer.currentSong.playing = null;
        }

 /**
 * @function : setSong
 * @desc     : Stops currently playing song and loads new audio file as currentBuzzObject
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
     
        SongPlayer.currentSong = song;
     };
   
/**
 * @desc SongPlayer.currentSong: It holds the current song being played/paused.
 * @type {Object}
 **/         
          SongPlayer.currentSong = null;
                  
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
         console.log("currentSong.playing: " + SongPlayer.currentSong.playing + " song.playing: " + song.playing);
     };
 
 /**
 * @function : SongPlayer.pause
 * @desc     : Pauses audio file - currentBuzzObject & makes song.playing false
 * @param    : {Object} song
 **/
      SongPlayer.pause = function(song) {
        //When song is played from album view song row - song is assigned & when played from playbar currentSong is assigned.
         console.log("Before pausing -- currentSong.playing: " + SongPlayer.currentSong.playing);   
         song = song || SongPlayer.currentSong;   
         currentBuzzObject.pause();
         song.playing = false;
         console.log("After pausing -- currentSong.playing: " + SongPlayer.currentSong.playing + " song.playing: " + song.playing);  
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
         
          return SongPlayer;
     }
 
 /**
 * @desc: Create a factory service SongPlayer for playing/pausing songs.
 */  
     angular
         .module('blocJams')
         .factory('SongPlayer', ["Fixtures", SongPlayer]);
 })();