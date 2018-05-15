const config = {
  bindings: {
    myName: '<'
  },
  template: `
    <div>
      Name: {{$ctrl.myName}}
      <button data-testid="clickme" ng-click="$ctrl.clickme()">Click Me!</button>
      <span>Life: {{$ctrl.life}}</span>
    </div>
  `,
  controller: WidgetController
};

WidgetController.$inject = [];

function WidgetController() {
  const vm = this;
  vm.life = 0;
  vm.clickme = ClickMe;

  function ClickMe() {
    vm.life = 100;
  }
}

module.exports.componentName = 'widget';
module.exports.config = config;
