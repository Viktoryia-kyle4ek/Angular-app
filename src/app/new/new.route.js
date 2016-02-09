(function() {
  'use strict';

  angular
    .module('notebook')
    .config(routeConfig);

  routeConfig.$inject = ['$routeProvider'];

  /** @ngInject */
  function routeConfig($routeProvider) {
    $routeProvider
      .when('/add', {
        templateUrl: 'app/new/new.html',
        controller: 'NewController',
        controllerAs: 'new'
      });
  }

})();
