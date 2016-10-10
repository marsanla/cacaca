import angular from 'angular';
import 'angular-mocks';
import {header} from './header';

describe('header component', () => {
    beforeEach(() => {
        angular
            .module('common.header', ['app/common/header/header.html'])
            .component('casumoHeader', header);
        angular.mock.module('casumoHeader');
    });
});
