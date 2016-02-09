(function() {
  'use strict';

  angular
    .module('notebook', [
      'ngRoute',
      'ngResource',
      'ngMessages',
      'rorymadden.date-dropdowns',
      'notebook.filter',
      'notebook.bootstrap-table',
      'notebook.pagination'
    ]);
})();
