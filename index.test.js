const { wait, getByText, queryByText, prettyDOM } = require('dom-testing-library');
require('dom-testing-library/extend-expect');
const angular = require('angular');

function MainCtrl($scope) {
  const vm = this;
  $scope.blerp = 500;
  vm.derp = 'Wagz';
  vm.blah = function() {
    vm.derp = 'Blah';
  }
}
MainCtrl.$inject = ['$scope'];

function getDom() {
  angular.module('myApp', [])
    .controller('MainCtrl', MainCtrl);

  const body = document.body;
  body.innerHTML = `
    <div id="app" ng-controller="MainCtrl as vm">
      {{vm.derp}} - {{blerp}}
      <button id="blah" ng-click="vm.blah()"></button>
    </div>
  `;

  angular.bootstrap(body, ['myApp']);

  return body;
}

test('examples', async () => {
  const container = getDom();
  container.querySelector('button').click();
  await wait(() => {
    expect(queryByText(container, 'Blah - 500')).toBeInTheDOM();
  });
  expect(container).toMatchSnapshot();
});
