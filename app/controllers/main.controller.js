MainController.$inject = [
  '$timeout'
];

function MainController(
  $timeout
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
      vm.myList.pop();
    }, 1000);
  }
}

module.exports = MainController;
