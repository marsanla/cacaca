'use strict';

import angular from 'angular';

const footerModule = 'common.footer';

import './index.scss';

angular.module(footerModule, [])
    .component('casumoFooter', {
        template: require('./footer.html')
    });

export default footerModule;
