angular.module( 'bookingflow', [
  'templates-app',
  'templates-common',
  '404page',
  'httpInterceptor',
  'translateApp',
  'pascalprecht.translate',
  'bookingflow.services',
  'bookingflow.booking',
  'ui.router'
])

.config(['$stateProvider', '$urlRouterProvider', function myAppConfig ( $stateProvider, $urlRouterProvider ) {
  $urlRouterProvider.otherwise( '/404' );
}])

.run( ['$locale', '$translate', function run ($locale, $translate) {
  // set user locale to translate texts
  $translate.use($locale.localeID);

}])

.controller( 'AppCtrl', ['$scope', '$location', function AppCtrl ( $scope, $location ) {
  $scope.appName = 'Booking Flow';
  $scope.today = new Date();
  $scope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
    if ( angular.isDefined( toState.data.pageTitle ) ) {
      $scope.pageTitle = toState.data.pageTitle + ' | ' + $scope.appName;
    }
  });
}]);

