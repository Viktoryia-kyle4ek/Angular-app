(function(){
  'use strict';

  angular
    .module('notebook')
    .controller('EditController', EditController);

  EditController.$inject = ['$location', 'contact', 'editPrepService'];

  /** @ngInject */
  function EditController($location, contact, editPrepService) {
    /* jshint validthis: true */
    var vm = this;

    vm.activate = activate;
    vm.currentContact = editPrepService;
    vm.edit = editContact;

    activate();

    ////////////////

    function activate() {
    }

    function editContact(item, isValid) {
      if (!isValid) {
        return;
      }
      contact.edit(item);
      $location.path('/');
    }


  }
})();
