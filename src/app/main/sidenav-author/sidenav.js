'use strict';

import angular from 'angular';

const sidenavModule = 'author.sidenav';

import './index.scss';

angular.module(sidenavModule, [])
    .component('authorSidenav', {
        template: require('./sidenav.html'),
        controllerAs: 'vm',
        bindings: {
            authors: '='
        }
    });

export default sidenavModule;
