(function() {
  'use strict';

  angular
    .module('notebook')
    .config(routeConfig);

  routeConfig.$inject = ['$routeProvider'];

  /** @ngInject */
  function routeConfig($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main',
        resolve: { /** @ngInject */
          contactPrepService: contactPrepService
        }
      })
      .otherwise({
        redirectTo: '/'
      });
  }

  contactPrepService.$inject = ['contact', 'query'];
  function contactPrepService(contact, query) {
    return contact.findAll(query.page, query.itemsPerPage);
  }

})();
