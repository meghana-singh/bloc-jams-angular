/**********************************************************************
** Filter - timecode 
* @desc  : This filter is used for converting seconds to readable time.
*        : All filter functions have to return another function which takes atleast
*        : one argument, the input to the filter which in this case is seconds.
*        : Public methods  : 
*        : Attributes      : 
* @return: {object- method/function} 
**********************************************************************/
(function() {
     function timecode() {
         return function(seconds) {
             var seconds = Number.parseFloat(seconds);
             if (Number.isNaN(seconds)) {
               return '-:--';
             }
             var wholeSeconds = Math.floor(seconds);
             var minutes = Math.floor(wholeSeconds / 60);
             var remainingSeconds = wholeSeconds % 60;
 
             var output = minutes + ':';
 
             if (remainingSeconds < 10) {
                 output += '0';   
             }
 
             output += remainingSeconds;
 
             return output;
         };
     }
 
     angular
         .module('blocJams')
         .filter('timecode', timecode);
 })();