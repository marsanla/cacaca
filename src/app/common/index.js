import angular from 'angular';

import 'angular-ui-router';
import 'moment';
import 'angular-moment';

import ngAnimate from 'angular-animate';
import ngAria from 'angular-aria';
import ngMaterial from 'angular-material';
import 'angular-material/angular-material.css';

import footer from './footer/footer';
import header from './header/header';

import services from './services';

import routesConfig from './config/routes';
import themeConfig from './config/theme';

import './scss/index.scss';

const commonModule = 'common';

angular.module(commonModule, [
        ngAnimate,
        ngAria,
        ngMaterial,
        'angularMoment',
        'ui.router',

        services,

        header,
        footer
    ])
    .config(routesConfig)
    .config(themeConfig);

export default commonModule;
