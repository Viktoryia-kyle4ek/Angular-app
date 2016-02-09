(function() {
  'use strict';

  angular
    .module('notebook')
    .factory('ContactAPI', Contact);

  Contact.$inject = ['$resource'];

  /** @ngInject */
  function Contact($resource) {
    return $resource(
      'http://localhost:3002/api/contacts/:id',
      null,
      {
        'update': {
          method:'PUT'
        }
      }
    );
  }

})();
