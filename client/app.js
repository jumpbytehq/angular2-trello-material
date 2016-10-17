var app = angular.module("myApp", ["ngRoute", "ngMaterial", "ngResource", angularDragula(angular)]); 

app
.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "./modules/dashboard/dashboard.html",
        controller: "DashboardController"
    });
})
.config(function($mdThemingProvider) {

  $mdThemingProvider.theme('default')
    .primaryPalette('indigo', {
      'default': '500', // by default use shade 400 from the pink palette for primary intentions
      'hue-1': '700', // use shade 100 for the <code>md-hue-1</code> class
      'hue-2': '800', // use shade 600 for the <code>md-hue-2</code> class
    })
    // If you specify less than all of the keys, it will inherit from the
    // default shades
    .accentPalette('blue', {
      'default': 'A200' // use shade 200 for default, and keep all other shades the same
    });

});