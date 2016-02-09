(function(){
  'use strict';

  angular
    .module('notebook')
    .controller('MainController', MainController);

  MainController.$inject = ['$scope', '$location', 'contact', 'query', 'contactPrepService'];

  /** @ngInject */
  function MainController($scope, $location, contact, query, contactPrepService) {
    /* jshint validthis: true */
    var vm = this;

    vm.activate = activate;
    vm.contacts = contactPrepService;
    vm.edit = editContact;
    vm.remove = removeContact;
    vm.changeItemsPerPage = changeItemsPerPage;

    $scope.$watch(function() { return vm.page; }, changePageCallback);
    $scope.$watch(function() { return vm.predicate; }, changePredicateCallback);
    $scope.$watch(function() { return vm.sortPredicate; }, changeSortPredicateCallback);

    activate();

    ////////////////

    function activate() {
      vm.page = query.page;
      vm.itemsPerPage = query.itemsPerPage;
      vm.predicate = query.searchExpression;
      vm.sortPredicate = query.sortPredicate;
    }

    function editContact(id){
      var path = '/edit/' + id;
      $location.path(path);
    }

    function removeContact(id) {
      contact.remove(id, function() {
        findContacts(vm.page, vm.itemsPerPage, vm.predicate, vm.sortPredicate, function(length) {
          vm.total = length;
          vm.page = checkPages();
        });
      });
    }

    function findContacts(page, itemsPerPage, predicate, sortPredicate, success) {
      var _sortPredicate = sortPredicate ?
        (sortPredicate.reverse ? '-' + sortPredicate.predicate : '+' + sortPredicate.predicate) :
        '';
      vm.contacts = contact.findAll(page, itemsPerPage, predicate, _sortPredicate, success);
    }

    function changeItemsPerPage() {
      query.itemsPerPage = vm.itemsPerPage;
      vm.page = checkPages();
      findContacts(vm.page, vm.itemsPerPage, vm.predicate, vm.sortPredicate);
    }

    function changePredicateCallback(newVal, oldVal) {
      query.searchExpression = newVal;
      findContacts(vm.page, vm.itemsPerPage, newVal, vm.sortPredicate, function(length) {
        vm.total = length;
        vm.page = 1;
      });
    }

    function changeSortPredicateCallback(newVal, oldVal) {
      query.sortPredicate = newVal;
      findContacts(vm.page, vm.itemsPerPage, vm.predicate, newVal);
    }

    function changePageCallback(newVal, oldVal) {
      query.page = newVal;
      findContacts(newVal, vm.itemsPerPage, vm.predicate, vm.sortPredicate);
    }

    function checkPages() {
      var totalPages = Math.ceil(vm.total / vm.itemsPerPage);
      return totalPages < vm.page ? totalPages : vm.page;
    }
  }
})();
