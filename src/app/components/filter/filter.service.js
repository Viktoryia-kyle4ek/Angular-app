(function() {
  'use strict';

  angular
    .module('notebook.filter')
    .service('filter', filter);

  filter.$inject = ['$filter'];

  /** @ngInject */
  function filter($filter) {
    var dateFormat = 'dd MMMM yyyy';

    this.globalSearch = globalSearch;

    function globalSearch(data, predicate) {
      if (!predicate) {
        return data;
      }
      var _predicate = predicate.trim().toLowerCase();
      return data.filter(function(obj) {
        for (var name in obj) {
          if (obj.hasOwnProperty(name) && name !== 'id') {
            if (obj[name] instanceof Date) {
              var date = $filter('date')(obj[name], dateFormat);
              if (date.toLowerCase().indexOf(_predicate) > -1) {
                return true;
              }
            } else if (obj[name].toString().toLowerCase().indexOf(_predicate) > -1) {
              return true;
            }
          }
        }
        return false;
      });
    }
  }

})();
