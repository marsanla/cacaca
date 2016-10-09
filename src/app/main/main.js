import angular from 'angular';

import routes from './main.route';

import sidenav from './sidenav-author/sidenav';

const mainModule = 'main';

import mainController from './main.controller';

angular.module(mainModule, [
        sidenav
    ])
    .config(routes)
    .component('main', {
        template: require('./main.html'),
        controller: mainController,
        controllerAs: 'vm'
    });

export default mainModule;
