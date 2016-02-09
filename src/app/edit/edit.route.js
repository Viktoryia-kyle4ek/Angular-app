(function() {
  'use strict';

  angular
    .module('notebook')
    .config(routeConfig);

  routeConfig.$inject = ['$routeProvider'];

  /** @ngInject */
  function routeConfig($routeProvider) {
    $routeProvider
      .when('/edit/:id', {
        templateUrl: 'app/edit/edit.html',
        controller: 'EditController',
        controllerAs: 'vm',
        resolve: { /** @ngInject */
          editPrepService: editPrepService
        }
      });
  }

  editPrepService.$inject = ['$route', 'contact'];
  function editPrepService($route, contact) {
    var id = $route.current.params.id;
    return contact.findById(id);
  }

})();
