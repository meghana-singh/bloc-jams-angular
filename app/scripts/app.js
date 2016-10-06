//To advoid polluting of global namespace use IIFE (Immediately Invoking Function Expression)
//Have the Angular Modules, Apps, Controllers etc. inside the IIFE.

(function() {
    //To display different templates in the view (ui-view), UI Router is used. 
    //Routing is organized around URLs. An application can be in different states which will determine what to display.
    //Configure the different states using Angular providers.
    //$locationProvide: Configures the applications path
    //$stateProvider: Configures the states name, URL route, controller and template.
    function config($stateProvider, $locationProvider) {
        
         $locationProvider
             .html5Mode({
                 enabled: true, //!# display is disabled in the URL
                 requireBase: false
             });
        
         $stateProvider
             .state('landing', {
                 url: '/',
                 templateUrl: '/templates/landing.html'
             })
             .state('album', {
                 url: '/album',
                 templateUrl: '/templates/album.html'
             })
            .state('collection', {
                 url: '/collection',
                 templateUrl: '/templates/collection.html'
             });
    }
    
    angular
        .module('blocJams', ['ui.router']) //Added the external UI Router module in the dependency array.
        .config(config);

})();