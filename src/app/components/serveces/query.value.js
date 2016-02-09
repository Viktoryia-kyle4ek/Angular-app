(function() {
  'use strict';

  var query = {
    page: 1,
    itemsPerPage: 9,
    searchExpression: '',
    sortPredicate: {
      predicate: '',
      reverse: false
    }
  };

  angular
    .module('notebook')
    .value('query', query);

})();
