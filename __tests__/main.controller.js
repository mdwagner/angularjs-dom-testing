const {
  // prettyDOM, // For testing
  getByTestId,
  getByText,
  queryByText,
  queryByTestId,
  wait
} = require('dom-testing-library');
require('dom-testing-library/extend-expect');
const angular = require('angular');
require('angular-mocks');
const App = require('../app/index');

MockRequests.$inject = [
  '$httpBackend'
];
function MockRequests(
  $httpBackend
) {
  $httpBackend.whenGET('/derp').respond('success');
}

describe('MainController', () => {
  let container;

  beforeEach(() => {
    container = document.createElement('div');
    container.innerHTML = `
      <div ng-controller="MainController as vm">
        <widget my-name="'Michael'"></widget>
        <button data-testid="asyncButton" ng-click="vm.request()">Do Something Async</button>
        <ul>
          <li data-testid="item{{$index}}" ng-repeat="item in vm.myList track by $index">{{item}}</li>
        </ul>
      </div>
    `;

    const mockapp = angular.module(`${App.name}Dev`, [App.name, 'ngMockE2E'])
      .run(MockRequests);

    angular.bootstrap(container, [mockapp.name]);
  });

  it('should render', async () => {
    expect(container).toBeDefined();
  });

  it('should do something async', async () => {
    expect(queryByText(container, 'D')).toBeDefined();

    getByTestId(container, 'asyncButton').click();

    await wait(() => {
      expect(queryByTestId(container, 'item4')).toHaveTextContent('success');
    });
  });

  it('should contain a widget', async () => {
    await wait(() => {
      expect(queryByText(container, 'Name: Michael')).toBeTruthy();
    });
  });

  it('should click widget', async () => {
    getByTestId(container, 'clickme').click();
    await wait(() => {
      expect(queryByText(container, 'Life: 100')).toBeInTheDOM();
    });
  });
});
