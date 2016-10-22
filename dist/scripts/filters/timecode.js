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
             output = buzz.toTimer(seconds);
             return output;
         };
     }
 
     angular
         .module('blocJams')
         .filter('timecode', timecode);
 })();