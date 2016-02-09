(function() {
  'use strict';

  angular
    .module('notebook')
    .config(config);

  config.$inject = ['$httpProvider'];

  /** @ngInject */
  function config($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    $httpProvider.defaults.withCredentials = false;
    delete $httpProvider.defaults.headers.common["X-Requested-With"];
    $httpProvider.defaults.headers.common["Accept"] = "application/json";
    $httpProvider.defaults.headers.common["Content-Type"] = "application/json";
  }

})();
