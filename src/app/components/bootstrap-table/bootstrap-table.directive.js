(function (){
  'use strict';

  angular
    .module('notebook.bootstrap-table')
    .directive('bootstrapTable', BootstrapTable);

  function BootstrapTable() {
    return {
      restrict: 'A',
      replace: true,
      require: 'ngModel',
      scope: {
        model: '=ngModel',
        edit: '&edit',
        remove: '&remove',
        sort: '=sort'
      },
      templateUrl: 'app/components/bootstrap-table/bootstrap-table.html',
      link: BootstrapTableLink,
      controller: BootstrapTableController
    }
  }

  function BootstrapTableLink(scope, element, attrs) {
    scope.predicate = '';
    scope.reverse = false;
    scope.contacts = scope.model;
    scope.sortByPredicate = sortByPredicate;
    scope.$watchCollection('model', changeModel);

    function sortByPredicate($event) {
      var predicate = $event.target.id;
      if (predicate === '') {
        return;
      }
      scope.reverse = scope.predicate === predicate ? !scope.reverse : false;
      scope.predicate = predicate;
      scope.sort = {
        predicate: scope.predicate,
        reverse: scope.reverse
      };
    }

    function changeModel(newModel) {
      if(newModel) {
        scope.contacts = newModel;
      }
    }
  }

  BootstrapTableController.$inject = ['$scope', '$modal'];

  /** @ngInject */
  function BootstrapTableController($scope, $modal) {
    $scope.show = function(contact) {
      var $modalScope = $scope.$new(true);
      $modalScope.contact = contact;
      $modalScope.remove = $scope.remove;
      var modal = init($modalScope);
      modal.$promise.then(modal.show);
    };

    function init(scope){
      return $modal({
        scope: scope,
        title: "Are you sure?",
        templateUrl: 'app/components/bootstrap-table/modal.html',
        show: false
      });
    }
  }
})();
