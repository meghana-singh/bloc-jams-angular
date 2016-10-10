//To advoid polluting of global namespace use IIFE (Immediately Invoking Function Expression)
//Have the Angular Modules, Apps, Controllers etc. inside the IIFE.

(function() {
    //To display different templates in the view (ui-view), UI Router is used. 
    //Routing is organized around URLs. An application can be in different states which will determine what to display.
    //Configure the different states using Angular providers.
    //$locationProvide: Configures the applications path
    //$stateProvider: Configures the states name, URL route, controller and template.
    
    //Controllers are instantiated on an as-needed basis, when their corresponding scopes are created, i.e. when the user manually navigates to a //state via a URL, $stateProvider will load the correct template into the view, then bind the controller to the template's scope.
    
    function config($stateProvider, $locationProvider) {
        
         $locationProvider
             .html5Mode({
                 enabled: true, //!# display is disabled in the URL
                 requireBase: false
             });
        
         $stateProvider
             .state('landing', {
                 url: '/',
                 controller: 'LandingCtrl as landing',
                 templateUrl: '/templates/landing.html'
             })
             .state('album', {
                 url: '/album',
                 controller: 'AlbumCtrl as album',  
                 templateUrl: '/templates/album.html'
             })
            .state('collection', {
                 url: '/collection',
                 controller: 'CollectionCtrl as collection',
                 templateUrl: '/templates/collection.html'
             });
    }
    
    angular
        .module('blocJams', ['ui.router']) //Added the external UI Router module in the dependency array.
        .config(config);

})();