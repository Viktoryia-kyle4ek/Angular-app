(function() {
  'use strict';

  angular
    .module('notebook.pagination')
    .directive('pagination', Pagination);

  function Pagination() {
    return {
      restrict: 'A',
      scope: {
        page: '=',
        pageSize: '=',
        total: '=',
        cssClass: '@'
      },
      link: paginationLink,
      template:
      '<ul class="pagination" ng-hide="list.length === 1"> ' +
      ' <li ng-repeat="item in list" ng-click="item.action()" ng-class="item.cssClass">' +
      '     <span ng-bind="item.value"></span> ' +
      ' </li>' +
      '</ul>'
    }
  }

  function paginationLink(scope, element, attrs) {
    scope.$watchCollection(function() {return [scope.page, scope.pageSize, scope.total]}, function() {
      build(scope, attrs);
    });
  }

  function addListItem(scope, pageIndex) {
    scope.list.push({
      value: pageIndex,
      cssClass: scope.page === pageIndex ? 'active' : '',
      action: function() {
        scope.page = this.value;
      }
    });
  }

  function addDots(scope) {
    scope.list.push({
      value: '...'
    });
  }

  function build(scope) {
    scope.list = [];
    var maxPages = 8;
    var halfMaxPages = maxPages / 2;
    var totalPages = Math.ceil(scope.total / scope.pageSize);
    var currentPage = scope.page;
    var startPage = 1;
    var endPage = totalPages;
    if (!scope.pageSize || scope.pageSize <= 0) {
      return;
    }

    if (currentPage >= maxPages) {
      startPage = currentPage;
      if (currentPage + maxPages > totalPages) {
        startPage = totalPages - halfMaxPages;
      }
      if (startPage > halfMaxPages + 1) {
        addListItem(scope, 1);
      }
    }

    if(totalPages >= maxPages && currentPage >= maxPages) {
      endPage = startPage + halfMaxPages;
      startPage = startPage - halfMaxPages;
      if (startPage > 2) {
        addDots(scope);
      }
    } else if(totalPages > maxPages) {
      endPage = startPage + maxPages;
    }

    for (var i = startPage || 1; i <= endPage && i <= totalPages; i += 1) {
      addListItem(scope, i);
    }

    if (endPage < totalPages && endPage !== totalPages) {
      if (endPage !== totalPages - 1) {
        addDots(scope);
      }
      addListItem(scope, totalPages);
    }
  }
})();
