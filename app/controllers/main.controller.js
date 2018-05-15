MainController.$inject = [
  '$timeout',
  '$http'
];

function MainController(
  $timeout,
  $http
) {
  const vm = this;
  vm.myList = [
    'A',
    'B',
    'C'
  ];
  vm.request = asyncRequest;

  activate();

  function activate() {
    vm.myList.push('D');
  }

  function asyncRequest() {
    $timeout(() => {
      $http.get('/derp').then(r => {
        vm.myList.push(r.data);
      });
    }, 1000);
  }
}

module.exports = MainController;
