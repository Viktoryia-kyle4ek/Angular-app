(function() {
  'use strict';

  angular
    .module('notebook')
    .filter('range', Range);

  function Range() {
    return function(input, min, max) {
      min = parseInt(min, 10);
      max = parseInt(max, 10);
      for (var i = min; i <= max; i += 1) {
        input.push(i);
      }
      return input;
    };
  }
})();
