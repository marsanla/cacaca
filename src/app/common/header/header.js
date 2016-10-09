'use strict';

import angular from 'angular';

const headerModule = 'common.header';

import './index.scss';

import headerController from './header.controller';

angular.module(headerModule, [])
    .component('casumoHeader', {
        template: require('./header.html'),
        controller: headerController,
        controllerAs: 'vm'
    });

export default headerModule;
