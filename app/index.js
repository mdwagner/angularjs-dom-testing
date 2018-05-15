const angular = require('angular');
const MainController = require('./controllers/main.controller');
const {
  componentName: WidgetName,
  config: WidgetConfig
} = require('./components/widget.component');

const appName = 'myApp';
const appRequires = [];

const app = angular.module(appName, appRequires)
  .controller(MainController.name, MainController)
  .component(WidgetName, WidgetConfig);

module.exports = app;
