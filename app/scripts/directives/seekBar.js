/**
 * @function : seekBar 
 * @desc     : The directive's callback factory function which is used for manipulating the playback and volume of a song.
 * @param    : {Object} $document
 * @return   : It returns an object that describes the directive's behavior to Angular's HTML compiler.
 *             link: The link function is automatically generated and scoped to the element defining the directive. 
 *             Think of it as a function that executes when the directive is instantiated in the view. This is where all logic related to DOM
 *             manipulation will go.
 */

(function() {
     function seekBar($document) {
        var calculatePercent = function(seekBar, event) {
             var offsetX = event.pageX - seekBar.offset().left;
             var seekBarWidth = seekBar.width();
             var offsetXPercent = offsetX / seekBarWidth;
             offsetXPercent = Math.max(0, offsetXPercent);
             offsetXPercent = Math.min(1, offsetXPercent);
             return offsetXPercent;
        };

        return {
            templateUrl: '/templates/directives/seek_bar.html',
            replace: true,
            restrict: 'E',
            scope: { 
                    onChange: '&',
                    buzzObj: '<',
                    updateCurrentTime: '&'
                   },
            link: function(scope, element, attributes) {
             // directive logic to return
                scope.value = 0;
                scope.max = 100;
                scope.currSongTime = 0;
                scope.songSet = 0;
                
               
                var seekBar = $(element);
                
                attributes.$observe('value', function(newValue) {
                     scope.value = newValue;
                });
 
                attributes.$observe('max', function(newValue) {
                     scope.max = newValue;
                });
                
                attributes.$observe('songSet', function(newValue) {
                    scope.songSet = newValue;
                    if (newValue == 1) {
                      updateSongTime();  
                        console.log("updateSongTime called scope.songSet: " + scope.songSet);
                    } else {
                        console.log("updateSongTime not called scope.songSet: " + scope.songSet);
                    }
                });
                
                 var percentString = function () {
                     var value = scope.value;
                     var max = scope.max;
                     var percent = value / max * 100;
                     return percent + "%";
                 };
     
                 scope.fillStyle = function() {
                     return {width: percentString()};
                 };
                
                scope.onClickSeekBar = function(event) {
                    var percent = calculatePercent(seekBar, event);
                    scope.value = percent * scope.max;
                    notifyOnChange(scope.value);
                };
                
                 scope.trackThumb = function() {
                     $document.bind('mousemove.thumb', function(event) {
                         var percent = calculatePercent(seekBar, event);
                         scope.$apply(function() {
                             scope.value = percent * scope.max;
                             notifyOnChange(scope.value);
                         });
                     });
                     
                     $document.bind('mouseup.thumb', function() {
                         $document.unbind('mousemove.thumb');
                         $document.unbind('mouseup.thumb');
                     });
                 };
                
                var updateSongTime = function() {
                    scope.buzzObj.bind('timeupdate', function() {
                    //  scope.$apply(function() {
                        scope.currSongTime = scope.buzzObj.getTime();
                        console.log("updateSongTime was called. currentTime: " + scope.currSongTime);  
                        scope.updateCurrentTime({value: scope.currSongTime});
                    //  });
                    
                    }
                };
                
                var notifyOnChange = function(newValue) {
                     if (typeof scope.onChange === 'function') {
                         scope.onChange({value: newValue});
                       //  console.log("notifyOnChange is called and the value updated in the onChange function. newValue:" + newValue);
                     }
                };
                
                scope.thumbStyle = function () {
                    return {left: percentString()};
                }
            }
        };
     }
 
     angular
         .module('blocJams')
         .directive('seekBar', ['$document', seekBar]);
 })();