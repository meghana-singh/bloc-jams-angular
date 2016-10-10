//Define the Controller for Landing Page
//This Controller is constructed for blocJams App.
//It currently does not have any dependencies and hence no array is defined. The callback function is always the last item in the array.
//The callback function of the controller is LandingCtrl.
(function(){
    function LandingCtrl () {
        this.heroTitle = "Turn the Music Up!"
        
    }
    
    angular
    .module('blocJams')
    .controller('LandingCtrl', LandingCtrl);
})();