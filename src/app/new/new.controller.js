(function(){
  'use strict';

  angular
    .module('notebook')
    .controller('NewController', NewController);

  NewController.$inject = ['$location', 'contact'];

  /** @ngInject */
  function NewController($location, contact) {
    /* jshint validthis: true */
    var vm = this;

    vm.activate = activate;
    vm.add = addContact;

    activate();

    ////////////////

    function activate() {
    }

    function addContact(item, isValid) {
      if (!isValid) {
        return;
      }
      contact.add(item);
      $location.path('/');
    }


  }
})();
